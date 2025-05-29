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

// Obtiene la categoría desde la URL
function getCategoriaFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('categoria');
}

// Filtra los productos por categoría y renderiza
document.addEventListener('DOMContentLoaded', function() {
    renderProductos(productos);

    // Si hay categoría en la URL, aplica el filtro automáticamente
    const categoria = getCategoriaFromUrl();
    if (categoria) {
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            if (btn.getAttribute('data-categoria') === categoria) {
                btn.click();
            }
        });
    }
});

// Filtra los productos por categoría al cargar la página
document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const categoria = this.getAttribute('data-categoria');
        document.querySelectorAll('.col.mb-5').forEach(card => {
            if (categoria === 'todos' || card.getAttribute('data-categoria') === categoria) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Lista de productos
const productos = [
    {
        id: "dobble",
        nombre: "Dobble",
        descripcion: "¡Un clásico de rapidez y observación para todas las edades!",
        precio: 24990,
        oferta: 20990,
        imagen: "img/familiares1.jpg",
        categoria: "familiares",
        sku: "FAM-001",
        puntuacion: 4,
        stock: 8,
        destacado: false
    },
    {
        id: "ranking-top",
        nombre: "Ranking Top",
        descripcion: "¡No dejes que te superen y alcanza el podio con los hits de 31 Minutos!",
        precio: 28000,
        oferta: null,
        imagen: "img/familiares2.jpg",
        categoria: "familiares",
        sku: "FAM-002",
        puntuacion: 5,
        stock: 15,
        destacado: true
    },
    {
        id: "unstable-unicorns",
        nombre: "Unstable Unicorns",
        descripcion: "Un juego de cartas estratégico sobre las dos cosas favoritas de todos: ¡Unicornios y Destrucción!",
        precio: 21990,
        oferta: 20990,
        imagen: "img/familiares3.jpg",
        categoria: "familiares",
        sku: "FAM-003",
        puntuacion: 5,
        stock: 4,
        destacado: true
    },
    {
        id: "dobble-31-minutos",
        nombre: "Dobble 31 Minutos",
        descripcion: "¡Una versión especial de Dobble con los personajes de 31 Minutos!",
        precio: 24990,
        oferta: null,
        imagen: "img/familiares4.jpg",
        categoria: "familiares",
        sku: "FAM-004",
        puntuacion: 4,
        stock: 6,
        destacado: false
    },
    {
        id: "31-minutos-feria-de-las-pulgas",
        nombre: "31 Minutos - La Feria de las Pulgas de Titirilquén",
        descripcion: "¡Descubre esta frenética reimplementación del clásico Pit, un juego sin turnos y con muchos gritos!",
        precio: 19990,
        oferta: 17990,
        imagen: "img/familiares5.jpg",
        categoria: "familiares",
        sku: "FAM-005",
        puntuacion: 5,
        stock: 5,
        destacado: false
    },
    {
        id: "unstable-unicorns-expansion-apocalipsis-irisado",
        nombre: "Unstable Unicorns - Expansion Apocalipsis Irisado",
        descripcion: "¡Una expansión para Unstable Unicorns que añade nuevos unicornios y caos al juego!",
        precio: 24990,
        oferta: null,
        imagen: "img/familiares6.jpg",
        categoria: "familiares",
        sku: "FAM-006",
        puntuacion: 4,
        stock: 7,
        destacado: false
    },
    {
        id: "unstable-unicorns-expansion-nightmares",
        nombre: "Unstable Unicorns - Expansion Nightmares",
        descripcion: "¡Añade un toque de pesadilla a tus partidas de Unstable Unicorns con esta expansión!",
        precio: 24990,
        oferta: 22990,
        imagen: "img/familiares7.jpg",
        categoria: "familiares",
        sku: "FAM-007",
        puntuacion: 4,
        stock: 10,
        destacado: false
    },
    {
        id: "terraforming-mars",
        nombre: "Terraforming Mars",
        descripcion: "Conviértete en una corporación y transforma Marte para la humanidad.",
        precio: 55000,
        oferta: 47990,
        imagen: "img/estrategia1.jpg",
        categoria: "estrategia",
        sku: "EST-001",
        puntuacion: 5,
        stock: 10,
        destacado: false
    },
    {
        id: "codex-naturalis",
        nombre: "Codex Naturalis",
        descripcion: "Coloca tus cartas para obtener recursos y cumplir los objetivos que te permitirán crear el manuscrito más completo.",
        precio: 19990,
        oferta: null,
        imagen: "img/estrategia2.jpg",
        categoria: "estrategia",
        sku: "EST-002",
        puntuacion: 3,
        stock: 12,
        destacado: false
    },
    {
        id: "7-wonders",
        nombre: "7 Wonders",
        descripcion: "Construye una civilización y maravillas en este clásico de cartas y estrategia.",
        precio: 47990,
        oferta: 38990,
        imagen: "img/estrategia3.jpg",
        categoria: "estrategia",
        sku: "EST-003",
        puntuacion: 5,
        stock: 3,
        destacado: false
    },
    {
        id: "catan",
        nombre: "Catan",
        descripcion: "¡Construye, comercia y conquista en la isla de Catan!",
        precio: 39990,
        oferta: 34990,
        imagen: "img/estrategia4.jpg",
        categoria: "estrategia",
        sku: "EST-004",
        puntuacion: 5,
        stock: 5,
        destacado: true
    },
    {
        id: "catan-expansion-navegantes",
        nombre: "Catan - Expansión Navegantes",
        descripcion: "Expande tu experiencia de Catan con la expansión Navegantes, que añade nuevas islas y aventuras.",
        precio: 29990,
        oferta: null,
        imagen: "img/estrategia5.jpg",
        categoria: "estrategia",
        sku: "EST-005",
        puntuacion: 4,
        stock: 8,
        destacado: false
    },
    {
        id: "catan-expansion-ciudades-y-caballeros",
        nombre: "Catan - Expansión Ciudades y Caballeros",
        descripcion: "Añade profundidad estratégica a Catan con la expansión Ciudades y Caballeros.",
        precio: 34990,
        oferta: 29990,
        imagen: "img/estrategia6.jpg",
        categoria: "estrategia",
        sku: "EST-006",
        puntuacion: 5,
        stock: 6,
        destacado: false
    },
    {
        id: "catan-expansion-mercaderes-y-bárbaros",
        nombre: "Catan - Expansión Mercaderes y Bárbaros",
        descripcion: "Explora nuevas rutas comerciales y enfrenta desafíos con la expansión Mercaderes y Bárbaros.",
        precio: 27990,
        oferta: null,
        imagen: "img/estrategia7.jpg",
        categoria: "estrategia",
        sku: "EST-007",
        puntuacion: 4,
        stock: 9,
        destacado: false
    },
    {
        id: "dixit-nueva",
        nombre: "Dixit - Nueva Edición",
        descripcion: "¡Dixit es un creativo juego de deducción, bellamente ilustrado, donde tu imaginación crea increíbles historias!",
        precio: 31990,
        oferta: 29990,
        imagen: "img/party1.jpg",
        categoria: "party",
        sku: "PAR-001",
        puntuacion: 5,
        stock: 7,
        destacado: false
    },
    {
        id: "exploding-kittens",
        nombre: "Exploding Kittens",
        descripcion: "Exploding Kittens es una versión gatuna de la ruleta rusa con un gran componente estratégico.",
        precio: 20990,
        oferta: null,
        imagen: "img/party2.jpg",
        categoria: "party",
        sku: "PAR-002",
        puntuacion: 5,
        stock: 16,
        destacado: false
    },
    {
        id: "happy-little-dinosaurs",
        nombre: "Happy Little Dinosaurs",
        descripcion: "Como buen dinosaurio que eres, parece que últimamente te pasas el tiempo evitando meteoritos.",
        precio: 21990,
        oferta: 19990,
        imagen: "img/party3.jpg",
        categoria: "party",
        sku: "PAR-003",
        puntuacion: 5,
        stock: 9,
        destacado: true
    },
    {
        id: "exploding-kittens-expansion-imploding-kittens",
        nombre: "Exploding Kittens - Expansión Imploding Kittens",
        descripcion: "¡Añade más caos a tus partidas de Exploding Kittens con esta expansión!",
        precio: 14990,
        oferta: null,
        imagen: "img/party4.jpg",
        categoria: "party",
        sku: "PAR-004",
        puntuacion: 4,
        stock: 12,
        destacado: false
    },
    {
        id: "llamagedon",
        nombre: "Llamagedón",
        descripcion: "¡Un juego de cartas lleno de humor y caos donde las llamas son las protagonistas!",
        precio: 17990,
        oferta: 15990,
        imagen: "img/party5.jpg",
        categoria: "party",
        sku: "PAR-005",
        puntuacion: 4,
        stock: 5,
        destacado: false
    },
    {
        id: "hitster-temazos",
        nombre: "Hitster - Temazos",
        descripcion: "Esta nueva versión de Hitster te hará revivir los grandes éxitos de la música a través de un juego de mesa lleno de diversión.",
        precio: 24990,
        oferta: null,
        imagen: "img/party6.jpg",
        categoria: "party",
        sku: "PAR-006",
        puntuacion: 5,
        stock: 11,
        destacado: false
    },
    {
        id: "hitster",
        nombre: "Hitster",
        descripcion: "¡Un juego de mesa musical donde debes adivinar las canciones más icónicas de todos los tiempos!",
        precio: 24990,
        oferta: 22990,
        imagen: "img/party7.jpg",
        categoria: "party",
        sku: "PAR-007",
        puntuacion: 5,
        stock: 4,
        destacado: false
    },
    {
        id: "cortex-kids-2",
        nombre: "Cortex Kids 2",
        descripcion: "Con este juego de mesa desarrolla tu agilidad visual, tu coordinación, tu memoria, capacidad de razonamiento … ¡incluso la sensibilidad de tu tacto!",
        precio: 15990,
        oferta: 13990,
        imagen: "img/infantil1.jpg",
        categoria: "infantiles",
        sku: "INF-001",
        puntuacion: 5,
        stock: 2,
        destacado: false
    },
    {
        id: "catan-junior",
        nombre: "Catan Junior",
        descripcion: "¡Tierra a la vista! ¡Navega por los mares con tus barcos, descubre nuevas islas y construye unas cuantas guaridas de piratas!",
        precio: 29990,
        oferta: null,
        imagen: "img/infantil2.jpg",
        categoria: "infantiles",
        sku: "INF-002",
        puntuacion: 5,
        stock: 4,
        destacado: true
    },
    {
        id: "brainbox-imagenes",
        nombre: "Brainbox Imágenes",
        descripcion: "Intenta memorizar las imágenes de tu carta en 10 segundos. A continuación, tendrás que responder a una pregunta sobre la carta que has visto.",
        precio: 16990,
        oferta: 14990,
        imagen: "img/infantil3.jpg",
        categoria: "infantiles",
        sku: "INF-003",
        puntuacion: 5,
        stock: 6,
        destacado: false
    },
    {
        id: "Pelusas",
        nombre: "Pelusas",
        descripcion: "A las pelusas les encanta ir acumulándose, pero cualquier corriente de aire puede hacer que desaparezcan en un momento... Prueba tu suerte sacando pelusas del montón de polvo y robando pelusas al resto para acumular la mayor cantidad al final del juego.",
        precio: 17990,
        oferta: null,
        imagen: "img/infantil4.jpg",
        categoria: "infantiles",
        sku: "INF-004",
        puntuacion: 4,
        stock: 8,
        destacado: false
    },
    {
        id: "intimo",
        nombre: "Íntimo",
        descripcion: "Un juego de preguntas y retos diseñado para fortalecer la conexión emocional en pareja.",
        precio: 18990,
        oferta: 15990,
        imagen: "img/pareja1.jpg",
        categoria: "pareja",
        sku: "PARJ-001",
        puntuacion: 5,
        stock: 0,
        destacado: false
    },
    {
        id: "codigo-secreto-duo",
        nombre: "Código Secreto Duo",
        descripcion: "Tu y tu compañero estas llevando a cabo una misión en una ciudad atestada de personas. Tendrán que contactar con los 15 agentes y evitar a la vez a una banda de asesinos.",
        precio: 21990,
        oferta: null,
        imagen: "img/pareja2.jpg",
        categoria: "pareja",
        sku: "PARJ-002",
        puntuacion: 5,
        stock: 10,
        destacado: false
    },
    {
        id: "the-mind-soulmates",
        nombre: "The Mind: Soulmates",
        descripcion: "¿Te atreves a poner a prueba tu conexión mental con tus amigos y convertirte en un verdadero Soulmate?",
        precio: 23990,
        oferta: 21990,
        imagen: "img/pareja3.jpg",
        categoria: "pareja",
        sku: "PARJ-003",
        puntuacion: 5,
        stock: 3,
        destacado: false
    }
];