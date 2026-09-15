/* Single source of truth for company details, navigation, and service data.
   Every page is assembled from this, so a change here propagates site-wide. */

const company = {
    brand: "SHINE",
    legalName: "Shine Testing Services India (OPC) Pvt Ltd",
    shortName: "Shine Testing Services",
    tagline: "Precision in Every Fiber.",
    domain: "shine-india.com",
    url: "https://shine-india.com",
    email: "info@shine-india.com",
    phone: "+91 9944662035",
    phoneHref: "+919944662035",
    city: "Tirupur",
    region: "Tamil Nadu",
    country: "India",
    streetAddress: "No.67/80, First Floor, 3rd cross street, Amarjothi Garden, Kangeyam Road",
    postalCode: "641 604",
    address: "No.67/80, First Floor, 3rd cross street, Amarjothi Garden, Kangeyam Road, Tirupur - 641 604",
    addressLines: [
        "No.67/80, First Floor, 3rd cross street",
        "Amarjothi Garden, Kangeyam Road",
        "Tirupur - 641 604"
    ],
    addressShort: "Tirupur, Tamil Nadu, India",
    /* Google fails to geocode the full street line (house no. + floor + cross
       street) and falls back to a point ~1000 km away, so map links use the
       locality form, which resolves inside Tirupur. */
    mapQuery: "Amarjothi Garden, Tirupur, Tamil Nadu 641604"
};

const services = [
    {
        slug: "softlines-testing",
        index: "01",
        title: "Softlines Testing",
        short: "Fabric composition, tensile behavior, seam strength, dimensional stability, and core performance validation.",
        image: "softlines",
        lede: "Physical and performance evaluation that tells you how a fabric will actually behave once it is cut, sewn, worn, and washed.",
        intro: "Softlines testing is where most quality conversations begin. Before a product moves into bulk production, teams need to know whether the material meets the specification on paper and whether it holds up under real use. SHINE coordinates the physical testing that answers those questions clearly.",
        scope: [
            ["Fabric composition", "Fibre content verification against the declared specification and labelling requirement."],
            ["Tensile & tear strength", "Breaking strength, elongation, and tear resistance for woven and knitted constructions."],
            ["Seam performance", "Seam strength and seam slippage evaluation on constructed garments and made-ups."],
            ["Dimensional stability", "Shrinkage and skew behaviour after laundering, measured against agreed tolerances."],
            ["Fabric weight & construction", "GSM, thread count, and construction checks that support costing and consistency."],
            ["Pilling & abrasion", "Surface durability assessment for products that face repeated handling and wear."]
        ],
        outcomes: [
            "A clear pass or fail position against the standard or buyer specification you are working to.",
            "Readable numbers you can share directly with a supplier or a customer without reinterpretation.",
            "Technical context on what a marginal result means and what to do about it."
        ],
        faqs: [
            ["How much fabric do you need for softlines testing?", "It depends on the method set. As a general guide, a metre of fabric across the full width covers most standard physical test packages. We confirm the exact sample requirement when we scope your request, so nothing is wasted and nothing is short."],
            ["Can you test a finished garment rather than fabric?", "Yes. Seam performance, dimensional stability, and several durability checks are run on constructed garments. Where a method requires flat fabric, we will tell you upfront so you can send the right sample type."],
            ["Which standards do you work to?", "We work to the standard or buyer protocol you specify. If you are not sure which applies to your product and market, tell us the category and destination and we will help you shortlist the right method set."]
        ]
    },
    {
        slug: "chemical-safety",
        index: "02",
        title: "Chemical Safety",
        short: "Support for restricted substance screening, material risk review, and chemical safety requirements.",
        image: "chemical",
        lede: "Screening and risk review that catches material problems early, while a change is still inexpensive to make.",
        intro: "Chemical issues are the most expensive kind to discover late. A restricted substance found at shipment stage can hold an entire consignment. SHINE helps teams plan screening at the point where a material decision is still open, and interprets the result in terms of the action it requires.",
        scope: [
            ["Restricted substance screening", "Coordination of testing against restricted substance lists relevant to your market."],
            ["Material risk review", "Assessment of which materials, trims, and finishes in a product carry chemical risk."],
            ["Buyer protocol alignment", "Mapping a customer's chemical requirement onto a practical, proportionate test plan."],
            ["Wet processing review", "Guidance on where dyeing and finishing stages introduce avoidable chemical exposure."],
            ["Trim & accessory checks", "Screening for components that are frequently overlooked in a chemical programme."],
            ["Corrective direction", "Practical next steps when a result comes back outside the accepted limit."]
        ],
        outcomes: [
            "Early visibility of chemical risk, before the material is committed to bulk.",
            "A screening plan proportionate to the product and the market it is going to.",
            "Clear guidance on the corrective route when something needs to change."
        ],
        faqs: [
            ["When is the right time to screen chemically?", "At material approval, not at pre-shipment. Screening a fabric or trim while you can still change supplier or process is the difference between a small decision and a held shipment."],
            ["Do I need to test every material in a product?", "Rarely. A proportionate plan focuses on the materials and processes that actually carry risk for your category and destination market. We help you identify those rather than testing indiscriminately."],
            ["What happens if a result exceeds a limit?", "We walk you through what the result means, where in the process the substance is likely to have been introduced, and what the realistic corrective options are."]
        ]
    },
    {
        slug: "colorfastness-durability",
        index: "03",
        title: "Colorfastness & Durability",
        short: "Laundering, rubbing, perspiration, crocking, and wear simulation for products built for the real world.",
        image: "colorfastness",
        lede: "Evaluation of how colour and surface hold up against washing, rubbing, light, and everyday wear.",
        intro: "Colour problems generate a disproportionate share of consumer complaints and returns. Colorfastness testing simulates the conditions a product will meet in ownership and grades how well the colour survives them. SHINE coordinates the method set that matches how your product is actually used.",
        scope: [
            ["Colorfastness to washing", "Colour change and staining assessment after laundering under defined conditions."],
            ["Rubbing & crocking", "Dry and wet rub-fastness evaluation for transfer onto adjacent surfaces."],
            ["Perspiration fastness", "Acid and alkaline perspiration response for garments worn against skin."],
            ["Light fastness", "Fading behaviour under controlled light exposure for products with display or outdoor use."],
            ["Water & sea water", "Colour stability for swimwear and products exposed to prolonged wetting."],
            ["Wear simulation", "Combined durability assessment reflecting realistic patterns of use."]
        ],
        outcomes: [
            "Graded results against the recognised grey scale, comparable across suppliers and seasons.",
            "Clarity on which specific fastness property is driving a marginal result.",
            "Direction on whether the issue sits with the dye selection, the process, or the finishing."
        ],
        faqs: [
            ["Which colorfastness tests actually matter for my product?", "It depends on how the product is used. A swim short and a curtain fail in completely different ways. Tell us the end use and we will shortlist the fastness properties that carry real risk for that category."],
            ["What does a grade of 3-4 mean?", "Fastness is graded on a scale where 5 is no change and 1 is severe. Most buyer protocols set a minimum of 3-4 or 4. We tell you where your result sits relative to the requirement you are working to."],
            ["Can dark shades pass rub fastness reliably?", "Deep and saturated shades are the hardest to pass, particularly on wet rub. Testing early on a lab dip, rather than on bulk, gives you room to adjust the recipe before it becomes costly."]
        ]
    },
    {
        slug: "flammability-shrinkage",
        index: "04",
        title: "Flammability & Shrinkage",
        short: "Safety and structural integrity testing for categories where product failure carries legal and commercial cost.",
        image: "flammability",
        lede: "Safety-critical and dimensional testing for product categories where the consequence of failure is regulatory, not just commercial.",
        intro: "Some product categories carry obligations that are not negotiable. Sleepwear, children's product, and certain home textiles are subject to flammability requirements, and dimensional failure in any category drives returns. SHINE coordinates this testing with the seriousness the category requires.",
        scope: [
            ["Flammability assessment", "Burn behaviour evaluation under the method applicable to your product and market."],
            ["Category requirement review", "Confirmation of which safety obligations apply to your product and destination."],
            ["Dimensional stability", "Shrinkage measurement after laundering against your agreed tolerance."],
            ["Skew & torque", "Twisting behaviour assessment in knitted garments after washing."],
            ["Appearance after laundering", "Surface, seam, and overall appearance retention through repeated wash cycles."],
            ["Care instruction validation", "Verification that the care label you intend to apply is actually supportable."]
        ],
        outcomes: [
            "A defensible position on the safety requirements applicable to your category.",
            "Shrinkage data measured against the tolerance you are committing to commercially.",
            "Confidence that the care instruction on the label reflects tested behaviour."
        ],
        faqs: [
            ["Does flammability testing apply to my product?", "It depends on the category and the destination market. Children's sleepwear and several home textile categories carry specific obligations. Tell us the product and market and we will confirm what applies."],
            ["How many wash cycles should shrinkage be measured over?", "Buyer protocols commonly specify one, three, or five cycles. We follow the protocol you are working to, and if you do not have one we will explain the trade-off between them."],
            ["Can you validate a care label before we print it?", "Yes, and it is worth doing. A care instruction that the fabric cannot actually survive is a returns problem and a compliance exposure at the same time."]
        ]
    },
    {
        slug: "inspection-auditing",
        index: "05",
        title: "Inspection & Auditing",
        short: "Pre-production, inline, and pre-shipment inspections that help teams monitor product quality and shipment readiness.",
        image: "inspection",
        lede: "Eyes on the floor at the stages where a quality problem is still cheap to correct.",
        intro: "Testing tells you what a material can do. Inspection tells you what the factory actually produced. The two only work well together. SHINE coordinates inspection at the production stages where intervention is still possible, and reports in a way that supports a release decision.",
        scope: [
            ["Pre-production inspection", "Verification of materials, trims, and the approved sample before the line starts."],
            ["Inline inspection", "Assessment during production, while a correction can still be applied to the balance."],
            ["Pre-shipment inspection", "Final verification of finished, packed goods against the agreed specification."],
            ["Container loading supervision", "Oversight at the point of loading to confirm quantity, condition, and packing."],
            ["Measurement checks", "Spec conformity across the size set on a sampled basis."],
            ["Packing & labelling review", "Confirmation that cartons, labels, and presentation match the buyer requirement."]
        ],
        outcomes: [
            "A clear factual account of what was found on the floor, with supporting detail.",
            "Findings framed against the specification so a release decision is straightforward.",
            "Early warning at a stage where the balance of the order can still be corrected."
        ],
        faqs: [
            ["At what stage should the first inspection happen?", "Before the line starts. A pre-production check on materials and the approved sample catches problems that inline inspection can only document after they have been sewn into several thousand units."],
            ["How is the sampling level decided?", "Inspection sampling follows an agreed plan based on order quantity and the tolerance you set. We confirm the plan with you before attending so the outcome is not disputed afterwards."],
            ["Can inspection findings connect back to testing?", "Yes, and they should. When an inspector sees a recurring defect on the floor, that observation often points directly at a material property worth testing. We keep those two threads connected."]
        ]
    },
    {
        slug: "expert-consultation",
        index: "06",
        title: "Expert Consultation",
        short: "Method interpretation, corrective action guidance, and testing strategy support for complex quality programs.",
        image: "consultation",
        lede: "Technical guidance for the moments when the result is in front of you and the decision is not obvious.",
        intro: "A test report is only useful if someone can act on it. Teams regularly hold a result they do not know how to respond to, or face a buyer protocol they are reading for the first time. SHINE provides direct technical guidance on method selection, interpretation, and the corrective route.",
        scope: [
            ["Method interpretation", "Plain explanation of what a result means in the context of your product."],
            ["Test plan design", "Building a proportionate method set for a product, category, and destination market."],
            ["Buyer protocol review", "Working through a customer's technical requirement and what it asks of you in practice."],
            ["Corrective action guidance", "Practical direction on the realistic routes to resolve a failed result."],
            ["Supplier discussion support", "Technical backing when a quality position needs to be held with a supplier."],
            ["Quality programme planning", "Structuring testing and inspection across a season rather than order by order."]
        ],
        outcomes: [
            "A clear understanding of what a result actually requires you to do.",
            "A test plan sized to the real risk rather than to the longest available method list.",
            "Technical grounding for the conversations you need to have with suppliers and customers."
        ],
        faqs: [
            ["Can we talk through a report we had done elsewhere?", "Yes. Bring the report and the specification it was tested against, and we will work through what the results mean and where the practical exposure sits."],
            ["We have a new buyer protocol and it is unfamiliar. Can you help?", "That is a common starting point. Send us the protocol and the product category, and we will translate it into a test plan you can actually execute and budget for."],
            ["Is consultation only available alongside testing?", "No. Technical guidance is a service in its own right. Some of the most useful conversations happen before any sample is sent."]
        ]
    }
];

const industries = [
    {
        slug: "apparel",
        title: "Apparel",
        image: "apparel",
        short: "Performance validation, shade consistency, and supplier confidence for fashion and basics.",
        detail: "Apparel carries the widest range of quality exposure of any category. Shade variation across a delivery, seam failure in wear, and shrinkage beyond tolerance all reach the customer directly. Testing and inspection are structured around the properties that generate returns.",
        focus: ["Colorfastness across the wash, rub, and perspiration set", "Seam strength and slippage on constructed garments", "Dimensional stability against a committed tolerance", "Shade consistency across a production run"]
    },
    {
        slug: "home-furnishings",
        title: "Home Furnishings",
        image: "home",
        short: "Durability, structural integrity, and wash performance for fabrics under repeated daily use.",
        detail: "Home textiles are used harder and washed more often than most apparel, and they are kept for longer. Durability and appearance retention across repeated cycles matter more here than in almost any other category.",
        focus: ["Abrasion and pilling resistance under sustained use", "Appearance retention through repeated laundering", "Dimensional stability in made-up products", "Light fastness for products in prolonged daylight"]
    },
    {
        slug: "childrens-wear",
        title: "Children's Wear",
        image: "kids",
        short: "Elevated chemical and physical safety expectations supported by disciplined test programs.",
        detail: "Children's product is held to a higher standard, and correctly so. Chemical safety and physical safety requirements are stricter, buyer scrutiny is closer, and the consequence of a failure is more serious than a commercial one.",
        focus: ["Restricted substance screening at a stricter threshold", "Flammability requirements where the category demands it", "Physical safety of trims, fastenings, and attachments", "Careful handling of the wet-processing chemical route"]
    },
    {
        slug: "specialty-industrial",
        title: "Specialty & Industrial Fabrics",
        image: "industrial",
        short: "Technical evaluation for functional, protective, and application-specific textile materials.",
        detail: "Technical textiles are specified on performance rather than appearance. The material is chosen to do a job, and testing has to confirm it does that job under the conditions of the application.",
        focus: ["Performance validation against the functional specification", "Strength and structural integrity under load", "Behaviour under the intended application conditions", "Consistency of technical properties across batches"]
    }
];

const nav = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
        label: "Services",
        href: "/services",
        children: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))
    },
    { label: "Industries", href: "/industries" },
    { label: "Resources", href: "/resources" },
    { label: "Why SHINE", href: "/why-shine" },
    { label: "Contact Us", href: "/contact" }
];

module.exports = { company, services, industries, nav };
