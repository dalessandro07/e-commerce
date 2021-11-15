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

        Swal.fire({
            icon: 'success',
            title: '¡Sesión iniciada correctamente!',
            showConfirmButton: false,
            footer: '<a href="../pages/productos.html" class="boton-entrar">¡Ver Productos!</a>'
        })

    } else {
        e.preventDefault();
        contenedorError.innerHTML = "<b class='error' style='color:red;'>* ¡Ingresaste un nombre de usuario o contraseña incorrecto, inténtalo de nuevo!</b>"
        document.getElementById("contenedor-formulario").appendChild(contenedorError);
    }

}