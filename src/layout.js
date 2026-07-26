/* Page shell: head, header, footer. Every generated page runs through render(). */

const { company, nav } = require("./site");

const esc = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Links are root-absolute with explicit .html so the same build works on a
   static host and behind server.js, which additionally accepts extensionless URLs. */
const renderNav = (active) => nav.map((item) => {
    const isActive = item.href === active || (item.children || []).some((c) => c.href === active);
    const current = isActive ? ' aria-current="page"' : "";

    if (!item.children) {
        return `<li class="nav-item">
                        <a class="nav-link${isActive ? " is-active" : ""}" href="${item.href === "/" ? "/" : item.href + ".html"}"${current}>${esc(item.label)}</a>
                    </li>`;
    }

    const panel = item.children.map((child) => `
                                <a class="mega-link" href="${child.href}.html">
                                    <span class="mega-link__title">${esc(child.label)}</span>
                                    <span class="mega-link__arrow" aria-hidden="true">&rarr;</span>
                                </a>`).join("");

    return `<li class="nav-item nav-item--has-menu" data-dropdown>
                        <a class="nav-link${isActive ? " is-active" : ""}" href="${item.href}.html"${current}>
                            ${esc(item.label)}
                            <span class="nav-link__caret" aria-hidden="true"></span>
                        </a>
                        <button class="nav-expand" type="button" aria-expanded="false" aria-label="Show ${esc(item.label)} menu" data-dropdown-toggle></button>
                        <div class="mega" data-dropdown-panel>
                            <div class="mega__inner">
                                <div class="mega__lead">
                                    <p class="eyebrow">Our Services</p>
                                    <p>Testing, inspection, and quality support scoped around what your product actually needs.</p>
                                    <a class="mega__all" href="/services.html">View all services <span aria-hidden="true">&rarr;</span></a>
                                </div>
                                <div class="mega__links">${panel}
                                </div>
                            </div>
                        </div>
                    </li>`;
}).join("\n");

const header = (active) => `        <a class="skip-link" href="#main">Skip to content</a>

        <header class="site-header" data-header>
            <div class="container header-bar">
                <a class="brand" href="/" aria-label="${esc(company.brand)} home">
                    <img src="/assets/logo_transprant.png" alt="${esc(company.brand)}" class="brand__logo" width="132" height="46">
                    <span class="brand__descriptor">Testing Services</span>
                </a>

                <nav id="site-nav" class="site-nav" aria-label="Primary" data-site-nav>
                    <ul class="nav-list">
${renderNav(active)}
                    </ul>

                    <div class="nav-drawer-footer">
                        <a class="button button--ghost" href="/assets/shine-india-brochure.pdf" download>Download Brochure</a>
                        <a class="nav-drawer-footer__link" href="mailto:${company.email}">${esc(company.email)}</a>
                        <a class="nav-drawer-footer__link" href="tel:${company.phoneHref}">${esc(company.phone)}</a>
                    </div>
                </nav>

                <div class="header-actions">
                    <a class="button button--sm header-cta" href="/assets/shine-india-brochure.pdf" download>
                        <span>Download Brochure</span>
                        <span class="button__icon" aria-hidden="true">&darr;</span>
                    </a>

                    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu" data-menu-toggle>
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        </header>

        <div class="nav-scrim" data-nav-scrim hidden></div>`;

const footer = () => {
    const serviceLinks = nav.find((n) => n.label === "Services").children
        .map((c) => `<li><a href="${c.href}.html">${esc(c.label)}</a></li>`).join("\n                            ");

    const companyLinks = ["/about", "/why-shine", "/industries", "/resources", "/contact"]
        .map((href) => {
            const item = nav.find((n) => n.href === href);
            return `<li><a href="${href}.html">${esc(item ? item.label : href)}</a></li>`;
        }).join("\n                            ");

    return `        <footer class="site-footer">
            <div class="container">
                <div class="footer-top">
                    <div class="footer-brand">
                        <img src="/assets/logo_transprant.png" alt="${esc(company.brand)}" class="footer-brand__logo" width="150" height="52">
                        <p class="footer-brand__legal">${esc(company.legalName)}</p>
                        <p class="footer-brand__blurb">Textile testing, inspection, chemical safety, and quality support services for brands, exporters, and sourcing teams.</p>
                        <a class="button button--ghost button--sm" href="/assets/shine-india-brochure.pdf" download>
                            <span>Download Brochure</span>
                            <span class="button__icon" aria-hidden="true">&darr;</span>
                        </a>
                    </div>

                    <nav class="footer-nav" aria-label="Services">
                        <h2 class="footer-nav__title">Services</h2>
                        <ul>
                            ${serviceLinks}
                        </ul>
                    </nav>

                    <nav class="footer-nav" aria-label="Company">
                        <h2 class="footer-nav__title">Company</h2>
                        <ul>
                            ${companyLinks}
                        </ul>
                    </nav>

                    <div class="footer-contact">
                        <h2 class="footer-nav__title">Get in Touch</h2>
                        <address>
                            <a class="footer-contact__row" href="https://maps.google.com/?q=${encodeURIComponent(company.address)}" target="_blank" rel="noopener">
                                <span class="footer-contact__icon" aria-hidden="true">${icons.pin}</span>
                                <span><strong>${esc(company.legalName)}</strong><br>${esc(company.address)}</span>
                            </a>
                            <a class="footer-contact__row" href="tel:${company.phoneHref}">
                                <span class="footer-contact__icon" aria-hidden="true">${icons.phone}</span>
                                <span>${esc(company.phone)}</span>
                            </a>
                            <a class="footer-contact__row" href="mailto:${company.email}">
                                <span class="footer-contact__icon" aria-hidden="true">${icons.mail}</span>
                                <span>${esc(company.email)}</span>
                            </a>
                        </address>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} ${esc(company.legalName)}. All rights reserved.</p>
                    <p class="footer-bottom__tag">${esc(company.tagline)}</p>
                </div>
            </div>
        </footer>`;
};

const icons = {
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.8a2 2 0 0 1 1.7 2Z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>`
};

/* ---------------------------------------------------------------------- */

const render = ({
    active,
    title,
    description,
    keywords = "",
    canonical,
    body,
    schema = null,
    bodyClass = ""
}) => {
    const fullTitle = `${title} | ${company.brand} Testing Services`;
    const url = `${company.url}${canonical}`;

    const baseSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: company.legalName,
        alternateName: company.brand,
        url: company.url,
        logo: `${company.url}/assets/logo_transprant.png`,
        email: company.email,
        telephone: company.phone,
        description: "Textile testing, inspection, chemical safety, and quality support services for brands, exporters, and sourcing teams.",
        address: {
            "@type": "PostalAddress",
            addressLocality: company.city,
            addressRegion: company.region,
            addressCountry: "IN"
        },
        knowsAbout: ["Textile Testing", "Fabric Quality Assurance", "Chemical Safety", "Inspection and Auditing", "Colorfastness Testing"]
    };

    const schemaBlocks = [baseSchema, ...(schema ? [].concat(schema) : [])]
        .map((block) => `    <script type="application/ld+json">${JSON.stringify(block)}</script>`)
        .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(fullTitle)}</title>
    <meta name="description" content="${esc(description)}">
${keywords ? `    <meta name="keywords" content="${esc(keywords)}">\n` : ""}    <link rel="canonical" href="${url}">
    <meta name="theme-color" content="#ffffff">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${esc(company.legalName)}">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${esc(fullTitle)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:image" content="${company.url}/assets/img/og-card.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(fullTitle)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${company.url}/assets/img/og-card.jpg">
    <link rel="icon" type="image/png" href="/assets/logo_transprant.png">
    <link rel="apple-touch-icon" href="/assets/logo_transprant.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/style.css">
${schemaBlocks}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
    <div class="aurora" aria-hidden="true">
        <span class="aurora__blob aurora__blob--one"></span>
        <span class="aurora__blob aurora__blob--two"></span>
        <span class="aurora__blob aurora__blob--three"></span>
    </div>

    <div class="site-shell">
${header(active)}

        <main id="main">
${body}
        </main>

${footer()}
    </div>

    <a class="whatsapp-fab" href="https://wa.me/${company.phoneHref.replace("+", "")}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9a9.8 9.8 0 0 0 1.36 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01A9.9 9.9 0 0 0 22 11.94 9.9 9.9 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.95 1.35-.5.05-.98.23-3.3-.69-2.77-1.09-4.53-3.92-4.67-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27a1 1 0 0 1 .72-.34h.51c.17 0 .39-.06.6.46.24.57.8 1.98.87 2.12.07.14.12.3.02.49-.1.18-.15.3-.29.46-.14.16-.3.36-.43.48-.14.14-.29.3-.13.58.17.29.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.41.28.15.45.12.62-.07.17-.2.71-.83.9-1.11.19-.29.38-.24.64-.15.26.1 1.67.79 1.95.93.29.15.48.22.55.34.07.12.07.68-.17 1.36Z"/></svg>
    </a>

    <button class="to-top" type="button" data-to-top aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>
    </button>

    <script src="/script.js" defer></script>
</body>
</html>
`;
};

module.exports = { render, esc, icons };
