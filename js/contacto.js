// Opciones de motivo
const motivos = [
    "Consultas",
    "Reclamos",
    "Sugerencias",
    "Devoluciones",
    "Otros"
];

document.addEventListener("DOMContentLoaded", function() {
    // Cargar motivos en el select
    const select = document.getElementById("motivo");
    motivos.forEach(motivo => {
        const option = document.createElement("option");
        option.value = motivo;
        option.textContent = motivo;
        select.appendChild(option);
    });

    // Validar y mostrar modal de éxito al enviar el formulario
    const form = document.getElementById("form-contacto");
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Expresión regular: solo letras (mayúsculas/minúsculas), tildes y espacios
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

        const nombre = form.nombre.value.trim();
        const apellidoPaterno = form.apellido_paterno.value.trim();
        const apellidoMaterno = form.apellido_materno.value.trim();

        if (!soloLetras.test(nombre)) {
            alert("El nombre solo puede contener letras y espacios.");
            form.nombre.focus();
            return;
        }
        if (!soloLetras.test(apellidoPaterno)) {
            alert("El apellido paterno solo puede contener letras y espacios.");
            form.apellido_paterno.focus();
            return;
        }
        if (!soloLetras.test(apellidoMaterno)) {
            alert("El apellido materno solo puede contener letras y espacios.");
            form.apellido_materno.focus();
            return;
        }

        if (form.checkValidity()) {
            form.reset();
            const modal = new bootstrap.Modal(document.getElementById('modalExito'));
            modal.show();
        } else {
            form.reportValidity();
        }
    });
});