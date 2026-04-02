document.addEventListener('DOMContentLoaded', () => {

    // 1. Fejléc stílusának változtatása görgetéskor (Glassmorphism effekt erősítése)
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Sima görgetés (Smooth Scroll) a navigációs linkekhez
    const navLinks = document.querySelectorAll('nav a, .btn-primary');

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Csak akkor avatkozunk be, ha belső hivatkozás (#)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Kiszámoljuk a pozíciót a fix fejléc magasságának levonásával
                    const headerHeight = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Megjelenés animálása görgetéskor (Intersection Observer API)
    // Ez sokkal teljesítmény-barátabb, mint a scroll event listener
    const observerOptions = {
        threshold: 0.1, // Akkor indul az animáció, ha az elem 10%-a látható
        rootMargin: "0px 0px -50px 0px" // Kicsit hamarabb töltődjön be, mielőtt teljesen a viewportba ér
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ha egyszer megjelent, ne figyelje tovább (így nem animál újra, ha felfelé görget)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Kikeressük az összes animálandó elemet
    const elementsToAnimate = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    elementsToAnimate.forEach(element => {
        animateObserver.observe(element);
    });

});