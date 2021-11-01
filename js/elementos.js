// ELEMENTOS POR (ID, CLASE, TAGNAME)

//! SECCION PRODUCTOS

let seccionBienvenida = document.getElementsByClassName("titulo")[0];

let precio = document.getElementsByClassName("precio");

let seccionPrincipal = document.getElementsByTagName("body");
let navPrincipal = document.getElementsByTagName("nav");
let tituloPrincipal = document.getElementsByTagName("h1");
let tituloSecundario = document.getElementsByTagName("h2");
let logo = document.getElementsByClassName("cabecera__logo");
let iconos = document.getElementsByClassName("fas");
let cards = document.getElementsByClassName("card");
let subtitulos = document.getElementsByTagName("h5");
let textos = document.getElementsByTagName("b");

//? FUNCION DARK MODE

let botonDarkMode = document.getElementById("boton-dark");

//? FILTROS

//* CARDS - PRODUCTOS

let listaCards = [];

let contenedorProductos = document.getElementsByClassName("producto__container");
let productoHTML = document.getElementsByClassName("producto");
let contenedorPrecio = document.getElementsByClassName("precio__container");

//* POR PROPIEDADES - OBTENGO LOS ELEMENTOS (PRODUCTOS y BOTONES)

let masVendidos = document.getElementById("masVendidos");
let mayorStock = document.getElementById("mayorStock");
let mayorPrecio = document.getElementById("mayorPrecio");
let menorPrecio = document.getElementById("menorPrecio");

//* POR SECCIONES - OBTENGO LOS ELEMENTOS (PRODUCTOS y BOTONES)

let botonTodos = document.getElementById("todos");
let botonPlantas = document.getElementById("plantas");
let botonMacetas = document.getElementById("macetas");
let botonTierras = document.getElementById("tierras");
let contenedorPrincipal = document.getElementById("contenedor-principal");

let plantas = document.getElementsByClassName("planta");
let macetas = document.getElementsByClassName("maceta");
let sustratos = document.getElementsByClassName("sustrato");

//* TOTAL DE PRODUCTOS

let totalProductos = document.getElementsByClassName("total--color");

//! SECCION REGISTRO E INGRESO

let labels = document.getElementsByTagName("label");

//? CONTENEDOR

let contenedorRegistro = document.getElementById("contenedor-registro");
let contenedorForm = document.getElementById("container-form");

//? INPUTS

let usernameRegistro = document.getElementById("username-registro");
let passwordRegistro = document.getElementById("password-registro");

let username = document.getElementById("username");
let password = document.getElementById("password");

//? BOTONES

let botonRegistrar = document.getElementById("boton-registrar");
let botonIniciarSesion = document.getElementById("boton-iniciar-sesion");
let botonEntrar = document.getElementById("boton-entrar");


//? USUARIO O CONTRASEÑA INCORRECTO - ERROR

let contenedorError = document.createElement("div");
contenedorError.setAttribute("class", "contenedor-error");


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
                <b class="precio">S/${producto.precio}.00 c/u</b>
                <button class="producto__enlace" id="agregar-${producto.id}">
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