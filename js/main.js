// * INICIAR PROGRAMA

// * MOSTRAR USUARIO Y FECHA

let nombreUsuario = localStorage.getItem("username");

let contenedor = document.createElement("div");

contenedor.setAttribute("class", "contenedor-bienvenida d-flex w-100 justify-content-between");

if ((nombreUsuario.length > 0) && (nombreUsuario.length <= 20)) {

    let nombreUsuarioFinal = isNaN(nombreUsuario);

    if (nombreUsuarioFinal == true) {
        let bienvenidaUsuario = document.createElement("h2");
        let horaDeEntrada = document.createElement("h2");

        bienvenidaUsuario.innerHTML = `¡Bienvenido ${nombreUsuario}!`;
        bienvenidaUsuario.setAttribute("class", "titulo__fecha");

        horaDeEntrada.innerText = "Fecha: " + new Date().toLocaleDateString();
        horaDeEntrada.setAttribute("class", "titulo__fecha");

        contenedor.appendChild(bienvenidaUsuario);
        contenedor.appendChild(horaDeEntrada);
    } else {
        alert("No puedes ingresar sólo números, usa también letras");
    }

} else {
    alert("No ingresaste un nombre válido, inténtalo de nuevo");
}

seccionBienvenida.appendChild(contenedor);

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

//! DESAFÍO 09

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