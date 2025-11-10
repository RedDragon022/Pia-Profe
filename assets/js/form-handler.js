/**
 * form-handler.js
 * Maneja el envío de formularios de contacto en las páginas de servicios.
 * Centraliza la lógica de validación, ocultación y confirmación con SweetAlert2.
 */

(function() {
    'use strict';

    /**
     * Maneja el envío del formulario de contacto
     * @param {Event} event - Evento de submit del formulario
     * @param {string} serviceName - Nombre del servicio para personalizar el mensaje
     */
    function handleFormSubmit(event, serviceName) {
        event.preventDefault();

        const formContainer = document.getElementById('formulario-contacto');
        const successMessage = document.getElementById('mensaje-exito');
        const form = formContainer ? formContainer.querySelector('form') : null;

        if (!form) {
            console.error('No se encontró el formulario de contacto');
            return false;
        }

        // Validar campos del formulario
        if (!form.reportValidity()) {
            return false;
        }

        // Ocultar formulario y mostrar mensaje de éxito
        if (formContainer) formContainer.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';

        // Mostrar alerta de confirmación con SweetAlert2
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: "success",
                title: "¡Solicitud enviada con éxito!",
                text: `Gracias por su interés en ${serviceName}. Un especialista se pondrá en contacto con usted en las próximas 24 horas.`,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#3085d6"
            }).then(() => {
                window.location.href = "index.html";
            });
        } else {
            // Fallback si SweetAlert2 no está cargado
            alert(`¡Solicitud enviada con éxito! Gracias por su interés en ${serviceName}.`);
            window.location.href = "index.html";
        }

        return false;
    }

    /**
     * Inicializa el manejador de formularios
     * Detecta automáticamente el nombre del servicio desde el campo readonly
     */
    function initFormHandler() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Obtener el nombre del servicio del campo readonly
        const serviceField = document.getElementById('servicio-interes');
        const serviceName = serviceField ? serviceField.value : 'nuestros servicios';

        // Asignar el manejador al formulario
        form.addEventListener('submit', function(event) {
            handleFormSubmit(event, serviceName);
        });

        // Remover atributo onsubmit inline si existe
        form.removeAttribute('onsubmit');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormHandler);
    } else {
        initFormHandler();
    }

    // Exponer función para uso inline si es necesario (legacy)
    window.mostrarConfirmacionInterna = function(event) {
        const serviceField = document.getElementById('servicio-interes');
        const serviceName = serviceField ? serviceField.value : 'nuestros servicios';
        return handleFormSubmit(event, serviceName);
    };
})();
