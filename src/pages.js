/* Page content. Each entry returns { file, active, title, description, body, ... }
   which build.js feeds through layout.render(). */

const { company, services, industries } = require("./site");
const { esc } = require("./layout");
const C = require("./components");

const brand = company.brand;

/* ====================================================================== HOME */

const home = () => {
    const strip = [
        ["scroll-1", "Tensile Strength"],
        ["scroll-2", "Shade Assessment"],
        ["scroll-3", "Seam Inspection"],
        ["scroll-4", "Chemical Screening"],
        ["scroll-5", "Rub Fastness"],
        ["scroll-6", "Finished Garments"]
    ];
    /* Track is duplicated so the CSS marquee loops seamlessly. */
    const stripFigures = [...strip, ...strip].map(([img, label], i) => `                            <figure>
                                <img src="/assets/img/${img}.jpg" alt="${esc(label)}" loading="lazy" width="900" height="675"${i >= strip.length ? ' aria-hidden="true"' : ""}>
                                <figcaption>${esc(label)}</figcaption>
                            </figure>`).join("\n");

    const marqueeTerms = [
        "Textile Testing Services India", "Fabric Quality Assurance", "Chemical Safety Screening",
        "Textile Inspection &amp; Auditing", "Colorfastness &amp; Durability", "Softlines Testing", "Tirupur, Tamil Nadu"
    ];

    return {
        file: "index.html",
        active: "/",
        title: "Textile Testing, Inspection & Quality Support",
        description: `${company.legalName} provides textile testing, inspection, chemical safety, and quality support services for brands, exporters, and sourcing teams in Tirupur, India.`,
        keywords: "Textile Testing Services India, Fabric Quality Assurance, Textile Inspection, Chemical Safety Testing, Colorfastness Testing, Tirupur Textile Lab",
        canonical: "/",
        body: `            <section class="hero">
                <div class="container hero__grid">
                    <div class="hero__copy reveal">
                        <p class="eyebrow">Smart Testing. Reliable Results.</p>
                        <h1>Technology. Precision.<span class="accent">Trust.</span></h1>
                        <p class="hero__lede">Textile testing, inspection, chemical safety, and quality support delivered with accuracy, consistency, and care &mdash; for brands, exporters, and sourcing teams that need clear direction and dependable execution.</p>

                        <div class="hero__actions">
                            <a class="button" href="/contact.html">
                                <span>Request Testing</span>
                                <span class="button__icon" aria-hidden="true">&rarr;</span>
                            </a>
                            <a class="button button--ghost" href="/services.html">
                                <span>Explore Services</span>
                                <span class="button__icon" aria-hidden="true">&rarr;</span>
                            </a>
                        </div>

                        <ul class="hero__points">
                            <li class="hero__point">${C.icon.check} Clear direction from the first conversation</li>
                            <li class="hero__point">${C.icon.check} Practical technical guidance</li>
                            <li class="hero__point">${C.icon.check} Dependable execution end to end</li>
                        </ul>
                    </div>

                    <div class="hero__visual reveal">
                        <div class="hero__frame">
                            <img src="/assets/img/hero-lab.jpg" alt="Textile testing laboratory bench with microscope, glassware, and fabric swatches" width="1600" height="893" fetchpriority="high">
                            <div class="hero__status">
                                <div class="hero__status-row">
                                    <p>Active Method</p>
                                    <strong>Fiber Integrity Analysis</strong>
                                </div>
                                <div class="hero__status-row">
                                    <p>Service Scope</p>
                                    <strong>Chemical Safety / Performance / Inspection</strong>
                                </div>
                                <div class="hero__status-row">
                                    <p>Project Output</p>
                                    <strong>Clear Service Plan</strong>
                                </div>
                            </div>
                        </div>

                        <div class="hero__strip" aria-label="Garment and fabric testing in progress">
                            <div class="hero__strip-track">
${stripFigures}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="marquee" aria-hidden="true">
                <div class="marquee__track">
                    <span>${marqueeTerms.join("</span><span>")}</span>
                    <span>${marqueeTerms.join("</span><span>")}</span>
                </div>
            </div>

            <section class="section" id="services">
                <div class="container">
                    <div class="section-head section-head--center reveal">
                        <p class="eyebrow">Our Core Services</p>
                        <h2>Testing, inspection, and quality support for textile teams that need clarity.</h2>
                        <p>${brand} supports brands, exporters, and sourcing teams with practical testing coordination, inspection services, and technical guidance &mdash; from the first enquiry through to execution.</p>
                    </div>

${C.serviceGrid()}

                    <div style="text-align:center;margin-top:2.75rem" class="reveal">
                        <a class="button button--ghost" href="/services.html">
                            <span>View All Services</span>
                            <span class="button__icon" aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </section>

            <section class="section section--tint">
                <div class="container">
                    <div class="split">
                        <div class="split__media reveal">
                            <img src="/assets/img/why-microscope.jpg" alt="Laboratory technician examining a fabric specimen under a microscope" loading="lazy" width="900" height="1125">
                            <div class="split__badge">
                                <span>Approach</span>
                                <strong>Service-first support</strong>
                            </div>
                        </div>

                        <div class="reveal">
                            <p class="eyebrow">Why Choose ${brand}?</p>
                            <h2>Practical textile service support, built around how your team actually works.</h2>
                            <p class="lede" style="margin-top:1.1rem">${brand} is a responsive textile service partner focused on clear communication, practical support, and dependable execution across testing and inspection needs.</p>

                            <ul class="checklist">
                                <li>Service-first support that helps you scope the right work from the start</li>
                                <li>Direct technical guidance on service selection and test planning</li>
                                <li>Quick, clear communication for sourcing and quality teams</li>
                                <li>Focused scope across performance, chemical safety, and inspection</li>
                                <li>Readable results with interpretation, not just raw numbers</li>
                            </ul>

                            <div style="margin-top:2.1rem">
                                <a class="button" href="/why-shine.html">
                                    <span>Why ${brand}</span>
                                    <span class="button__icon" aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="section-head reveal">
                        <p class="eyebrow">Industries Served</p>
                        <h2>Aligned to the textile categories where quality failures move fast and cost more.</h2>
                    </div>

                    <div class="card-grid card-grid--4">
${industries.map((ind) => `                        <a class="industry-card reveal" href="/industries.html#${ind.slug}">
                            <img src="/assets/img/ind-${ind.image}.jpg" alt="${esc(ind.title)}" loading="lazy" width="720" height="900">
                            <div class="industry-card__body">
                                <h3>${esc(ind.title)}</h3>
                                <p>${esc(ind.short)}</p>
                            </div>
                        </a>`).join("\n")}
                    </div>
                </div>
            </section>

            <section class="section section--ink">
                <div class="container">
                    <div class="section-head section-head--center reveal">
                        <p class="eyebrow">How We Work</p>
                        <h2 style="color:#fff">Three stages, and you know where you stand at each one.</h2>
                    </div>

                    <div class="process">
                        <article class="feature-card reveal">
                            <span class="feature-card__icon">${C.icon.doc}</span>
                            <h3 style="color:#fff">01 &mdash; Sample Intake</h3>
                            <p>Clear scope definition, method selection, and timeline planning from day one, so nothing is assumed.</p>
                        </article>
                        <article class="feature-card reveal">
                            <span class="feature-card__icon">${C.icon.beaker}</span>
                            <h3 style="color:#fff">02 &mdash; Method Execution</h3>
                            <p>Planned testing and inspection workflows aligned to the product, the requirement, and the timeline.</p>
                        </article>
                        <article class="feature-card reveal">
                            <span class="feature-card__icon">${C.icon.route}</span>
                            <h3 style="color:#fff">03 &mdash; Reporting &amp; Guidance</h3>
                            <p>Readable results, technical interpretation, and corrective direction where it is needed.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="section-head reveal">
                        <p class="eyebrow">Knowledge Center</p>
                        <h2>Guidance that helps sourcing and QA teams make better service decisions.</h2>
                        <p>Practical notes on where quality risk actually sits, and what to do about it before it becomes expensive.</p>
                    </div>

                    <div class="card-grid card-grid--3">
${resourceCards().slice(0, 3).join("\n")}
                    </div>
                </div>
            </section>

${C.ctaBand()}`
    };
};

/* Shared between the home teaser and the resources page. */
function resourceCards() {
    return [
        {
            img: "res-chemical",
            tag: "Compliance",
            title: "How early chemical screening prevents export rework",
            body: "Where material risk is best caught, and how brands avoid shipment-stage surprises that hold a consignment.",
            href: "/resources.html#chemical-screening"
        },
        {
            img: "res-color",
            tag: "Testing Insight",
            title: "What a modern colorfastness program should include",
            body: "The methods and acceptance logic that matter to performance-driven buyers, and which ones you can skip.",
            href: "/resources.html#colorfastness-program"
        },
        {
            img: "res-inspection",
            tag: "Inspection Strategy",
            title: "Why inspections should connect directly to testing plans",
            body: "Bringing factory observations, service scope, and release decisions into one tighter quality loop.",
            href: "/resources.html#inspection-testing-loop"
        }
    ].map((r) => `                        <article class="service-card reveal">
                            <div class="service-card__media">
                                <img src="/assets/img/${r.img}.jpg" alt="${esc(r.title)}" loading="lazy" width="860" height="573">
                            </div>
                            <div class="service-card__body">
                                <p class="eyebrow" style="margin-bottom:0.35rem">${esc(r.tag)}</p>
                                <h3>${esc(r.title)}</h3>
                                <p>${esc(r.body)}</p>
                                <a class="text-link" href="${r.href}">Read more <span aria-hidden="true">&rarr;</span></a>
                            </div>
                        </article>`);
}

/* ===================================================================== ABOUT */

const about = () => ({
    file: "about.html",
    active: "/about",
    title: "About Us",
    description: `${company.legalName} is a textile testing, inspection, and quality support service based in Tirupur, Tamil Nadu, working with brands, exporters, and sourcing teams.`,
    keywords: "About SHINE Testing Services, Textile Testing Company Tirupur, Textile Lab India",
    canonical: "/about.html",
    body: `${C.pageHero({
        eyebrow: "About Us",
        title: `Built to give textile teams a straight answer.`,
        lede: `${company.legalName} is a textile testing, inspection, and quality support service based in Tirupur, Tamil Nadu — working with brands, exporters, manufacturers, and sourcing teams across the categories where quality decisions carry real cost.`,
        trail: [{ label: "About Us", href: "/about.html" }]
    })}

            <section class="section section--flush-top">
                <div class="container">
                    <div class="split">
                        <div class="split__media reveal">
                            <img src="/assets/img/about-facility.jpg" alt="Modern textile testing laboratory" loading="lazy" width="1500" height="843">
                            <div class="split__badge">
                                <span>Based in</span>
                                <strong>${esc(company.addressShort)}</strong>
                            </div>
                        </div>

                        <div class="reveal">
                            <p class="eyebrow">Who We Are</p>
                            <h2>A service partner, not a report factory.</h2>
                            <p class="lede" style="margin-top:1.1rem">Plenty of organisations can run a test. Fewer will tell you which test you actually need, what the result means for your product, and what to do when it comes back marginal.</p>
                            <p style="margin-top:1rem;color:var(--muted)">${brand} was built around that gap. We coordinate the testing and inspection work, and we stay in the conversation through interpretation and corrective direction &mdash; because a number without context rarely resolves anything.</p>
                            <p style="margin-top:1rem;color:var(--muted)">Tirupur sits at the centre of one of India's most concentrated textile clusters. Being based here means we understand the production realities our clients are working inside, not just the specification on the page.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section--tint">
                <div class="container">
                    <div class="section-head section-head--center reveal">
                        <p class="eyebrow">What We Stand For</p>
                        <h2>Four commitments that shape how we work.</h2>
                    </div>

                    <div class="card-grid card-grid--4">
${[
    { ico: C.icon.target, title: "Clear Direction", body: "You should always know what is being tested, why it matters, and what happens next. No ambiguity about scope or outcome." },
    { ico: C.icon.shield, title: "Dependable Execution", body: "Committed timelines that hold, and work carried out to the method actually specified — not an approximation of it." },
    { ico: C.icon.chat, title: "Practical Guidance", body: "Technical support in language your sourcing and production teams can act on immediately, without translation." },
    { ico: C.icon.lock, title: "Confidentiality", body: "Product information, test data, and commercial detail stay between us and you. Always, and without needing to be asked." }
].map((f) => C.featureCard(f)).join("\n")}
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="split split--reverse">
                        <div class="split__media reveal">
                            <img src="/assets/img/process-lab.jpg" alt="Organised textile sample intake area" loading="lazy" width="1500" height="843">
                        </div>
                        <div class="reveal">
                            <p class="eyebrow">Our Approach</p>
                            <h2>Scope it properly once, and the rest gets easier.</h2>
                            <p class="lede" style="margin-top:1.1rem">Most quality problems we see did not begin as testing problems. They began as scoping problems &mdash; the wrong method set, testing at the wrong stage, or a specification nobody had fully read.</p>
                            <ul class="checklist">
                                <li>We start by understanding the product and the market it is going to</li>
                                <li>We shortlist the methods that carry real risk, not the longest available list</li>
                                <li>We test at the stage where a finding can still change the outcome</li>
                                <li>We report in a form you can hand straight to a supplier or a customer</li>
                                <li>We stay available after the report for the questions it raises</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

${C.ctaBand({
    eyebrow: "Work With Us",
    title: "Tell us about your product and we will tell you what it needs.",
    body: "The first conversation is a scoping conversation. Send the category, the requirement, and the timeline, and we will come back with a plan."
})}`
});

/* ================================================================== SERVICES */

const servicesHub = () => ({
    file: "services.html",
    active: "/services",
    title: "Services",
    description: "Softlines testing, chemical safety, colorfastness and durability, flammability and shrinkage, inspection and auditing, and expert consultation for textile teams.",
    keywords: "Textile Testing Services, Softlines Testing, Chemical Safety Testing, Colorfastness Testing, Textile Inspection Services India",
    canonical: "/services.html",
    schema: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            url: `${company.url}/services/${s.slug}.html`
        }))
    },
    body: `${C.pageHero({
        eyebrow: "Our Services",
        title: "Testing, inspection, and quality support &mdash; scoped to your product.",
        lede: "Six service areas covering the physical, chemical, and process side of textile quality. Most projects use two or three of them together, and we will help you work out which.",
        trail: [{ label: "Services", href: "/services.html" }]
    })}

            <section class="section section--flush-top">
                <div class="container">
${C.serviceGrid()}
                </div>
            </section>

            <section class="section section--tint">
                <div class="container">
                    <div class="section-head reveal">
                        <p class="eyebrow">Not Sure Where To Start?</p>
                        <h2>Most teams do not arrive knowing which method set they need.</h2>
                        <p>That is normal, and it is the part we are most useful for. Tell us the product category, the destination market, and the buyer requirement you are working to, and we will shortlist the testing that carries real risk for your situation.</p>
                    </div>

                    <div class="process">
                        <article class="process-step reveal">
                            <span class="process-step__num">01</span>
                            <h3>Tell us the product</h3>
                            <p>Category, construction, materials, and the market it is going to. That alone narrows the method set considerably.</p>
                        </article>
                        <article class="process-step reveal">
                            <span class="process-step__num">02</span>
                            <h3>We shortlist the methods</h3>
                            <p>A proportionate plan sized to the actual risk, with the reasoning explained so you can defend it internally.</p>
                        </article>
                        <article class="process-step reveal">
                            <span class="process-step__num">03</span>
                            <h3>You approve the scope</h3>
                            <p>Clear scope, timeline, and next step before anything begins. No surprises on either side.</p>
                        </article>
                    </div>
                </div>
            </section>

${C.ctaBand({ eyebrow: "Scope Your Project", title: "Send us the requirement and we will build the plan around it." })}`
});

const serviceDetail = (service) => {
    const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

    return {
        file: `services/${service.slug}.html`,
        active: `/services/${service.slug}`,
        title: service.title,
        description: service.short,
        keywords: `${service.title}, Textile ${service.title} India, ${service.title} Tirupur`,
        canonical: `/services/${service.slug}.html`,
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                name: service.title,
                description: service.short,
                serviceType: service.title,
                provider: { "@type": "Organization", name: company.legalName, url: company.url },
                areaServed: { "@type": "Country", name: "India" }
            },
            C.faqSchema(service.faqs)
        ],
        body: `${C.pageHero({
            eyebrow: `Service ${service.index}`,
            title: esc(service.title),
            lede: service.lede,
            trail: [{ label: "Services", href: "/services.html" }, { label: service.title, href: `/services/${service.slug}.html` }]
        })}

            <section class="section section--flush-top">
                <div class="container">
                    <div class="split">
                        <div class="split__media reveal">
                            <img src="/assets/img/svc-${service.image}.jpg" alt="${esc(service.title)}" loading="lazy" width="860" height="573">
                            <div class="split__badge">
                                <span>Service ${service.index}</span>
                                <strong>${esc(service.title)}</strong>
                            </div>
                        </div>
                        <div class="reveal">
                            <p class="eyebrow">Overview</p>
                            <h2>What this service is for.</h2>
                            <p class="lede" style="margin-top:1.1rem">${esc(service.intro)}</p>
                            <div style="margin-top:2rem">
                                <a class="button" href="/contact.html">
                                    <span>Request This Service</span>
                                    <span class="button__icon" aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section--tint">
                <div class="container">
                    <div class="section-head reveal">
                        <p class="eyebrow">What's Covered</p>
                        <h2>Scope of work</h2>
                    </div>
                    <div class="spec-grid">
${service.scope.map(([title, body]) => `                        <article class="spec-item reveal">
                            <h3>${esc(title)}</h3>
                            <p>${esc(body)}</p>
                        </article>`).join("\n")}
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="split">
                        <div class="reveal">
                            <p class="eyebrow">What You Get</p>
                            <h2>Outcomes you can act on.</h2>
                            <ul class="checklist">
${service.outcomes.map((o) => `                                <li>${esc(o)}</li>`).join("\n")}
                            </ul>
                        </div>
                        <div class="help-card reveal">
                            <h3>Need help scoping this?</h3>
                            <p>If you are not certain this is the right service for your product, tell us the category and the requirement. We will confirm whether this is what you need &mdash; or point you at what is.</p>
                            <a class="button button--light" href="/contact.html">
                                <span>Talk To Us</span>
                                <span class="button__icon" aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section--tint">
                <div class="container">
                    <div class="section-head reveal">
                        <p class="eyebrow">Common Questions</p>
                        <h2>${esc(service.title)} &mdash; frequently asked</h2>
                    </div>
${C.accordion(service.faqs)}
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="section-head reveal">
                        <p class="eyebrow">Related Services</p>
                        <h2>Often scoped alongside this one.</h2>
                    </div>
                    <div class="card-grid card-grid--3">
${related.map((s) => C.serviceCard(s)).join("\n")}
                    </div>
                </div>
            </section>

${C.ctaBand({ title: `Ready to move forward with ${service.title.toLowerCase()}?` })}`
    };
};

/* ================================================================ INDUSTRIES */

const industriesPage = () => ({
    file: "industries.html",
    active: "/industries",
    title: "Industries",
    description: "Textile testing and inspection support for apparel, home furnishings, children's wear, and specialty and industrial fabrics.",
    keywords: "Apparel Testing, Home Furnishing Textile Testing, Children's Wear Safety Testing, Industrial Fabric Testing",
    canonical: "/industries.html",
    body: `${C.pageHero({
        eyebrow: "Industries Served",
        title: "Different categories fail in different ways.",
        lede: "A swim short, a curtain, and a child's sleepsuit carry completely different risk profiles. We scope testing around how your specific category actually fails, not a generic checklist.",
        trail: [{ label: "Industries", href: "/industries.html" }]
    })}

            <section class="section section--flush-top">
                <div class="container">
                    <div class="card-grid card-grid--4">
${industries.map((ind) => `                        <a class="industry-card reveal" href="#${ind.slug}">
                            <img src="/assets/img/ind-${ind.image}.jpg" alt="${esc(ind.title)}" loading="lazy" width="720" height="900">
                            <div class="industry-card__body">
                                <h3>${esc(ind.title)}</h3>
                                <p>${esc(ind.short)}</p>
                            </div>
                        </a>`).join("\n")}
                    </div>
                </div>
            </section>

${industries.map((ind, i) => `            <section class="section${i % 2 === 0 ? " section--tint" : ""}" id="${ind.slug}">
                <div class="container">
                    <div class="split${i % 2 === 1 ? " split--reverse" : ""}">
                        <div class="split__media reveal">
                            <img src="/assets/img/ind-${ind.image}.jpg" alt="${esc(ind.title)}" loading="lazy" width="720" height="900">
                        </div>
                        <div class="reveal">
                            <p class="eyebrow">${esc(ind.title)}</p>
                            <h2>${esc(ind.short)}</h2>
                            <p class="lede" style="margin-top:1.1rem">${esc(ind.detail)}</p>
                            <ul class="checklist">
${ind.focus.map((f) => `                                <li>${esc(f)}</li>`).join("\n")}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>`).join("\n\n")}

${C.ctaBand({ eyebrow: "Your Category", title: "Tell us what you make, and we will tell you where the risk sits." })}`
});

/* ================================================================= RESOURCES */

const resources = () => {
    const articles = [
        {
            id: "chemical-screening",
            img: "res-chemical",
            tag: "Compliance",
            title: "How early chemical screening prevents export rework",
            paras: [
                "The most expensive chemical result is the one that arrives after the goods are packed. At that point every option is bad: hold the shipment, rework the consignment, or ship and carry the exposure. None of those is a decision anyone wants to make on a Friday afternoon.",
                "The alternative is not more testing. It is testing at a different point. Screening a fabric or a trim at material approval &mdash; while you can still change supplier, adjust the recipe, or select a different finish &mdash; converts a crisis into a routine decision.",
                "In practice this means identifying which materials in a product actually carry chemical risk for your category and destination, and screening those at the point of approval. Trims and accessories are frequently the ones overlooked, and frequently the ones that cause the problem."
            ]
        },
        {
            id: "colorfastness-program",
            img: "res-color",
            tag: "Testing Insight",
            title: "What a modern colorfastness program should include",
            paras: [
                "Colour generates a disproportionate share of consumer complaints, and most of it is predictable. The question is not whether to run colorfastness testing but which properties are worth running for the product in front of you.",
                "Start from the end use. A garment worn against skin needs perspiration fastness. A product that will be washed weekly needs wash fastness across realistic cycles. Something on display or used outdoors needs light fastness. A deep saturated shade needs rub fastness attention that a pale one does not.",
                "The other half of the programme is acceptance logic. A grade of 3-4 means something specific, and whether it passes depends on the protocol you are working to. Agreeing that threshold with your buyer before production &mdash; not after a marginal result &mdash; removes most of the argument."
            ]
        },
        {
            id: "inspection-testing-loop",
            img: "res-inspection",
            tag: "Inspection Strategy",
            title: "Why inspections should connect directly to testing plans",
            paras: [
                "Testing and inspection are often run by different people, on different schedules, reporting into different places. That separation is where quality information goes to die.",
                "An inspector on the floor sees things a test report cannot: a recurring seam defect across a size range, shade variation between production lots, a trim that has quietly been substituted. Each of those observations points directly at something worth testing &mdash; if anyone connects the two.",
                "The practical fix is unglamorous. Make inspection findings visible to whoever is planning the test programme, and make the test results visible to whoever is briefing the inspector. When those two threads are connected, problems get caught at the stage where the balance of the order can still be corrected."
            ]
        }
    ];

    return {
        file: "resources.html",
        active: "/resources",
        title: "Resources",
        description: "Practical guidance on textile testing, chemical screening, colorfastness programmes, and connecting inspection to test planning.",
        keywords: "Textile Testing Guidance, Chemical Screening Advice, Colorfastness Program, Textile Quality Resources",
        canonical: "/resources.html",
        body: `${C.pageHero({
            eyebrow: "Knowledge Center",
            title: "Guidance for the decisions that come before the test.",
            lede: "Practical notes on where textile quality risk actually sits, written for sourcing and QA teams who need to act on them rather than file them.",
            trail: [{ label: "Resources", href: "/resources.html" }]
        })}

${articles.map((a, i) => `            <section class="section${i % 2 === 0 ? "" : " section--tint"}${i === 0 ? " section--flush-top" : ""}" id="${a.id}">
                <div class="container">
                    <div class="split${i % 2 === 1 ? " split--reverse" : ""}">
                        <div class="split__media reveal">
                            <img src="/assets/img/${a.img}.jpg" alt="${esc(a.title)}" loading="lazy" width="860" height="573">
                        </div>
                        <div class="reveal">
                            <p class="eyebrow">${esc(a.tag)}</p>
                            <h2>${esc(a.title)}</h2>
${a.paras.map((p) => `                            <p style="margin-top:1.1rem;color:var(--muted)">${esc(p)}</p>`).join("\n")}
                            <div style="margin-top:1.9rem">
                                <a class="text-link" href="/contact.html">Discuss this with our team <span aria-hidden="true">&rarr;</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`).join("\n\n")}

            <section class="section">
                <div class="container">
                    <div class="section-head section-head--center reveal">
                        <p class="eyebrow">Reference</p>
                        <h2>General questions about working with ${brand}</h2>
                    </div>
                    <div style="display:flex;justify-content:center">
${C.accordion([
    ["How do I start a testing request?", "Send us the product category, the service requirement, and your timeline through the contact form or by email. We will come back with a proposed scope, an indication of turnaround, and confirmation of the sample quantity we need from you."],
    ["What sample quantity should I send?", "It depends entirely on the method set. Rather than guessing, tell us what you need tested and we will confirm the exact requirement when we scope the work — so you do not send too little and have to repeat, or send far more than necessary."],
    ["Can you help if I do not know which tests apply?", "Yes, and that is one of the more useful conversations we have. Give us the product, the destination market, and any buyer protocol you have been sent, and we will shortlist the methods that carry real risk for your situation."],
    ["Do you handle inspection as well as testing?", "Yes. Pre-production, inline, pre-shipment, and container loading supervision. Where it makes sense we connect inspection findings back to the test plan, because the two inform each other."],
    ["How is confidentiality handled?", "Product information, test data, and commercial detail stay between us and you. We do not share client work, and we do not need to be asked to keep it that way."]
])}
                    </div>
                </div>
            </section>

${C.ctaBand({ eyebrow: "Still Have Questions?", title: "Ask us directly. The first conversation costs nothing." })}`
    };
};

/* ================================================================= WHY SHINE */

const whyShine = () => ({
    file: "why-shine.html",
    active: "/why-shine",
    title: `Why ${brand}`,
    description: `Why brands, exporters, and sourcing teams choose ${company.legalName} for textile testing, inspection, and quality support.`,
    keywords: "Why Choose SHINE, Textile Testing Partner India, Reliable Textile Lab Tirupur",
    canonical: "/why-shine.html",
    body: `${C.pageHero({
        eyebrow: `Why ${brand}`,
        title: "A straight answer, and someone who stays on the call.",
        lede: "There is no shortage of places that will run a test and send a report. The difference shows up in what happens when the result is marginal, the protocol is unfamiliar, or the shipment is next week.",
        trail: [{ label: `Why ${brand}`, href: "/why-shine.html" }]
    })}

            <section class="section section--flush-top">
                <div class="container">
                    <div class="split">
                        <div class="split__media reveal">
                            <img src="/assets/img/why-microscope.jpg" alt="Technician examining a fabric specimen under a microscope" loading="lazy" width="900" height="1125">
                        </div>
                        <div class="reveal">
                            <p class="eyebrow">The Difference</p>
                            <h2>Most of the value is in the conversation around the report.</h2>
                            <p class="lede" style="margin-top:1.1rem">A test result is a data point. What a sourcing team actually needs is a decision: ship or hold, accept or reject, change the material or change the process.</p>
                            <p style="margin-top:1rem;color:var(--muted)">Getting from one to the other requires someone who understands both the method and your commercial position. That is the part we take seriously, and it is the part that is hardest to find.</p>
                            <ul class="checklist">
                                <li>We explain what a result means, not just what it says</li>
                                <li>We stay available after the report is delivered</li>
                                <li>We give you technical grounding for supplier conversations</li>
                                <li>We tell you when a test is not worth running</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section--ink">
                <div class="container">
                    <div class="section-head section-head--center reveal">
                        <p class="eyebrow">What You Can Expect</p>
                        <h2 style="color:#fff">Six things we hold ourselves to.</h2>
                    </div>
                    <div class="card-grid card-grid--3">
${[
    { ico: C.icon.chat, title: "Service-First Support", body: "Built to help you scope the right testing, inspection, and quality services from the very first conversation." },
    { ico: C.icon.doc, title: "Practical Technical Guidance", body: "Direct support on service selection, test planning, and the next-step recommendation that follows a result." },
    { ico: C.icon.clock, title: "Quick Response", body: "Clear communication and timely coordination for sourcing, development, and quality teams working to a deadline." },
    { ico: C.icon.target, title: "Focused Scope", body: "Support across textile performance checks, chemical safety requirements, and inspection programmes — done properly." },
    { ico: C.icon.users, title: "One Point of Contact", body: "You are not routed through a queue. The person who scoped your work is the person who explains the result." },
    { ico: C.icon.lock, title: "Confidentiality", body: "Product information, test data, and commercial detail stay between us and you, without needing to be asked." }
].map((f) => C.featureCard(f)).join("\n")}
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="section-head reveal">
                        <p class="eyebrow">How We Work</p>
                        <h2>Three stages, and you know where you stand at each one.</h2>
                    </div>
                    <div class="process">
                        <article class="process-step reveal">
                            <span class="process-step__num">01</span>
                            <h3>Sample Intake</h3>
                            <p>Requirement review, scope definition, method selection, and timeline planning &mdash; agreed before anything starts.</p>
                        </article>
                        <article class="process-step reveal">
                            <span class="process-step__num">02</span>
                            <h3>Method Execution</h3>
                            <p>Testing and inspection workflows aligned to the product, the specification, and the deadline you are working to.</p>
                        </article>
                        <article class="process-step reveal">
                            <span class="process-step__num">03</span>
                            <h3>Reporting &amp; Guidance</h3>
                            <p>Readable results, technical interpretation, and corrective direction where a result requires action.</p>
                        </article>
                    </div>
                </div>
            </section>

            <section class="section section--tint">
                <div class="container">
                    <div class="split split--reverse">
                        <div class="split__media reveal">
                            <img src="/assets/img/contact-desk.jpg" alt="Consultation area at a textile testing laboratory" loading="lazy" width="1500" height="843">
                        </div>
                        <div class="reveal">
                            <p class="eyebrow">Based in Tirupur</p>
                            <h2>Close to where the work actually happens.</h2>
                            <p class="lede" style="margin-top:1.1rem">Tirupur is one of India's most concentrated textile clusters. Being based here is not incidental &mdash; it means we understand the production realities our clients operate inside.</p>
                            <p style="margin-top:1rem;color:var(--muted)">When a factory issue needs looking at, when a sample needs collecting, or when a conversation is better had in person than over email, proximity matters more than it should have to.</p>
                            <div style="margin-top:2rem">
                                <a class="button" href="/contact.html">
                                    <span>Get In Touch</span>
                                    <span class="button__icon" aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

${C.ctaBand({ eyebrow: "Let's Talk", title: "See the difference on your next project." })}`
});

/* =================================================================== CONTACT */

const contact = () => ({
    file: "contact.html",
    active: "/contact",
    title: "Contact Us",
    description: `Contact ${company.legalName} in Tirupur, Tamil Nadu for textile testing, inspection, chemical safety, and quality support. Phone ${company.phone}, email ${company.email}.`,
    keywords: "Contact Textile Testing Lab Tirupur, Textile Testing Enquiry India, SHINE Testing Services Contact",
    canonical: "/contact.html",
    schema: {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        mainEntity: {
            "@type": "Organization",
            name: company.legalName,
            telephone: company.phone,
            email: company.email,
            address: {
                "@type": "PostalAddress",
                streetAddress: company.streetAddress,
                addressLocality: company.city,
                addressRegion: company.region,
                postalCode: company.postalCode,
                addressCountry: "IN"
            }
        }
    },
    body: `${C.pageHero({
        eyebrow: "Contact Us",
        title: "Let's discuss your testing and inspection requirements.",
        lede: "Tell us about your product category, required services, sample quantity, quality concerns, and project timeline. Our team will help identify the appropriate scope and next steps.",
        trail: [{ label: "Contact Us", href: "/contact.html" }]
    })}

            <section class="section section--flush-top">
                <div class="container">
                    <div class="contact-layout">
${C.contactRail()}
${C.contactForm()}
                    </div>
                </div>
            </section>

            <section class="section section--tint">
                <div class="container">
                    <div class="section-head section-head--center reveal">
                        <p class="eyebrow">Before You Write</p>
                        <h2>What to include so we can respond usefully</h2>
                        <p>The more of this you can tell us upfront, the more specific our first reply can be.</p>
                    </div>
                    <div class="card-grid card-grid--4">
${[
    { ico: C.icon.fabric, title: "Product Category", body: "What the product is, how it is constructed, and the materials involved." },
    { ico: C.icon.doc, title: "Required Services", body: "The testing or inspection you think you need — or say if you are not sure." },
    { ico: C.icon.beaker, title: "Sample Quantity", body: "What you have available to send, so we can confirm whether it is sufficient." },
    { ico: C.icon.clock, title: "Project Timeline", body: "When you need the result, and what decision it is feeding into." }
].map((f) => C.featureCard(f)).join("\n")}
                    </div>
                </div>
            </section>`
});

/* ======================================================================== 404 */

const notFound = () => ({
    file: "404.html",
    active: "",
    title: "Page Not Found",
    description: "The page you are looking for could not be found.",
    canonical: "/404.html",
    body: `            <section class="section" style="min-height:52vh;display:grid;place-items:center;text-align:center">
                <div class="container" style="max-width:38rem">
                    <p class="eyebrow" style="justify-content:center">Error 404</p>
                    <h1>That page is not here.</h1>
                    <p class="lede" style="margin:1.2rem auto 2.2rem">The link may be out of date, or the page may have moved. The services overview is a good place to pick the thread back up.</p>
                    <div style="display:flex;gap:0.85rem;justify-content:center;flex-wrap:wrap">
                        <a class="button" href="/"><span>Back to Home</span><span class="button__icon" aria-hidden="true">&rarr;</span></a>
                        <a class="button button--ghost" href="/services.html"><span>View Services</span><span class="button__icon" aria-hidden="true">&rarr;</span></a>
                    </div>
                </div>
            </section>`
});

module.exports = [
    home(),
    about(),
    servicesHub(),
    ...services.map(serviceDetail),
    industriesPage(),
    resources(),
    whyShine(),
    contact(),
    notFound()
];
