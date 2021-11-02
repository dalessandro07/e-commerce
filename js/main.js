// * INICIAR PROGRAMA

// * MOSTRAR USUARIO Y FECHA

let nombreUsuario = localStorage.getItem("username");

let contenedor = document.createElement("div");

if (nombreUsuario) {
    contenedor.setAttribute("class", "contenedor-bienvenida d-flex w-100 justify-content-between");
    let bienvenidaUsuario = document.createElement("h2");
    let horaDeEntrada = document.createElement("h2");

    bienvenidaUsuario.innerHTML = `¡Bienvenido ${nombreUsuario}!`;
    bienvenidaUsuario.setAttribute("class", "titulo__fecha");

    horaDeEntrada.innerText = "Fecha: " + new Date().toLocaleDateString();
    horaDeEntrada.setAttribute("class", "titulo__fecha");

    contenedor.appendChild(bienvenidaUsuario);
    contenedor.appendChild(horaDeEntrada);

} else {
    let noIngreso = document.createElement("a");
    noIngreso.setAttribute("class", "titulo-productos-vacio");
    noIngreso.setAttribute("href", "registro.html");
    noIngreso.innerText = "¡Inicie sesión o regístrese!";
    contenedor.setAttribute("class", "contenedor-bienvenida d-flex w-100 justify-content-center");
    contenedor.appendChild(noIngreso);
}

seccionBienvenida.appendChild(contenedor);

//* CREAR LOS PRODUCTOS

//! PRODUCTOS

const productos = [
    { id: "t-preparada", tipo: "sustrato", nombre: "Tierra Preparada", imagen: "../assets/img/tierras.jpeg", precio: 2, stock: 2584, vendidos: 3829 },
    { id: "m-plastico", tipo: "maceta", nombre: "Macetas de Plástico", imagen: "../assets/img/macetas.jpeg", precio: 9, stock: 5859, vendidos: 2764 },
    { id: "m-fibraCoco", tipo: "maceta", nombre: "Macetas de Fibra de Coco", imagen: "../assets/img/fibra-coco.jpg", precio: 12, stock: 355, vendidos: 188 },
    { id: "m-ceramica", tipo: "maceta", nombre: "Macetas de Cerámica", imagen: "../assets/img/ceramica.jpg", precio: 10, stock: 5321, vendidos: 4779 },
    { id: "p-hortalizas", tipo: "planta", nombre: "Plantas Hortalizas", imagen: "../assets/img/hortalizas.jpg", precio: 3, stock: 4543, vendidos: 2756 },
    { id: "p-ornamentales", tipo: "planta", nombre: "Plantas Ornamentales", imagen: "../assets/img/ornamentales.jpg", precio: 25, stock: 4257, vendidos: 2138 },
    { id: "p-orquideas", tipo: "planta", nombre: "Plantas Orquídeas", imagen: "../assets/img/orquideas.jpg", precio: 40, stock: 419, vendidos: 129 },
    { id: "p-sucuCactus", tipo: "planta", nombre: "Suculentas y Cactus", imagen: "../assets/img/macetas-suculentas.jpg", precio: 8, stock: 3419, vendidos: 1289 },
    { id: "t-musgo", tipo: "sustrato", nombre: "Sustrato - Musgo", imagen: "../assets/img/musgo.jpg", precio: 6, stock: 547, vendidos: 123 },
    { id: "t-vermiculita", tipo: "sustrato", nombre: "Sustrato - Vermiculita", imagen: "../assets/img/vermiculita.jpg", precio: 9, stock: 257, vendidos: 33 },
    { id: "t-perlita", tipo: "sustrato", nombre: "Sustrato - Perlita", imagen: "../assets/img/perlita.jpg", precio: 15, stock: 390, vendidos: 110 },
    { id: "m-cemento", tipo: "maceta", nombre: "Macetas de Cemento", imagen: "../assets/img/m-cemento.jpg", precio: 4, stock: 3500, vendidos: 1540 }
];

for (const producto of productos) {
    let cardProducto = document.createElement("div");
    cardProducto.setAttribute("class", `producto col-12 col-md-6 col-lg-3 ${producto.tipo}`);
    cardProducto.setAttribute("id", `${producto.id}`);

    cardProducto.innerHTML = `
    <div class="card text-center">
        <img src="${producto.imagen}" class="producto__imagen card-img-top" alt="${producto.tipo}" />
        <div class="card-body producto__inferior">
            <div class="titulo">
                <h5 class="producto__titulo card-title">${producto.nombre}</h5>
            </div>
            <div class="precio__container">
                <b class="precio">S/${producto.precio}.00 la unidad</b>
                <button class="producto__enlace boton-agregar-al-carro" id="agregar-${producto.id}">
                <i class="producto__icon fas fa-cart-plus">
                <b class="texto__carrito">Añadir al carrito</b>
                </i>
                </button>
            </div>
            <div>
                <b class="stock">${producto.stock} disponibles</b><br>
                <b class="vendidos">${producto.vendidos} vendidos</b>
            </div>
        </div>
    </div>`

    listaCards.push(cardProducto);

    for (const card of listaCards) {
        contenedorProductos[0].appendChild(card);
    }
}

// * FUNCION DARK MODE

botonDarkMode.addEventListener("click", activarDark);

function activarDark() {
    botonDarkMode.classList.toggle("fa-sun");

    seccionPrincipal[0].classList.toggle("seccion-oscuro");
    navPrincipal[0].classList.toggle("nav-oscuro");
    logo[0].classList.toggle("logo-oscuro");
    tituloPrincipal[0].classList.toggle("texto-oscuro");

    for (const icono of iconos) {
        icono.classList.toggle("texto-oscuro");
    }
    for (const card of cards) {
        card.classList.toggle("card-oscuro");
    }
    for (const subtitulo of subtitulos) {
        subtitulo.classList.toggle("texto-oscuro");
    }
    for (const texto of textos) {
        texto.classList.toggle("texto-oscuro");
    }
    for (const tituloS of tituloSecundario) {
        tituloS.classList.toggle("texto-oscuro");
    }
}

//* FILTROS (MAS VENDIDOS, MAYOR STOCK, MAYOR PRECIO Y MENOR PRECIO)

//? AGREGO LOS EVENTOS

masVendidos.addEventListener("click", ordenarMasVendidos);
mayorStock.addEventListener("click", ordenarMayorStock);
mayorPrecio.addEventListener("click", ordenarMayorPrecio);
menorPrecio.addEventListener("click", ordenarMenorPrecio);

//? FUNCIONES PARA ORDENAR POR PROPIEDADES

function ordenarMasVendidos() {

    let productosOrdenados = (productos.sort((a, b) => {
        return b.vendidos - a.vendidos;
    }));

    for (const producto of productosOrdenados) {
        let cardProductoOrdenado = document.getElementById(`${producto.id}`);

        listaCards.splice(0, listaCards.length);
        listaCards.push(cardProductoOrdenado);

        for (const card of listaCards) {
            contenedorProductos[0].appendChild(card);
        }
    }
}

function ordenarMayorStock() {
    let productosOrdenados = (productos.sort((a, b) => {
        return b.stock - a.stock;
    }));

    for (const producto of productosOrdenados) {
        let cardProductoOrdenado = document.getElementById(`${producto.id}`);

        listaCards.splice(0, listaCards.length);
        listaCards.push(cardProductoOrdenado);

        for (const card of listaCards) {
            contenedorProductos[0].appendChild(card);
        }
    }
}

function ordenarMayorPrecio() {
    let productosOrdenados = (productos.sort((a, b) => {
        return b.precio - a.precio;
    }));

    for (const producto of productosOrdenados) {
        let cardProductoOrdenado = document.getElementById(`${producto.id}`);

        listaCards.splice(0, listaCards.length);
        listaCards.push(cardProductoOrdenado);

        for (const card of listaCards) {
            contenedorProductos[0].appendChild(card);
        }
    }
}

function ordenarMenorPrecio() {
    let productosOrdenados = (productos.sort((a, b) => {
        return a.precio - b.precio;
    }));

    for (const producto of productosOrdenados) {
        let cardProductoOrdenado = document.getElementById(`${producto.id}`);

        listaCards.splice(0, listaCards.length);
        listaCards.push(cardProductoOrdenado);

        for (const card of listaCards) {
            contenedorProductos[0].appendChild(card);
        }
    }
}

//* AGREGUÉ FUNCIONALIDAD EN FILTROS POR SECCIONES (PLANTAS, MACETAS Y TIERRAS)

//? AGREGO LOS EVENTOS

botonTodos.addEventListener("click", mostrarTodos);
botonPlantas.addEventListener("click", mostrarPlantas);
botonMacetas.addEventListener("click", mostrarMacetas);
botonTierras.addEventListener("click", mostrarTierras);

function mostrarTodos() {
    for (const maceta of macetas) {
        maceta.classList.remove("d-none");
    }
    for (const sustrato of sustratos) {
        sustrato.classList.remove("d-none");
    }
    for (const planta of plantas) {
        planta.classList.remove("d-none");
    }
    totalProductos[0].innerText = `${productoHTML.length} productos`;
}

function mostrarPlantas() {
    for (const maceta of macetas) {
        maceta.classList.add("d-none");
    }
    for (const sustrato of sustratos) {
        sustrato.classList.add("d-none");
    }
    for (const planta of plantas) {
        planta.classList.remove("d-none");
    }
    totalProductos[0].innerText = `${plantas.length} productos`;
}

function mostrarMacetas() {
    for (const maceta of macetas) {
        maceta.classList.remove("d-none");
    }
    for (const sustrato of sustratos) {
        sustrato.classList.add("d-none");
    }
    for (const planta of plantas) {
        planta.classList.add("d-none");
    }
    totalProductos[0].innerText = `${macetas.length} productos`;
}

function mostrarTierras() {
    for (const maceta of macetas) {
        maceta.classList.add("d-none");
    }
    for (const sustrato of sustratos) {
        sustrato.classList.remove("d-none");
    }
    for (const planta of plantas) {
        planta.classList.add("d-none");
    }
    totalProductos[0].innerText = `${sustratos.length} productos`;
}

//* FILTROS TOTAL DE PRODUCTOS

totalProductos[0].innerText = `${productoHTML.length} productos`;