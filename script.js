const header = document.querySelector("[data-header]");
const parallaxTarget = document.querySelector("[data-parallax]");
const revealItems = document.querySelectorAll(".reveal");
const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const isFileProtocol = window.location.protocol === "file:";

const syncHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
};

const syncParallax = () => {
    if (!parallaxTarget) return;
    const offset = Math.min(window.scrollY * 0.12, 44);
    parallaxTarget.style.transform = `translate3d(0, ${offset}px, 0)`;
};

const closeMenu = () => {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.classList.remove("is-active");
    siteNav.classList.remove("is-open");
};

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));
        menuToggle.classList.toggle("is-active", !expanded);
        siteNav.classList.toggle("is-open", !expanded);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}

if (contactForm && formStatus) {
    const params = new URLSearchParams(window.location.search);
    if (!isFileProtocol && params.get("contact") === "success") {
        formStatus.textContent = "Enquiry submitted successfully. We will get back to you shortly.";
    }
    if (!isFileProtocol && params.get("contact") === "error") {
        formStatus.textContent = "Submission failed. Please try again or contact hello@shine-lab.in.";
    }

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());
        const submitButton = contactForm.querySelector("button[type='submit']");

        if (isFileProtocol) {
            const subject = encodeURIComponent(`SHINE enquiry: ${payload.service || "Website enquiry"}`);
            const body = encodeURIComponent(
                [
                    `Name: ${payload.name || ""}`,
                    `Company: ${payload.company || ""}`,
                    `Email: ${payload.email || ""}`,
                    `Service: ${payload.service || ""}`,
                    "",
                    "Project Brief:",
                    payload.message || ""
                ].join("\n")
            );

            formStatus.textContent = "Opened your email app for submission. For live API delivery, run the local server or deploy to Cloud Run.";
            window.location.href = `mailto:hello@shine-lab.in?subject=${subject}&body=${body}`;
            return;
        }

        formStatus.textContent = "Submitting your enquiry...";
        if (submitButton) submitButton.disabled = true;

        try {
            const response = await fetch("api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Unable to submit enquiry");
            }

            contactForm.reset();
            formStatus.textContent = result.message || "Enquiry submitted successfully.";
        } catch (error) {
            formStatus.textContent = error.message || "Submission failed. Please try again later.";
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}

window.addEventListener("scroll", () => {
    syncHeaderState();
    syncParallax();
}, { passive: true });

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMenu();
    }
});

window.addEventListener("load", () => {
    syncHeaderState();
    syncParallax();
});
