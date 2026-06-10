const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const querystring = require("querystring");

const PORT = Number(process.env.PORT || 8080);
const ROOT_DIR = __dirname;
const MAX_BODY_SIZE = 1024 * 1024;

const MIME_TYPES = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".pdf": "application/pdf",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".xml": "application/xml; charset=utf-8"
};

const readBody = (req) => new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
        size += chunk.length;
        if (size > MAX_BODY_SIZE) {
            reject(new Error("Request body too large"));
            req.destroy();
            return;
        }
        chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
});

const json = (res, status, payload) => {
    const body = JSON.stringify(payload);
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Content-Length": Buffer.byteLength(body)
    });
    res.end(body);
};

const redirect = (res, location) => {
    res.writeHead(303, {
        Location: location,
        "Cache-Control": "no-store"
    });
    res.end();
};

const withSecurityHeaders = (headers = {}) => ({
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
    ...headers
});

const sendText = (res, status, body, type = "text/plain; charset=utf-8") => {
    res.writeHead(status, withSecurityHeaders({
        "Content-Type": type,
        "Content-Length": Buffer.byteLength(body)
    }));
    res.end(body);
};

const getBaseUrl = (req) => {
    const configured = process.env.SITE_URL;
    if (configured) return configured.replace(/\/$/, "");
    const host = req.headers.host || `localhost:${PORT}`;
    const forwardedProto = req.headers["x-forwarded-proto"] || "http";
    return `${forwardedProto}://${host}`;
};

const serveStaticFile = (req, res, filePath) => {
    const resolved = path.resolve(ROOT_DIR, filePath);
    if (!resolved.startsWith(ROOT_DIR)) {
        sendText(res, 403, "Forbidden");
        return;
    }

    fs.stat(resolved, (statError, stats) => {
        if (statError || !stats.isFile()) {
            sendText(res, 404, "Not found");
            return;
        }

        const ext = path.extname(resolved).toLowerCase();
        const type = MIME_TYPES[ext] || "application/octet-stream";
        const cacheControl = /^(\.svg|\.css|\.js)$/.test(ext)
            ? "public, max-age=31536000, immutable"
            : "public, max-age=3600";

        res.writeHead(200, withSecurityHeaders({
            "Content-Type": type,
            "Cache-Control": cacheControl,
            "Content-Length": stats.size
        }));

        fs.createReadStream(resolved).pipe(res);
    });
};

const parseSubmission = (rawBody, contentType = "") => {
    if (contentType.includes("application/json")) {
        return JSON.parse(rawBody || "{}");
    }

    if (contentType.includes("application/x-www-form-urlencoded")) {
        return querystring.parse(rawBody);
    }

    return {};
};

const validateSubmission = (payload) => {
    const cleaned = {
        name: String(payload.name || "").trim(),
        company: String(payload.company || "").trim(),
        email: String(payload.email || "").trim(),
        service: String(payload.service || "").trim(),
        message: String(payload.message || "").trim(),
        source: String(payload.source || "website").trim()
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (cleaned.name.length < 2) return { error: "Please provide a valid name." };
    if (cleaned.company.length < 2) return { error: "Please provide a valid company name." };
    if (!emailPattern.test(cleaned.email)) return { error: "Please provide a valid email address." };
    if (cleaned.service.length < 2) return { error: "Please choose a service." };
    if (cleaned.message.length < 12) return { error: "Please provide more detail about the project." };

    return { value: cleaned };
};

const submitToWebhook = async (submission, req) => {
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
        throw new Error("CONTACT_WEBHOOK_URL is not configured.");
    }

    const headers = {
        "Content-Type": "application/json",
        "User-Agent": "shine-website/1.0"
    };

    if (process.env.CONTACT_WEBHOOK_TOKEN) {
        headers.Authorization = `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}`;
    }

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
            ...submission,
            receivedAt: new Date().toISOString(),
            ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "",
            userAgent: req.headers["user-agent"] || ""
        })
    });

    if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}.`);
    }
};

const server = http.createServer(async (req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);
    const pathname = requestUrl.pathname;

    try {
        if (pathname === "/healthz") {
            return json(res, 200, { ok: true });
        }

        if (pathname === "/robots.txt") {
            const baseUrl = getBaseUrl(req);
            return sendText(
                res,
                200,
                `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`,
                "text/plain; charset=utf-8"
            );
        }

        if (pathname === "/sitemap.xml") {
            const baseUrl = getBaseUrl(req);
            return sendText(
                res,
                200,
                `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${baseUrl}/</loc>\n  </url>\n</urlset>\n`,
                "application/xml; charset=utf-8"
            );
        }

        if (pathname === "/api/contact" && req.method === "POST") {
            const rawBody = await readBody(req);
            const payload = parseSubmission(rawBody, req.headers["content-type"] || "");
            const validation = validateSubmission(payload);

            if (validation.error) {
                if ((req.headers.accept || "").includes("application/json")) {
                    return json(res, 400, { error: validation.error });
                }
                return redirect(res, "/?contact=error#contact");
            }

            await submitToWebhook(validation.value, req);

            if ((req.headers.accept || "").includes("application/json")) {
                return json(res, 200, { ok: true, message: "Enquiry submitted successfully. We will get back to you shortly." });
            }

            return redirect(res, "/?contact=success#contact");
        }

        if (pathname === "/" || pathname === "/index.html") {
            return serveStaticFile(req, res, "index.html");
        }

        const safePath = pathname.replace(/^\/+/, "");
        return serveStaticFile(req, res, safePath);
    } catch (error) {
        const wantsJson = (req.headers.accept || "").includes("application/json");
        const message = error instanceof Error ? error.message : "Unexpected server error";
        if (wantsJson) {
            return json(res, 500, { error: message });
        }
        return redirect(res, "/?contact=error#contact");
    }
});

server.listen(PORT, () => {
    console.log(`SHINE website listening on port ${PORT}`);
});
