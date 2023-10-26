// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/" + "api";
// --------------------------------------------------------------------
const h1_nomasviolencia = document.getElementById("h1-nomasviolencia");
h1_nomasviolencia.addEventListener("click", function (event) {
  event.preventDefault();
  const nuevaURL = `index.html?correo=null`;
  window.location.href = nuevaURL;
});
const a_inicio = document.getElementById("a-inicio");
a_inicio.addEventListener("click", function (event) {
  event.preventDefault();
  const nuevaURL = `index.html?correo=null`;
  window.location.href = nuevaURL;
});
const a_actividad = document.getElementById("a-actividad");
a_actividad.addEventListener("click", function (event) {
  event.preventDefault();
  const nuevaURL = `actividad.html?correo=null`;
  window.location.href = nuevaURL;
});
const a_recurso = document.getElementById("a-recurso");
a_recurso.addEventListener("click", function (event) {
  event.preventDefault();
  const nuevaURL = `recurso.html?correo=null`;
  window.location.href = nuevaURL;
});
const a_denunciaPublica = document.getElementById("a-denunciaPublica");
a_denunciaPublica.addEventListener("click", function (event) {
  event.preventDefault();
  const nuevaURL = `denunciaPublica.html?correo=null`;
  window.location.href = nuevaURL;
});
const a_instituciones = document.getElementById("a-institucion");
a_instituciones.addEventListener("click", function (event) {
  event.preventDefault();
  const nuevaURL = `instituciones.html?correo=null`;
  window.location.href = nuevaURL;
});
const a_evaluacion = document.getElementById("a-evaluacion");
a_evaluacion.addEventListener("click", function (event) {
  event.preventDefault();
  const nuevaURL = `evaluacion.html?correo=null`;
  window.location.href = nuevaURL;
});
const a_politica = document.getElementById("a-politica");
a_politica.addEventListener("click", function (event) {
  event.preventDefault();
  const nuevaURL = `politica.html?correo=null`;
  window.location.href = nuevaURL;
});
// --------------------------------------------------------------------


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
    fetch(`${ruta}/auth/login`, {
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
        if ('usuario inabilitado' == data.message) {
          document.getElementById('errorHabilitado').style.display = 'block';
          setTimeout(() => {
            document.getElementById('errorHabilitado').style.display = 'none';
          }, 15000);
        } else {
          const correologin = data.data.correo;
          const id_usuario = data.data.id_usuario;
          const rol = data.data.rol;
          const id_administrador = data.data.id_administrador;
  
          if (rol == "usuario_normal") {
            window.location.href = `index.html?correo=${correologin}&id_usuario=${id_usuario}&rol=${rol}`;
          } else {
            window.location.href = `indexAdministrador.html?correo=${correologin}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_administrador}`;
          }
        }


      })
      .catch((error) => {
        console.error(error);
        
        document.getElementById('errorlogin').style.display = 'block';
        setTimeout(() => {
          document.getElementById('errorlogin').style.display = 'none';
        }, 5000);
        // Maneja el error, muestra un mensaje de error, etc.
      });
  });

  document.getElementById('a-olvidaste').addEventListener('click', () => {
    document.getElementById('form-editarUsuario').addEventListener('submit', (event) => {
      event.preventDefault();
      const ci_usuario = document.getElementById('input-ciUsuarioEditar').value;
      const correo_usuario = document.getElementById('input-correoUsuarioEditar').value;
      const nuevo_password_usuario = document.getElementById('input-passwordUsuarioEditar').value;

      const nuevoUsuarioEditar = {
        ci: ci_usuario,
        correo: correo_usuario,
        contrasenia: nuevo_password_usuario
      };
      console.log(nuevoUsuarioEditar);
      fetch(`${ruta}/usuario/${correo_usuario}/${nuevo_password_usuario}/${ci_usuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuarioEditar),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al editar contrasenia");
          }
          return response.json(); // Si el backend devuelve una respuesta JSON
        })
        .then((data) => {
          // El usuario ha sido agregado exitosamente
          console.log("Contrasenia modificada", data);
          window.location.href = `inicio_sesion.html?correo=null`;
        })
        .catch((error) => {
          console.error(error);
          document.getElementById('div-errores').style.display = 'block';
          setTimeout(() => {
            document.getElementById('div-errores').style.display = 'none';
          }, 5000);
          // Maneja el error, muestra un mensaje de error, etc.
        });
    });
  });
});

