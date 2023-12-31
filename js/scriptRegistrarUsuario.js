// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/" + "api";
//-----------------------------------------------------------
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
document.getElementById('a-terminos').addEventListener('click', (event) => {
  event.preventDefault();
  console.log('clickkkkkkkkkkkkkkkkkkkk')
  window.location.href = `politica.html?correo=null`;
});

document.addEventListener("DOMContentLoaded", function () {
  const formularioUsuario = document.getElementById("formulario-usuario");

  formularioUsuario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtén los datos del formulario
    const ci = document.getElementById("ci").value;
    const nombre = document.getElementById("nombre").value.toUpperCase() + " " + document.getElementById("apePaterno").value.toUpperCase() + " " + document.getElementById("apeMaterno").value.toUpperCase();
    const correo = document.getElementById("correo").value;
    const direccion = document.getElementById("direccion").value.toUpperCase();
    const fecha_nac = document.getElementById("fecha_nac").value;
    const telefono = document.getElementById("telefono").value;

    var genero = "";
    if (document.getElementById("gridRadios1").checked) {
      genero = document.getElementById("gridRadios1").value.toUpperCase();
    } else {
      if (document.getElementById("gridRadios2").checked) {
        genero = document.getElementById("gridRadios2").value.toUpperCase();
      } else {
        genero = document.getElementById("gridRadios3").value.toUpperCase();
      }
    }

    const nombre_usuario = document.getElementById("nombre_usuario").value;

    const contrasenia = document.getElementById("contrasenia").value;
    const repitaContrasenia = document.getElementById("repita-contrasenia").value;

    // Validaciones -----------------------------------------------------
    const valNombre = /^[a-zA-Z\s]{3,30}$/;
    const valApPaterno = /^[a-zA-Z\s]{3,30}$/;
    const valApMaterno = /^[a-zA-Z\s]{3,30}$/;
    const valCi = /^[1-9]\d{5,12}$/;
    const valFechaNac = new Date(document.getElementById("fecha_nac").value);
    const valDireccion = /^[a-zA-Z0-9\s.,#-]+$/;
    const valCorreo = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const valTelefono = /^(6\d{7}|7\d{7}|2\d{6})$/;
    const valUsuario = /^[a-zA-Z\s]{3,30}$/;
    const valContrasenia = /^.{4,}$/;

    // if (!valNombre.test(document.getElementById("nombre").value)) {
    //   document.getElementById("nombre").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    //   document.getElementById("nombre").classList.add("is-invalid");
    //   setTimeout(function () {
    //     document.getElementById("nombre").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valApPaterno.test(document.getElementById("apePaterno").value)) {
    //   document.getElementById("apePaterno").scrollIntoView({ behavior: "smooth" });
    //   document.getElementById("apePaterno").classList.add("is-invalid");
    //   setTimeout(function () {
    //     document.getElementById("apePaterno").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valApMaterno.test(document.getElementById("apeMaterno").value)) {
    //   document.getElementById("apeMaterno").classList.add("is-invalid");
    //   document.getElementById("apeMaterno").scrollIntoView({ behavior: "smooth" });
    //   setTimeout(function () {
    //     document.getElementById("apeMaterno").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valCi.test(document.getElementById("ci").value)) {
    //   document.getElementById("ci").classList.add("is-invalid");
    //   document.getElementById("ci").scrollIntoView({ behavior: "smooth" });
    //   setTimeout(function () {
    //     document.getElementById("ci").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // const fechaActual = new Date();
    // const edad = fechaActual.getFullYear() - valFechaNac.getFullYear();
    // if (edad < 18 || (edad === 18 && (valFechaNac.getMonth() > fechaActual.getMonth() || (valFechaNac.getMonth() === fechaActual.getMonth() && valFechaNac.getDate() > fechaActual.getDate())))) {
    //   document.getElementById("fecha_nac").classList.add("is-invalid");
    //   document.getElementById("fecha_nac").scrollIntoView({ behavior: "smooth" });
    //   setTimeout(function () {
    //     document.getElementById("fecha_nac").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valDireccion.test(document.getElementById("direccion").value)) {
    //   document.getElementById("direccion").classList.add("is-invalid");
    //   document.getElementById("direccion").scrollIntoView({ behavior: "smooth" });
    //   setTimeout(function () {
    //     document.getElementById("direccion").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valCorreo.test(document.getElementById("correo").value)) {
    //   document.getElementById("correo").classList.add("is-invalid");
    //   document.getElementById("correo").scrollIntoView({ behavior: "smooth" });
    //   setTimeout(function () {
    //     document.getElementById("correo").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valTelefono.test(document.getElementById("telefono").value)) {
    //   document.getElementById("telefono").classList.add("is-invalid");
    //   document.getElementById("telefono").scrollIntoView({ behavior: "smooth" });
    //   setTimeout(function () {
    //     document.getElementById("telefono").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valUsuario.test(document.getElementById("nombre_usuario").value)) {
    //   document.getElementById("nombre_usuario").classList.add("is-invalid");
    //   document.getElementById("nombre_usuario").scrollIntoView({ behavior: "smooth" });
    //   setTimeout(function () {
    //     document.getElementById("nombre_usuario").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valContrasenia.test(document.getElementById("contrasenia").value)) {
    //   document.getElementById("contrasenia").classList.add("is-invalid");
    //   document.getElementById("contrasenia").scrollIntoView({ behavior: "smooth" });
    //   setTimeout(function () {
    //     document.getElementById("contrasenia").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }


    if (contrasenia != repitaContrasenia) {
      document.getElementById("errorContrasenia").style.display = "block";
      setTimeout(function () {
        document.getElementById("errorContrasenia").style.display = "none";
      }, 5000);

      //alert("las contraseñas no coinciden");
      return;
    }
    //----------------------------------------------------------------------------------





    const input_imagenUsuarioEditar = document.getElementById('input-imagenUsuario');
    const archivoImagenUsuarioEditar = input_imagenUsuarioEditar.files[0];
    const formDataUsuario = new FormData();

    // Crea un objeto con los datos del nuevo usuario
    const nuevoUsuario = {
      ci: ci,
      nombre: nombre,
      fecha_nac: fecha_nac,
      genero: genero,
      direccion: direccion,
      correo: correo,
      telefono: telefono,
      nombre_usuario: nombre_usuario,
      contrasenia: contrasenia,
      reg: 1 // el valor 1 indica que el usuario se registra solo, 2 cuando lo agrega un administrador
    };

    formDataUsuario.append("ci", nuevoUsuario.ci);
    formDataUsuario.append("nombre", nuevoUsuario.nombre);
    formDataUsuario.append("fecha_nac", nuevoUsuario.fecha_nac);
    formDataUsuario.append("genero", nuevoUsuario.genero);
    formDataUsuario.append("direccion", nuevoUsuario.direccion);
    formDataUsuario.append("correo", nuevoUsuario.correo);
    formDataUsuario.append("telefono", nuevoUsuario.telefono);
    formDataUsuario.append("nombre_usuario", nuevoUsuario.nombre_usuario);
    formDataUsuario.append("contrasenia", nuevoUsuario.contrasenia);
    formDataUsuario.append("image", archivoImagenUsuarioEditar);

    // Realiza una solicitud POST al backend
    fetch(`${ruta}/usuario_normal`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(nuevoUsuario),
      body: formDataUsuario
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el usuario");
        }
        return response.json(); // Si el backend devuelve una respuesta JSON
      })
      .then((data) => {
        // El usuario ha sido agregado exitosamente
        console.log("Usuario agregado:", data);
        // alert("Te registrate con exito !!!");
        // document.getElementById("usuarioRegistrado").style.display = "block";
        // setTimeout(function () {
        //   document.getElementById("usuarioRegistrado").style.display = "none";
        // }, 5000);
        window.location.href = `inicio_sesion.html`;
      })
      .catch((error) => {
        console.error(error);
        // Maneja el error, muestra un mensaje de error, etc.
      });
  });
});

