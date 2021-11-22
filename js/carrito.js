//* CARRITO

let carrito = [];
let comprasTotales = [];
let contenedorTotal = document.createElement("div");
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

//* EVENTO Y FUNCIONES DEL CARRITO

let contador = document.getElementById("contador-productos");
let contadorCompras = document.getElementById("contador-compras");

const ejecutarCarrito = (e) => {
    if (
        e.target.classList.contains("texto__carrito") ||
        e.target.classList.contains("producto__icon")
    ) {
        identificarProducto(e.target.parentElement);
    } else if (e.target.classList.contains("boton-agregar-al-carro")) {
        identificarProducto(e.target);
    }
    e.stopPropagation();
};

if (localStorage.getItem("username")) {
    function identificarProducto(e) {
        let botonSeleccionado = e.parentElement;
        console.log("🚀 - botonSeleccionado", botonSeleccionado);
        let productoSeleccionado = botonSeleccionado.closest(".card");
        console.log("🚀 - productoSeleccionado", productoSeleccionado);
        let padreProducto = productoSeleccionado.lastChild.previousSibling;
        console.log("🚀 - padreProducto", padreProducto.id);

        let productoTitulo =
            productoSeleccionado.querySelector(".producto__titulo").textContent;
        let productoPrecio =
            productoSeleccionado.querySelector(".precio").textContent;
        let productoStock =
            productoSeleccionado.querySelector(".stock").textContent;
        let productoImagen =
            productoSeleccionado.querySelector(".producto__imagen").src;
        let productoCantidad = 1;

        let idPadre = padreProducto.getAttribute("id");
        let filtrado = carrito.find((producto) => producto.id === idPadre);

        if (filtrado === undefined) {
            agregarProductoAlCarrito(
                productoTitulo,
                productoPrecio,
                productoStock,
                productoImagen,
                idPadre,
                productoCantidad
            );
            Swal.fire({
                position: "center",
                title: `¡Producto añadido al carrito!`,
                html: `¡<b>${productoTitulo}</b> - fue añadido correctamente al carrito!`,
                imageUrl: `${productoImagen}`,
                imageHeight: 200,
                imageWidth: 300,
                showConfirmButton: false,
                timer: 1800,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: `¡Este producto ya fue añadido!`,
                html: `¡<b>${productoTitulo}</b> - ya está en el carrito!`,
                imageUrl: `${productoImagen}`,
                imageHeight: 200,
                imageWidth: 300,
                showConfirmButton: false,
                timer: 1800,
            });
            return;
        }
    }

    function agregarProductoAlCarrito(
        titulo,
        precio,
        stock,
        imagen,
        id,
        cantidad
    ) {
        const producto = new Producto(titulo, precio, stock, imagen, id, cantidad);

        carrito.push(producto);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarProductoEnCarrito();

        $("#aumentar").click(function(e) {
            let botonSeleccionado = e.target;
            let productoSeleccionado = botonSeleccionado.closest(
                ".contenedor-principal-producto"
            );
            let formSeleccionado = botonSeleccionado.closest(".form-cantidad");
            let inputSeleccionado = formSeleccionado.querySelector(
                ".cantidad-productos"
            );
            let precioSeleccionado = productoSeleccionado.querySelector(
                ".precio-producto-en-carrito"
            );

            if (parseInt(inputSeleccionado.value) < parseInt(inputSeleccionado.max)) {
                parseInt(inputSeleccionado.value++);
            } else {
                return;
            }
            precioSeleccionado.innerText = precio * inputSeleccionado.value;
            calcularTotal();
            producto.cantidad = inputSeleccionado.value;
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });

        $("#restar").click(function(e) {
            let botonSeleccionado = e.target;
            let productoSeleccionado = botonSeleccionado.closest(
                ".contenedor-principal-producto"
            );
            let formSeleccionado = botonSeleccionado.closest(".form-cantidad");
            let inputSeleccionado = formSeleccionado.querySelector(
                ".cantidad-productos"
            );
            let precioSeleccionado = productoSeleccionado.querySelector(
                ".precio-producto-en-carrito"
            );

            if (parseInt(inputSeleccionado.value) > 1) {
                parseInt(inputSeleccionado.value--);
            } else if (parseInt(inputSeleccionado.value) === 1) {
                Swal.fire({
                    title: "¿Deseas elminar el producto del carrito?",
                    icon: "info",
                    showCancelButton: true,
                    cancelButtonText: "No, mantener producto",
                    cancelButtonColor: "blue",
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "¡Sí, borrar producto!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        productoSeleccionado.remove();
                        carrito.pop();
                        inputSeleccionado.value = 0;
                        contador.innerText--;
                    }
                });
            } else {
                return;
            }
            precioSeleccionado.innerText = precio * inputSeleccionado.value;
            calcularTotal();
            producto.cantidad = inputSeleccionado.value;
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });
    }

    function mostrarProductoEnCarrito() {
        let contenedorProducto = document.createElement("div");

        contenedorProducto.setAttribute(
            "class",
            "d-flex contenedor-principal-producto"
        );

        for (const producto of carrito) {
            contenedorProducto.innerHTML = `
                            <img class="imagen-producto" src=${producto.imagen}>
                            <div class="d-flex flex-column justify-content-center align-items-center w-50 contenedor-tps">
                                <h3 class="text-center titulo-en-carrito">${producto.titulo}</h3>
                                <div>
                                <b class="precio2">Precio: S/</b><b class="precio2 precio-producto-en-carrito">${producto.precio}</b><br>
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

        contador.innerText = carrito.length;

        $(".offcanvas-body").prepend(contenedorProducto);

        calcularTotal();
    }
}