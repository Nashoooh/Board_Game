// js/registro.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-registro');
    const mensaje = document.getElementById('mensaje-registro');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const datos = Object.fromEntries(new FormData(form));
        if (datos.clave !== datos.clave2) {
            mensaje.textContent = "Las contraseñas no coinciden.";
            mensaje.style.color = "red";
            return;
        }
        // Guardar usuario en localStorage (simulación)
        localStorage.setItem('usuario_' + datos.usuario, JSON.stringify(datos));
        mensaje.textContent = "¡Registro exitoso!";
        mensaje.style.color = "green";
        form.reset();
    });
});