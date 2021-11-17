//! REGISTRARSE

//* BOTON PARA REGISTRARSE

botonRegistrar.addEventListener("click", validarRegistro);

function validarRegistro(e) {
    let caracteresEspeciales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let usernameRegistrado = usernameRegistro.value;
    let passwordRegistrado = passwordRegistro.value;

    if (isNaN(usernameRegistrado) && isNaN(passwordRegistrado)) {
        if ((usernameRegistrado !== passwordRegistrado)) {

            if (((usernameRegistrado.length > 6) && (!usernameRegistrado.includes(" ")) && (!usernameRegistrado.match(caracteresEspeciales))) && ((passwordRegistrado.length > 6) && (!passwordRegistrado.includes(" ")) && (!passwordRegistrado.match(caracteresEspeciales)))) {
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

                contenedorError.innerHTML = "<div class='container-error'><b class='error' style='color:red;'>* ¡El nombre de usuario y la contraseña deben incluir más de 6 caracteres y no pueden incluir espacios en blanco ni caracteres especiales!</b></div>"
                document.getElementById("contenedor-formulario").appendChild(contenedorError);
            }

        } else {
            e.preventDefault();

            contenedorError.innerHTML = "<div class='container-error'><b class='error' style='color:red;'>* ¡El nombre de usuario y la contraseña no pueden estar vacíos o ser iguales!</b></div>"
            document.getElementById("contenedor-formulario").appendChild(contenedorError);
        }
    } else {
        e.preventDefault();

        contenedorError.innerHTML = "<div class='container-error'><b class='error' style='color:red;'>* ¡El nombre de usuario o la contraseña no pueden estar vacíos o ser sólo números!</b></div>"
        document.getElementById("contenedor-formulario").appendChild(contenedorError);
    }

}