import { Interaction } from "@web/public/interaction";
import { registry } from "@web/core/registry";

class ManufacturingPage extends Interaction {
    static selector = "#wrapwrap";

    setup() {
        this.index = 0;
        this.track = null;
        this.dots = null;
        this.total = 0;
        this.interval = null;
    }

    start() {

        /* ===== HERO SLIDER ===== */
        this.track = document.getElementById("heroSlider");
        this.dots = document.getElementById("heroDots");
        this.handleScrollSpy();
        this.handleSidebarVisibility();

        if (!this.track) return;

        this.total = this.track.children.length;

        this.createDots();
        this.updateSlider();
        this.bindControls();
        this.handleHoverPause();

        /* ✅ START SLIDER ONLY ONCE */
        this.interval = setInterval(() => this.move(1), 2000);
    }


    handleSidebarVisibility() {

    const hero = document.querySelector(".vearth-hero-slider");
    const sidebar = document.querySelector(".side-nav");

    if (!hero || !sidebar) return;

    window.addEventListener("scroll", () => {
        const trigger = hero.offsetHeight - 100;

        if (window.scrollY > trigger) {
            sidebar.classList.add("show");
        } else {
            sidebar.classList.remove("show");
        }
    });
}


    handleScrollSpy() {

    const sections = document.querySelectorAll(".scroll-section");
    const links = document.querySelectorAll(".side-nav a");
    const progress = document.querySelector(".scroll-progress");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });

        /* PROGRESS BAR */
        const scrollTop = window.scrollY;
        const height = document.body.scrollHeight - window.innerHeight;

        if (progress && height > 0) {
            progress.style.width = (scrollTop / height) * 100 + "%";
        }
    });
}

    updateSlider() {
        const slides = this.track.querySelectorAll(".hero-slide");

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === this.index);
        });

        if (this.dots) {
            this.dots.querySelectorAll("span").forEach((d, i) => {
                d.classList.toggle("active", i === this.index);
            });
        }
    }

    move(dir) {
        this.index += dir;

        if (this.index < 0) this.index = this.total - 1;
        if (this.index >= this.total) this.index = 0;

        this.updateSlider();
    }

    goTo(i) {
        this.index = i;
        this.updateSlider();
    }

    createDots() {
        if (!this.dots) return;

        this.dots.innerHTML = "";

        for (let i = 0; i < this.total; i++) {
            const dot = document.createElement("span");
            dot.addEventListener("click", () => this.goTo(i));
            this.dots.appendChild(dot);
        }
    }

    bindControls() {
        document.getElementById("heroPrev")?.addEventListener("click", () => this.move(-1));
        document.getElementById("heroNext")?.addEventListener("click", () => this.move(1));
    }

    handleHoverPause() {
        const slider = document.querySelector(".vearth-hero-slider");
        if (!slider) return;

        slider.addEventListener("mouseenter", () => {
            clearInterval(this.interval);
        });

        slider.addEventListener("mouseleave", () => {
            this.interval = setInterval(() => this.move(1), 2000);
        });
    }
}

registry
    .category("public.interactions")
    .add("website.ManufacturingPage", ManufacturingPage);