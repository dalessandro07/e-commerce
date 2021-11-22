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