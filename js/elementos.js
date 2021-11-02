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