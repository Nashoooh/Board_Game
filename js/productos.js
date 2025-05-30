const PRODUCTOS_POR_PAGINA = 8;
let paginaActual = 1;

// Funciones
// Renderiza las estrellas de puntuación
function renderStars(puntuacion) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += `<div class="bi-star-fill${i < puntuacion ? '' : ' text-secondary'}"></div>`;
    }
    return `<div class="d-flex justify-content-center small text-warning mb-2">${stars}</div>`;
}

// Renderiza los productos en la página para listar todos los productos
function renderProductos(productos) {
    const contenedor = document.getElementById('productos-lista');
    contenedor.innerHTML = productos.map(producto => `
        <div class="producto col mb-5" data-categoria="${producto.categoria}">
            <div class="card h-100">
                ${producto.oferta ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Oferta</div>` : ''}
                ${producto.stock === 0 ? `<div class="badge bg-danger text-white position-absolute" style="top: 0.5rem; left: 0.5rem">Agotado</div>` : ''}
                <img class="card-img-top" src="${producto.imagen}" alt="${producto.nombre}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        ${renderStars(producto.puntuacion || 0)}
                        <div class="mb-2">
                            <span class="badge bg-secondary">${producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}</span>
                        </div>
                        ${producto.oferta
                            ? `<span class="text-muted text-decoration-line-through">$${producto.precio.toLocaleString()}</span> $${producto.oferta.toLocaleString()}`
                            : `$${(producto.precio || producto.oferta).toLocaleString()}`
                        }
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center mb-2">
                        <a class="btn btn-outline-dark mt-auto" href="detalle_item.html?id=${producto.id}">Ver más</a>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-outline-dark mt-auto" ${producto.stock === 0 ? 'disabled' : ''}>
                            ${producto.stock === 0 ? 'Agotado' : 'Agregar al carro'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderiza los productos de la página actual
function renderProductosPaginados(productos, pagina = 1) {
    const inicio = (pagina - 1) * PRODUCTOS_POR_PAGINA;
    const fin = inicio + PRODUCTOS_POR_PAGINA;
    renderProductos(productos.slice(inicio, fin));
    renderPaginacion(productos.length, pagina);
}

// Renderiza los botones de paginación
function renderPaginacion(total, pagina) {
    const totalPaginas = Math.ceil(total / PRODUCTOS_POR_PAGINA);
    const paginacion = document.getElementById('paginacion');
    if (!paginacion) return;

    let html = '';
    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button class="btn btn-outline-dark btn-sm mx-1${i === pagina ? ' active' : ''}" data-pagina="${i}">${i}</button>`;
    }
    paginacion.innerHTML = html;

    // Eventos de los botones
    paginacion.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function() {
            paginaActual = parseInt(this.getAttribute('data-pagina'));
            renderProductosPaginados(productos, paginaActual);
        });
    });
}

// Obtiene la categoría desde la URL
function getCategoriaFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('categoria');
}

// Filtra los productos por categoría y renderiza paginado
document.addEventListener('DOMContentLoaded', function() {
    let productosFiltrados = productos;
    renderProductosPaginados(productosFiltrados, 1);

    // Si hay categoría en la URL, aplica el filtro automáticamente
    const categoria = getCategoriaFromUrl();
    if (categoria) {
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            if (btn.getAttribute('data-categoria') === categoria) {
                btn.click();
            }
        });
    }

    // Botones de filtro de categoría
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');
            if (categoria === 'todos') {
                productosFiltrados = productos;
            } else {
                productosFiltrados = productos.filter(p => p.categoria === categoria);
            }
            paginaActual = 1;
            renderProductosPaginados(productosFiltrados, paginaActual);
        });
    });
});
