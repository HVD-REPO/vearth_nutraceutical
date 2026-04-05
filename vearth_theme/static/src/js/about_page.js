import { ConfirmationDialog } from '@web/core/confirmation_dialog/confirmation_dialog';
import { Interaction } from "@web/public/interaction";
import { registry } from "@web/core/registry";

class AboutVearthPage extends Interaction {
    static selector = "#wrapwrap";

    setup() {
        this.index = 0;   // store globally for class
    }

    paralax_effect(){
        window.addEventListener('scroll', () => {
            document.querySelectorAll('.vearth-parallax').forEach(section => {
                const speed = 0.4;
                section.style.backgroundPositionY = -(window.scrollY * speed) + 'px';
            });
        });

    }



handleActiveMenu() {
    const currentPath = window.location.pathname;

    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href");

        link.classList.remove("active-link");

        if (!href) return;

        // Exact match
        if (currentPath === href) {
            link.classList.add("active-link");
        }

        // Products page (with anchors)
        if (href === "/products" && currentPath.includes("/products")) {
            link.classList.add("active-link");
        }
    });
}






     cloneSlides() {
        const track = document.getElementById("categoryCarousel");
        if (!track) return;

        const slides = [...track.children];

        // clone first 5 & last 5
        slides.slice(0,5).forEach(slide => {
            track.appendChild(slide.cloneNode(true));
        });

        slides.slice(-5).forEach(slide => {
            track.insertBefore(slide.cloneNode(true), track.firstChild);
        });
    }


    jumpToStart() {
        const track = document.getElementById("categoryCarousel");
        const cardWidth = 245;
        track.style.transform = `translateX(${-this.index * cardWidth}px)`;
    }

   slideCategory(dir) {
    const track = document.getElementById("categoryCarousel");
    if (!track) return;

    const cardWidth = 260;
    const total = track.children.length;

    this.index += dir;

    track.style.transition = "transform .6s ease";
    track.style.transform = `translateX(${-this.index * cardWidth}px)`;

    // CENTER FOCUS
    track.querySelectorAll('.category-card').forEach(c => {
        c.classList.remove('active-center');
    });

    const centerIndex = this.index + 3;
    if (track.children[centerIndex]) {
        track.children[centerIndex].classList.add('active-center');
    }

    // LOOP FIX
    setTimeout(() => {
        track.style.transition = "none";

        if (this.index >= total - 5) {
            this.index = 5;
        }
        if (this.index <= 0) {
            this.index = total - 10;
        }

        track.style.transform = `translateX(${-this.index * cardWidth}px)`;
    }, 600);
}



    magneticEffect() {
    const cards = document.querySelectorAll('.category-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveX = (x - rect.width/2) * 0.08;
            const moveY = (y - rect.height/2) * 0.08;

            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}



    startAutoSlide() {
        this.autoInterval = setInterval(() => {
            this.slideCategory(1);
        }, 4000);
    }

    stopAutoSlide() {
        clearInterval(this.autoInterval);
    }

    handleCarouselHover() {
        const track = document.getElementById("categoryCarousel");
        if (!track) return;

        track.addEventListener("mouseenter", () => {
            this.stopAutoSlide();
        });

        track.addEventListener("mouseleave", () => {
            this.startAutoSlide();
        });
    }


    handleFooterCollapse() {
    const btn = document.querySelector(".footer-toggle-btn");
    if (!btn) return;

    const extraItems = document.querySelectorAll(".collapsible-list .extra");

    let expanded = false;

    btn.addEventListener("click", () => {
        expanded = !expanded;

        extraItems.forEach(item => {
            item.style.display = expanded ? "list-item" : "none";
        });

        btn.innerText = expanded ? "Show Less" : "Show More";
    });
}





    autoSlide() {
        this.slideCategory(1);
    }

    section_animation()
    {
    console.log("Hello")
    const sections = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
    }

    start() {

        document.body.classList.remove('no-js');

        this.section_animation()
        this.paralax_effect()
        this.handleActiveMenu();
        this.handleFooterCollapse();



        const track = document.getElementById("categoryCarousel");

        // ✅ Only run carousel if it exists on this page
        if (track) {
            this.cloneSlides(track);
            this.index = 5;  // start from the first original slide (after the 5 prepended clones)
            this.jumpToStart(track);
            this.startAutoSlide();
            this.handleCarouselHover(track);
            this.magneticEffect();
        }

    }
}

registry
    .category("public.interactions")
    .add("website.aboutvearthpage", AboutVearthPage);