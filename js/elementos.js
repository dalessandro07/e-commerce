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
let subtitulos = document.getElementsByTagName("h5");
let textos = document.getElementsByTagName("b");

//? FILTROS

//* CARDS - PRODUCTOS

let listaCards = [];

let cards = document.getElementsByClassName("card");
let contenedorProductos = document.getElementsByClassName("producto__container");
let productoHTML = document.getElementsByClassName("producto");
let contenedorPrecio = document.getElementsByClassName("precio__container");
let contenedorPrincipal = document.getElementById("contenedor-principal");

let plantas = document.getElementsByClassName("planta");
let macetas = document.getElementsByClassName("maceta");
let sustratos = document.getElementsByClassName("sustrato");

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

//! SECCION USUARIO

let botonUsuario = document.getElementById("boton-usuario");

let contenedorPadre = document.getElementById("miUsuario");
let contenedorUsuario = document.getElementById("contenedor-usuario");

//! CARRITO

let carritoContenedor = document.getElementsByClassName("offcanvas-body");