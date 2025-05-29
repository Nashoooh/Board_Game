document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-registro");
    const btnLimpiar = document.getElementById("btn-limpiar");
    const inputNacimiento = document.getElementById("nacimiento");

    // Bloquear fechas posteriores a hoy en el input de nacimiento
    const hoyStr = new Date().toISOString().split('T')[0];
    if (inputNacimiento) {
        inputNacimiento.setAttribute('max', hoyStr);
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Obtener valores
        const nombre = form.nombre.value.trim();
        const usuario = form.usuario.value.trim();
        const correo = form.correo.value.trim();
        const clave = form.clave.value;
        const clave2 = form.clave2.value;
        const nacimiento = form.nacimiento.value;

        // Validaciones
        if (!nombre || !usuario || !correo || !clave || !clave2 || !nacimiento) {
            alert("Todos los campos son obligatorios excepto la dirección.");
            return;
        }

        // Solo letras y espacios para nombre
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
        if (!soloLetras.test(nombre)) {
            alert("El nombre solo puede contener letras y espacios.");
            form.nombre.focus();
            return;
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            alert("Ingrese un correo electrónico válido.");
            form.correo.focus();
            return;
        }

        // Contraseñas iguales
        if (clave !== clave2) {
            alert("Las contraseñas no coinciden.");
            form.clave2.focus();
            return;
        }

        // Contraseña: 6-18 caracteres, al menos un número y una mayúscula
        const passRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if (!passRegex.test(clave)) {
            alert("La contraseña debe tener entre 6 y 18 caracteres, al menos una mayúscula y un número.");
            form.clave.focus();
            return;
        }

        // Edad mínima 13 años
        const fechaNac = new Date(nacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNac.getFullYear() - ((hoy.getMonth() < fechaNac.getMonth() || (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) ? 1 : 0);
        if (edad < 13) {
            alert("Debes tener al menos 13 años para registrarte.");
            form.nacimiento.focus();
            return;
        }

        // Si todo OK, mostrar modal de éxito
        form.reset();
        const modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show();
    });

    btnLimpiar.addEventListener("click", function() {
        form.reset();
    });
});