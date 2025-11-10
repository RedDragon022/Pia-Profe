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

// Observer para animaciones de entrada
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

    // Observar elementos para animaciones de entrada
    document.querySelectorAll('.fade-in-element').forEach(element => {
        fadeObserver.observe(element);
    });

    // Animaciones suaves para FAQ
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const allAnswers = document.querySelectorAll('.faq-answer');
            const allQuestions = document.querySelectorAll('.faq-question');
            
            allAnswers.forEach(a => {
                if (a !== answer) {
                    a.style.maxHeight = null;
                    a.classList.remove('active');
                }
            });
            
            allQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                }
            });
            
            question.classList.toggle('active');
            answer.classList.toggle('active');
            
            if (answer.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
});