// * INICIAR PROGRAMA

// * MOSTRAR USUARIO Y FECHA

let nombreUsuario = localStorage.getItem("username");
let passwordUsuario = localStorage.getItem("password");

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
    noIngreso.innerText = "¡Inicie sesión o regístrese para comprar!";
    contenedor.setAttribute("class", "contenedor-bienvenida d-flex w-100 justify-content-center");
    contenedor.appendChild(noIngreso);
}

seccionBienvenida.appendChild(contenedor);

//* CREAR LOS PRODUCTOS

//! PRODUCTOS

const productos = [
    { id: "t-preparada", tipo: "sustrato", nombre: "Tierra Preparada", imagen: "../assets/img/tierras.jpeg", precio: 2, stock: 54, vendidos: 3829 },
    { id: "m-plastico", tipo: "maceta", nombre: "Macetas de Plástico", imagen: "../assets/img/macetas.jpeg", precio: 9, stock: 29, vendidos: 2764 },
    { id: "m-fibraCoco", tipo: "maceta", nombre: "Macetas de Fibra de Coco", imagen: "../assets/img/fibra-coco.jpg", precio: 12, stock: 12, vendidos: 188 },
    { id: "m-ceramica", tipo: "maceta", nombre: "Macetas de Cerámica", imagen: "../assets/img/ceramica.jpg", precio: 10, stock: 25, vendidos: 4779 },
    { id: "p-hortalizas", tipo: "planta", nombre: "Plantas Hortalizas", imagen: "../assets/img/hortalizas.jpg", precio: 3, stock: 40, vendidos: 2756 },
    { id: "p-ornamentales", tipo: "planta", nombre: "Plantas Ornamentales", imagen: "../assets/img/ornamentales.jpg", precio: 25, stock: 55, vendidos: 2138 },
    { id: "p-orquideas", tipo: "planta", nombre: "Plantas Orquídeas", imagen: "../assets/img/orquideas.jpg", precio: 40, stock: 9, vendidos: 129 },
    { id: "p-sucuCactus", tipo: "planta", nombre: "Suculentas y Cactus", imagen: "../assets/img/macetas-suculentas.jpg", precio: 8, stock: 17, vendidos: 1289 },
    { id: "t-musgo", tipo: "sustrato", nombre: "Sustrato - Musgo", imagen: "../assets/img/musgo.jpg", precio: 6, stock: 27, vendidos: 123 },
    { id: "t-vermiculita", tipo: "sustrato", nombre: "Sustrato - Vermiculita", imagen: "../assets/img/vermiculita.jpg", precio: 9, stock: 12, vendidos: 33 },
    { id: "t-perlita", tipo: "sustrato", nombre: "Sustrato - Perlita", imagen: "../assets/img/perlita.jpg", precio: 15, stock: 11, vendidos: 110 },
    { id: "m-cemento", tipo: "maceta", nombre: "Macetas de Cemento", imagen: "../assets/img/m-cemento.jpg", precio: 4, stock: 27, vendidos: 1540 }
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
                <div class="d-flex"><b class="precio2">S/</b><b class="precio">${producto.precio}</b><b class="precio2">.00 la unidad</b></div>
                <button class="producto__enlace boton-agregar-al-carro" id="agregar-${producto.id}">
                <i class="producto__icon fas fa-cart-plus">
                <b class="texto__carrito">Añadir al carrito</b>
                </i>
                </button>
            </div>
            <div>
                <div class="d-flex justify-content-center"><b class="stock">${producto.stock}</b><b class="stock2"> disponibles</b><br>
                </div>
                <div class="d-flex justify-content-center"><b class="vendidos">${producto.vendidos}</b><b class="stock2"> vendidos</b>
                </div>
                </div>
        </div>
    </div>`

    listaCards.push(cardProducto);

    for (const card of listaCards) {
        contenedorProductos[0].appendChild(card);
    }
}

// * FUNCION DARK MODE

$(() => {
    $("#boton-dark").click(function() {
        $("#boton-dark").toggleClass("fa-sun");
        $("body").toggleClass("seccion-oscuro");
        $("nav").toggleClass("nav-oscuro");
        $(".cabecera__logo").toggleClass("logo-oscuro");
        $("h1").toggleClass("texto-oscuro");
        $(".offcanvas").toggleClass("carrito-oscuro");
        $(".fas").toggleClass("texto-oscuro");
        $(".card").toggleClass("card-oscuro");
        $("h5").toggleClass("texto-oscuro");
        $("b").toggleClass("texto-oscuro");
        $("h2").toggleClass("texto-oscuro");
        $("h3").toggleClass("texto-oscuro");
        $("label").toggleClass("texto-oscuro");
        $("input").toggleClass("texto-oscuro");
        $("div").toggleClass("texto-oscuro");
    });
})

//* FILTROS (MAS VENDIDOS, MAYOR STOCK, MAYOR PRECIO Y MENOR PRECIO)

//? AGREGO LOS EVENTOS CON JQUERY

$("#masVendidos").click(function() {
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
});

$("#mayorStock").click(function() {
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
})

$("#mayorPrecio").click(function() {
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
});

$("#menorPrecio").click(function() {
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
});

//* AGREGUÉ FUNCIONALIDAD EN FILTROS POR SECCIONES (PLANTAS, MACETAS Y TIERRAS)

//? AGREGO LOS EVENTOS CON JQUERY

$("#todos").click(function() {
    $(".maceta").fadeIn();
    $(".sustrato").fadeIn();
    $(".planta").fadeIn();
    totalProductos[0].innerText = `${productoHTML.length} productos`;
});

$("#plantas").click(function() {
    $(".maceta").fadeOut("fast");
    $(".sustrato").fadeOut("fast");
    $(".planta").fadeIn("fast");
    totalProductos[0].innerText = `${plantas.length} productos`;
});

$("#macetas").click(function() {
    $(".maceta").fadeIn("fast");
    $(".sustrato").fadeOut("fast");
    $(".planta").fadeOut("fast");
    totalProductos[0].innerText = `${macetas.length} productos`;
});

$("#tierras").click(function() {
    $(".maceta").fadeOut("fast");
    $(".sustrato").fadeIn("fast");
    $(".planta").fadeOut("fast");
    totalProductos[0].innerText = `${sustratos.length} productos`;
})

//* FILTROS TOTAL DE PRODUCTOS

totalProductos[0].innerText = `${productoHTML.length} productos`;

//* SECCION USUARIO

class Usuario {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    cambiarPassword() {
        let crearNuevaPassword = document.getElementById("nueva-password");
        let establecerPassword = document.getElementById("establecer-password");
        crearNuevaPassword.classList.toggle("d-none");
        establecerPassword.classList.toggle("d-none");

        establecerPassword.addEventListener("click", guardarNuevaPassword);

        function guardarNuevaPassword(e) {
            if ((nombreUsuario !== crearNuevaPassword.value)) {

                if ((crearNuevaPassword.value.length > 5)) {

                    localStorage.setItem("password", crearNuevaPassword.value);
                    crearNuevaPassword.style.backgroundColor = "green";
                    crearNuevaPassword.style.color = "#fff";
                    crearNuevaPassword.classList.add("d-none");
                    establecerPassword.classList.add("d-none");
                } else {
                    e.preventDefault();
                    crearNuevaPassword.style.backgroundColor = "red";
                    crearNuevaPassword.style.color = "#fff";
                }

            } else {
                e.preventDefault();
                crearNuevaPassword.style.backgroundColor = "red";
                crearNuevaPassword.style.color = "#fff";
            }
        }
    }
}

if (nombreUsuario) {
    const usuario1 = new Usuario(`${nombreUsuario}`, `${passwordUsuario}`);

    let usuario = document.createElement("div");
    usuario.setAttribute("class", "miUsuario");
    usuario.innerHTML = `<p class="nombre-usuario">Nombre de Usuario:</p><p class="nombre-usuario2">${usuario1.username}</p><p class="password-usuario">Contraseña:</p><p class="nombre-usuario2">${usuario1.password}</p><button class="btn btn-danger m-3" id="cambiar-password">Cambiar Contraseña</button><input id="nueva-password" placeholder="Ingresa la nueva contraseña" type="text" class="d-none nueva__password--estilo"><input id="establecer-password" class="d-none btn-success" type="submit" value="Guardar">`;
    contenedorUsuario.appendChild(usuario);

    botonUsuario.addEventListener("click", mostrarUsuario);

    function mostrarUsuario() {
        contenedorPadre.classList.toggle("d-none");
    }

    $(() => {
        let botonCambiarPassword = document.getElementById("cambiar-password");

        botonCambiarPassword.addEventListener("click", cambioDePassword);

        function cambioDePassword() {
            usuario1.cambiarPassword();
        }
    })
}

//* CARRITO

let carrito = [];
let totalCarrito = [];

class Producto {
    constructor(titulo, precio, stock, imagen, id, cantidad) {
        this.titulo = titulo;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.id = id;
        this.cantidad = cantidad;
    }
}

if (nombreUsuario) {

    ($(`.boton-agregar-al-carro`)).on("click", agregarProducto);

    function agregarProducto(e) {

        let botonSeleccionado = e.target;
        let productoSeleccionado = botonSeleccionado.closest(".card");
        let padreProducto = productoSeleccionado.parentElement;
        let idPadre = padreProducto.getAttribute("id");
        let filtrado = carrito.find(producto => producto.id === idPadre);

        let productoTitulo = productoSeleccionado.querySelector(".producto__titulo").textContent;
        let productoPrecio = productoSeleccionado.querySelector(".precio").textContent;
        let productoStock = productoSeleccionado.querySelector(".stock").textContent;
        let productoImagen = productoSeleccionado.querySelector(".producto__imagen").src;
        let cantidad = 1;
        cantidad = cantidad + 1;

        if ((filtrado === undefined)) {
            mostrarProductoEnCarrito(productoTitulo, productoPrecio, productoStock, productoImagen, idPadre, cantidad);
        } else {
            console.log("🚀 - cantidad", cantidad);
            return;
        }
    }

    function crearSeccionTotal() {
        let contenedorTotal = document.createElement("div");

        contenedorTotal.innerHTML = `
            <div class="d-flex justify-content-between contenedor-total">
                <div class="d-flex align-center total-completo">
                    Total: S/<b id="numero-total">0</b>
                </div>
                <div class="finalizar-compra">
                    <button class="btn btn-success btn-comprar-final" id="comprar">Comprar</button>
                    <button class="btn btn-danger btn-comprar-final" id="vaciar">Vaciar</button>
                    </div>
                    </div>
                    `;

        carritoContenedor[0].appendChild(contenedorTotal);

        $(() => {
            $("#vaciar").click(function(e) {
                e.preventDefault();
                localStorage.removeItem("carrito");
                carrito.splice(0, carrito.length);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Carrito vaciado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                $("#contador-productos").text("0");
                $(".contenedor-principal-producto").remove();
                $(".offcanvas-body").append(contenedorTotal);
                $("#numero-total").text("0");
            });
            $("#comprar").click(function(e) {
                let ordenCompra = Math.round(Math.random() * (99999999 - 11111111) + 11111111);
                if ((carrito.length > 0)) {
                    e.preventDefault();
                    Swal.fire(
                        "¡Compra realizada con éxito!",
                        `¡Gracias por su preferencia! | ORDEN DE COMPRA: #${ordenCompra}`,
                        "success",
                    )
                    localStorage.removeItem("carrito");
                    carrito.splice(0, carrito.length);
                    $("#contador-productos").text("0");
                    $(".contenedor-principal-producto").remove();
                    $(".offcanvas-body").append(contenedorTotal);
                    $("#numero-total").text("0");
                }
            });
        })
    }

    crearSeccionTotal();

    function mostrarProductoEnCarrito(titulo, precio, stock, imagen, id) {

        const producto = new Producto(titulo, precio, stock, imagen, id);

        carrito.push(producto);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        let contenedorProducto = document.createElement("div");
        contenedorProducto.setAttribute("class", "d-flex contenedor-principal-producto");

        for (const producto of carrito) {
            contenedorProducto.innerHTML = `
            <img class="imagen-producto" src=${producto.imagen}>
            <div class="d-flex flex-column justify-content-center align-items-center w-50 contenedor-tps">
                <h3 class="text-center titulo-en-carrito">${producto.titulo}</h3>
                <div>
                <b class="precio2">S/</b><b class="precio2 precio-producto-en-carrito">${producto.precio}</b><b class="precio2">.00 la unidad</b><br>
                </div>
                <div>
                <b class="stock2">Stock:</b><b class="stock2 stock-producto-numero">${producto.stock}</b>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center flex-shrink-5">
            <label class="cantidad">Cantidad:</label>
                <form class="d-flex flex-column form-cantidad justify-content-center align-items-center align-content-around">
                    <input class="btn cantidad-productos" type="number" max="${producto.stock}" value="1" disabled>
                    <div class="d-flex justify-content-around w-75">
                        <button class="btn btn-success" id="aumentar" type="button">+</button>
                        <button class="btn btn-danger" id="restar" type="button">-</button>
                    </div>
                </form>
            </div>
            
        `;
        }

        $(".offcanvas-body").prepend(contenedorProducto);

        let contador = document.getElementById("contador-productos");
        contador.innerText = carrito.length;

        $("#aumentar").click(function(e) {

            let botonSeleccionado = e.target;
            let productoSeleccionado = botonSeleccionado.closest(".form-cantidad");
            let inputSeleccionado = productoSeleccionado.querySelector(".cantidad-productos");

            if (parseInt(inputSeleccionado.value) < parseInt(inputSeleccionado.max)) {
                inputSeleccionado.value = parseInt(inputSeleccionado.value) + 1;
                calcularTotal(precio, inputSeleccionado.value);
            } else {
                return;
            }
        });

        $("#restar").click(function(e) {

            let botonSeleccionado = e.target;
            let productoSeleccionado = botonSeleccionado.closest(".form-cantidad");
            let inputSeleccionado = productoSeleccionado.querySelector(".cantidad-productos");

            if (parseInt(inputSeleccionado.value) > 1) {
                inputSeleccionado.value = parseInt(inputSeleccionado.value) - 1;
                calcularTotal(precio, inputSeleccionado.value);
            } else {
                return;
            }

        });
    }

    function calcularTotal(precio, cantidad) {
        let totalParcial = (parseInt(precio * cantidad));
        totalCarrito.push(totalParcial);
        let totalFinal = 0;
        for (const total of totalCarrito) {
            totalFinal += total;
        }
        console.log("🚀 - totalFinal", totalFinal);
    }
}