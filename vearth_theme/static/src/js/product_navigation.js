import { Interaction } from "@web/public/interaction";
import { registry } from "@web/core/registry";

class ProductNavigation extends Interaction {
    static selector = "#wrapwrap";

    setup() {
        this.sidebar = null;
        this.sidebarToggle = null;
        this.sidebarLinks = null;
        this.sections = null;
    }

    /**
     * Initialize sidebar and elements
     */
    initSidebar() {
        this.sidebar = document.querySelector('.product-sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.sidebarLinks = document.querySelectorAll('.sidebar-link');
        this.sections = document.querySelectorAll('.product-section');
    }

    /**
     * Toggle sidebar on mobile
     */
    toggleSidebar() {
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.sidebar.classList.toggle('active');
            });
        }
    }

    /**
     * Handle sidebar link click
     */

    handleSidebarLinkClick() {
    this.sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // ✅ If it's same-page navigation (#id)
            if (href.startsWith("#")) {
                e.preventDefault();

                const section = document.querySelector(href);

                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                this.sidebar.classList.remove('active');
            }

            this.updateActiveLink(link);
        });
    });
}

    /**
     * Update active link based on current scroll position
     */
    handleScrollUpdate() {
        window.addEventListener('scroll', () => {
            let current = '';

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            this.sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    /**
     * Close sidebar when clicking outside
     */
    handleClickOutside() {
        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 1024) {
                const isClickInsideSidebar = this.sidebar.contains(event.target);
                const isClickOnToggle = this.sidebarToggle && this.sidebarToggle.contains(event.target);
                
                if (!isClickInsideSidebar && !isClickOnToggle && this.sidebar.classList.contains('active')) {
                    this.sidebar.classList.remove('active');
                }
            }
        });
    }

    /**
     * Update active link styling
     */
    updateActiveLink(link) {
        this.sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }


initCollapsible() {
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const list = card.querySelector(".composition-list");
        const btn = card.querySelector(".toggle-btn");

        if (!list || !btn) return;

        const items = list.querySelectorAll("li");

        // ✅ ONLY APPLY IF MORE THAN 3
        if (items.length > 3) {
            list.classList.add("collapsed");

            btn.addEventListener("click", () => {
                list.classList.toggle("collapsed");

                btn.textContent = list.classList.contains("collapsed")
                    ? "Show More"
                    : "Show Less";
            });
        } else {
            btn.style.display = "none";
        }
    });
}

    handleSidebarVisibility() {
        const firstSection = document.querySelector('.product-section');
        const page = document.querySelector('.categories-page');

        if (!firstSection || !this.sidebar) return;

        const toggleVisibility = () => {
            const rect = firstSection.getBoundingClientRect();

            if (rect.top <= 120) {
                this.sidebar.classList.add('show-sidebar');
                page.classList.add('with-sidebar');
            } else {
                this.sidebar.classList.remove('show-sidebar');
                page.classList.remove('with-sidebar');
            }
        };

        window.addEventListener('scroll', toggleVisibility);
    }

    nevigateToSection() {
    const offset = 120;

    const scrollToHash = () => {
        const hash = window.location.hash;

        if (!hash) return;

        const el = document.querySelector(hash);

        if (el) {
            window.scrollTo({
                top: el.offsetTop - offset,
                behavior: "smooth"
            });
        }
    };

    // 🔥 Run on initial load
    setTimeout(scrollToHash, 400);

    // 🔥 Run when hash changes (important for Odoo SPA)
    window.addEventListener("hashchange", scrollToHash);
}

        handleHeaderScroll() {
            const navbar = document.querySelector('.premium-navbar');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }


        handleActiveMenu() {
            const links = document.querySelectorAll('.nav-link');

            links.forEach(link => {
                if (link.href === window.location.href) {
                    link.classList.add('active-link');
                }
            });
        }



handleThemeToggle() {

    console.log("Hello dark mode")
    document.addEventListener("click", (e) => {
        const btn = e.target.closest("#themeToggle");


        if (btn) {
            document.body.classList.toggle("dark-mode");

            // Save preference
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");

            // Toggle icon
            const icon = btn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-toggle-on");
                icon.classList.toggle("fa-toggle-off");
            }
        }
    });
}

loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        const btn = document.getElementById("themeToggle");
        const icon = btn?.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-toggle-on");
            icon.classList.add("fa-toggle-off");
        }
    }
}



handleCompositionToggle() {
    document.querySelectorAll(".product-card").forEach(card => {

        const btn = card.querySelector(".toggle-btn");
        const extras = card.querySelectorAll(".extra");

        if (!btn || extras.length === 0) {
            if (btn) btn.style.display = "none";
            return;
        }

        let expanded = false;

        btn.addEventListener("click", () => {
            expanded = !expanded;

            extras.forEach(el => {
                el.style.display = expanded ? "list-item" : "none";
            });

            btn.innerText = expanded ? "Show Less" : "Show More";
        });
    });
}

    /**
     * Main start function
     */
    start() {
        // Check if sidebar exists on this page
        this.handleThemeToggle();
        this.loadTheme();

        if (!document.querySelector('.product-sidebar')) {
            return;
        }

        // Initialize all sidebar elements
        this.initCollapsible();
        this.initSidebar();

        this.handleHeaderScroll();

        // Attach event listeners
        this.toggleSidebar();
        this.handleSidebarLinkClick();
        this.handleScrollUpdate();
        this.handleClickOutside();

        this.handleSidebarVisibility();
        this.nevigateToSection();
        this.handleActiveMenu();
        // this.handleCompositionToggle()

    }
}

registry
    .category("public.interactions")
    .add("website.productnavigation", ProductNavigation);
