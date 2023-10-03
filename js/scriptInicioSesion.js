document.addEventListener("DOMContentLoaded", function () {
  const formularioUsuario = document.getElementById("form-inicioSesion");

  formularioUsuario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtén los datos del formulario
    const correo = document.getElementById("input-correo").value;
    const contrasenia = document.getElementById("input-contrasenia").value;
    // Crea un objeto con los datos del nuevo usuario
    const usuario = {
      correo: correo,
      contrasenia: contrasenia
      // Agrega otros campos aquí según corresponda
    };

    // Realiza una solicitud POST al backend
    fetch("http://127.0.0.1:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al iniciar sesion");
        }
        return response.json(); // Si el backend devuelve una respuesta JSON
      })
      .then((data) => {
        // El usuario ha sido agregado exitosamente
        console.log("Se inicio sesion:", data);
        const correologin = data.data.correo;
        const id_usuario = data.data.id_usuario;
        const rol = data.data.rol;

        if (rol == "usuario_normal") {
          window.location.href = `index.html?correo=${correologin}&id_usuario=${id_usuario}&rol=${rol}`;
        }else{
          window.location.href = `indexAdministrador.html?correo=${correologin}&id_usuario=${id_usuario}&rol=${rol}`;
        }

      })
      .catch((error) => {
        console.error(error);
        // Maneja el error, muestra un mensaje de error, etc.
      });
  });
});

