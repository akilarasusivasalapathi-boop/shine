/* Reusable content blocks shared across pages. */

const { company, services } = require("./site");
const { esc } = require("./layout");

const svg = (paths, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${paths}</svg>`;

const icon = {
    beaker: svg(`<path d="M9 3v6.5L4.2 17.8A2 2 0 0 0 5.9 21h12.2a2 2 0 0 0 1.7-3.2L15 9.5V3"/><path d="M8 3h8"/><path d="M6.5 15h11"/>`),
    fabric: svg(`<path d="M3 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>`),
    shield: svg(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>`),
    search: svg(`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`),
    flame: svg(`<path d="M12 22a7 7 0 0 0 7-7c0-5-4-6-4-10-3 2-4 4.5-4 7 0-1-1-2.5-2-3-1 2-4 3.5-4 6a7 7 0 0 0 7 7Z"/>`),
    chat: svg(`<path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z"/><path d="M9 11h6"/><path d="M9 15h3"/>`),
    clock: svg(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>`),
    target: svg(`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>`),
    lock: svg(`<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>`),
    users: svg(`<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M17 5.5a3.4 3.4 0 0 1 0 6.6"/><path d="M18.5 20a6.4 6.4 0 0 0-3-5.4"/>`),
    doc: svg(`<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>`),
    route: svg(`<circle cx="6" cy="6" r="2.6"/><circle cx="18" cy="18" r="2.6"/><path d="M8.6 6H14a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h.4"/>`),
    check: svg(`<path d="m20 6-11 11-5-5"/>`, ` stroke-width="2.4"`),
    pin: svg(`<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`),
    phone: svg(`<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.8a2 2 0 0 1 1.7 2Z"/>`),
    mail: svg(`<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>`),
    whatsapp: svg(`<path d="M12 21a9 9 0 1 0-7.7-4.4L3 21l4.6-1.2A9 9 0 0 0 12 21Z"/><path d="M8.5 9.5c0 3 2.5 5.5 5.5 5.5"/>`)
};

/* Service slug -> icon, so cards and detail pages stay in sync. */
const serviceIcon = {
    "softlines-testing": icon.fabric,
    "chemical-safety": icon.beaker,
    "colorfastness-durability": icon.target,
    "flammability-shrinkage": icon.flame,
    "inspection-auditing": icon.search,
    "expert-consultation": icon.chat
};

const breadcrumbs = (trail) => `                <ol class="breadcrumbs">
                    <li><a href="/">Home</a></li>
${trail.map((item, i) => `                    <li>${i === trail.length - 1
        ? `<span aria-current="page">${esc(item.label)}</span>`
        : `<a href="${item.href}">${esc(item.label)}</a>`}</li>`).join("\n")}
                </ol>`;

const pageHero = ({ eyebrow, title, lede, trail = [] }) => `            <section class="page-hero">
                <div class="container">
${trail.length ? breadcrumbs(trail) + "\n" : ""}                    <div class="page-hero__inner reveal">
                        <p class="eyebrow">${esc(eyebrow)}</p>
                        <h1>${title}</h1>
                        <p>${esc(lede)}</p>
                    </div>
                </div>
            </section>`;

const serviceCard = (service) => `                        <article class="service-card reveal">
                            <div class="service-card__media">
                                <span class="service-card__index">${service.index}</span>
                                <img src="/assets/img/svc-${service.image}.jpg" alt="${esc(service.title)} at SHINE Testing Services" loading="lazy" width="860" height="573">
                            </div>
                            <div class="service-card__body">
                                <h3>${esc(service.title)}</h3>
                                <p>${esc(service.short)}</p>
                                <a class="text-link" href="/services/${service.slug}.html">
                                    Learn More <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </article>`;

const serviceGrid = () => `                    <div class="card-grid card-grid--3">
${services.map(serviceCard).join("\n")}
                    </div>`;

const featureCard = ({ ico, title, body }) => `                        <article class="feature-card reveal">
                            <span class="feature-card__icon">${ico}</span>
                            <h3>${esc(title)}</h3>
                            <p>${esc(body)}</p>
                        </article>`;

const accordion = (items) => `                    <div class="accordion" data-accordion>
${items.map(([q, a]) => `                        <div class="accordion__item">
                            <button class="accordion__trigger" type="button" aria-expanded="false">
                                <span>${esc(q)}</span>
                                <span class="accordion__icon" aria-hidden="true"></span>
                            </button>
                            <div class="accordion__panel"><div><p>${esc(a)}</p></div></div>
                        </div>`).join("\n")}
                    </div>`;

const faqSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a }
    }))
});

const ctaBand = ({
    eyebrow = "Get Started",
    title = "Tell us what you need tested, and we will scope it with you.",
    body = `Share the product category, the service requirement, and your timeline. ${company.brand} will come back with a clear scope, a realistic turnaround, and the next step.`,
    primary = { label: "Request Service Details", href: "/contact.html" },
    secondary = { label: "Download Brochure", href: "/assets/shine-india-brochure.pdf", download: true }
} = {}) => `            <section class="section cta-band">
                <div class="container">
                    <div class="cta-band__inner reveal">
                        <div>
                            <p class="eyebrow">${esc(eyebrow)}</p>
                            <h2>${esc(title)}</h2>
                            <p>${esc(body)}</p>
                        </div>
                        <div class="cta-band__actions">
                            <a class="button button--light" href="${primary.href}">
                                <span>${esc(primary.label)}</span>
                                <span class="button__icon" aria-hidden="true">&rarr;</span>
                            </a>
                            <a class="button button--outline-light" href="${secondary.href}"${secondary.download ? " download" : ""}>
                                <span>${esc(secondary.label)}</span>
                                <span class="button__icon" aria-hidden="true">${secondary.download ? "&darr;" : "&rarr;"}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>`;

const contactForm = (preselect = "") => `                    <form class="contact-form reveal" method="post" action="/api/contact" data-contact-form>
                        <input type="hidden" name="source" value="website">
                        <div class="contact-form__row">
                            <label class="field">
                                <span>Full Name</span>
                                <input type="text" name="name" autocomplete="name" placeholder="Your name" required>
                            </label>
                            <label class="field">
                                <span>Company</span>
                                <input type="text" name="company" autocomplete="organization" placeholder="Company name" required>
                            </label>
                        </div>
                        <div class="contact-form__row">
                            <label class="field">
                                <span>Work Email</span>
                                <input type="email" name="email" autocomplete="email" placeholder="you@company.com" required>
                            </label>
                            <label class="field">
                                <span>Phone <span style="font-weight:500;color:var(--muted-light)">(optional)</span></span>
                                <input type="tel" name="phone" autocomplete="tel" placeholder="+91 00000 00000">
                            </label>
                        </div>
                        <label class="field">
                            <span>Service Needed</span>
                            <select name="service" required>
                                <option value="">Choose a service</option>
${services.map((s) => `                                <option${preselect === s.title ? " selected" : ""}>${esc(s.title)}</option>`).join("\n")}
                                <option${preselect === "Not sure yet" ? " selected" : ""}>Not sure yet — please advise</option>
                            </select>
                        </label>
                        <label class="field">
                            <span>Project Brief</span>
                            <textarea name="message" rows="5" placeholder="Tell us about the product, the tests required, sample count, and your timeline." required></textarea>
                        </label>
                        <button class="button" type="submit">
                            <span>Request Service Details</span>
                            <span class="button__icon" aria-hidden="true">&rarr;</span>
                        </button>
                        <p class="form-note">Share the requirement clearly and our team will respond with scope, turnaround, and next steps.</p>
                        <p class="form-status" aria-live="polite" data-form-status></p>
                    </form>`;

const contactRail = () => `                    <div class="contact-rail reveal">
                        <a class="contact-tile" href="https://maps.google.com/?q=${encodeURIComponent(company.address)}" target="_blank" rel="noopener">
                            <span class="contact-tile__icon">${icon.pin}</span>
                            <span>
                                <p>Visit</p>
                                <strong>${esc(company.shortName)}</strong>
                                <span>${esc(company.address)}</span>
                            </span>
                        </a>
                        <a class="contact-tile" href="tel:${company.phoneHref}">
                            <span class="contact-tile__icon">${icon.phone}</span>
                            <span>
                                <p>Call</p>
                                <strong>${esc(company.phone)}</strong>
                                <span>Monday to Saturday, business hours IST</span>
                            </span>
                        </a>
                        <a class="contact-tile" href="mailto:${company.email}">
                            <span class="contact-tile__icon">${icon.mail}</span>
                            <span>
                                <p>Email</p>
                                <strong>${esc(company.email)}</strong>
                                <span>Send the brief and we will scope it</span>
                            </span>
                        </a>
                        <div class="map-frame">
                            <iframe
                                title="${esc(company.shortName)} location map"
                                src="https://www.google.com/maps?q=${encodeURIComponent(company.address)}&z=11&output=embed"
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>`;

module.exports = {
    icon, serviceIcon, breadcrumbs, pageHero, serviceCard, serviceGrid,
    featureCard, accordion, faqSchema, ctaBand, contactForm, contactRail, svg
};
