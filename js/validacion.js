document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const productSelect = document.getElementById('product');
    const plazoInput = document.getElementById('plazo');
    const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
    const totalBudgetElement = document.getElementById('total-budget');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submit-btn');

    // Precios para productos y extras
    const prices = {
        products: {
            product1: 500,
            product2: 1000,
            product3: 1500
        },
        extras: {
            seo: 200,
            hosting: 100,
            maintenance: 300
        },
        discountPerMonth: 50 // Descuento por cada mes adicional
    };

    // Función para validar los datos de contacto
    function validateContact() {
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,15}$/;
        const surnameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/;
        const phoneRegex = /^[0-9]{9}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!nameRegex.test(nameInput.value)) {
            alert("El nombre solo puede contener letras y un máximo de 15 caracteres.");
            return false;
        }
        if (!surnameRegex.test(surnameInput.value)) {
            alert("Los apellidos solo pueden contener letras y un máximo de 40 caracteres.");
            return false;
        }
        if (!phoneRegex.test(phoneInput.value)) {
            alert("El teléfono debe tener 9 dígitos.");
            return false;
        }
        if (!emailRegex.test(emailInput.value)) {
            alert("El correo electrónico no es válido.");
            return false;
        }
        return true;
    }

    // Función para calcular el presupuesto
    function calculateBudget() {
        let total = 0;

        // Añadir el precio del producto seleccionado
        const selectedProduct = productSelect.value;
        total += prices.products[selectedProduct];

        // Añadir descuento por plazo
        const plazo = parseInt(plazoInput.value, 10);
        if (plazo > 1) {
            total -= (plazo - 1) * prices.discountPerMonth; // Descuento por meses adicionales
        }

        // Añadir precios de extras seleccionados
        extrasCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += prices.extras[checkbox.value];
            }
        });

        // Actualizar el campo de presupuesto total
        totalBudgetElement.textContent = `$${total}`;
    }

    // Validación del formulario y cálculo del presupuesto en tiempo real
    productSelect.addEventListener('change', calculateBudget);
    plazoInput.addEventListener('input', calculateBudget);
    extrasCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateBudget);
    });

    // Validación y envío del formulario
    submitBtn.addEventListener('click', function(event) {
        if (!validateContact() || !termsCheckbox.checked) {
            event.preventDefault(); // Prevenir el envío si no se cumplen las validaciones
            alert("Por favor, completa todos los campos correctamente y acepta las condiciones.");
        } else {
            alert("Formulario enviado con éxito.");
        }
    });

    // Calcular el presupuesto al cargar la página
    calculateBudget();
});
