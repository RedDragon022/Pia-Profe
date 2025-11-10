/**
 * Script de inicialización simple - garantiza funcionalidad básica
 */

(function() {
    'use strict';

    // Asegurar que todos los elementos sean visibles inmediatamente
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✓ Página cargada correctamente');

        // Hacer visibles todos los elementos con clases de animación
        const elements = document.querySelectorAll('.pre-animation, .reveal, .fade-in-element');
        elements.forEach(function(el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });

        // Navegación suave para los enlaces internos
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    console.log('Navegando a:', targetId);
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    console.warn('Elemento no encontrado:', targetId);
                }
            });
        });

        // Cargar imágenes con data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(function(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });

        console.log('✓ Inicialización completada');
        console.log('  - Elementos visibles:', elements.length);
        console.log('  - Enlaces internos:', internalLinks.length);
        console.log('  - Imágenes cargadas:', lazyImages.length);
    });
})();
