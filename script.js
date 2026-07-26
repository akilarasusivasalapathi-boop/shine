/* SHINE — interaction layer. Progressive enhancement only: every page works
   without this file, it just becomes less pleasant. */

(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isDesktop = function () { return window.matchMedia("(min-width: 961px)").matches; };

    /* --- Header shadow on scroll ------------------------------------- */

    var header = document.querySelector("[data-header]");
    var toTop = document.querySelector("[data-to-top]");

    var onScroll = function () {
        var y = window.scrollY;
        if (header) header.classList.toggle("is-stuck", y > 12);
        if (toTop) toTop.classList.toggle("is-visible", y > 700);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        });
    }

    /* --- Services dropdown (click on mobile, hover via CSS on desktop) -- */

    function closeDropdown(item) {
        item.classList.remove("is-open");
        var btn = item.querySelector("[data-dropdown-toggle]");
        if (btn) btn.setAttribute("aria-expanded", "false");
    }

    document.querySelectorAll("[data-dropdown]").forEach(function (item) {
        var btn = item.querySelector("[data-dropdown-toggle]");
        if (!btn) return;

        btn.addEventListener("click", function () {
            var open = !item.classList.contains("is-open");
            item.classList.toggle("is-open", open);
            btn.setAttribute("aria-expanded", String(open));
        });
    });

    /* --- Mobile drawer ------------------------------------------------ */

    var toggle = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector("[data-site-nav]");
    var scrim = document.querySelector("[data-nav-scrim]");

    var setDrawer = function (open) {
        if (!toggle || !nav) return;
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        nav.classList.toggle("is-open", open);
        document.body.classList.toggle("is-locked", open);

        if (scrim) {
            if (open) {
                scrim.hidden = false;
                requestAnimationFrame(function () { scrim.classList.add("is-visible"); });
            } else {
                scrim.classList.remove("is-visible");
                setTimeout(function () { scrim.hidden = true; }, 350);
            }
        }
    };

    if (toggle) {
        toggle.addEventListener("click", function () {
            setDrawer(toggle.getAttribute("aria-expanded") !== "true");
        });
    }

    if (scrim) scrim.addEventListener("click", function () { setDrawer(false); });

    document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        setDrawer(false);
        document.querySelectorAll("[data-dropdown].is-open").forEach(closeDropdown);
    });

    /* Reset drawer state when crossing the desktop breakpoint, so the nav
       never ends up hidden-but-open after a resize. */
    var wasDesktop = isDesktop();
    window.addEventListener("resize", function () {
        var nowDesktop = isDesktop();
        if (nowDesktop === wasDesktop) return;
        wasDesktop = nowDesktop;
        setDrawer(false);
        document.querySelectorAll("[data-dropdown].is-open").forEach(closeDropdown);
    });

    /* --- Accordions ---------------------------------------------------- */

    document.querySelectorAll("[data-accordion]").forEach(function (group) {
        group.querySelectorAll(".accordion__trigger").forEach(function (trigger) {
            trigger.addEventListener("click", function () {
                var item = trigger.closest(".accordion__item");
                var open = !item.classList.contains("is-open");

                /* One panel open at a time reads more calmly than many. */
                group.querySelectorAll(".accordion__item.is-open").forEach(function (other) {
                    if (other === item) return;
                    other.classList.remove("is-open");
                    other.querySelector(".accordion__trigger").setAttribute("aria-expanded", "false");
                });

                item.classList.toggle("is-open", open);
                trigger.setAttribute("aria-expanded", String(open));
            });
        });
    });

    /* --- Reveal on scroll ---------------------------------------------- */

    var revealables = document.querySelectorAll(".reveal");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealables.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (!entry.isIntersecting) return;
                /* Small stagger so a grid animates in as a group, not a wall. */
                setTimeout(function () { entry.target.classList.add("is-visible"); }, i * 70);
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

        revealables.forEach(function (el) { observer.observe(el); });
    }

    /* --- Contact form -------------------------------------------------- */

    var form = document.querySelector("[data-contact-form]");

    if (form) {
        var status = form.querySelector("[data-form-status]");
        var submit = form.querySelector('button[type="submit"]');

        var setStatus = function (message, state) {
            if (!status) return;
            status.textContent = message;
            if (state) {
                status.setAttribute("data-state", state);
            } else {
                status.removeAttribute("data-state");
            }
        };

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!form.reportValidity()) return;

            var label = submit ? submit.innerHTML : "";
            if (submit) {
                submit.disabled = true;
                submit.innerHTML = "<span>Sending&hellip;</span>";
            }
            setStatus("");

            fetch(form.action, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
            })
                .then(function (response) {
                    return response.json().then(function (data) {
                        return { ok: response.ok, data: data };
                    });
                })
                .then(function (result) {
                    if (!result.ok) throw new Error(result.data.error || "Something went wrong.");
                    setStatus(result.data.message || "Enquiry submitted. We will get back to you shortly.", "success");
                    form.reset();
                })
                .catch(function (error) {
                    setStatus(error.message + " You can also email us directly at info@shine-india.com.", "error");
                })
                .finally(function () {
                    if (submit) {
                        submit.disabled = false;
                        submit.innerHTML = label;
                    }
                });
        });

        /* Surface the redirect-based result when JS submission was not used. */
        var params = new URLSearchParams(window.location.search);
        if (params.get("contact") === "success") {
            setStatus("Enquiry submitted. We will get back to you shortly.", "success");
        } else if (params.get("contact") === "error") {
            setStatus("We could not submit that. Please try again or email us directly.", "error");
        }
    }
})();
