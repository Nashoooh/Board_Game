// Renderiza el carrusel de productos destacados
function renderDestacadosCarousel(productos) {
    const destacados = productos.filter(p => p.destacado);
    const itemsPorSlide = 3;
    const slides = [];

    if (destacados.length === 0) return;

    for (let i = 0; i < destacados.length; i++) {
        let grupo = [];
        for (let j = 0; j < itemsPorSlide; j++) {
            // Avanza circularmente
            grupo.push(destacados[(i + j) % destacados.length]);
        }
        slides.push(`
            <div class="carousel-item${i === 0 ? ' active' : ''}">
                <div class="row justify-content-center">
                    ${grupo.map(producto => `
                        <div class="col-md-4 mb-3">
                            <div class="card h-100 mx-auto" style="max-width: 22rem;">
                                <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Nuevo</div>
                                <img class="card-img-top" src="${producto.imagen}" alt="${producto.nombre}" />
                                <div class="card-body text-center">
                                    <h5 class="fw-bolder">${producto.nombre}</h5>
                                    <p>${producto.descripcion}</p>
                                    <a href="detalle_item.html?id=${producto.id}" class="btn btn-outline-dark">Ver Detalles</a>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `);
    }

    document.querySelector('#destacadosCarousel .carousel-inner').innerHTML = slides.join('');
}

document.addEventListener('DOMContentLoaded', function() {
    renderDestacadosCarousel(productos);
});