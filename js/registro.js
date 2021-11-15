//! REGISTRARSE

//* BOTON PARA REGISTRARSE

botonRegistrar.addEventListener("click", validarRegistro);

function validarRegistro(e) {
    let usernameRegistrado = usernameRegistro.value;
    let passwordRegistrado = passwordRegistro.value;

    if (isNaN(usernameRegistrado) && isNaN(passwordRegistrado)) {
        if ((usernameRegistrado !== passwordRegistrado)) {

            if ((usernameRegistrado.length > 5) && (passwordRegistrado.length > 5)) {
                //* ALMACENANDO USUARIO Y CONTRASEÑA EN EL LOCAL STORAGE

                localStorage.setItem("username", usernameRegistrado);
                localStorage.setItem("password", passwordRegistrado);

                e.preventDefault();

                Swal.fire({
                    icon: 'success',
                    title: '¡Cuenta registrada con éxito!',
                    showConfirmButton: false,
                    footer: '<a href="../pages/ingreso.html" class="boton-entrar">¡Iniciar Sesión!</a>'
                })
            }

        } else {
            e.preventDefault();

            contenedorError.innerHTML = "<div class='container-error'><b class='error' style='color:red;'>* ¡El nombre de usuario y la contraseña no pueden estar vacíos o ser iguales!</b></div>"
            document.getElementById("contenedor-formulario").appendChild(contenedorError);
        }
    } else {
        e.preventDefault();

        contenedorError.innerHTML = "<div class='container-error'><b class='error' style='color:red;'>* ¡El nombre de usuario o la contraseña no pueden ser sólo números!</b></div>"
        document.getElementById("contenedor-formulario").appendChild(contenedorError);
    }

}