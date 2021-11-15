// * INICIAR PROGRAMA

// * MOSTRAR USUARIO Y FECHA

let nombreUsuario = localStorage.getItem("username");
let passwordUsuario = localStorage.getItem("password");

let contenedor = document.createElement("div");

if (nombreUsuario) {
    contenedor.setAttribute(
        "class",
        "contenedor-bienvenida d-flex w-100 justify-content-between"
    );
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
    contenedor.setAttribute(
        "class",
        "contenedor-bienvenida d-flex w-100 justify-content-center"
    );
    contenedor.appendChild(noIngreso);
}

seccionBienvenida.appendChild(contenedor);

//* CREAR LOS PRODUCTOS

//! PRODUCTOS

$.get("../productos.json", function(resultado, estado) {
    if (estado === "success") {
        for (const producto of resultado) {
            let cardProducto = document.createElement("div");
            cardProducto.setAttribute(
                "class",
                `producto col-12 col-md-6 col-lg-3 ${producto.tipo}`
            );
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
                </div>`;

            listaCards.push(cardProducto);

            for (const card of listaCards) {
                contenedorProductos[0].appendChild(card);
            }
        }
    }
});

// * FUNCION DARK MODE

$(() => {
    $("#boton-dark").click(function() {
        $("#boton-dark").toggleClass("fa-sun");
        $("body").toggleClass("seccion-oscuro");
        $("nav").toggleClass("nav-oscuro");
        $(".cabecera__logo").toggleClass("logo-oscuro");
        $("h1").toggleClass("texto-oscuro");
        $(".offcanvas").toggleClass("carrito-oscuro");
        $(".contenedor-principal-producto").toggleClass("borde-oscuro");
        $(".fas").toggleClass("texto-oscuro");
        $(".card").toggleClass("card-oscuro");
        $("h5").toggleClass("texto-oscuro");
        $("b").toggleClass("texto-oscuro");
        $("h2").toggleClass("texto-oscuro");
        $("h3").toggleClass("texto-oscuro");
        $("label").toggleClass("texto-oscuro");
        $("input").toggleClass("texto-oscuro");
        $("div").toggleClass("texto-oscuro");
        $(".cantidad-productos:input[value='']").toggleClass("texto-oscuro");
        $(".btn-close").toggleClass("btn-close-white");
    });
});

//* FILTROS (MAS VENDIDOS, MAYOR STOCK, MAYOR PRECIO Y MENOR PRECIO)

//? AGREGO LOS EVENTOS CON JQUERY

$.get("../productos.json", function(resultado, estado) {
    if (estado === "success") {
        $("#masVendidos").click(function() {
            let productosOrdenados = resultado.sort((a, b) => {
                return b.vendidos - a.vendidos;
            });

            for (const producto of productosOrdenados) {
                listaCards.splice(0, listaCards.length);
                listaCards.push($(`#${producto.id}`));

                for (const card of listaCards) {
                    $(".producto__container").append(card);
                }
            }
        });

        $("#mayorStock").click(function() {
            let productosOrdenados = resultado.sort((a, b) => {
                return b.stock - a.stock;
            });

            for (const producto of productosOrdenados) {
                listaCards.splice(0, listaCards.length);
                listaCards.push($(`#${producto.id}`));

                for (const card of listaCards) {
                    $(".producto__container").append(card);
                }
            }
        });

        $("#mayorPrecio").click(function() {
            let productosOrdenados = resultado.sort((a, b) => {
                return b.precio - a.precio;
            });

            for (const producto of productosOrdenados) {
                listaCards.splice(0, listaCards.length);
                listaCards.push($(`#${producto.id}`));

                for (const card of listaCards) {
                    $(".producto__container").append(card);
                }
            }
        });

        $("#menorPrecio").click(function() {
            let productosOrdenados = resultado.sort((a, b) => {
                return a.precio - b.precio;
            });

            for (const producto of productosOrdenados) {
                listaCards.splice(0, listaCards.length);
                listaCards.push($(`#${producto.id}`));

                for (const card of listaCards) {
                    $(".producto__container").append(card);
                }
            }
        });
    }
});

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
            if (nombreUsuario !== crearNuevaPassword.value) {
                if (crearNuevaPassword.value.length > 5) {
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
    usuario.innerHTML = `
    <p class="nombre-usuario">Nombre de Usuario:</p><p class="nombre-usuario2">${usuario1.username}</p><p class="password-usuario">Contraseña:</p><p class="nombre-usuario2">${usuario1.password}</p><button class="btn btn-danger m-3" id="cambiar-password">Cambiar Contraseña</button><input id="nueva-password" placeholder="Ingresa la nueva contraseña" type="text" class="d-none nueva__password--estilo"><input id="establecer-password" class="d-none btn-success" type="submit" value="Guardar">`;

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
    });
}