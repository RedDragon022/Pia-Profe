// Configuración de lazy loading con IntersectionObserver
class ImageOptimizer {
    constructor() {
        this.imageObserver = null;
        this.init();
    }

    init() {
        // Configurar IntersectionObserver
        this.imageObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '50px 0px', // Comenzar a cargar cuando la imagen esté a 50px de entrar en viewport
                threshold: 0.01
            }
        );

        // Observar todas las imágenes con data-src
        this.observeImages();
        
        // Agregar evento de redimensionamiento para imágenes responsivas
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    observeImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            // Agregar clase de placeholder
            img.classList.add('lazy-image');
            
            // Agregar blur-up thumbnail si existe
            if (img.dataset.thumbnail) {
                this.addBlurUpThumbnail(img);
            }

            // Observar la imagen
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Crear una nueva imagen para precargar
        const preloadImage = new Image();
        
        preloadImage.onload = () => {
            img.src = src;
            img.classList.add('lazy-loaded');
            img.classList.remove('lazy-image');
        };

        preloadImage.src = src;
    }

    addBlurUpThumbnail(img) {
        const thumbnail = img.dataset.thumbnail;
        if (!thumbnail) return;

        // Crear contenedor para efecto blur-up
        const container = document.createElement('div');
        container.className = 'image-container';
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);

        // Agregar thumbnail como background
        container.style.backgroundImage = `url(${thumbnail})`;
        container.classList.add('blur-up');
    }

    handleResize() {
        // Ajustar tamaños de imagen basados en el viewport
        document.querySelectorAll('img[data-src]').forEach(img => {
            if (img.classList.contains('lazy-loaded')) {
                this.optimizeImageSize(img);
            }
        });
    }

    optimizeImageSize(img) {
        const container = img.parentElement;
        const containerWidth = container.offsetWidth;
        
        // Seleccionar el tamaño de imagen apropiado
        let targetWidth = 400; // Tamaño base
        
        if (containerWidth > 800) {
            targetWidth = 1200;
        } else if (containerWidth > 400) {
            targetWidth = 800;
        }

        // Actualizar srcset si existe
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
        }
    }
}

// Estilos para las imágenes lazy loaded
const styles = `
    .lazy-image {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .lazy-loaded {
        opacity: 1;
    }

    .image-container {
        position: relative;
        overflow: hidden;
        background-size: cover;
        background-position: center;
    }

    .blur-up {
        filter: blur(5px);
        transition: filter 0.3s ease-in-out;
    }

    .blur-up.loaded {
        filter: blur(0);
    }

    @media (max-width: 768px) {
        .image-container {
            margin-left: -20px;
            margin-right: -20px;
            width: calc(100% + 40px);
        }
    }
`;

// Agregar estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Inicializar el optimizador de imágenes
document.addEventListener('DOMContentLoaded', () => {
    new ImageOptimizer();
});