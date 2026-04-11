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
         // ✅ DELAY FIX (important in Odoo)

        setTimeout(() => {
            this.initNeuralBG();
            this.initUltraHover();
            this.init3DTilt();
        }, 300);


        if (!this.track) return;

        this.total = this.track.children.length;

        this.createDots();
        this.updateSlider();
        this.bindControls();
        this.handleHoverPause();

        /* ✅ START SLIDER ONLY ONCE */
        this.interval = setInterval(() => this.move(1), 2000);
    }



    initNeuralBG() {
    const canvas = document.getElementById("qualityCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#22c55e";
            ctx.fill();
        });

        // connect lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.strokeStyle = "rgba(34,197,94,0.2)";
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}



initUltraHover() {
    document.querySelectorAll(".quality-card").forEach(card => {

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -(y - rect.height/2) / 10;
            const rotateY = (x - rect.width/2) / 10;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;

            card.style.setProperty("--x", x + "px");
            card.style.setProperty("--y", y + "px");
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0)";
        });
    });
}



    init3DTilt() {
    const cards = document.querySelectorAll(".pack-card");

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -(y - rect.height / 2) / 12;
            const rotateY = (x - rect.width / 2) / 12;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

            // spotlight effect
            card.style.setProperty("--x", x + "px");
            card.style.setProperty("--y", y + "px");
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0) scale(1)";
        });

    });
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