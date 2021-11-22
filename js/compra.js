// ? FINALIZANDO COMPRA

if (localStorage.getItem("username")) {
    function finalizar() {
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
                    html: `¡Gracias por comprar en <b>La Casa De Las Plantas Perú!</b> <span class="recuerde">¡Recuerde su número de compra!</span> <hr> ORDEN DE COMPRA: <b>#${ordenCompra}</b>`,
                    icon: "success",
                });

                $(".swal2-confirm").click(function() {
                    navigator.clipboard.writeText(ordenCompra);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-end",
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener("mouseenter", Swal.stopTimer);
                            toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                    });
                    Toast.fire({
                        icon: "success",
                        title: `¡Orden de compra copiado! N°${ordenCompra}`,
                    });
                });

                //* AGREGANDO SECCIÓN DE PRODUCTOS COMPRADOS

                if (comprasTotales.length < 5) {
                    let compra = [];
                    let compraLocalStorage = JSON.parse(localStorage.getItem("carrito"));
                    console.log("🚀 - compraLocalStorage", compraLocalStorage);

                    compra.push(ordenCompra);

                    for (const comprado of compraLocalStorage) {
                        compra.push(comprado);
                    }

                    comprasTotales.push(compra);
                    localStorage.setItem("compras", JSON.stringify(comprasTotales));

                    //? FILTROS PARA ENCONTRAR COMPRA

                    let contenedorProductosComprados;

                    for (let i = 1; i <= comprasTotales.length; i++) {
                        contenedorProductosComprados = document.createElement("div");
                        contenedorProductosComprados.setAttribute(
                            "class",
                            `compra${i} p-4 d-none`
                        );
                        contenedorProductosComprados.setAttribute("id", ordenCompra);
                        $(`.contenedor-compra`).append(contenedorProductosComprados);
                    }

                    console.log(ordenCompra);

                    $(".busqueda").on("input", function() {
                        if (
                            contenedorProductosComprados.id.includes($(".busqueda").val())
                        ) {
                            contenedorProductosComprados.classList.remove("d-none");
                        } else {
                            contenedorProductosComprados.classList.add("d-none");
                        }
                    });

                    //? RENDERIZADO DE PRODUCTOS COMPRADOS

                    for (let i = 1; i < compra.length; i++) {
                        let productoComprado = document.createElement("div");
                        productoComprado.innerHTML = `<div class="d-flex justify-content-around contenedor-principal-compra">
                                                                <img class="imagen-producto" src="${
                                                                  compra[i]
                                                                    .imagen
                                                                }">
                                                                <h3 class="titulo-en-compra text-center">${
                                                                  compra[i]
                                                                    .titulo
                                                                }</h3>
                                                                <div class="d-flex flex-column text-center justify-content-center align-content-center">
                                                                    <p class="texto-compra">Unidades compradas: <b class="texto-compra">${
                                                                      compra[i]
                                                                        .cantidad
                                                                    }</b></p>
                                                                    <p class="texto-compra2">Total: S/${
                                                                      compra[i]
                                                                        .precio *
                                                                      compra[i]
                                                                        .cantidad
                                                                    }.00</p>
                                                                </div>
                                                            </div>`;
                        contenedorProductosComprados.appendChild(productoComprado);
                    }

                    contadorCompras.innerText = comprasTotales.length;
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

    function crearSeccionTotal() {
        contenedorTotal.innerHTML = `
                            <div class="d-flex justify-content-between contenedor-total">
                            <div class="d-flex align-center total-completo">
                                <b>Total: S/</b><b id="numero-total">0</b>
                            </div>
                            <div class="finalizar-compra">
                                <button class="btn btn-success btn-comprar-final" id="comprar">Comprar</button>
                                <button class="btn btn-danger btn-comprar-final" id="vaciar">Vaciar</button>
                                </div>
                                </div>
                                `;

        carritoContenedor[0].appendChild(contenedorTotal);

        finalizar();
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