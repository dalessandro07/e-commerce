//! REGISTRARSE

//* BOTON PARA REGISTRARSE

botonRegistrar.addEventListener("click", validarRegistro);

function validarRegistro(e) {
    let usernameRegistrado = usernameRegistro.value;
    let passwordRegistrado = passwordRegistro.value;

    if (isNaN(usernameRegistrado) && isNaN(passwordRegistrado)) {
        if ((usernameRegistrado !== passwordRegistrado)) {

            if (((usernameRegistrado.length > 5) && (!usernameRegistrado.includes(" "))) && ((passwordRegistrado.length > 5) && (!passwordRegistrado.includes(" ")))) {
                e.preventDefault();

                //* ALMACENANDO USUARIO Y CONTRASEÑA EN EL LOCAL STORAGE

                localStorage.setItem("username", usernameRegistrado);
                localStorage.setItem("password", passwordRegistrado);

                Swal.fire({
                    icon: 'success',
                    title: '¡Cuenta registrada con éxito!',
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(function() {
                    window.location.href = "../pages/ingreso.html"
                }, 1900);

            } else {
                e.preventDefault();

                contenedorError.innerHTML = "<div class='container-error'><b class='error' style='color:red;'>* ¡El nombre de usuario y la contraseña no pueden incluir espacios en blanco!</b></div>"
                document.getElementById("contenedor-formulario").appendChild(contenedorError);
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