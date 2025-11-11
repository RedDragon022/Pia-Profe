/**
 * form-handler.js
 * Maneja el envío de formularios de contacto en las páginas de servicios.
 * Centraliza la lógica de validación, ocultación y confirmación con SweetAlert2.
 */

(function() {
    'use strict';

    // Permite configurar un backend externo cuando se despliega en hosting estático (GitHub Pages)
    // Definir window.INVOMEX_API_BASE = 'https://tu-backend.example.com' para usarlo.
    const API_BASE = (typeof window !== 'undefined' && window.INVOMEX_API_BASE) ? window.INVOMEX_API_BASE : '';

    /**
     * Envía el formulario al backend y gestiona la UI
     * @param {Event} event - Evento de submit del formulario
     * @param {string} serviceName - Nombre del servicio para personalizar el mensaje
     */
    async function handleFormSubmit(event, serviceName) {
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

        // Construir payload de acuerdo al backend
        const getVal = (selectors) => {
            for (const sel of selectors) {
                const el = form.querySelector(sel);
                if (el && typeof el.value === 'string') return el.value;
            }
            return '';
        };

        const data = {
            name: getVal(['[name="name"]', '[name="nombre"]', '#nombre']).trim(),
            email: getVal(['[name="email"]', '#email']).trim(),
            empresa: getVal(['[name="empresa"]', '#empresa']).trim(),
            telefono: getVal(['[name="telefono"]', '#telefono']).trim(),
            servicio: (getVal(['[name="servicio"]', '[name="servicio-interes"]', '#servicio-interes']).trim() || serviceName || '').trim(),
            message: getVal(['[name="message"]', '[name="mensaje"]', '#mensaje']).trim(),
        };

        try {
            const resp = await fetch(`${API_BASE}/api/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const body = await resp.json().catch(() => ({}));

            if (!resp.ok) {
                const msg = body?.errors?.join(', ') || body?.error || 'No fue posible enviar la solicitud.';
                if (typeof Swal !== 'undefined') {
                    await Swal.fire({ icon: 'error', title: 'Error', text: msg });
                } else {
                    alert(msg);
                }
                return false;
            }

            // Ocultar formulario y mostrar mensaje de éxito
            if (formContainer) formContainer.style.display = 'none';
            if (successMessage) successMessage.style.display = 'block';

            // Confirmación bonita
            if (typeof Swal !== 'undefined') {
                await Swal.fire({
                    icon: 'success',
                    title: '¡Solicitud enviada con éxito!',
                    text: `Gracias por su interés en ${data.servicio || serviceName || 'nuestros servicios'}. Un especialista se pondrá en contacto con usted en las próximas 24 horas.`,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6'
                });
            }

            // Redirigir al inicio
            window.location.href = 'index.html';
            return false;
        } catch (err) {
            console.error('Error al enviar el formulario:', err);
            if (typeof Swal !== 'undefined') {
                await Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'No se pudo conectar con el servidor.' });
            } else {
                alert('No se pudo conectar con el servidor.');
            }
            return false;
        }
    }

    /**
     * Inicializa el manejador de formularios
     * Detecta automáticamente el nombre del servicio desde el campo readonly o título
     */
    function initFormHandler() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Obtener el nombre del servicio del campo readonly o del h1
        const serviceField = document.getElementById('servicio-interes');
        const h1Title = document.querySelector('header h1')?.textContent?.trim();
        const serviceName = serviceField?.value || h1Title || 'nuestros servicios';

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
        const h1Title = document.querySelector('header h1')?.textContent?.trim();
        const serviceName = serviceField?.value || h1Title || 'nuestros servicios';
        return handleFormSubmit(event, serviceName);
    };
})();
