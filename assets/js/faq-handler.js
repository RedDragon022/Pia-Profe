/**
 * faq-handler.js
 * Maneja la interactividad de las secciones FAQ (acordeón)
 */

(function() {
    'use strict';

    function initFAQ() {
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                const answer = button.nextElementSibling;
                
                // Toggle del elemento actual
                faqItem.classList.toggle('active');
                if (answer) {
                    answer.classList.toggle('active');
                }
                
                // Cerrar otros elementos FAQ
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                        const itemAnswer = item.querySelector('.faq-answer');
                        if (itemAnswer) {
                            itemAnswer.classList.remove('active');
                        }
                    }
                });
            });
        });
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFAQ);
    } else {
        initFAQ();
    }
})();
