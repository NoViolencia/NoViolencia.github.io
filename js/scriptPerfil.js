// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/"+"api";
//---------------------------------------------------------------
const valNombreUsuario = /^[a-zA-Z\s]{3,30}$/;
const valCiUsuario = /^[1-9]\d{5,12}$/;
const valFechaNacUsuario = new Date(document.getElementById("input-fechaUsuarioEditar").value);;
const valDireccionUsuario = /^[a-zA-Z0-9\s.,#-]+$/;
const valCorreoUsuario = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
const valTelefonoUsuario = /^(6\d{7}|7\d{7}|2\d{6})$/;
const valUsuarioUsuario = /^[a-zA-Z\s]{3,30}$/;
const valContraseniaUsuario = /^.{4,}$/;
//---------------------------------------------------------------
const queryString = window.location.search;
const urlParams = new URLSearchParams(window.location.search);
const correoUsuario = urlParams.get('correo');
const id_usuario = urlParams.get('id_usuario');
const rol = urlParams.get('rol');
if (correoUsuario != 'null') {
  document.getElementById('btnRegInicio').style.display = 'none';
  document.getElementById('correoUsuario').style.display = 'block';
  document.getElementById('spanCorreo').textContent = correoUsuario;
  document.getElementById('h6nomUsuario').textContent = correoUsuario;
  document.getElementById('a-evaluacion').style.display = 'block';
}
const cerrarSesionLink = document.getElementById("cerrar_sesion");
cerrarSesionLink.addEventListener("click", function (event) {
  window.location.href = 'index.html';
});

document.addEventListener("DOMContentLoaded", function () {
  const h1_nomasviolencia = document.getElementById("h1-nomasviolencia");
  h1_nomasviolencia.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `index.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_inicio = document.getElementById("a-inicio");
  a_inicio.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `index.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_actividad = document.getElementById("a-actividad");
  a_actividad.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `actividad.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_recurso = document.getElementById("a-recurso");
  a_recurso.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `recurso.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_denunciaPublica = document.getElementById("a-denunciaPublica");
  a_denunciaPublica.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `denunciaPublica.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_instituciones = document.getElementById("a-institucion");
  a_instituciones.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `instituciones.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_evaluacion = document.getElementById("a-evaluacion");
  a_evaluacion.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `evaluacion.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_politica = document.getElementById("a-politica");
  a_politica.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `politica.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_perfil = document.getElementById("a-perfil");
  a_perfil.addEventListener("click", function (event) {
    event.preventDefault();
    const nuevaURL = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  //--------------------------DATOS DE PERFIL---------------------------------------
  fetch(`${ruta}/usuario_normal/${id_usuario}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener datos de usuario');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then((usuario) => {
      const strong_nombreUsuarioPerfil = document.getElementById('strong-nombreUsuarioPerfil');
      const h4_correoUsuarioPerfil = document.getElementById('h4-correoUsuarioPerfil');

      const span_ciPerfil = document.getElementById('span-ciPerfil');
      const span_nombrePerfil = document.getElementById('span-nombrePerfil');
      const span_fechaNacPerfil = document.getElementById('span-fechaNacPerfil');
      const span_generoPerfil = document.getElementById('span-generoPerfil');
      const span_direccionPerfil = document.getElementById('span-direccionPerfil');
      const span_correoPerfil = document.getElementById('span-correoPerfil');
      const span_telefonoPerfil = document.getElementById('span-telefonoPerfil');
      const span_userPerfil = document.getElementById('span-userPerfil');
      const img_usuarioPerfil = document.getElementById('img-usuarioPerfil');
      img_usuarioPerfil.style.objectFit = 'cover';

      // Asignando datos
      strong_nombreUsuarioPerfil.textContent = usuario.data.Usuario.nombre;
      h4_correoUsuarioPerfil.textContent = usuario.data.Usuario.correo;

      span_ciPerfil.textContent = usuario.data.Usuario.ci;
      span_nombrePerfil.textContent = usuario.data.Usuario.nombre;
      // let fechaA = new Date(usuario.data.Usuario.fecha_nac);
      // let fechaFormateada = `${fechaA.getDate()}/${fechaA.getMonth()}/${fechaA.getFullYear()}`;
      let fechaA = new Date(usuario.data.Usuario.fecha_nac);
      // let fechaFormateada = `${fechaA.getDate()}/${fechaA.);
      let fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
      span_fechaNacPerfil.textContent = fechaFormateada;
      span_generoPerfil.textContent = usuario.data.Usuario.genero;
      span_direccionPerfil.textContent = usuario.data.Usuario.direccion;
      span_correoPerfil.textContent = usuario.data.Usuario.correo;
      span_telefonoPerfil.textContent = usuario.data.Usuario.telefono;
      span_userPerfil.textContent = usuario.data.Usuario.nombre_usuario;
      // console.log(ususario.data);
      img_usuarioPerfil.src = usuario.data.Usuario.Imagen_perfil;



      //BOTON MODIFICAR DATOS
      const btn_modificarDatos = document.getElementById('btn-modificarDatos');
      btn_modificarDatos.addEventListener('click', () => {
        document.getElementById("input-ciUsuarioEditar").value = usuario.data.Usuario.ci;
        document.getElementById("input-nomUsuarioEditar").value = usuario.data.Usuario.nombre;
        let fechaA = new Date(usuario.data.Usuario.fecha_nac);
        // let fechaFormateada = `${fechaA.getDate()}/${fechaA.);
        // Ajusta la fecha a la zona horaria del usuario
        let año = fechaA.getUTCFullYear();
        let mes = (fechaA.getUTCMonth() + 1).toString().padStart(2, '0'); // Agregamos 1 porque los meses en JavaScript comienzan desde 0
        let dia = (fechaA.getUTCDate()).toString().padStart(2, '0');
        let fechaFormateada = `${año}-${mes}-${dia}`;
        document.getElementById("input-fechaUsuarioEditar").value = fechaFormateada;
        document.getElementById("input-direccionUsuarioEditar").value = usuario.data.Usuario.direccion;
        document.getElementById("input-correoUsuarioEditar").value = usuario.data.Usuario.correo;
        document.getElementById("input-telefonoUsuarioEditar").value = usuario.data.Usuario.telefono;
        document.getElementById("input-userUsuarioEditar").value = usuario.data.Usuario.nombre_usuario;
        document.getElementById("input-passwordUsuarioEditar").value = usuario.data.Usuario.contrasenia;
        if (usuario.data.Usuario.genero == 'MASCULINO') {
          document.getElementById("gridRadios1Editar").checked = true;
        }
        if (usuario.data.Usuario.genero == 'FEMENINO') {
          document.getElementById("gridRadios2Editar").checked = true;
        }
        if (usuario.data.Usuario.genero == 'OTRO') {
          document.getElementById("gridRadios3Editar").checked = true;
        }

        document.getElementById('img-usuarioPerfilEditar').style.objectFit = 'cover';
        document.getElementById('img-usuarioPerfilEditar').src = usuario.data.Usuario.Imagen_perfil;


        document.getElementById('input-imagenPerfil').addEventListener('change', function (e) {
          const imagenSeleccionada = e.target.files[0];
          const imagenUsuarioPerfil = document.getElementById('img-usuarioPerfilEditar');

          // Verifica si se seleccionó una imagen
          if (imagenSeleccionada) {
            const urlImagen = URL.createObjectURL(imagenSeleccionada);
            imagenUsuarioPerfil.src = urlImagen;
          }
        });


        const formEditarUsuario = document.getElementById("form-editarUsuario");
        formEditarUsuario.addEventListener('submit', function (event) {
          event.preventDefault();
          const ciUsuarioE = document.getElementById("input-ciUsuarioEditar").value;
          const nomUsuarioE = document.getElementById("input-nomUsuarioEditar").value.toUpperCase();
          const fechaUsuarioE = document.getElementById("input-fechaUsuarioEditar").value;
          // const generoUsuarioE = document.getElementById("input-generoUsuarioEditar").value;
          var generoUsuarioE = "";
          if (document.getElementById("gridRadios1Editar").checked) {
            generoUsuarioE = document.getElementById("gridRadios1Editar").value.toUpperCase();
          } else {
            if (document.getElementById("gridRadios2Editar").checked) {
              generoUsuarioE = document.getElementById("gridRadios2Editar").value.toUpperCase();
            } else {
              generoUsuarioE = document.getElementById("gridRadios3Editar").value.toUpperCase();
            }
          }
          const direccionUsuarioE = document.getElementById("input-direccionUsuarioEditar").value.toUpperCase();
          const correoUsuarioE = document.getElementById("input-correoUsuarioEditar").value;
          const telefonoUsuarioE = document.getElementById("input-telefonoUsuarioEditar").value;
          const userUsuarioE = document.getElementById("input-userUsuarioEditar").value;
          const paswordUsuarioE = document.getElementById("input-passwordUsuarioEditar").value;

          // if (!valCiUsuario.test(ciUsuarioE)) {
          //   document.getElementById("input-ciUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          //   document.getElementById("input-ciUsuarioEditar").classList.add("is-invalid");
          //   setTimeout(function () {
          //     document.getElementById("input-ciUsuarioEditar").classList.remove("is-invalid");
          //   }, 30000);
          //   return;
          // }
          // if (!valNombreUsuario.test(nomUsuarioE)) {
          //   document.getElementById("input-nomUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          //   document.getElementById("input-nomUsuarioEditar").classList.add("is-invalid");
          //   setTimeout(function () {
          //     document.getElementById("input-nomUsuarioEditar").classList.remove("is-invalid");
          //   }, 30000);
          //   return;
          // }
          // const fechaActualEditar = new Date();
          // const edadEditar = fechaActualEditar.getFullYear() - valFechaNacUsuario.getFullYear();
          // if (edadEditar < 18 || (edadEditar === 18 && (valFechaNacUsuario.getMonth() > fechaActualEditar.getMonth() || (valFechaNacUsuario.getMonth() === fechaActualEditar.getMonth() && valFechaNacUsuario.getDate() > fechaActualEditar.getDate())))) {
          //   document.getElementById("input-fechaUsuarioEditar").classList.add("is-invalid");
          //   document.getElementById("input-fechaUsuarioEditar").scrollIntoView({ behavior: "smooth" });
          //   setTimeout(function () {
          //     document.getElementById("input-fechaUsuarioEditar").classList.remove("is-invalid");
          //   }, 30000);
          //   return;
          // }
          // if (!valDireccionUsuario.test(direccionUsuarioE)) {
          //   document.getElementById("input-direccionUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          //   document.getElementById("input-direccionUsuarioEditar").classList.add("is-invalid");
          //   setTimeout(function () {
          //     document.getElementById("input-direccionUsuarioEditar").classList.remove("is-invalid");
          //   }, 30000);
          //   return;
          // }
          // if (!valCorreoUsuario.test(correoUsuarioE)) {
          //   document.getElementById("input-correoUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          //   document.getElementById("input-correoUsuarioEditar").classList.add("is-invalid");
          //   setTimeout(function () {
          //     document.getElementById("input-correoUsuarioEditar").classList.remove("is-invalid");
          //   }, 30000);
          //   return;
          // }
          // if (!valTelefonoUsuario.test(telefonoUsuarioE)) {
          //   document.getElementById("input-telefonoUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          //   document.getElementById("input-telefonoUsuarioEditar").classList.add("is-invalid");
          //   setTimeout(function () {
          //     document.getElementById("input-telefonoUsuarioEditar").classList.remove("is-invalid");
          //   }, 30000);
          //   return;
          // }
          // if (!valUsuarioUsuario.test(userUsuarioE)) {
          //   document.getElementById("input-userUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          //   document.getElementById("input-userUsuarioEditar").classList.add("is-invalid");
          //   setTimeout(function () {
          //     document.getElementById("input-userUsuarioEditar").classList.remove("is-invalid");
          //   }, 30000);
          //   return;
          // }
          // if (!valContraseniaUsuario.test(paswordUsuarioE)) {
          //   document.getElementById("input-passwordUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          //   document.getElementById("input-passwordUsuarioEditar").classList.add("is-invalid");
          //   setTimeout(function () {
          //     document.getElementById("input-passwordUsuarioEditar").classList.remove("is-invalid");
          //   }, 30000);
          //   return;
          // }

          const input_imagenPerfil = document.getElementById('input-imagenPerfil');
          const archivoImagenPerfil = input_imagenPerfil.files[0];
          const formDataPerfil = new FormData();

          const usuarioEditado = {
            ci: ciUsuarioE,
            nombre: nomUsuarioE,
            fecha_nac: fechaUsuarioE,
            genero: generoUsuarioE,
            direccion: direccionUsuarioE,
            // correo: correoUsuarioE,
            telefono: telefonoUsuarioE,
            nombre_usuario: userUsuarioE,
            contrasenia: paswordUsuarioE
            // Agrega otros campos aquí según corresponda
          };

          formDataPerfil.append("ci", usuarioEditado.ci);
          formDataPerfil.append("nombre", usuarioEditado.nombre);
          formDataPerfil.append("fecha_nac", usuarioEditado.fecha_nac);
          formDataPerfil.append("genero", usuarioEditado.genero);
          formDataPerfil.append("direccion", usuarioEditado.direccion);
          // formDataPerfil.append("correo", usuarioEditado.correo);
          formDataPerfil.append("telefono", usuarioEditado.telefono);
          formDataPerfil.append("nombre_usuario", usuarioEditado.nombre_usuario);
          formDataPerfil.append("contrasenia", usuarioEditado.contrasenia);
          formDataPerfil.append("image", archivoImagenPerfil);


          fetch(`${ruta}/usuario_normal/${id_usuario}`, {
            method: "PUT",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            // body: JSON.stringify(usuarioEditado)
            body: formDataPerfil
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al editar el Usuario");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Usuario editado:", data);
              window.location.href = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
            })
            .catch((error) => {
              console.error(error);
            });
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });;

  // CONTACTOS 
  const tablaContactos = document.getElementById('tabla-contactos');
  const valNombreContacto = /^[a-zA-Z\s]{3,30}$/;
  const valNumeroContacto = /^(6\d{7}|7\d{7}|2\d{6})$/;

  fetch(`${ruta}/contacto/usuario/${id_usuario}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener los contactos');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then((contactos) => {
      contactos.data.forEach((objeto) => {
        const fila = document.createElement('tr');
        const celdaNombreContacto = document.createElement('td');
        const celdaTelefonoContacto = document.createElement('td');
        const celdaEditar = document.createElement('td');
        const celdaEliminar = document.createElement('td');

        let idContacto = objeto.id_contacto;
        celdaNombreContacto.textContent = objeto.nombre_contacto;
        celdaTelefonoContacto.textContent = objeto.telefono;

        //BOTON EDITAR
        const btnEditar = document.createElement('button');
        btnEditar.title = "Editar";
        btnEditar.classList.add('btn', 'btn-editar');
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#modal-editarContacto');
        const iconoEditar = document.createElement('i');
        iconoEditar.classList.add('fas', 'fa-edit');
        btnEditar.style.color = "#34A3FF";
        btnEditar.appendChild(iconoEditar);
        btnEditar.addEventListener('click', () => {
          document.getElementById("input-nomContactoEditar").value = celdaNombreContacto.textContent;
          document.getElementById("input-numContactoEditar").value = celdaTelefonoContacto.textContent;
          const formEditarContacto = document.getElementById("form-editarContacto");

          formEditarContacto.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log("click en guardar");
            // console.log(idContacto);
            // const id_usuario = ;
            const nombreContactoE = document.getElementById("input-nomContactoEditar").value;
            const numeroContactoE = document.getElementById("input-numContactoEditar").value;
            if (!valNombreContacto.test(nombreContactoE)) {
              document.getElementById("input-nomContactoEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
              document.getElementById("input-nomContactoEditar").classList.add("is-invalid");
              setTimeout(function () {
                document.getElementById("input-nomContactoEditar").classList.remove("is-invalid");
              }, 30000);
              return;
            }
            if (!valNumeroContacto.test(numeroContactoE)) {
              document.getElementById("input-numContactoEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
              document.getElementById("input-numContactoEditar").classList.add("is-invalid");
              setTimeout(function () {
                document.getElementById("input-numContactoEditar").classList.remove("is-invalid");
              }, 30000);
              return;
            }

            // Creando un objeto
            const contactoEditado = {
              nombre_contacto: nombreContactoE,
              telefono: numeroContactoE,
              // id_usuario: id_usuario;
            };
            fetch(`${ruta}/contacto/${idContacto}/usuario/${id_usuario}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contactoEditado)
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al editar el contacto");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Contacto editado:", data);
                window.location.href = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
              })
              .catch((error) => {
                console.error(error);
              });
          });
        });

        //BOTON ELIMINAR
        const btnEliminar = document.createElement('button');
        btnEliminar.title = "Eliminar";
        btnEliminar.classList.add('btn', 'btn-eliminar');
        btnEliminar.setAttribute('data-bs-toggle', 'modal');
        btnEliminar.setAttribute('data-bs-target', '#modal-eliminarContacto');
        const iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash-alt');
        btnEliminar.style.color = "red";
        btnEliminar.appendChild(iconoEliminar);
        btnEliminar.addEventListener('click', () => {
          document.getElementById("p-contacto").textContent = celdaNombreContacto.textContent + " con número Teléfono/Celular " + celdaTelefonoContacto.textContent;

          const btnSIeliminar = document.getElementById("btn-SIeliminarContacto");
          btnSIeliminar.addEventListener('click', () => {
            fetch(`${ruta}/contacto/${idContacto}/usuario/${id_usuario}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              }
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al eliminar el contacto");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Contacto eliminado:", data);
                window.location.href = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
              })
              .catch((error) => {
                console.error(error);
              });
          });
        });

        celdaEditar.appendChild(btnEditar);
        celdaEliminar.appendChild(btnEliminar);

        fila.appendChild(celdaNombreContacto);
        fila.appendChild(celdaTelefonoContacto);
        fila.appendChild(celdaEditar);
        fila.appendChild(celdaEliminar);

        tablaContactos.querySelector('tbody').appendChild(fila);
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // REGISTRAR CONTACTO
  const formRegistrarContracto = document.getElementById("form-registrarContacto");
  formRegistrarContracto.addEventListener("submit", function (event) {
    event.preventDefault();

    // const id_usuario = io;
    const nombreContacto = document.getElementById("input-nomContacto").value;
    const numeroContacto = document.getElementById("input-numContacto").value;

    // if (!valNombreContacto.test(nombreContacto)) {
    //   document.getElementById("input-nomContacto").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    //   document.getElementById("input-nomContacto").classList.add("is-invalid");
    //   setTimeout(function () {
    //     document.getElementById("input-nomContacto").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }
    // if (!valNumeroContacto.test(numeroContacto)) {
    //   document.getElementById("input-numContacto").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    //   document.getElementById("input-numContacto").classList.add("is-invalid");
    //   setTimeout(function () {
    //     document.getElementById("input-numContacto").classList.remove("is-invalid");
    //   }, 30000);
    //   return;
    // }

    // Creando un objeto
    const nuevoContacto = {
      nombre_contacto: nombreContacto,
      telefono: numeroContacto,
      id_usuario: id_usuario
      // id_usuario: id_usuario;
    };

    fetch(`${ruta}/contacto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoContacto)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el contacto");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Contacto agregado:", data);
        window.location.href = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
      })
      .catch((error) => {
        console.error(error);
      });
  });
  //---------------------------------------------------------------














  //------------------------------------------------------------------------
  // DENUNCIAS
  const tablaDenuncia = document.getElementById('tabla-denuncias');
  // const valNombreContacto = /^[a-zA-Z\s]{3,30}$/;
  // const valNumeroContacto = /^(6\d{7}|7\d{7}|2\d{6})$/;

  fetch(`${ruta}/denuncia/usuario_normal/${id_usuario}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener las denuncias');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then((denuncia) => {
      denuncia.data.forEach((objeto) => {
        const fila = document.createElement('tr');
        const celdaEstado = document.createElement('td');
        const celdaNombreVictima = document.createElement('td');
        const celdaNombreAgresor = document.createElement('td');
        const celdaVerDenuncia = document.createElement('td');
        const celdaEditar = document.createElement('td');
        const celdaEliminar = document.createElement('td');
        const celdaTipoViolencia = document.createElement('td');
        const celdaTipoDenuncia = document.createElement('td');
        const celdaFecha = document.createElement('td');
        const celdaDescripcion = document.createElement('td');
        const celdaPruebas = document.createElement('td');
        const celdaUbicacion = document.createElement('td');
        const celdaIdDenuncia = document.createElement('td');



        let idContacto = objeto.id_usuario;

        celdaIdDenuncia.textContent = objeto.id_denuncia;
        celdaNombreVictima.textContent = objeto.nombre_victima;
        celdaNombreAgresor.textContent = objeto.nombre_agresor;
        celdaTipoViolencia.textContent = objeto.tipo_violencia;
        celdaTipoDenuncia.textContent = objeto.tipo_denuncia;
        celdaFecha.textContent = objeto.fecha;
        celdaDescripcion.textContent = objeto.descripcion;
        celdaPruebas.textContent = objeto.pruebas;
        celdaUbicacion.textContent = objeto.ubicacion;
        celdaEstado.textContent = objeto.estado;

        //BOTON EDITAR
        const btnEditar = document.createElement('button');
        btnEditar.title = "ver denuncia";
        btnEditar.classList.add('btn', 'btn-editar');
        btnEditar.setAttribute('data-bs-toggle', 'modal');
        btnEditar.setAttribute('data-bs-target', '#modal-editarDenuncia');
        const iconoEditar = document.createElement('i');
        iconoEditar.classList.add('fas', 'fa-edit');
        btnEditar.style.color = "#34A3FF";
        btnEditar.appendChild(iconoEditar);
        btnEditar.addEventListener('click', () => {
          const idDenuncia = celdaIdDenuncia.textContent;

          fetch(`${ruta}/denuncia/${idDenuncia}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error al obtener las denuncia');
              }
              return response.json(); // Convierte la respuesta a JSON
            })
            .then((denuncia) => {

              const fechaHora = new Date(objeto.fecha);

              // Obtener los componentes de fecha necesarios (año, mes, día)
              const año = fechaHora.getFullYear();
              const mes = String(fechaHora.getMonth() + 1).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
              const día = String(fechaHora.getDate()).padStart(2, '0');

              document.getElementById("input-nomDenunciaEditar").value = objeto.nombre_victima;
              document.getElementById("input-nomAgresor").value = objeto.nombre_agresor;
              document.getElementById("input-tipoViolenci").value = objeto.tipo_violencia;
              const radioElement = document.getElementById('gridRadios11');
              const radioElement2 = document.getElementById('gridRadios22');
              console.log(objeto.tipo_denuncia);
              if (objeto.tipo_denuncia == "publica") {
                radioElement.checked = true;
              }
              if (objeto.tipo_denuncia == "privada") {
                radioElement2.checked = true;
              }
              document.getElementById("input-fecha").value = `${año}-${mes}-${día}`;
              document.getElementById("input-descripcion").value = objeto.descripcion;
              document.getElementById("img-denuncia").src = objeto.pruebas;
              //document.getElementById("input-pruebas").value = objeto.pruebas;



              document.getElementById("input-ubicacion").value = objeto.ubicacion;

            })
          const formEditarDenuncia = document.getElementById("form-editarDenuncia");

          formEditarDenuncia.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log("click en guardar");


            const nomVic = document.getElementById("input-nomDenunciaEditar").value;
            const nomAgre = document.getElementById("input-nomAgresor").value;
            const tipoViolen = document.getElementById("input-tipoViolenci").value;
            var tipoDenun;
            if (document.getElementById("gridRadios11").checked) {
              tipoDenun = "publica";
            } else {
              tipoDenun = "privada";
            }
            const fechaa = document.getElementById("input-fecha").value;
            const descrrip = document.getElementById("input-descripcion").value;
            const prueba = document.getElementById("input-pruebas").value;
            const ubicacionn = document.getElementById("input-ubicacion").value;

            const pruebas1 = document.getElementById("input-pruebas");
            const archivoImagen1 = pruebas1.files[0];
            const formData1 = new FormData();


            // Creando un objeto
            const denunciaEditada = {
              nombre_victima: nomVic,
              nombre_agresor: nomAgre,
              tipo_violencia: tipoViolen,
              tipo_denuncia: tipoDenun,
              fecha: fechaa,
              descripcion: descrrip,
              pruebas: prueba,
              ubicacion: ubicacionn,
              estado: 0,
              id_usuario: id_usuario
              // id_usuario: id_usuario;
            };
            formData1.append("nombre_victima", denunciaEditada.nombre_victima);
            formData1.append("nombre_agresor", denunciaEditada.nombre_agresor);
            formData1.append("tipo_violencia", denunciaEditada.tipo_violencia);
            formData1.append("tipo_denuncia", denunciaEditada.tipo_denuncia);
            formData1.append("fecha", denunciaEditada.fecha);
            formData1.append("descripcion", denunciaEditada.descripcion);
            formData1.append("ubicacion", denunciaEditada.ubicacion);
            formData1.append("estado", denunciaEditada.estado);
            formData1.append("id_usuario", denunciaEditada.id_usuario);
            formData1.append("image", archivoImagen1);

            console.log(archivoImagen1);


            fetch(`${ruta}/denuncia/${idDenuncia}`, {
              method: "PUT",
              // headers: {
              //   "Content-Type": "application/json",
              // },
              body: formData1,
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al editar denuncia");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Denuncia editado:", data);
                window.location.href = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
              })
              .catch((error) => {
                console.error(error);
              });
          });
        });


        //BOTON ELIMINAR
        const btnEliminar = document.createElement('button');
        btnEliminar.title = "Eliminar";
        btnEliminar.classList.add('btn', 'btn-eliminar');
        btnEliminar.setAttribute('data-bs-toggle', 'modal');
        btnEliminar.setAttribute('data-bs-target', '#modal-eliminarDenuncia');
        const iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash-alt');
        btnEliminar.style.color = "red";
        btnEliminar.appendChild(iconoEliminar);
        btnEliminar.addEventListener('click', () => {
          const idDenuncia = celdaIdDenuncia.textContent;
          document.getElementById("p-denuncia").textContent = "Eliminar  Denuncia número :  " + idDenuncia + " ";

          const btnSIeliminar = document.getElementById("btn-SIeliminarDenuncia");
          btnSIeliminar.addEventListener('click', () => {
            fetch(`${ruta}/denuncia/${idDenuncia}`, {
              method: "DELETE",
              // headers: {
              //   "Content-Type": "application/json",
              // }
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al eliminar denuncia");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Denuncia eliminado:", data);
                window.location.href = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
              })
              .catch((error) => {
                console.error(error);
              });
          });
        });
        var icono = document.createElement('i');
        var icono2 = document.createElement('i');
        icono2.className = 'fas fa-check fa-lg text-success';
        icono.className = 'fas fa-clock fa-lg text-warning';
        icono.style.display = 'flex';
        icono.style.alignItems = 'flex-end';
        icono.style.marginTop = '15px';
        //icono.style.justifyContent = 'center';
        icono2.style.display = 'flex';
        icono2.style.alignItems = 'flex-end';
        icono2.style.marginTop = '15px';
        //icono2.style.justifyContent = 'center';
        if (celdaEstado.textContent == 'false') {
          celdaEditar.appendChild(btnEditar);
          celdaEliminar.appendChild(btnEliminar);
        }

        fila.appendChild(celdaIdDenuncia);
        fila.appendChild(celdaNombreVictima);
        fila.appendChild(celdaNombreAgresor);
        fila.appendChild(celdaEditar);
        fila.appendChild(celdaEliminar);
        if (celdaEstado.textContent == 'false') {
          fila.appendChild(icono);
        } else {
          fila.appendChild(icono2);
        }

        tablaDenuncia.querySelector('tbody').appendChild(fila);
      });
    })
    .catch((error) => {
      console.error(error);
    });

  //-------------------------------------------------------------

  //-------------------------------------------------------------
  // VER DENUNCIA

  const formRegistrarDenuncia = document.getElementById("form-registrarDenuncia");
  formRegistrarDenuncia.addEventListener("submit", function (event) {
    event.preventDefault();


    // const id_usuario = io;
    const nombreVictima = document.getElementById("input-nomVictimaRR").value;
    const nombreAgresor = document.getElementById("input-nomAgresorRR").value;
    const tipoViolencia = document.getElementById("input-tipoViolenciaRR").value;

    var tipoDenuncia;
    if (document.getElementById("gridRadios1").checked) {
      tipoDenuncia = "publica";
    } else {
      tipoDenuncia = "privada";
    }
    const fecha = document.getElementById("input-fechaRR").value;
    const descripcion = document.getElementById("input-descripcionRR").value;

    const pruebas = document.getElementById("input-pruebasRR");
    const archivoImagen = pruebas.files[0];
    const formData = new FormData();
    //formData.append("imagen", archivoImagen, archivoImagen.name);


    const ubicacion = document.getElementById("input-ubicacionRR").value;

    if (!valNombreContacto.test(nombreVictima)) {
      document.getElementById("input-nomVictimaR").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      document.getElementById("input-nomVictimaR").classList.add("is-invalid");
      setTimeout(function () {
        document.getElementById("input-nomVictimaR").classList.remove("is-invalid");
      }, 30000);
      return;
    }
    // Creando un objeto
    const nuevoDenuncia = {
      nombre_victima: nombreVictima,
      nombre_agresor: nombreAgresor,
      tipo_violencia: tipoViolencia,
      tipo_denuncia: tipoDenuncia,
      fecha: fecha,
      descripcion: descripcion,
      pruebas: "imagenes",
      ubicacion: ubicacion,
      estado: 0,
      id_usuario: id_usuario
      //image:archivoImagen
      // id_usuario: id_usuario;
    };

    formData.append("nombre_victima", nuevoDenuncia.nombre_victima);
    formData.append("nombre_agresor", nuevoDenuncia.nombre_agresor);
    formData.append("tipo_violencia", nuevoDenuncia.tipo_violencia);
    formData.append("tipo_denuncia", nuevoDenuncia.tipo_denuncia);
    formData.append("fecha", nuevoDenuncia.fecha);
    formData.append("descripcion", nuevoDenuncia.descripcion);
    formData.append("ubicacion", nuevoDenuncia.ubicacion);
    formData.append("estado", nuevoDenuncia.estado);
    formData.append("id_usuario", nuevoDenuncia.id_usuario);
    formData.append("image", archivoImagen);

    //formData.append("datosJSON", new Blob([JSON.stringify(nuevoDenuncia)], { type: "application/json" }));
    //formData.append("imagen", archivoImagen);


    fetch(`${ruta}/denuncia`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      //body:JSON.stringify(nuevoDenuncia)
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar la denuncia");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Denuncia agregado:", data);
        window.location.href = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
      })
      .catch((error) => {
        console.error(error);
      });
  });

});















