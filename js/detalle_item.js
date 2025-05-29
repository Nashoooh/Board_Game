// Filtra los productos por categoría y renderiza
function renderRelacionados(productos, productoActual) {
    // Filtra los relacionados
    let relacionados = productos.filter(p => p.categoria === productoActual.categoria && p.id !== productoActual.id);

    // Mezcla el array de relacionados (Fisher-Yates shuffle)
    for (let i = relacionados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [relacionados[i], relacionados[j]] = [relacionados[j], relacionados[i]];
    }

    // Toma hasta 4 al azar
    relacionados = relacionados.slice(0, 4);

    const contenedor = document.getElementById('relacionados-lista');
    contenedor.innerHTML = relacionados.map(producto => `
        <div class="col mb-5">
            <div class="card h-100">
                ${producto.oferta ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Oferta</div>` : ''}
                <img class="card-img-top" src="${producto.imagen}" alt="${producto.nombre}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        <div class="d-flex justify-content-center small text-warning mb-2">
                            ${'<div class="bi-star-fill"></div>'.repeat(producto.puntuacion || 0)}
                        </div>
                        ${producto.oferta
                            ? `<span class="text-muted text-decoration-line-through">$${producto.precio.toLocaleString()}</span> $${producto.oferta.toLocaleString()}`
                            : `$${(producto.precio || producto.oferta).toLocaleString()}`
                        }
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto" href="detalle_item.html?id=${producto.id}">Ver más</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    const id = getParam("id");
    const producto = productos.find(p => p.id === id);

    if (producto) {
        document.querySelector(".card-img-top.mb-5").src = producto.imagen;
        document.querySelector(".display-5.fw-bolder").textContent = producto.nombre;
        document.querySelector(".small.mb-1").textContent = "SKU: " + producto.sku;
        document.querySelector(".lead").textContent = producto.descripcion;
        // Precios
        let precioHtml = "";
        if (producto.precio && producto.oferta) {
            precioHtml = `<span class="text-decoration-line-through">$${producto.precio.toLocaleString()}</span> <span>$${producto.oferta.toLocaleString()}</span>`;
        } else {
            precioHtml = `<span>$${(producto.oferta || producto.precio).toLocaleString()}</span>`;
        }
        document.querySelector(".fs-5.mb-5").innerHTML = precioHtml;

        renderRelacionados(productos, producto);

    } else {
        // Producto no encontrado
        document.querySelector(".display-5.fw-bolder").textContent = "Producto no encontrado";
    }
});