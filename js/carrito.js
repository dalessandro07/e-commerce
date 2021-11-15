//* CARRITO

let carrito = [];
let comprasTotales = [];

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

$(window).on("load", function() {
    if (nombreUsuario) {

        $(".boton-agregar-al-carro").on("click", identificarProducto);

        function identificarProducto(e) {

            let botonSeleccionado = e.target;
            let productoSeleccionado = botonSeleccionado.closest(".card");
            let padreProducto = productoSeleccionado.parentElement;

            let productoTitulo = productoSeleccionado.querySelector(".producto__titulo").textContent;
            let productoPrecio = productoSeleccionado.querySelector(".precio").textContent;
            let productoStock = productoSeleccionado.querySelector(".stock").textContent;
            let productoImagen = productoSeleccionado.querySelector(".producto__imagen").src;
            let productoCantidad = 1;

            let idPadre = padreProducto.getAttribute("id");
            let filtrado = carrito.find((producto) => producto.id === idPadre);

            if (filtrado === undefined) {
                agregarProductoAlCarrito(
                    productoTitulo,
                    productoPrecio,
                    productoStock,
                    productoImagen,
                    idPadre, productoCantidad
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

        function agregarProductoAlCarrito(titulo, precio, stock, imagen, id, cantidad) {
            const producto = new Producto(titulo, precio, stock, imagen, id, cantidad);

            carrito.push(producto);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            mostrarProductoEnCarrito();

            let contador = document.getElementById("contador-productos");
            contador.innerText = carrito.length;

            calcularTotal();

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

                if (
                    parseInt(inputSeleccionado.value) < parseInt(inputSeleccionado.max)
                ) {
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

            $(".offcanvas-body").prepend(contenedorProducto);
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

            //* SECCION COMPRAS

            let noSeEncontro = document.createElement("div");
            noSeEncontro.setAttribute("class", "no-encontrado-contenedor");

            noSeEncontro.innerHTML = `<p class="no-encontrado">No se encontró la compra N° <b class="no-encontrado-orden-compra">0</b></p>`;

            $(".filtros-compra").append(noSeEncontro);

            //* BOTONES DEL CARRITO

            $("#vaciar").click(function() {
                Swal.fire({
                    title: "¿Deseas vaciar el carrito?",
                    text: "Esta acción no se puede deshacer",
                    icon: "info",
                    showCancelButton: true,
                    cancelButtonText: "No, mantener carrito",
                    cancelButtonColor: "blue",
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "¡Sí, vaciar carrito!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("carrito");
                        carrito.splice(0, carrito.length);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Carrito vaciado correctamente",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                        $("#contador-productos").text("0");
                        $(".contenedor-principal-producto").remove();
                        $(".offcanvas-body").append(contenedorTotal);
                        $("#numero-total").text("0");
                    }
                });

            });
            $("#comprar").click(function() {
                if (carrito.length > 0) {

                    ordenCompra = Math.round(
                        Math.random() * (99999999 - 11111111) + 11111111
                    );
                    Swal.fire({
                        title: "¡Felicidades su compra se realizó con éxito!",
                        html: `¡Gracias por comprar en <b>La Casa De Las Plantas Perú</b> Recuerde anotar su número de compra! <hr> ORDEN DE COMPRA: <b>#${ordenCompra}</b>`,
                        icon: "success",
                    });

                    //* AGREGANDO SECCIÓN DE PRODUCTOS COMPRADOS

                    if (comprasTotales.length < 5) {
                        let compra = [];
                        let compraLocalStorage = JSON.parse(localStorage.getItem("carrito"));
                        localStorage.setItem("ultima-compra", localStorage.getItem("carrito"));

                        compra.push(ordenCompra);

                        for (const comprado of compraLocalStorage) {
                            compra.push(comprado);
                        }

                        comprasTotales.push(compra);

                        //? FILTROS PARA ENCONTRAR COMPRA

                        let contenedorProductosComprados;

                        for (let i = 1; i <= comprasTotales.length; i++) {
                            contenedorProductosComprados = document.createElement("div");
                            contenedorProductosComprados.setAttribute("class", `compra${i} p-4 d-none`);
                            contenedorProductosComprados.setAttribute("id", ordenCompra);
                            $(`.contenedor-compra`).append(contenedorProductosComprados);
                        }

                        console.log(ordenCompra);

                        $(".busqueda").on("input", function() {
                            if (parseInt($(".busqueda").val()) === parseInt(contenedorProductosComprados.id)) {
                                $(".no-encontrado-contenedor").addClass("d-none");
                                contenedorProductosComprados.classList.remove("d-none");
                            } else {
                                $(".no-encontrado-orden-compra").text($(".busqueda").val());
                                contenedorProductosComprados.classList.add("d-none");
                            }
                        });

                        //? RENDERIZADO DE PRODUCTOS COMPRADOS

                        for (let i = 1; i < compra.length; i++) {
                            let productoComprado = document.createElement("div");
                            productoComprado.innerHTML =
                                `<div class="d-flex justify-content-around contenedor-principal-compra">
                                    <img class="imagen-producto" src="${compra[i].imagen}">
                                    <h3 class="titulo-en-compra text-center">${compra[i].titulo}</h3>
                                    <div class="d-flex flex-column text-center justify-content-center align-content-center">
                                        <p class="texto-compra">Unidades compradas: <b class="texto-compra">${compra[i].cantidad}</b></p>
                                        <p class="texto-compra2">Total: S/${compra[i].precio * compra[i].cantidad}.00</p>
                                    </div>
                                </div>`;
                            contenedorProductosComprados.appendChild(productoComprado);
                        }

                        let contador = document.getElementById("contador-compras");
                        contador.innerText = comprasTotales.length;

                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "info",
                            title: "¡Puedes hacer un máximo de 5 compras por día!",
                            showConfirmButton: false,
                            timer: 1200,
                        });
                    }

                    //! RESETEANDO CARRITO

                    carrito.splice(0, carrito.length);
                    $("#contador-productos").text("0");
                    $(".contenedor-principal-producto").remove();
                    $(".offcanvas-body").append(contenedorTotal);
                    $("#numero-total").text("0");
                }
            });
        }

        crearSeccionTotal();

        function calcularTotal() {
            let precioProducto = document.getElementsByClassName(
                "precio-producto-en-carrito"
            );
            let totalFinal = 0;
            for (let i = 0; i < precioProducto.length; i++) {
                totalFinal += parseInt(precioProducto[i].textContent);
            }
            $("#numero-total").text(totalFinal);
        }

    }
});