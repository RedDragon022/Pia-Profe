class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.validators = {
            nombre: {
                required: true,
                minLength: 3,
                pattern: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
                messages: {
                    required: 'Por favor, ingrese su nombre',
                    minLength: 'El nombre debe tener al menos 3 caracteres',
                    pattern: 'El nombre solo debe contener letras'
                }
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                messages: {
                    required: 'Por favor, ingrese su correo electrónico',
                    pattern: 'Por favor, ingrese un correo electrónico válido'
                }
            },
            telefono: {
                required: true,
                pattern: /^[\d\s\-\+()]+$/,
                minLength: 10,
                messages: {
                    required: 'Por favor, ingrese su teléfono',
                    pattern: 'Por favor, ingrese un número de teléfono válido',
                    minLength: 'El teléfono debe tener al menos 10 dígitos'
                }
            },
            mensaje: {
                required: true,
                minLength: 10,
                maxLength: 500,
                messages: {
                    required: 'Por favor, ingrese su mensaje',
                    minLength: 'El mensaje debe tener al menos 10 caracteres',
                    maxLength: 'El mensaje no debe exceder los 500 caracteres'
                }
            }
        };

        this.setupValidation();
        this.setupSubmitHandler();
    }

    setupValidation() {
        // Crear contenedores de feedback para cada campo
        Object.keys(this.validators).forEach(fieldName => {
            const input = this.form.querySelector(`[name="${fieldName}"]`);
            if (!input) return;

            // Crear contenedor de feedback
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'form-feedback';
            input.parentNode.appendChild(feedbackDiv);

            // Agregar clases de estado
            input.classList.add('form-field');

            // Validación en tiempo real
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const validator = this.validators[fieldName];
        const feedbackDiv = input.parentNode.querySelector('.form-feedback');
        
        // Limpiar estados previos
        input.classList.remove('is-valid', 'is-invalid');
        feedbackDiv.textContent = '';
        
        if (!validator) return true;

        // Validar requerido
        if (validator.required && !value) {
            this.showError(input, feedbackDiv, validator.messages.required);
            return false;
        }

        // Validar longitud mínima
        if (validator.minLength && value.length < validator.minLength) {
            this.showError(input, feedbackDiv, validator.messages.minLength);
            return false;
        }

        // Validar longitud máxima
        if (validator.maxLength && value.length > validator.maxLength) {
            this.showError(input, feedbackDiv, validator.messages.maxLength);
            return false;
        }

        // Validar patrón
        if (validator.pattern && !validator.pattern.test(value)) {
            this.showError(input, feedbackDiv, validator.messages.pattern);
            return false;
        }

        // Campo válido
        input.classList.add('is-valid');
        return true;
    }

    showError(input, feedbackDiv, message) {
        input.classList.add('is-invalid');
        feedbackDiv.textContent = message;
        feedbackDiv.className = 'form-feedback error-feedback';
    }

    validateForm() {
        let isValid = true;
        Object.keys(this.validators).forEach(fieldName => {
            const input = this.form.querySelector(`[name="${fieldName}"]`);
            if (input && !this.validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    setupSubmitHandler() {
        this.form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            if (!this.validateForm()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de validación',
                    text: 'Por favor, corrija los errores en el formulario',
                    confirmButtonColor: '#d33'
                });
                return;
            }

            const formData = new FormData(this.form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value.trim();
            }

            try {
                const response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Error en el servidor');
                }

                Swal.fire({
                    icon: 'success',
                    title: '¡Enviado con éxito!',
                    text: 'Gracias por su interés. Un especialista se pondrá en contacto con usted en las próximas 24 horas.',
                    confirmButtonColor: '#28a745'
                }).then(() => {
                    this.form.reset();
                    document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
                    window.location.href = 'index.html';
                });

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No fue posible enviar el formulario. Por favor, intente nuevamente.',
                    confirmButtonColor: '#d33'
                });
            }
        });
    }
}

// Estilos para la validación
const styles = `
.form-field {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-field.is-valid {
    border-color: var(--color-exito);
    background-color: rgba(52, 168, 83, 0.05);
}

.form-field.is-invalid {
    border-color: var(--color-error);
    background-color: rgba(234, 67, 53, 0.05);
}

.form-feedback {
    font-size: 0.875rem;
    margin-top: 0.25rem;
    min-height: 20px;
}

.error-feedback {
    color: var(--color-error);
}

.form-group {
    margin-bottom: 1.5rem;
    position: relative;
}

.form-field:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-field.is-valid:focus {
    box-shadow: 0 0 0 2px rgba(52, 168, 83, 0.25);
}

.form-field.is-invalid:focus {
    box-shadow: 0 0 0 2px rgba(234, 67, 53, 0.25);
}
`;

// Agregar estilos al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Inicializar validación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[id$="-form"]');
    forms.forEach(form => {
        new FormValidator(form.id);
    });
});