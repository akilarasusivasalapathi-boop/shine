#!/usr/bin/env node
/* Assembles every page from src/ into static HTML at the repo root,
   plus sitemap.xml and robots.txt. Run: npm run build */

const fs = require("fs");
const path = require("path");

const { render } = require("./src/layout");
const { company } = require("./src/site");
const pages = require("./src/pages");

const ROOT = __dirname;

const write = (relPath, contents) => {
    const dest = path.join(ROOT, relPath);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, contents);
    return Buffer.byteLength(contents);
};

let total = 0;

for (const page of pages) {
    const html = render(page);
    const bytes = write(page.file, html);
    total += bytes;
    console.log(`  ${page.file.padEnd(42)} ${(bytes / 1024).toFixed(1)} kB`);
}

/* --- sitemap ---------------------------------------------------------- */

const today = new Date().toISOString().slice(0, 10);

const urls = pages
    .filter((p) => p.file !== "404.html")
    .map((p) => {
        const loc = p.canonical === "/" ? `${company.url}/` : `${company.url}${p.canonical}`;
        const priority = p.canonical === "/" ? "1.0" : p.canonical.startsWith("/services/") ? "0.8" : "0.9";
        return `    <url>
        <loc>${loc}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
    </url>`;
    })
    .join("\n");

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

write("robots.txt", `User-agent: *
Allow: /

Sitemap: ${company.url}/sitemap.xml
`);

console.log(`\n  sitemap.xml + robots.txt written`);
console.log(`  ${pages.length} pages, ${(total / 1024).toFixed(0)} kB total HTML\n`);
