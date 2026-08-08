/* =====================================================
   PORTFOLIO OSIAX - JAVASCRIPT
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */

const menuBtn = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");


if(menuBtn && mobileMenu){

    menuBtn.addEventListener("click",()=>{

        const isOpen = mobileMenu.classList.toggle("open");

        menuBtn.classList.toggle("open",isOpen);

        menuBtn.setAttribute("aria-expanded",isOpen);

    });

}



/* Fermer le menu après clic sur un lien */

document.querySelectorAll(".mobile-menu a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        mobileMenu?.classList.remove("open");

        menuBtn?.classList.remove("open");

        menuBtn?.setAttribute("aria-expanded","false");

    });

});





/* =====================================================
   NAVBAR AU SCROLL
===================================================== */

const navbar = document.querySelector("nav");


if(navbar){

    window.addEventListener("scroll",()=>{


        if(window.scrollY > 40){

            navbar.classList.add("scrolled");

        }

        else{

            navbar.classList.remove("scrolled");

        }


    });

}





/* =====================================================
   ANIMATION APPARITION AU SCROLL
===================================================== */


const revealElements = document.querySelectorAll(
`
section,
.project,
.skill-card,
.why-card,
.timeline-item,
.about-card,
.about-text,
.cta-box,
.contact-info,
.contact-form
`
);



revealElements.forEach(element=>{

    element.classList.add("reveal");

});



const revealObserver = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }


    });


},{
    threshold:0.15
});



revealElements.forEach(element=>{

    revealObserver.observe(element);

});






/* =====================================================
   COMPTEURS ANIMÉS
===================================================== */


const counters = document.querySelectorAll(
".stat h3, .about-numbers h3"
);



const counterObserver = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            const counter = entry.target;

            const value = counter.innerText;


            const number = parseInt(value);


            if(!isNaN(number)){


                let start = 0;


                const duration = 1500;

                const increment =
                number / (duration / 16);



                const animate = ()=>{


                    start += increment;


                    if(start < number){


                        counter.innerText =
                        Math.floor(start) +
                        (value.includes("+") ? "+" : value.includes("%") ? "%" : "");


                        requestAnimationFrame(animate);


                    }

                    else{


                        counter.innerText=value;


                    }


                };


                animate();


            }


            counterObserver.unobserve(counter);


        }


    });


},{
    threshold:.7
});



counters.forEach(counter=>{

    counterObserver.observe(counter);

});






/* =====================================================
   ANNÉE AUTOMATIQUE FOOTER
===================================================== */


const year = document.querySelector(".year");


if(year){

    year.innerText =
    new Date().getFullYear();

}






/* =====================================================
   SMOOTH SCROLL
===================================================== */


document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{


    anchor.addEventListener("click",(e)=>{


        const targetId = anchor.getAttribute("href");

        if(targetId === "#") return;

        const target =
        document.querySelector(targetId);


        if(target){


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


});






/* =====================================================
   EFFET IMAGE PROJET
===================================================== */


const projectImages =
document.querySelectorAll(".project-image img");



projectImages.forEach(img=>{


    img.addEventListener("mousemove",(e)=>{


        const rect =
        img.getBoundingClientRect();


        const x =
        e.clientX - rect.left;


        const y =
        e.clientY - rect.top;


        img.style.transform =
        `
        scale(1.05)
        translate(
        ${(x-rect.width/2)/40}px,
        ${(y-rect.height/2)/40}px
        )
        `;


    });



    img.addEventListener("mouseleave",()=>{


        img.style.transform="scale(1)";


    });



});
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    status.textContent = '';
    status.className = '';

    try {
        const response = await fetch('https://formspree.io/f/xwlevrwj', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.textContent = 'Message envoyé avec succès ! Je vous répondrai bientôt.';
            status.className = 'success';
            form.reset();
        } else {
            const data = await response.json();
            if (data.errors) {
                status.textContent = data.errors.map(err => err.message).join(', ');
            } else {
                status.textContent = "Une erreur s'est produite. Veuillez réessayer.";
            }
            status.className = 'error';
        }
    } catch (error) {
        status.textContent = "Impossible d'envoyer le message. Vérifiez votre connexion.";
        status.className = 'error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer le message';
    }
});
