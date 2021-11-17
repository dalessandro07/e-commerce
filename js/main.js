// * INICIAR PROGRAMA

// * MOSTRAR USUARIO Y FECHA

let nombreUsuario = localStorage.getItem("username");
let passwordUsuario = localStorage.getItem("password");

let contenedor = document.createElement("div");

function sinUsuario() {
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
    sinUsuario();
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
        let caracteresEspeciales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        $("#cambio-pass").removeAttr("disabled");
        $("#cambio-pass").removeAttr("value");
        $("#cambio-pass").attr("placeholder", "Escribe la nueva contraseña...");

        $("#cambio-pass").on("input", function() {
            let nuevaPass = $("#cambio-pass").val();
            $("#cambiar-password").one('click', function() {
                if ((nuevaPass.length > 8) && (nuevaPass !== $("#cambio-user").val()) && (!nuevaPass.includes(" ")) && (!nuevaPass.match(caracteresEspeciales))) {
                    localStorage.setItem("password", nuevaPass);
                    $("#error-password").addClass("d-none");
                    $("#correcto-password").removeClass("d-none");

                    $("#cambio-pass").css("border-color", "#198754");
                    $("#cambio-pass").attr("disabled", "disabled");
                } else {
                    $("#correcto-password").addClass("d-none");
                    $("#error-password").removeClass("d-none");
                    $("#cambio-pass").css("border-color", "#dc3545");
                }
            });
        });
    }
    borrarCuenta() {
        Swal.fire({
            title: "¿Deseas eliminar tu cuenta?",
            text: "¡Esta acción no se puede deshacer!",
            icon: "info",
            showCancelButton: true,
            cancelButtonText: "No, mantener cuenta",
            cancelButtonColor: "blue",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "¡Sí, eliminar cuenta!",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("password");
                localStorage.removeItem("username");
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '¡Tu cuenta fue borrada con éxito!',
                    showConfirmButton: false,
                    timer: 1500
                })

                $("#cambio-user").val("");
                $("#cambio-pass").val("");

                //* SECCION SUPERIOR BIENVENIDA

                $(".titulo__fecha").remove();
                sinUsuario();
            }
        });
    }
}

if (nombreUsuario) {
    $("#sin-cuenta").hide();

    const usuario1 = new Usuario(`${nombreUsuario}`, `${passwordUsuario}`);

    let usuario = document.createElement("div");

    usuario.setAttribute("class", "miUsuario");

    usuario.innerHTML = `
    <div class="p-3 d-flex flex-column align-content-center justify-content-center">
        <label class="nombre-usuario">Nombre de Usuario:</label>
        <input type="text" class="m-3 nombre-usuario2" id="cambio-user" value="${usuario1.username}" disabled>
    </div>
    <div class="p-3 d-flex flex-column align-content-center justify-content-center">
        <label class="password-usuario">Contraseña:</label>
        <input type="text" class="m-3 nombre-usuario2" id="cambio-pass" value="${usuario1.password}" disabled>
        <b class='error d-none' id="error-password" style='color:#dc3545;'>* ¡La contraseña es inválida inténtelo de nuevo!</b>
        <b class='error d-none' id="correcto-password" style='color:#198754;'>* ¡La contraseña se cambió con éxito!</b>
    </div>
    <div class="contenedor-botones d-flex justify-content-around">
        <button class="btn btn-danger m-3" id="cambiar-password">Cambiar Contraseña</button>
        <button class="btn btn-danger m-3" id="borrar-cuenta">Borrar Cuenta</button>
    </div>`;

    $("#contenedor-usuario").append(usuario);

    $(() => {
        $("#cambiar-password").click(function() {
            usuario1.cambiarPassword();
        });
        $("#borrar-cuenta").click(function() {
            usuario1.borrarCuenta();
        });
    });
}