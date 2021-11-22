// * FUNCION DARK MODE

function darkMode() {
    $("#boton-dark").toggleClass("fa-sun");
    $("body").toggleClass("seccion-oscuro");
    $("nav").toggleClass("nav-oscuro");
    $(".cabecera__logo").toggleClass("logo-oscuro");
    $("h1").toggleClass("texto-oscuro");
    $("h2").toggleClass("texto-oscuro");
    $(".offcanvas").toggleClass("carrito-oscuro");
    $(".contenedor-principal-producto").toggleClass("borde-oscuro");
    $(".fas").toggleClass("texto-oscuro");
    $(".card").toggleClass("card-oscuro");
    $("h5").toggleClass("texto-oscuro");
    $("b").toggleClass("texto-oscuro");
    $("h3").toggleClass("texto-oscuro");
    $("label").toggleClass("texto-oscuro");
    $(".cantidad-productos:input[value='']").toggleClass("texto-oscuro");
    $(".btn-close").toggleClass("btn-close-white");
}

function darkModeFiltros() {
    if ($("#boton-dark").hasClass("fa-sun")) {
        $(".icono-agregar-al-carro").toggleClass("texto-oscuro");
        $(".card").toggleClass("card-oscuro");
        $("h5").toggleClass("texto-oscuro");
        $("b").toggleClass("texto-oscuro");
    }
}

$("#boton-dark").click(function() {
    $(() => {
        darkMode();
    });
});

//* FILTROS (MAS VENDIDOS, MAYOR STOCK, MAYOR PRECIO Y MENOR PRECIO)

//? AGREGO LOS EVENTOS CON JQUERY

const filtrarCards = (data) => {
    $("#masVendidos").click(function() {
        let productosOrdenados = data.sort((a, b) => {
            return b.vendidos - a.vendidos;
        });
        contenedorCards.innerHTML = "";
        pintarCards(productosOrdenados);
        darkModeFiltros();
    });

    $("#mayorStock").click(function() {
        let productosOrdenados = data.sort((a, b) => {
            return b.stock - a.stock;
        });
        contenedorCards.innerHTML = "";
        pintarCards(productosOrdenados);
        darkModeFiltros();
    });

    $("#mayorPrecio").click(function() {
        let productosOrdenados = data.sort((a, b) => {
            return b.precio - a.precio;
        });
        contenedorCards.innerHTML = "";
        pintarCards(productosOrdenados);
        darkModeFiltros();
    });

    $("#menorPrecio").click(function() {
        let productosOrdenados = data.sort((a, b) => {
            return a.precio - b.precio;
        });
        contenedorCards.innerHTML = "";
        pintarCards(productosOrdenados);
        darkModeFiltros();
    });
};

//* AGREGUÉ FUNCIONALIDAD EN FILTROS POR SECCIONES (PLANTAS, MACETAS Y TIERRAS)

//? AGREGO LOS EVENTOS CON JQUERY

$("#todos").click(function() {
    $(".maceta").fadeIn();
    $(".sustrato").fadeIn();
    $(".planta").fadeIn();
    $(".total--color").text(`${productoHTML.length} productos`);
});

$("#plantas").click(function() {
    $(".maceta").fadeOut();
    $(".sustrato").fadeOut();
    $(".planta").fadeOut().fadeIn("slow");
    $(".total--color").text(`${plantas.length} productos`);
});

$("#macetas").click(function() {
    $(".maceta").fadeOut().fadeIn("slow");
    $(".planta").fadeOut();
    $(".sustrato").fadeOut();
    $(".total--color").text(`${macetas.length} productos`);
});

$("#tierras").click(function() {
    $(".maceta").fadeOut();
    $(".planta").fadeOut();
    $(".sustrato").fadeOut().fadeIn("slow");
    $(".total--color").text(`${sustratos.length} productos`);
});