//! INICIAR SESIÓN

//* BOTON PARA INGRESAR

botonEntrar.addEventListener("click", validarIngreso);

function validarIngreso(e) {

    let usernameIngresado = username.value;
    let passwordIngresado = password.value;

    let usernameCreado = localStorage.getItem("username");
    let passwordCreado = localStorage.getItem("password");

    if ((usernameIngresado === usernameCreado) && (passwordIngresado === passwordCreado)) {
        e.preventDefault();

        contenedorError.innerHTML = `<b class='error d-block m-5' style='color:green;'>* ¡Sesión iniciada correctamente! ✅</b> <a href="../pages/productos.html" class="boton-entrar">Ver productos</a>`
        document.getElementById("contenedor-formulario").appendChild(contenedorError);
    } else {
        e.preventDefault();
        contenedorError.innerHTML = "<b class='error' style='color:red;'>* ¡Ingresaste un nombre de usuario o contraseña incorrecto, inténtalo de nuevo!</b>"
        document.getElementById("contenedor-formulario").appendChild(contenedorError);
    }

}