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

if (localStorage.getItem("username")) {
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

let cardProducto = document.getElementById("template-card").content;
let contenedorCards = document.getElementById("items");
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const fetchData = async() => {
    try {
        const res = await fetch("../productos.json");
        const data = await res.json();
        pintarCards(data);
        filtrarCards(data);
    } catch (error) {
        console.log(error);
    }
};

contenedorCards.addEventListener("click", (e) => {
    if (localStorage.getItem("username")) {
        ejecutarCarrito(e);
    } else {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
});

const pintarCards = (data) => {
    data.forEach((producto) => {
        cardProducto
            .querySelector(".card")
            .setAttribute("class", `card text-center producto ${producto.tipo}`);
        cardProducto.querySelector("h5").textContent = producto.nombre;
        cardProducto.querySelector("img").setAttribute("src", producto.imagen);
        cardProducto
            .querySelector(".producto__inferior")
            .setAttribute("id", producto.id);
        cardProducto.querySelector(".precio").textContent = producto.precio;
        cardProducto.querySelector(".stock").textContent = producto.stock;
        cardProducto.querySelector(".vendidos").textContent = producto.vendidos;

        const clone = cardProducto.cloneNode(true);
        fragment.appendChild(clone);
    });
    contenedorCards.appendChild(fragment);
};

// * FUNCION DARK MODE

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

//* FILTROS (MAS VENDIDOS, MAYOR STOCK, MAYOR PRECIO Y MENOR PRECIO)

//? AGREGO LOS EVENTOS CON JQUERY

const filtrarCards = (data) => {
    $("#masVendidos").click(function() {
        let productosOrdenados = data.sort((a, b) => {
            return b.vendidos - a.vendidos;
        });
        $(".card").hide();
        pintarCards(productosOrdenados);
    });

    $("#mayorStock").click(function() {
        let productosOrdenados = data.sort((a, b) => {
            return b.stock - a.stock;
        });
        $(".card").hide();
        pintarCards(productosOrdenados);
    });

    $("#mayorPrecio").click(function() {
        let productosOrdenados = data.sort((a, b) => {
            return b.precio - a.precio;
        });
        $(".card").hide();
        pintarCards(productosOrdenados);
    });

    $("#menorPrecio").click(function() {
        let productosOrdenados = data.sort((a, b) => {
            return a.precio - b.precio;
        });
        $(".card").hide();
        pintarCards(productosOrdenados);
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
            $("#cambiar-password").one("click", function() {
                if (
                    nuevaPass.length > 5 &&
                    nuevaPass !== $("#cambio-user").val() &&
                    !nuevaPass.includes(" ") &&
                    !nuevaPass.match(caracteresEspeciales)
                ) {
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
                    position: "center",
                    icon: "success",
                    title: "¡Tu cuenta fue borrada con éxito!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                $("#cambio-user").val("");
                $("#cambio-pass").val("");

                //* SECCION SUPERIOR BIENVENIDA

                $(".titulo__fecha").remove();
                sinUsuario();
                setTimeout(function() {
                    window.location.href = "../index.html";
                }, 1500);
            }
        });
    }
}

if (localStorage.getItem("username")) {
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