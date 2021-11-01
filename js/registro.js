//! REGISTRARSE

//* BOTON PARA REGISTRARSE

botonRegistrar.addEventListener("click", validarRegistro);

function validarRegistro(e) {
    let usernameRegistrado = usernameRegistro.value;
    let passwordRegistrado = passwordRegistro.value;

    if (isNaN(usernameRegistrado) || isNaN(passwordRegistrado)) {
        if ((usernameRegistrado !== passwordRegistrado) && (usernameRegistrado.length > 0) && (passwordRegistrado.length > 0)) {

            //* ALMACENANDO USUARIO Y CONTRASEÑA EN EL LOCAL STORAGE

            localStorage.setItem("username", usernameRegistrado);
            localStorage.setItem("password", passwordRegistrado);

            e.preventDefault();

            contenedorError.innerHTML = `<b class='error d-block m-5' style='color:green;'>* ${usernameRegistrado} ¡Te has registrado con éxito! ✅</b> <a href="../pages/ingreso.html" class="boton-entrar">Iniciar Sesión</a>`
            document.getElementById("contenedor-formulario").appendChild(contenedorError);
        } else {
            e.preventDefault();

            contenedorError.innerHTML = "<div class='container-error'><b class='error' style='color:red;'>* ¡El nombre de usuario y la contraseña no pueden estar vacíos o ser iguales!</b></div>"
            document.getElementById("contenedor-formulario").appendChild(contenedorError);
        }
    } else {
        e.preventDefault();

        contenedorError.innerHTML = "<div class='container-error'><b class='error' style='color:red;'>* ¡El nombre de usuario y la contraseña no pueden ser sólo números!</b></div>"
        document.getElementById("contenedor-formulario").appendChild(contenedorError);
    }

}