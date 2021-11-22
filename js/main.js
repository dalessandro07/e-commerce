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
        if (
            e.target.classList.contains("texto__carrito") ||
            e.target.classList.contains("producto__icon")
        ) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        } else if (e.target.classList.contains("boton-agregar-al-carro")) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
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