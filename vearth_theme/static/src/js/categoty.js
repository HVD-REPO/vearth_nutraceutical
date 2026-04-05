import { ConfirmationDialog } from '@web/core/confirmation_dialog/confirmation_dialog';
import { Interaction } from "@web/public/interaction";
import { registry } from "@web/core/registry";


class CategoryService extends Interaction {
    static selector = "#wrapwrap";

    initCardAnimation(){

    const cards = document.querySelectorAll(".animate-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){

                const index = [...cards].indexOf(entry.target);

                // stagger effect
                setTimeout(()=>{
                    entry.target.classList.add("show");
                }, index * 80);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold:0.2
    });

    cards.forEach(card => observer.observe(card));
}

    start() {

        this.initCardAnimation();

    /* =========================
       ELEMENT SELECTORS
    ========================= */



    /* =========================
       ADJUST NAV POSITION (NEW)
    ========================= */
    }


}



registry
    .category("public.interactions")
    .add("website.CategoryService", CategoryService);