// Inmediatamente remover la clase 'loading' para evitar el parpadeo.
document.body.classList.remove('loading');

// Intersection Observer para animaciones de entrada
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Una vez animado, dejamos de observar
        }
    });
}, observerOptions);

// Elementos a observar para animación
document.querySelectorAll('.servicio, .card-mvi, .nosotros img, .impacto-imagen-solo').forEach(el => {
    el.classList.add('pre-animation');
    observer.observe(el);
});

// Navegación suave (solo para enlaces internos en la nav principal)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (.target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menú móvil
function setupMobileMenu() {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Menú');
    
    document.querySelector('header').appendChild(menuButton);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        menuButton.innerHTML = nav.classList.contains('nav-open') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Lazy loading para imágenes
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupLazyLoading();
    
    // Revelado inicial suave de la página
    document.body.classList.add('loaded');
});

// Detectar scroll para efectos de navegación
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.querySelector('nav');
    
    // Ocultar/mostrar nav al hacer scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});