// Animación de números en estadísticas
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer para estadísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll('.stat-numero');
            statElements.forEach(stat => {
                const endValue = parseInt(stat.textContent);
                stat.textContent = '0';
                animateValue(stat, 0, endValue, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observer para animaciones de entrada - maneja tanto .reveal como .fade-in-element
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Inicializar observadores
document.addEventListener('DOMContentLoaded', () => {
    // Observar casos de éxito para animación de estadísticas
    document.querySelectorAll('.caso-exito-card').forEach(card => {
        statsObserver.observe(card);
    });

    // Observar elementos con clase .reveal para animaciones de entrada
    document.querySelectorAll('.reveal').forEach(element => {
        fadeObserver.observe(element);
    });

    // Observar elementos con clase .fade-in-element para animaciones de entrada
    document.querySelectorAll('.fade-in-element').forEach(element => {
        fadeObserver.observe(element);
    });
});