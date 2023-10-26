// prueba3-281-production.up.railway.app
// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/"+"api";
//------------------------------------------------------
const valNombreUsuario = /^[a-zA-Z\s]{3,30}$/;
const valCiUsuario = /^[1-9]\d{5,12}$/;
const valFechaNacUsuario = new Date(document.getElementById("input-fechaUsuario").value);;
const valDireccionUsuario = /^[a-zA-Z0-9\s.,#-]+$/;
const valCorreoUsuario = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
const valTelefonoUsuario = /^(6\d{7}|7\d{7}|2\d{6})$/;
const valUsuarioUsuario = /^[a-zA-Z\s]{3,30}$/;
const valContraseniaUsuario = /^.{4,}$/;

function vaciarTabla(tabla) {
  const tablaBody = tabla.querySelector('tbody');
  while (tablaBody.firstChild) {
    tablaBody.removeChild(tablaBody.firstChild);
  }
}

// -----------------------------------------------------
const queryStringAdmin = window.location.search;
const urlParamsAdmin = new URLSearchParams(queryStringAdmin);
const correoUsuario = urlParamsAdmin.get('correo');
const id_usuario = urlParamsAdmin.get('id_usuario');
let id_admin = urlParamsAdmin.get('id_administrador');
const ventana = urlParamsAdmin.get('ventana');

const rol = urlParamsAdmin.get('rol');
if (correoUsuario != null) {
  document.getElementById('span-correoUsuario').textContent = correoUsuario;
  // console.log(document.getElementById('h6-correoUsuario'));
  document.getElementById('h6-correoUsuario').textContent = correoUsuario;
  if (rol == 'administrador') {
    document.getElementById('span-tituloRol').textContent = 'Administrador';
    document.getElementById('span-rolUsuario').textContent = 'Administrador';
    document.getElementById('h1-bienvenido').textContent = 'Bienvenido Administrador';
  } else {
    document.getElementById('span-tituloRol').textContent = 'Colaborador';
    document.getElementById('span-rolUsuario').textContent = 'Colaborador';
    document.getElementById('li-usuarios').style.display = 'none';
    document.getElementById('li-permisos').style.display = 'none';
    document.getElementById('h1-bienvenido').textContent = 'Bienvenido Colaborador';
  }
  fetch(`${ruta}/administrador/${id_admin}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener Administrador");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById('img-imagenIconoUsuario').src = data.data.Usuario.Imagen_perfil;
      document.getElementById('img-imagenIconoUsuario').style.objectFit = 'cover';
    })
    .catch((error) => {
      console.error(error);
    });
}
const cerrarSesionLink = document.getElementById("cerrar_sesion");
cerrarSesionLink.addEventListener("click", function (event) {
  window.location.href = 'index.html';
});
// -----------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const li_usuarios = document.getElementById('li-usuarios');
  li_usuarios.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('a-usuarios').disabled = true;
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'block';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';

    const tablaUsuarios = document.getElementById('tabla-usuarios');
    vaciarTabla(tablaUsuarios);
    // Realiza una solicitud GET al endpoint del backend que devuelve los usuarios en formato JSON
    fetch(`${ruta}/usuario_normal`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((usuarios) => {
        usuarios.data.forEach((objeto) => {
          const fila = document.createElement('tr');
          const celdaCI = document.createElement('td');
          const celdaNombre = document.createElement('td');
          const celdaCorreo = document.createElement('td');
          const celdaDireccion = document.createElement('td');
          const celdaFechaNac = document.createElement('td');
          const celdaGenero = document.createElement('td');
          const celdaNombreUsuario = document.createElement('td');
          const celdaTelefono = document.createElement('td');
          const celdaPassword = document.createElement('td');
          const celdaEditar = document.createElement('td');
          const celdaEliminar = document.createElement('td');
          const celdaContactosUsr = document.createElement('td');
          const celdaEstadoUsr = document.createElement('td');

          let idUsuario = objeto.id_usuario;
          celdaCI.textContent = objeto.Usuario.ci;
          celdaNombre.textContent = objeto.Usuario.nombre;
          celdaCorreo.textContent = objeto.Usuario.correo;
          celdaDireccion.textContent = objeto.Usuario.direccion;

          // let fechaA = new Date(objeto.Usuario.fecha_nac);
          // let fechaFormateada = `${fechaA.getDate() + 1}/${fechaA.getMonth() + 1}/${fechaA.getFullYear()}`;
          let fechaA = new Date(objeto.Usuario.fecha_nac);
          let fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
          celdaFechaNac.textContent = fechaFormateada;

          celdaGenero.textContent = objeto.Usuario.genero;
          celdaNombreUsuario.textContent = objeto.Usuario.nombre_usuario;
          celdaTelefono.textContent = objeto.Usuario.telefono;
          celdaPassword.textContent = objeto.Usuario.contrasenia;

          //BOTON EDITAR
          const btnEditar = document.createElement('button');
          btnEditar.title = "Editar";
          btnEditar.classList.add('btn', 'btn-editar');
          btnEditar.setAttribute('data-bs-toggle', 'modal');
          btnEditar.setAttribute('data-bs-target', '#modal-editarUsuario');
          const iconoEditar = document.createElement('i');
          iconoEditar.classList.add('fas', 'fa-edit');
          btnEditar.style.color = "#34A3FF";
          btnEditar.appendChild(iconoEditar);
          btnEditar.addEventListener('click', () => {
            document.getElementById("input-ciUsuarioEditar").value = celdaCI.textContent;
            document.getElementById("input-nomUsuarioEditar").value = celdaNombre.textContent;
            // let fechaA = new Date(objeto.Usuario.fecha_nac);
            // let año = fechaA.getFullYear();
            // let mes = (fechaA.getMonth() + 1).toString().padStart(2, '0');
            // let dia = (fechaA.getDate() + 1).toString().padStart(2, '0');
            // let fechaFormateada = `${año}-${mes}-${dia}`;
            let fechaA = new Date(objeto.Usuario.fecha_nac);
            // Ajusta la fecha a la zona horaria del usuario
            let año = fechaA.getUTCFullYear();
            let mes = (fechaA.getUTCMonth() + 1).toString().padStart(2, '0'); // Agregamos 1 porque los meses en JavaScript comienzan desde 0
            let dia = (fechaA.getUTCDate()).toString().padStart(2, '0');
            let fechaFormateada = `${año}-${mes}-${dia}`;
            document.getElementById("input-fechaUsuarioEditar").value = fechaFormateada;
            if (celdaGenero.textContent == 'MASCULINO') {
              document.getElementById("gridRadios1Editar").checked = true;
            }
            if (celdaGenero.textContent == 'FEMENINO') {
              document.getElementById("gridRadios2Editar").checked = true;
            }
            if (celdaGenero.textContent == 'OTRO') {
              document.getElementById("gridRadios3Editar").checked = true;
            }
            document.getElementById("input-direccionUsuarioEditar").value = celdaDireccion.textContent;
            document.getElementById("input-correoUsuarioEditar").value = celdaCorreo.textContent;
            document.getElementById("input-telefonoUsuarioEditar").value = celdaTelefono.textContent;
            document.getElementById("input-userUsuarioEditar").value = celdaNombreUsuario.textContent;
            document.getElementById("input-passwordUsuarioEditar").value = celdaPassword.textContent;

            document.getElementById('img-imagenUsuarioEditar').src = objeto.Usuario.Imagen_perfil;

            document.getElementById('input-imagenUsuarioEditar').addEventListener('change', function (e) {
              const imagenSeleccionada = e.target.files[0];
              const imagenUsuarioEditar = document.getElementById('img-imagenUsuarioEditar');

              // Verifica si se seleccionó una imagen
              if (imagenSeleccionada) {
                const urlImagen = URL.createObjectURL(imagenSeleccionada);
                imagenUsuarioEditar.src = urlImagen;
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

              const input_imagenUsuarioEditar = document.getElementById('input-imagenUsuarioEditar');
              const archivoImagenUsuarioEditar = input_imagenUsuarioEditar.files[0];
              const formDataUsuarioEditar = new FormData();



              if (!valCiUsuario.test(ciUsuarioE)) {
                document.getElementById("input-ciUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-ciUsuarioEditar").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-ciUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valNombreUsuario.test(nomUsuarioE)) {
                document.getElementById("input-nomUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-nomUsuarioEditar").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-nomUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              const fechaActualEditar = new Date();
              const edadEditar = fechaActualEditar.getFullYear() - valFechaNacUsuario.getFullYear();
              if (edadEditar < 18 || (edadEditar === 18 && (valFechaNacUsuario.getMonth() > fechaActualEditar.getMonth() || (valFechaNacUsuario.getMonth() === fechaActualEditar.getMonth() && valFechaNacUsuario.getDate() > fechaActualEditar.getDate())))) {
                document.getElementById("input-fechaUsuarioEditar").classList.add("is-invalid");
                document.getElementById("input-fechaUsuarioEditar").scrollIntoView({ behavior: "smooth" });
                setTimeout(function () {
                  document.getElementById("input-fechaUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valDireccionUsuario.test(direccionUsuarioE)) {
                document.getElementById("input-direccionUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-direccionUsuarioEditar").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-direccionUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valCorreoUsuario.test(correoUsuarioE)) {
                document.getElementById("input-correoUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-correoUsuarioEditar").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-correoUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valTelefonoUsuario.test(telefonoUsuarioE)) {
                document.getElementById("input-telefonoUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-telefonoUsuarioEditar").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-telefonoUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valUsuarioUsuario.test(userUsuarioE)) {
                document.getElementById("input-userUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-userUsuarioEditar").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-userUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valContraseniaUsuario.test(paswordUsuarioE)) {
                document.getElementById("input-passwordUsuarioEditar").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-passwordUsuarioEditar").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-passwordUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              const usuarioEditado = {
                ci: ciUsuarioE,
                nombre: nomUsuarioE,
                fecha_nac: fechaUsuarioE,
                genero: generoUsuarioE,
                direccion: direccionUsuarioE,
                correo: correoUsuarioE,
                telefono: telefonoUsuarioE,
                nombre_usuario: userUsuarioE,
                contrasenia: paswordUsuarioE
                // Agrega otros campos aquí según corresponda
              };

              formDataUsuarioEditar.append("ci", usuarioEditado.ci);
              formDataUsuarioEditar.append("nombre", usuarioEditado.nombre);
              formDataUsuarioEditar.append("fecha_nac", usuarioEditado.fecha_nac);
              formDataUsuarioEditar.append("genero", usuarioEditado.genero);
              formDataUsuarioEditar.append("direccion", usuarioEditado.direccion);
              formDataUsuarioEditar.append("correo", usuarioEditado.correo);
              formDataUsuarioEditar.append("telefono", usuarioEditado.telefono);
              formDataUsuarioEditar.append("nombre_usuario", usuarioEditado.nombre_usuario);
              formDataUsuarioEditar.append("contrasenia", usuarioEditado.contrasenia);
              formDataUsuarioEditar.append("image", archivoImagenUsuarioEditar);

              fetch(`${ruta}/usuario_normal/${idUsuario}`, {
                method: "PUT",
                // headers: {
                //   "Content-Type": "application/json",
                // },
                // body: JSON.stringify(usuarioEditado)
                body: formDataUsuarioEditar
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar el Usuario");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Usuario editado:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
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
          btnEliminar.setAttribute('data-bs-target', '#modal-eliminarUsuario');
          const iconoEliminar = document.createElement('i');
          iconoEliminar.classList.add('fas', 'fa-trash-alt');
          btnEliminar.style.color = "red";
          btnEliminar.appendChild(iconoEliminar);
          btnEliminar.addEventListener('click', () => {
            document.getElementById("p-Usuario").textContent = celdaNombreUsuario.textContent + " con número Teléfono/Celular " + celdaTelefono.textContent;

            const btnSIeliminar = document.getElementById("btn-SIeliminarUsuario");
            btnSIeliminar.addEventListener('click', () => {
              console.log(idUsuario);
              fetch(`${ruta}/usuario_normal/${idUsuario}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al eliminar el usuario");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Usuario eliminado:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          });

          //BOTON CONTACTOS
          const btnContactoUsr = document.createElement('button');
          btnContactoUsr.title = 'Contactos';
          btnContactoUsr.classList.add('btn');
          btnContactoUsr.setAttribute('data-bs-toggle', 'modal');
          btnContactoUsr.setAttribute('data-bs-target', '#modal-listarContactosUsuario');
          const iconoContacto = document.createElement('i');
          iconoContacto.classList.add('fas', 'fa-phone');
          btnContactoUsr.style.color = "green";
          btnContactoUsr.appendChild(iconoContacto);
          btnContactoUsr.addEventListener('click', () => {
            document.getElementById('h5-nombreUsuarioContacto').textContent = celdaNombre.textContent;
            const tablaContactos = document.getElementById('tabla-contactosUsr');
            const tablaBody = tablaContactos.querySelector('tbody');
            while (tablaBody.firstChild) {
              tablaBody.removeChild(tablaBody.firstChild);
            }

            fetch(`${ruta}/contacto/usuario/${idUsuario}`)
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

                  let idContacto = objeto.id_contacto;
                  celdaNombreContacto.textContent = objeto.nombre_contacto;
                  celdaTelefonoContacto.textContent = objeto.telefono;

                  fila.appendChild(celdaNombreContacto);
                  fila.appendChild(celdaTelefonoContacto);

                  tablaContactos.querySelector('tbody').appendChild(fila);
                });
              })
              .catch((error) => {
                console.error(error);
              });
          });

          //BOTON ESTADO
          const btnEstadoUsuarioU = document.createElement('button');
          btnEstadoUsuarioU.classList.add('btn', 'btn-success');
          btnEstadoUsuarioU.textContent = 'Habilitado';
          btnEstadoUsuarioU.addEventListener('click', () => {
            if (btnEstadoUsuarioU.textContent == '¿Habilitar?') {
              btnEstadoUsuarioU.classList.remove('btn-warning');
              btnEstadoUsuarioU.classList.add('btn-success');
              btnEstadoUsuarioU.textContent = 'Habilitado';
              const usuarioEstadoU = {
                ci: celdaCI.innerText,
                nombre: celdaNombre.innerText,
                fecha_nac: celdaFechaNac.innerText,
                genero: celdaGenero.innerText,
                direccion: celdaDireccion.innerText,
                correo: celdaCorreo.innerText,
                telefono: celdaTelefono.innerText,
                nombre_usuario: celdaNombreUsuario.innerText,
                contrasenia: celdaPassword.innerText,
                estado: 'activo'

              }
              fetch(`${ruta}/usuario_normal/${idUsuario}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioEstadoU)
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar el Usuario");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Estado de Usuario editado:", data);
                  // window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              btnEstadoUsuarioU.classList.remove('btn-success');
              btnEstadoUsuarioU.classList.add('btn-warning');
              btnEstadoUsuarioU.textContent = '¿Habilitar?';
              const usuarioEstadoU = {
                ci: celdaCI.innerText,
                nombre: celdaNombre.innerText,
                fecha_nac: celdaFechaNac.innerText,
                genero: celdaGenero.innerText,
                direccion: celdaDireccion.innerText,
                correo: celdaCorreo.innerText,
                telefono: celdaTelefono.innerText,
                nombre_usuario: celdaNombreUsuario.innerText,
                contrasenia: celdaPassword.innerText,
                estado: 'desactivo'

              }
              fetch(`${ruta}/usuario_normal/${idUsuario}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioEstadoU)
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar el Usuario");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Estado de Usuario editado:", data);
                  // window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          });

          if (objeto.estado == 'activo') {
            celdaContactosUsr.appendChild(btnContactoUsr)
            celdaEstadoUsr.appendChild(btnEstadoUsuarioU)
            celdaEditar.appendChild(btnEditar);
            celdaEliminar.appendChild(btnEliminar);

            fila.appendChild(celdaCI);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCorreo);
            fila.appendChild(celdaDireccion);
            fila.appendChild(celdaFechaNac);
            fila.appendChild(celdaGenero);
            fila.appendChild(celdaNombreUsuario);
            fila.appendChild(celdaTelefono);
            //fila.appendChild(celdaPassword);
            fila.appendChild(celdaEditar);
            fila.appendChild(celdaEliminar);
            fila.appendChild(celdaContactosUsr);
            fila.appendChild(celdaEstadoUsr);
          }

          tablaUsuarios.querySelector('tbody').appendChild(fila);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // BOTON AGREGAR USUARIO
    const formularioRegUsuario = document.getElementById("form-registrarUsuario");
    formularioRegUsuario.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que se recargue la página

      // Obtén los datos del formulario
      const ci = document.getElementById("input-ciUsuario").value;
      const nombre = document.getElementById("input-nomUsuario").value.toUpperCase();
      const correo = document.getElementById("input-correoUsuario").value;
      const direccion = document.getElementById("input-direccionUsuario").value.toUpperCase();
      const fecha_nac = document.getElementById("input-fechaUsuario").value;
      const telefono = document.getElementById("input-telefonoUsuario").value;

      const input_imagenUsuario = document.getElementById('input-imagenUsuario');
      const archivoImagenUsuario = input_imagenUsuario.files[0];
      const formDataUsuario = new FormData();

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

      const nombre_usuario = document.getElementById("input-userUsuario").value;

      const contrasenia = document.getElementById("input-passwordUsuario").value;

      if (!valNombreUsuario.test(document.getElementById("input-nomUsuario").value)) {
        document.getElementById("input-nomUsuario").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        document.getElementById("input-nomUsuario").classList.add("is-invalid");
        setTimeout(function () {
          document.getElementById("input-nomUsuario").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valCiUsuario.test(document.getElementById("input-ciUsuario").value)) {
        document.getElementById("input-ciUsuario").classList.add("is-invalid");
        document.getElementById("input-ciUsuario").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-ciUsuario").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      const fechaActual = new Date();
      const edad = fechaActual.getFullYear() - valFechaNacUsuario.getFullYear();
      if (edad < 18 || (edad === 18 && (valFechaNacUsuario.getMonth() > fechaActual.getMonth() || (valFechaNacUsuario.getMonth() === fechaActual.getMonth() && valFechaNacUsuario.getDate() > fechaActual.getDate())))) {
        document.getElementById("input-fechaUsuario").classList.add("is-invalid");
        document.getElementById("input-fechaUsuario").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-fechaUsuario").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valDireccionUsuario.test(document.getElementById("input-direccionUsuario").value)) {
        document.getElementById("input-direccionUsuario").classList.add("is-invalid");
        document.getElementById("input-direccionUsuario").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-direccionUsuario").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valCorreoUsuario.test(document.getElementById("input-correoUsuario").value)) {
        document.getElementById("input-correoUsuario").classList.add("is-invalid");
        document.getElementById("input-correoUsuario").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-correoUsuario").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valTelefonoUsuario.test(document.getElementById("input-telefonoUsuario").value)) {
        document.getElementById("input-telefonoUsuario").classList.add("is-invalid");
        document.getElementById("input-telefonoUsuario").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-telefonoUsuario").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valUsuarioUsuario.test(document.getElementById("input-userUsuario").value)) {
        document.getElementById("input-userUsuario").classList.add("is-invalid");
        document.getElementById("input-userUsuario").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-userUsuario").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valContraseniaUsuario.test(document.getElementById("input-passwordUsuario").value)) {
        document.getElementById("input-passwordUsuario").classList.add("is-invalid");
        document.getElementById("input-passwordUsuario").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-passwordUsuario").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      //----------------------------------------------------------------------------------


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
        req: 2,
        id_administrador: id_admin
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
      formDataUsuario.append("req", nuevoUsuario.req);
      formDataUsuario.append("id_administrador", nuevoUsuario.id_administrador);
      formDataUsuario.append("image", archivoImagenUsuario);

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
          window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
        })
        .catch((error) => {
          console.error(error);
          // Maneja el error, muestra un mensaje de error, etc.
        });
    });
  });

  const a_tituloRol = document.getElementById('a-tituloRol');
  a_tituloRol.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
  });
  // Funciones para el sidebar
  const li_permisos = document.getElementById('li-permisos');
  li_permisos.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'block';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';

    const tablaUsuariosAdministrador = document.getElementById('tabla-usuariosAdministrador');
    vaciarTabla(tablaUsuariosAdministrador);
    // Realiza una solicitud GET al endpoint del backend que devuelve los usuarios en formato JSON
    fetch(`${ruta}/administrador`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios administradores');
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((usuariosAdministrador) => {
        usuariosAdministrador.data.forEach((objeto) => {
          const fila = document.createElement('tr');
          const celdaCI = document.createElement('td');
          const celdaNombre = document.createElement('td');
          const celdaCorreo = document.createElement('td');
          const celdaDireccion = document.createElement('td');
          const celdaFechaNac = document.createElement('td');
          const celdaGenero = document.createElement('td');
          const celdaNombreUsuario = document.createElement('td');
          const celdaTelefono = document.createElement('td');
          const celdaPassword = document.createElement('td');
          const celdaEditar = document.createElement('td');
          const celdaEliminar = document.createElement('td');
          const celdaRol = document.createElement('td');

          let idUsuario = objeto.id_administrador;
          celdaCI.textContent = objeto.Usuario.ci;
          celdaNombre.textContent = objeto.Usuario.nombre;
          celdaCorreo.textContent = objeto.Usuario.correo;
          celdaDireccion.textContent = objeto.Usuario.direccion;

          // let fechaA = new Date(objeto.Usuario.fecha_nac);
          // let fechaFormateada = `${fechaA.getDate() + 1}/${fechaA.getMonth() + 1}/${fechaA.getFullYear()}`;
          let fechaA = new Date(objeto.Usuario.fecha_nac);
          let fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
          celdaFechaNac.textContent = fechaFormateada;
          // celdaFechaNac.textContent = objeto.Usuario.fecha_nac;

          celdaGenero.textContent = objeto.Usuario.genero;
          celdaNombreUsuario.textContent = objeto.Usuario.nombre_usuario;
          celdaTelefono.textContent = objeto.Usuario.telefono;
          celdaPassword.textContent = objeto.Usuario.contrasenia;

          //BOTON EDITAR ADMINISTRADOR
          const btnEditar = document.createElement('button');
          btnEditar.title = "Editar";
          btnEditar.classList.add('btn', 'btn-editar');
          btnEditar.setAttribute('data-bs-toggle', 'modal');
          btnEditar.setAttribute('data-bs-target', '#modal-editarUsuarioAdministrador');
          const iconoEditar = document.createElement('i');
          iconoEditar.classList.add('fa', 'fa-edit');
          btnEditar.style.color = "#34A3FF";
          btnEditar.appendChild(iconoEditar);
          btnEditar.addEventListener('click', () => {
            document.getElementById("input-ciUsuarioEditarAdministrador").value = celdaCI.textContent;
            document.getElementById("input-nomUsuarioEditarAdministrador").value = celdaNombre.textContent;

            let fechaA = new Date(objeto.Usuario.fecha_nac);
            // Ajusta la fecha a la zona horaria del usuario
            let año = fechaA.getUTCFullYear();
            let mes = (fechaA.getUTCMonth() + 1).toString().padStart(2, '0'); // Agregamos 1 porque los meses en JavaScript comienzan desde 0
            let dia = (fechaA.getUTCDate()).toString().padStart(2, '0');
            let fechaFormateada = `${año}-${mes}-${dia}`;

            document.getElementById("input-fechaUsuarioEditarAdministrador").value = fechaFormateada;

            // document.getElementById("input-fechaUsuarioEditar").value = celdaFechaNac.textContent;
            if (celdaGenero.textContent == 'MASCULINO') {
              document.getElementById("gridRadios1EditarAdministrador").checked = true;
            }
            if (celdaGenero.textContent == 'FEMENINO') {
              document.getElementById("gridRadios2EditarAdministrador").checked = true;
            }
            if (celdaGenero.textContent == 'OTRO') {
              document.getElementById("gridRadios3EditarAdministrador").checked = true;
            }
            document.getElementById("input-direccionUsuarioEditarAdministrador").value = celdaDireccion.textContent;
            document.getElementById("input-correoUsuarioEditarAdministrador").value = celdaCorreo.textContent;
            document.getElementById("input-telefonoUsuarioEditarAdministrador").value = celdaTelefono.textContent;
            document.getElementById("input-userUsuarioEditarAdministrador").value = celdaNombreUsuario.textContent;
            document.getElementById("input-passwordUsuarioEditarAdministrador").value = celdaPassword.textContent;

            document.getElementById('img-imagenUsuarioAdministradorEditar').src = objeto.Usuario.Imagen_perfil;

            document.getElementById('input-imagenUsuarioEditarAdministrador').addEventListener('change', function (e) {
              const imagenSeleccionada = e.target.files[0];
              const imagenUsuarioEditar = document.getElementById('img-imagenUsuarioAdministradorEditar');

              // Verifica si se seleccionó una imagen
              if (imagenSeleccionada) {
                const urlImagen = URL.createObjectURL(imagenSeleccionada);
                imagenUsuarioEditar.src = urlImagen;
              }
            });
            
            const formEditarUsuario = document.getElementById("form-editarUsuarioAdministrador");
            formEditarUsuario.addEventListener('submit', function (event) {
              event.preventDefault();
              const ciUsuarioE = document.getElementById("input-ciUsuarioEditarAdministrador").value;
              const nomUsuarioE = document.getElementById("input-nomUsuarioEditarAdministrador").value.toUpperCase();
              const fechaUsuarioE = document.getElementById("input-fechaUsuarioEditarAdministrador").value;

              // const generoUsuarioE = document.getElementById("input-generoUsuarioEditar").value;

              var generoUsuarioE = "";
              if (document.getElementById("gridRadios1EditarAdministrador").checked) {
                generoUsuarioE = document.getElementById("gridRadios1EditarAdministrador").value.toUpperCase();
              } else {
                if (document.getElementById("gridRadios2EditarAdministrador").checked) {
                  generoUsuarioE = document.getElementById("gridRadios2EditarAdministrador").value.toUpperCase();
                } else {
                  generoUsuarioE = document.getElementById("gridRadios3EditarAdministrador").value.toUpperCase();
                }
              }

              const direccionUsuarioE = document.getElementById("input-direccionUsuarioEditarAdministrador").value.toUpperCase();
              const correoUsuarioE = document.getElementById("input-correoUsuarioEditarAdministrador").value;
              const telefonoUsuarioE = document.getElementById("input-telefonoUsuarioEditarAdministrador").value;
              const userUsuarioE = document.getElementById("input-userUsuarioEditarAdministrador").value;
              const paswordUsuarioE = document.getElementById("input-passwordUsuarioEditarAdministrador").value;

              if (!valCiUsuario.test(ciUsuarioE)) {
                document.getElementById("input-ciUsuarioEditarAdministrador").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-ciUsuarioEditarAdministrador").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-ciUsuarioEditarAdministrador").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valNombreUsuario.test(nomUsuarioE)) {
                document.getElementById("input-nomUsuarioEditarAdministrador").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-nomUsuarioEditarAdministrador").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-nomUsuarioEditarAdministrador").classList.remove("is-invalid");
                }, 30000);
                return;
              }

              const fechaActualEditar = new Date();
              const edadEditar = fechaActualEditar.getFullYear() - valFechaNacUsuario.getFullYear();
              if (edadEditar < 18 || (edadEditar === 18 && (valFechaNacUsuario.getMonth() > fechaActualEditar.getMonth() || (valFechaNacUsuario.getMonth() === fechaActualEditar.getMonth() && valFechaNacUsuario.getDate() > fechaActualEditar.getDate())))) {
                document.getElementById("input-fechaUsuarioEditarAdministrador").classList.add("is-invalid");
                document.getElementById("input-fechaUsuarioEditarAdministrador").scrollIntoView({ behavior: "smooth" });
                setTimeout(function () {
                  document.getElementById("input-fechaUsuarioEditar").classList.remove("is-invalid");
                }, 30000);
                return;
              }


              if (!valDireccionUsuario.test(direccionUsuarioE)) {
                document.getElementById("input-direccionUsuarioEditarAdministrador").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-direccionUsuarioEditarAdministrador").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-direccionUsuarioEditarAdministrador").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valCorreoUsuario.test(correoUsuarioE)) {
                document.getElementById("input-correoUsuarioEditarAdministrador").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-correoUsuarioEditarAdministrador").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-correoUsuarioEditarAdministrador").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valTelefonoUsuario.test(telefonoUsuarioE)) {
                document.getElementById("input-telefonoUsuarioEditarAdministrador").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-telefonoUsuarioEditarAdministrador").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-telefonoUsuarioEditarAdministrador").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valUsuarioUsuario.test(userUsuarioE)) {
                document.getElementById("input-userUsuarioEditarAdministrador").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-userUsuarioEditarAdministrador").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-userUsuarioEditarAdministrador").classList.remove("is-invalid");
                }, 30000);
                return;
              }
              if (!valContraseniaUsuario.test(paswordUsuarioE)) {
                document.getElementById("input-passwordUsuarioEditarAdministrador").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                document.getElementById("input-passwordUsuarioEditarAdministrador").classList.add("is-invalid");
                setTimeout(function () {
                  document.getElementById("input-passwordUsuarioEditarAdministrador").classList.remove("is-invalid");
                }, 30000);
                return;
              }

              const input_imagenUsuarioAdministradorEditar = document.getElementById('input-imagenUsuarioEditarAdministrador');
              const archivoImagenUsuarioAdministradorEditar = input_imagenUsuarioAdministradorEditar.files[0];
              const formDataUsuarioAdministradorEditar = new FormData();

              const usuarioEditadoAdministrador = {
                ci: ciUsuarioE,
                nombre: nomUsuarioE,
                fecha_nac: fechaUsuarioE,
                genero: generoUsuarioE,
                direccion: direccionUsuarioE,
                correo: correoUsuarioE,
                telefono: telefonoUsuarioE,
                nombre_usuario: userUsuarioE,
                contrasenia: paswordUsuarioE
                // Agrega otros campos aquí según corresponda
              };

              formDataUsuarioAdministradorEditar.append("ci", usuarioEditadoAdministrador.ci);
              formDataUsuarioAdministradorEditar.append("nombre", usuarioEditadoAdministrador.nombre);
              formDataUsuarioAdministradorEditar.append("fecha_nac", usuarioEditadoAdministrador.fecha_nac);
              formDataUsuarioAdministradorEditar.append("genero", usuarioEditadoAdministrador.genero);
              formDataUsuarioAdministradorEditar.append("direccion", usuarioEditadoAdministrador.direccion);
              formDataUsuarioAdministradorEditar.append("correo", usuarioEditadoAdministrador.correo);
              formDataUsuarioAdministradorEditar.append("telefono", usuarioEditadoAdministrador.telefono);
              formDataUsuarioAdministradorEditar.append("nombre_usuario", usuarioEditadoAdministrador.nombre_usuario);
              formDataUsuarioAdministradorEditar.append("contrasenia", usuarioEditadoAdministrador.contrasenia);
              formDataUsuarioAdministradorEditar.append("image", archivoImagenUsuarioAdministradorEditar);

              fetch(`${ruta}/administrador/${idUsuario}`, {
                method: "PUT",
                // headers: {
                //   "Content-Type": "application/json",
                // },
                // body: JSON.stringify(usuarioEditadoAdministrador)
                body: formDataUsuarioAdministradorEditar
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar el Usuario Administrador");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Usuario Administrador editado:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          });
          //BOTON ELIMINAR ADMINISTRADOR
          const btnEliminar = document.createElement('button');
          btnEliminar.title = "Eliminar";
          btnEliminar.classList.add('btn', 'btn-eliminar');
          btnEliminar.setAttribute('data-bs-toggle', 'modal');
          btnEliminar.setAttribute('data-bs-target', '#modal-eliminarUsuarioAdministrador');
          const iconoEliminar = document.createElement('i');
          iconoEliminar.classList.add('fas', 'fa-trash-alt');
          btnEliminar.style.color = "red";
          btnEliminar.appendChild(iconoEliminar);
          btnEliminar.addEventListener('click', () => {
            document.getElementById("p-UsuarioAdministrador").textContent = celdaNombreUsuario.textContent + " con número Teléfono/Celular " + celdaTelefono.textContent;

            const btnSIeliminar = document.getElementById("btn-SIeliminarUsuarioAdministrador");
            btnSIeliminar.addEventListener('click', () => {
              console.log(idUsuario);
              fetch(`${ruta}/administrador/${idUsuario}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al eliminar el usuario Administrador");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Usuario Administrador eliminado:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          });


          //BOTON ROL DE ADMINISTRADOR
          const btnRol = document.createElement('button');
          btnRol.classList.add('btn');
          const iconoRol = document.createElement('i');
          iconoRol.classList.add('fa');

          let rolAdministrador = objeto.rol;
          if (rolAdministrador == 'administrador') {
            btnRol.title = "Administrador";
            iconoRol.classList.add('fa-user');
            btnRol.style.color = "#304880";
          } else {
            btnRol.title = "Colaborador";
            iconoRol.classList.add('fa-users');
            btnRol.style.color = "#F09F1B";
          }

          btnRol.addEventListener('click', () => {
            if (rolAdministrador == 'administrador') {
              rolAdministrador = 'colaborador';
              btnRol.title = "Colaborador";
              iconoRol.classList.remove('fa-user');
              iconoRol.classList.add('fa-users');
              btnRol.style.color = "#F09F1B";
            } else {
              rolAdministrador = 'administrador';
              btnRol.title = "Administrador";
              iconoRol.classList.remove('fa-users');
              iconoRol.classList.add('fa-user');
              btnRol.style.color = "#304880";
            }

            const rolEditadoAdministrador = {
              nombre: objeto.Usuario.nombre,
              fecha_nac: objeto.Usuario.fecha_nac,
              genero: objeto.Usuario.genero,
              direccion: objeto.Usuario.direccion,
              telefono: objeto.Usuario.telefono,
              nombre_usuario: objeto.Usuario.nombre_usuario,
              contrasenia: objeto.Usuario.contrasenia,
              rol: rolAdministrador
            };
            fetch(`${ruta}/administrador/${idUsuario}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(rolEditadoAdministrador)
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al editar Rol de Usuario Administrador");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Rol de Usuario Administrador editado:", data);
                // window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
              })
              .catch((error) => {
                console.error(error);
              });

          });

          btnRol.appendChild(iconoRol);

          celdaEditar.appendChild(btnEditar);
          celdaEliminar.appendChild(btnEliminar);
          celdaRol.appendChild(btnRol);

          fila.appendChild(celdaCI);
          fila.appendChild(celdaNombre);
          fila.appendChild(celdaCorreo);
          fila.appendChild(celdaDireccion);
          fila.appendChild(celdaFechaNac);
          fila.appendChild(celdaGenero);
          fila.appendChild(celdaNombreUsuario);
          fila.appendChild(celdaTelefono);
          //fila.appendChild(celdaPassword);
          fila.appendChild(celdaEditar);
          fila.appendChild(celdaEliminar);
          fila.appendChild(celdaRol);


          tablaUsuariosAdministrador.querySelector('tbody').appendChild(fila);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // BOTON AGREGAR USUARIO ADMINISTRADOR
    const formularioRegUsuario = document.getElementById("form-registrarUsuarioAdministrador");
    formularioRegUsuario.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que se recargue la página

      // Obtén los datos del formulario
      const ci = document.getElementById("input-ciUsuarioAdministrador").value;
      const nombre = document.getElementById("input-nomUsuarioAdministrador").value.toUpperCase();
      const correo = document.getElementById("input-correoUsuarioAdministrador").value;
      const direccion = document.getElementById("input-direccionUsuarioAdministrador").value.toUpperCase();
      const fecha_nac = document.getElementById("input-fechaUsuarioAdministrador").value;
      const telefono = document.getElementById("input-telefonoUsuarioAdministrador").value;

      var genero = "";
      if (document.getElementById("gridRadios1Administrador").checked) {
        genero = document.getElementById("gridRadios1Administrador").value.toUpperCase();
      } else {
        if (document.getElementById("gridRadios2Administrador").checked) {
          genero = document.getElementById("gridRadios2Administrador").value.toUpperCase();
        } else {
          genero = document.getElementById("gridRadios3Administrador").value.toUpperCase();
        }
      }

      const nombre_usuario = document.getElementById("input-userUsuarioAdministrador").value;

      const contrasenia = document.getElementById("input-passwordUsuarioAdministrador").value;

      if (!valNombreUsuario.test(document.getElementById("input-nomUsuarioAdministrador").value)) {
        document.getElementById("input-nomUsuarioAdministrador").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        document.getElementById("input-nomUsuarioAdministrador").classList.add("is-invalid");
        setTimeout(function () {
          document.getElementById("input-nomUsuarioAdministrador").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valCiUsuario.test(document.getElementById("input-ciUsuarioAdministrador").value)) {
        document.getElementById("input-ciUsuarioAdministrador").classList.add("is-invalid");
        document.getElementById("input-ciUsuarioAdministrador").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-ciUsuarioAdministrador").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      const fechaActual = new Date();
      const edad = fechaActual.getFullYear() - valFechaNacUsuario.getFullYear();
      if (edad < 18 || (edad === 18 && (valFechaNacUsuario.getMonth() > fechaActual.getMonth() || (valFechaNacUsuario.getMonth() === fechaActual.getMonth() && valFechaNacUsuario.getDate() > fechaActual.getDate())))) {
        document.getElementById("input-fechaUsuarioAdministrador").classList.add("is-invalid");
        document.getElementById("input-fechaUsuarioAdministrador").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-fechaUsuarioAdministrador").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valDireccionUsuario.test(document.getElementById("input-direccionUsuarioAdministrador").value)) {
        document.getElementById("input-direccionUsuarioAdministrador").classList.add("is-invalid");
        document.getElementById("input-direccionUsuarioAdministrador").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-direccionUsuarioAdministrador").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valCorreoUsuario.test(document.getElementById("input-correoUsuarioAdministrador").value)) {
        document.getElementById("input-correoUsuarioAdministrador").classList.add("is-invalid");
        document.getElementById("input-correoUsuarioAdministrador").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-correoUsuarioAdministrador").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valTelefonoUsuario.test(document.getElementById("input-telefonoUsuarioAdministrador").value)) {
        document.getElementById("input-telefonoUsuarioAdministrador").classList.add("is-invalid");
        document.getElementById("input-telefonoUsuarioAdministrador").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-telefonoUsuarioAdministrador").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valUsuarioUsuario.test(document.getElementById("input-userUsuarioAdministrador").value)) {
        document.getElementById("input-userUsuarioAdministrador").classList.add("is-invalid");
        document.getElementById("input-userUsuarioAdministrador").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-userUsuarioAdministrador").classList.remove("is-invalid");
        }, 30000);
        return;
      }
      if (!valContraseniaUsuario.test(document.getElementById("input-passwordUsuarioAdministrador").value)) {
        document.getElementById("input-passwordUsuarioAdministrador").classList.add("is-invalid");
        document.getElementById("input-passwordUsuarioAdministrador").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          document.getElementById("input-passwordUsuarioAdministrador").classList.remove("is-invalid");
        }, 30000);
        return;
      }


      const input_imagenUsuarioAdministrador = document.getElementById('input-imagenUsuarioAdministrador');
      const archivoImagenUsuarioAdministrador = input_imagenUsuarioAdministrador.files[0];
      const formDataUsuarioAdministrador = new FormData();
      //----------------------------------------------------------------------------------

      // Crea un objeto con los datos del nuevo usuario
      const nuevoUsuarioAdministrador = {
        ci: ci,
        nombre: nombre,
        fecha_nac: fecha_nac,
        genero: genero,
        direccion: direccion,
        correo: correo,
        telefono: telefono,
        nombre_usuario: nombre_usuario,
        contrasenia: contrasenia,
        rol: 'colaborador'
      };

      formDataUsuarioAdministrador.append("ci", nuevoUsuarioAdministrador.ci);
      formDataUsuarioAdministrador.append("nombre", nuevoUsuarioAdministrador.nombre);
      formDataUsuarioAdministrador.append("fecha_nac", nuevoUsuarioAdministrador.fecha_nac);
      formDataUsuarioAdministrador.append("genero", nuevoUsuarioAdministrador.genero);
      formDataUsuarioAdministrador.append("direccion", nuevoUsuarioAdministrador.direccion);
      formDataUsuarioAdministrador.append("correo", nuevoUsuarioAdministrador.correo);
      formDataUsuarioAdministrador.append("telefono", nuevoUsuarioAdministrador.telefono);
      formDataUsuarioAdministrador.append("nombre_usuario", nuevoUsuarioAdministrador.nombre_usuario);
      formDataUsuarioAdministrador.append("contrasenia", nuevoUsuarioAdministrador.contrasenia);
      formDataUsuarioAdministrador.append("rol", nuevoUsuarioAdministrador.rol);
      formDataUsuarioAdministrador.append("image", archivoImagenUsuarioAdministrador);
      // Realiza una solicitud POST al backend
      fetch(`${ruta}/administrador`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(nuevoUsuarioAdministrador),
        body: formDataUsuarioAdministrador
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar el usuario Administrador");
          }
          return response.json(); // Si el backend devuelve una respuesta JSON
        })
        .then((data) => {
          // El usuario ha sido agregado exitosamente
          console.log("Usuario Administrador agregado:", data);
          // alert("Te registrate con exito !!!");
          // document.getElementById("usuarioRegistrado").style.display = "block";
          // setTimeout(function () {
          //   document.getElementById("usuarioRegistrado").style.display = "none";
          // }, 5000);
          window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
        })
        .catch((error) => {
          console.error(error);
          // Maneja el error, muestra un mensaje de error, etc.
        });
    });
  });

  const li_recursos = document.getElementById('li-recursos');
  li_recursos.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'block';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';

    const tablaRecursos = document.getElementById('tabla-recursos');
    vaciarTabla(tablaRecursos);
    fetch(`${ruta}/recurso`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener recursos');
        }
        return response.json();
      })
      .then((recursos) => {
        recursos.data.forEach((objeto) => {
          const filaRecursos = document.createElement('tr');

          const celdaTituloRecursos = document.createElement('td');
          const celdaTipoRecursos = document.createElement('td');
          const celdaDescripcionRecursos = document.createElement('td');
          const celdaUrlRecursos = document.createElement('td');
          const celdaAutorRecursos = document.createElement('td');
          const celdaContenidoRecursos = document.createElement('td');

          const celdaVisibilidadRecursos = document.createElement('td');
          const celdaEditarRecursos = document.createElement('td');
          const celdaEliminarRecursos = document.createElement('td');
          const celdaVerComentarios = document.createElement('td');

          let idRecursos = objeto.id_recurso;
          celdaTituloRecursos.textContent = objeto.titulo;
          celdaTipoRecursos.textContent = objeto.tipo;
          celdaDescripcionRecursos.textContent = objeto.descripcion;
          celdaUrlRecursos.textContent = objeto.url;
          celdaAutorRecursos.textContent = objeto.autor;
          celdaContenidoRecursos.textContent = objeto.contenido;
          let vista = objeto.visibilidad;

          // BOTON VISIBILIZAR RECURSO
          const btnVisibilidadRecursos = document.createElement('button');
          btnVisibilidadRecursos.classList.add('btn');
          const iconoVisible = document.createElement('i');
          iconoVisible.classList.add('fas');
          if (vista == 1) {
            btnVisibilidadRecursos.title = "Quitar Visibilizar";
            iconoVisible.classList.add('fa-eye');
            btnVisibilidadRecursos.style.color = "#13B538";
          } else {
            btnVisibilidadRecursos.title = "Visibilizar";
            iconoVisible.classList.add('fa-eye-slash');
            btnVisibilidadRecursos.style.color = 'black';
          }
          btnVisibilidadRecursos.appendChild(iconoVisible);
          btnVisibilidadRecursos.addEventListener('click', () => {
            if (vista == 1) {
              vista = !vista;
              btnVisibilidadRecursos.title = "Visibilizar";
              iconoVisible.classList.remove('fa-eye');
              iconoVisible.classList.add('fa-eye-slash');
              btnVisibilidadRecursos.style.color = 'black';
            } else {
              vista = !vista;
              btnVisibilidadRecursos.title = "Quitar Visibilizar";
              iconoVisible.classList.remove('fa-eye-slash');
              iconoVisible.classList.add('fa-eye');
              btnVisibilidadRecursos.style.color = "#13B538";
            }
            const vistaEditadaRecursos = {
              visibilidad: vista
            }
            fetch(`${ruta}/recurso/${idRecursos}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(vistaEditadaRecursos)
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al editar vista de recursos");
                }
                return response.json();
              })
              .then((data) => {
                console.log("vista de recurso editada:", data);
                // window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
              })
              .catch((error) => {
                console.error(error);
              });
          });

          // BOTON EDITAR RECURSO
          const btnEditarRecursos = document.createElement('button');
          btnEditarRecursos.title = "Editar";
          btnEditarRecursos.classList.add('btn', 'btn-editarRecursos');
          btnEditarRecursos.setAttribute('data-bs-toggle', 'modal');
          btnEditarRecursos.setAttribute('data-bs-target', '#modal-editarRecursos');
          const iconoEditarr = document.createElement('i');
          iconoEditarr.classList.add('fas', 'fa-edit');
          btnEditarRecursos.style.color = "#34A3FF";
          btnEditarRecursos.appendChild(iconoEditarr);
          btnEditarRecursos.addEventListener('click', () => {
            document.getElementById('input-tituloRecursosEditar').value = celdaTituloRecursos.textContent;
            document.getElementById('input-tipoRecursosEditar').value = celdaTipoRecursos.textContent;
            document.getElementById('input-descripcionRecursosEditar').value = celdaDescripcionRecursos.textContent;
            // document.getElementById('input-urlRecursosEditar').value = celdaUrlRecursos.textContent;
            document.getElementById('img-imagenRecursosEditar').src = objeto.url;

            document.getElementById('input-autorRecursosEditar').value = celdaAutorRecursos.textContent;
            document.getElementById('input-contenidoRecursosEditar').value = celdaContenidoRecursos.textContent;


            document.getElementById('input-imagenRecursosEditar').addEventListener('change', function (e) {
              const imagenSeleccionada = e.target.files[0];
              const imagenRecursos = document.getElementById('img-imagenRecursosEditar');

              // Verifica si se seleccionó una imagen
              if (imagenSeleccionada) {
                const urlImagen = URL.createObjectURL(imagenSeleccionada);
                imagenRecursos.src = urlImagen;
              }
            });

            const formEditarRecursos = document.getElementById('form-editarRecursos');
            formEditarRecursos.addEventListener('submit', function (event) {
              event.preventDefault();

              const tituloRecursosE = document.getElementById('input-tituloRecursosEditar').value;
              const tipoRecursosE = document.getElementById('input-tipoRecursosEditar').value;
              const descripcionRecursosE = document.getElementById('input-descripcionRecursosEditar').value;
              // const urlRecursosE = document.getElementById('input-urlRecursosEditar').value;
              const autorRecursosE = document.getElementById('input-autorRecursosEditar').value;
              const contenidoRecursosE = document.getElementById('input-contenidoRecursosEditar').value;

              const input_imagen = document.getElementById('input-imagenRecursosEditar');
              const archivoImagenRecursos = input_imagen.files[0];
              const formDataEditar = new FormData();





              const recursosEditada = {
                titulo: tituloRecursosE,
                tipo: tipoRecursosE,
                descripcion: descripcionRecursosE,
                // url: urlRecursosE,
                autor: autorRecursosE,
                contenido: contenidoRecursosE
              }

              formDataEditar.append("titulo", recursosEditada.titulo);
              formDataEditar.append("tipo", recursosEditada.tipo);
              formDataEditar.append("descripcion", recursosEditada.descripcion);
              formDataEditar.append("autor", recursosEditada.autor);
              formDataEditar.append("contenido", recursosEditada.contenido);
              formDataEditar.append("image", archivoImagenRecursos);

              fetch(`${ruta}/recurso/${idRecursos}`, {
                method: "PUT",
                // headers: {
                //   "Content-Type": "application/json",
                // },
                // body: JSON.stringify(recursosEditada)
                body: formDataEditar
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar recursos");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("recurso editada:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });

          });

          // BOTON ELIMINAR RECURSO
          const btnEliminarRecursos = document.createElement('button');
          btnEliminarRecursos.title = "Eliminar";
          btnEliminarRecursos.classList.add('btn', 'btn-eliminarRecursos');
          btnEliminarRecursos.setAttribute('data-bs-toggle', 'modal');
          btnEliminarRecursos.setAttribute('data-bs-target', '#modal-eliminarRecursos');
          const iconoEliminar = document.createElement('i');
          iconoEliminar.classList.add('fas', 'fa-trash-alt');
          btnEliminarRecursos.style.color = "red";
          btnEliminarRecursos.appendChild(iconoEliminar);
          btnEliminarRecursos.addEventListener('click', () => {
            document.getElementById("p-Recursos").textContent = celdaTituloRecursos.textContent;
            const btnSIeliminarRecursos = document.getElementById("btn-SIeliminarRecursos");
            btnSIeliminarRecursos.addEventListener('click', () => {
              fetch(`${ruta}/recurso/${idRecursos}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al eliminar recurso");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("recurso eliminada:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });

          });

          // BOTON VER COMENTARIOS
          const btnVerComentarios = document.createElement('button');
          btnVerComentarios.title = "ver comentarios";
          btnVerComentarios.classList.add('btn');
          btnVerComentarios.setAttribute('data-bs-toggle', 'modal');
          btnVerComentarios.setAttribute('data-bs-target', '#modal-verComentarios');
          const iconoComentarios = document.createElement('i');
          iconoComentarios.classList.add('fa', 'fa-comment');
          btnVerComentarios.style.color = "#116B8A";
          btnVerComentarios.appendChild(iconoComentarios);
          btnVerComentarios.addEventListener('click', () => {
            const h4_nombreRecurso = document.getElementById('h4-nombreRecurso');
            h4_nombreRecurso.textContent = objeto.titulo;


            const tablaVerComentariosRecurso = document.getElementById('tabla-verComentarios');
            const tablaBody = tablaVerComentariosRecurso.querySelector('tbody');
            while (tablaBody.firstChild) {
              tablaBody.removeChild(tablaBody.firstChild);
            }
            fetch(`${ruta}/comentario/recurso/${idRecursos}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Error al obtener comentarios de recurso');
                }
                return response.json();
              })
              .then((comentarioRecurso) => {
                comentarioRecurso.data.forEach((objetoComentario) => {
                  const filaComentarioRecurso = document.createElement('tr');

                  const celdaFechaComentario = document.createElement('td');
                  const celdaCorreoComentario = document.createElement('td');
                  const celdaComentarioComentario = document.createElement('td');
                  const celdaVistaComentario = document.createElement('td');

                  const idComentario = objetoComentario.id_comentario;
                  const fechaC = new Date(objetoComentario.fecha);
                  const fechaFormateadaComentario = `${fechaC.getDate()}/${fechaC.getMonth()}/${fechaC.getFullYear()}`;
                  celdaFechaComentario.textContent = fechaFormateadaComentario;
                  celdaCorreoComentario.textContent = objetoComentario.Usuario_normal.Usuario.correo;
                  celdaComentarioComentario.textContent = objetoComentario.descripcion;
                  let vistaComentario = objetoComentario.estado;

                  const btnVistaComentario = document.createElement('button');
                  btnVistaComentario.classList.add('btn');
                  const iconoVistaComentario = document.createElement('i');
                  iconoVistaComentario.classList.add('fa');
                  if (vistaComentario == 1) {
                    iconoVistaComentario.classList.add('fa-eye');
                    btnVistaComentario.title = 'ocultar';
                    btnVistaComentario.style.color = '#13B538';
                  } else {
                    iconoVistaComentario.classList.add('fa-eye-slash');
                    btnVistaComentario.title = 'mostrar';
                    btnVistaComentario.style.color = 'black';
                  }

                  btnVistaComentario.addEventListener('click', () => {
                    if (vistaComentario == 1) {
                      vistaComentario = !vistaComentario;
                      iconoVistaComentario.classList.remove('fa-eye');
                      iconoVistaComentario.classList.add('fa-eye-slash');
                      btnVistaComentario.title = 'mostrar';
                      btnVistaComentario.style.color = 'black';
                    } else {
                      vistaComentario = !vistaComentario;
                      iconoVistaComentario.classList.remove('fa-eye-slash');
                      iconoVistaComentario.classList.add('fa-eye');
                      btnVistaComentario.title = 'ocultar';
                      btnVistaComentario.style.color = '#13B538';
                    }
                    const vistaComentarioEditado = {
                      estado: vistaComentario
                    }
                    fetch(`${ruta}/comentario/${idComentario}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(vistaComentarioEditado)
                    })
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error("Error al editar vista de comentario");
                        }
                        return response.json();
                      })
                      .then((data) => {
                        console.log("vista de comentario editada:", data);
                        window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  });

                  btnVistaComentario.appendChild(iconoVistaComentario);

                  celdaVistaComentario.appendChild(btnVistaComentario);
                  filaComentarioRecurso.appendChild(celdaFechaComentario);
                  filaComentarioRecurso.appendChild(celdaCorreoComentario);
                  filaComentarioRecurso.appendChild(celdaComentarioComentario);
                  filaComentarioRecurso.appendChild(celdaVistaComentario);

                  tablaVerComentariosRecurso.querySelector('tbody').appendChild(filaComentarioRecurso);
                });
              })
              .catch((error) => {
                console.error(error);
              });
          });

          celdaVerComentarios.appendChild(btnVerComentarios);
          celdaVisibilidadRecursos.appendChild(btnVisibilidadRecursos);
          celdaEditarRecursos.appendChild(btnEditarRecursos);
          celdaEliminarRecursos.appendChild(btnEliminarRecursos);

          filaRecursos.appendChild(celdaTituloRecursos);
          filaRecursos.appendChild(celdaTipoRecursos);
          filaRecursos.appendChild(celdaDescripcionRecursos);
          // filaRecursos.appendChild(celdaUrlRecursos);
          filaRecursos.appendChild(celdaAutorRecursos);
          filaRecursos.appendChild(celdaContenidoRecursos);

          filaRecursos.appendChild(celdaVisibilidadRecursos);
          filaRecursos.appendChild(celdaEditarRecursos);
          filaRecursos.appendChild(celdaEliminarRecursos);
          filaRecursos.appendChild(celdaVerComentarios);

          tablaRecursos.querySelector('tbody').appendChild(filaRecursos);
        })
      })
      .catch((error) => {
        console.error(error);
      });
    // BOTON AGREGAR recurso
    const formRegistrarRecursos = document.getElementById('form-registrarRecursos');
    formRegistrarRecursos.addEventListener('submit', function (event) {
      event.preventDefault();

      const tituloRecursos = document.getElementById('input-tituloRecursos').value;
      const tipoRecursos = document.getElementById('input-tipoRecursos').value;
      const descripcionRecursos = document.getElementById('input-descripcionRecursos').value;
      // const urlRecursos = document.getElementById('input-urlRecursos').value;
      const autorRecursos = document.getElementById('input-autorRecursos').value;
      const contenidoRecursos = document.getElementById('input-contenidoRecursos').value;

      const input_imagen = document.getElementById('input-imagenRecursos');
      const archivoImagenRecursos = input_imagen.files[0];
      const formData = new FormData();

      const nuevaRecursos = {
        titulo: tituloRecursos,
        tipo: tipoRecursos,
        descripcion: descripcionRecursos,
        // url: urlRecursos,
        autor: autorRecursos,
        contenido: contenidoRecursos,
        visibilidad: 1,
        id_administrador: id_admin
        // se debe obtener el id administrador ---------------
      }

      formData.append("titulo", nuevaRecursos.titulo);
      formData.append("tipo", nuevaRecursos.tipo);
      formData.append("descripcion", nuevaRecursos.descripcion);
      formData.append("autor", nuevaRecursos.autor);
      formData.append("contenido", nuevaRecursos.contenido);
      formData.append("visibilidad", nuevaRecursos.visibilidad);
      formData.append("id_administrador", nuevaRecursos.id_administrador);
      formData.append("image", archivoImagenRecursos);

      fetch(`${ruta}/recurso`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(nuevaRecursos)
        body: formData
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al registrar Recursos");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Recursos registrada:", data);
          // window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
        })
        .catch((error) => {
          console.error(error);
        });
    });


  });

  const li_ayuda = document.getElementById('li-ayuda');
  li_ayuda.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'block';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';


    const tablaInstituciones = document.getElementById('tabla-instituciones');
    vaciarTabla(tablaInstituciones);
    fetch(`${ruta}/institucion_ayuda`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener instituciones');
        }
        return response.json();
      })
      .then((instituciones) => {
        instituciones.data.forEach((objeto) => {
          const filaInstitucion = document.createElement('tr');
          const celdaNombreInstitucion = document.createElement('td');
          const celdaTelefonoInstitucion = document.createElement('td');
          const celdaDescripcionInstitucion = document.createElement('td');
          const celdaUrlInstitucion = document.createElement('td');
          const celdaEditarInstitucion = document.createElement('td');
          const celdaEliminarInstitucion = document.createElement('td');

          let idInstitucion = objeto.id_inst_ayuda;
          celdaNombreInstitucion.textContent = objeto.nombre_institucion;
          celdaTelefonoInstitucion.textContent = objeto.telefono;
          celdaDescripcionInstitucion.textContent = objeto.descripcion;
          celdaUrlInstitucion.textContent = objeto.url;

          // BOTON EDITAR INSTITUCION
          const btnEditarInstitucion = document.createElement('button');
          btnEditarInstitucion.title = "Editar";
          btnEditarInstitucion.classList.add('btn', 'btn-editarInstitucion');
          btnEditarInstitucion.setAttribute('data-bs-toggle', 'modal');
          btnEditarInstitucion.setAttribute('data-bs-target', '#modal-editarInstitucion');
          const iconoEditar = document.createElement('i');
          iconoEditar.classList.add('fas', 'fa-edit');
          btnEditarInstitucion.style.color = "#34A3FF";
          btnEditarInstitucion.appendChild(iconoEditar);
          btnEditarInstitucion.addEventListener('click', () => {
            document.getElementById('img-imagenInstitucionEditar').src = objeto.imagen;

            document.getElementById('input-nombreInstitucionEditar').value = celdaNombreInstitucion.textContent;
            document.getElementById('input-telefonoInstitucionEditar').value = celdaTelefonoInstitucion.textContent;
            document.getElementById('input-descripcionInstitucionEditar').value = celdaDescripcionInstitucion.textContent;
            document.getElementById('input-urlInstitucionEditar').value = celdaUrlInstitucion.textContent;

            document.getElementById('input-imagenInstitucionEditar').addEventListener('change', function (e) {
              const imagenSeleccionada = e.target.files[0];
              const imagenInstitucion = document.getElementById('img-imagenInstitucionEditar');

              // Verifica si se seleccionó una imagen
              if (imagenSeleccionada) {
                const urlImagen = URL.createObjectURL(imagenSeleccionada);
                imagenInstitucion.src = urlImagen;
              }
            });

            const formEditarInstitucion = document.getElementById('form-registrarInstituciónEditar');
            formEditarInstitucion.addEventListener('submit', function (event) {
              event.preventDefault();
              const nombreInstitucionE = document.getElementById('input-nombreInstitucionEditar').value;
              const telefonoInstitucionE = document.getElementById('input-telefonoInstitucionEditar').value;
              const descripcionInstitucionE = document.getElementById('input-descripcionInstitucionEditar').value;
              const urlInstitucionE = document.getElementById('input-urlInstitucionEditar').value;

              const input_imagenInstitucionEditar = document.getElementById('input-imagenInstitucionEditar');
              const archivoImagenInstitucionEditar = input_imagenInstitucionEditar.files[0];
              const formDataInstitucionEditar = new FormData();


              const institucionEditada = {
                nombre_institucion: nombreInstitucionE,
                telefono: telefonoInstitucionE,
                descripcion: descripcionInstitucionE,
                url: urlInstitucionE
                // se debe obtener el id administrador ---------------
              }

              formDataInstitucionEditar.append("nombre_institucion", institucionEditada.nombre_institucion);
              formDataInstitucionEditar.append("telefono", institucionEditada.telefono);
              formDataInstitucionEditar.append("descripcion", institucionEditada.descripcion);
              formDataInstitucionEditar.append("url", institucionEditada.url);
              formDataInstitucionEditar.append("image", archivoImagenInstitucionEditar);



              fetch(`${ruta}/institucion_ayuda/${idInstitucion}`, {
                method: "PUT",
                // headers: {
                //   "Content-Type": "application/json",
                // },
                // body: JSON.stringify(institucionEditada)
                body: formDataInstitucionEditar
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar la institucion");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Institucion editada:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });

          });
          // BOTON ELIMINAR INSTITUCION
          const btnEliminarInstitucion = document.createElement('button');
          btnEliminarInstitucion.title = "Eliminar";
          btnEliminarInstitucion.classList.add('btn', 'btn-eliminarInstitucion');
          btnEliminarInstitucion.setAttribute('data-bs-toggle', 'modal');
          btnEliminarInstitucion.setAttribute('data-bs-target', '#modal-eliminarInstitucion');
          const iconoEliminar = document.createElement('i');
          iconoEliminar.classList.add('fas', 'fa-trash-alt');
          btnEliminarInstitucion.style.color = "red";
          btnEliminarInstitucion.appendChild(iconoEliminar);
          btnEliminarInstitucion.addEventListener('click', () => {
            document.getElementById("p-institucion").textContent = celdaNombreInstitucion.textContent;
            const btnSIeliminarInstitucion = document.getElementById("btn-SIeliminarInstitucion");
            btnSIeliminarInstitucion.addEventListener('click', () => {
              fetch(`${ruta}/institucion_ayuda/${idInstitucion}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al eliminar la institucion");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Institucion eliminada:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });

          });
          celdaEditarInstitucion.appendChild(btnEditarInstitucion);
          celdaEliminarInstitucion.appendChild(btnEliminarInstitucion);

          filaInstitucion.appendChild(celdaNombreInstitucion);
          filaInstitucion.appendChild(celdaTelefonoInstitucion);
          filaInstitucion.appendChild(celdaDescripcionInstitucion);
          filaInstitucion.appendChild(celdaUrlInstitucion);
          filaInstitucion.appendChild(celdaEditarInstitucion);
          filaInstitucion.appendChild(celdaEliminarInstitucion);

          tablaInstituciones.querySelector('tbody').appendChild(filaInstitucion);
        })
      })
      .catch((error) => {
        console.error(error);
      });


    // BOTON AGREGAR INSTITUCION
    const formRegistrarInstitucion = document.getElementById('form-registrarInstitución');
    formRegistrarInstitucion.addEventListener('submit', function (event) {
      event.preventDefault();
      const nombreInstitucion = document.getElementById('input-nombreInstitucion').value;
      const telefonoInstitucion = document.getElementById('input-telefonoInstitucion').value;
      const descripcionInstitucion = document.getElementById('input-descripcionInstitucion').value;
      const urlInstitucion = document.getElementById('input-urlInstitucion').value;

      const input_imagenInstitucion = document.getElementById('input-imagenInstitucion');
      const archivoImagenInstitucion = input_imagenInstitucion.files[0];
      const formDataInstitucion = new FormData();


      const nuevaInstitucion = {
        nombre_institucion: nombreInstitucion,
        telefono: telefonoInstitucion,
        descripcion: descripcionInstitucion,
        url: urlInstitucion,
        id_administrador: id_admin
        // se debe obtener el id administrador ---------------
      }

      formDataInstitucion.append("nombre_institucion", nuevaInstitucion.nombre_institucion);
      formDataInstitucion.append("telefono", nuevaInstitucion.telefono);
      formDataInstitucion.append("descripcion", nuevaInstitucion.descripcion);
      formDataInstitucion.append("url", nuevaInstitucion.url);
      formDataInstitucion.append("id_administrador", nuevaInstitucion.id_administrador);
      formDataInstitucion.append("image", archivoImagenInstitucion);


      fetch(`${ruta}/institucion_ayuda`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(nuevaInstitucion)
        body: formDataInstitucion
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al registrar la institucion");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Institucion registrada:", data);
          window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
        })
        .catch((error) => {
          console.error(error);
        });
    });

  });

  const li_denuncias = document.getElementById('li-denuncias');
  li_denuncias.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'block';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';

    const tablaDenuncias = document.getElementById('tabla-denuncias');
    vaciarTabla(tablaDenuncias);
    fetch(`${ruta}/denuncia`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las denuncias');
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((denuncias) => {
        denuncias.data.forEach((objeto) => {
          const filaDenuncia = document.createElement('tr');

          const celdaIdUsuarioDenuncia = document.createElement('td');
          const celdaNombreVictima = document.createElement('td');
          const celdaNombreAgresor = document.createElement('td');
          const celdaTipoViolencia = document.createElement('td');
          const celdaTipoDenuncia = document.createElement('td');
          const celdaFechaDenuncia = document.createElement('td');
          const celdaDescripcionDenuncia = document.createElement('td');
          const celdaPruebasDenuncia = document.createElement('td');
          const celdaUbicacionDenuncia = document.createElement('td');
          const celdaEstado = document.createElement('td');

          const btnPrueba = document.createElement('button');
          btnPrueba.title = "Prueba";
          btnPrueba.classList.add('btn',);
          btnPrueba.setAttribute('data-bs-toggle', 'modal');
          btnPrueba.setAttribute('data-bs-target', '#modal-pruebaDenuncia');
          const iconoPrueba = document.createElement('i');
          iconoPrueba.classList.add('bi', 'bi-image');
          btnPrueba.style.color = "green";
          btnPrueba.appendChild(iconoPrueba);

          // Asignando datos
          const idDenuncia = objeto.id_denuncia;
          celdaIdUsuarioDenuncia.textContent = objeto.id_usuario;
          celdaNombreVictima.textContent = objeto.nombre_victima;
          celdaNombreAgresor.textContent = objeto.nombre_agresor;
          celdaTipoViolencia.textContent = objeto.tipo_violencia;
          celdaTipoDenuncia.textContent = objeto.tipo_denuncia;

          // let fechaA = new Date(objeto.fecha);
          // let fechaFormateada = `${fechaA.getDate()}/${fechaA.getMonth()}/${fechaA.getFullYear()}`;
          let fechaA = new Date(objeto.fecha);
          let fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
          celdaFechaDenuncia.textContent = fechaFormateada;
          celdaDescripcionDenuncia.textContent = objeto.descripcion;

          // celdaPruebasDenuncia.textContent = objeto.pruebas;

          celdaUbicacionDenuncia.textContent = objeto.ubicacion;

          const botonEstadoDenuncia = document.createElement('button');
          botonEstadoDenuncia.classList.add('btn');


          const img_prueba = document.getElementById('img-prueba');
          btnPrueba.addEventListener('click', () => {
            img_prueba.src = objeto.pruebas;
          });
          // btnPrueba.appendChild(img_prueba);
          celdaPruebasDenuncia.appendChild(btnPrueba);

          if (objeto.estado == 1) {
            botonEstadoDenuncia.textContent = 'Asistiendo';
            botonEstadoDenuncia.classList.add('btn-success');

          } else {
            botonEstadoDenuncia.textContent = '¿Asistir?';
            botonEstadoDenuncia.classList.add('btn-secondary');
          }

          celdaEstado.appendChild(botonEstadoDenuncia);

          filaDenuncia.appendChild(celdaIdUsuarioDenuncia);
          filaDenuncia.appendChild(celdaNombreVictima);
          filaDenuncia.appendChild(celdaNombreAgresor);
          filaDenuncia.appendChild(celdaTipoViolencia);
          filaDenuncia.appendChild(celdaTipoDenuncia);
          filaDenuncia.appendChild(celdaFechaDenuncia);
          filaDenuncia.appendChild(celdaDescripcionDenuncia);
          filaDenuncia.appendChild(celdaUbicacionDenuncia);
          filaDenuncia.appendChild(celdaPruebasDenuncia);
          filaDenuncia.appendChild(celdaEstado);

          tablaDenuncias.querySelector('tbody').appendChild(filaDenuncia);
          botonEstadoDenuncia.addEventListener('click', () => {
            if (botonEstadoDenuncia.textContent == '¿Asistir?') {
              const nuevoAsiste = {
                id_administrador: id_admin,
                id_denuncia: idDenuncia
              };
              fetch(`${ruta}/asiste`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoAsiste)
              })
                .then((data) => {
                  console.log("Asiste registrado:", data);
                  botonEstadoDenuncia.textContent = 'Asistiendo';
                  botonEstadoDenuncia.classList.remove('btn-secondary');
                  botonEstadoDenuncia.classList.add('btn-success');
                  //window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              fetch(`${ruta}/asiste/${id_admin}/denuncia/${idDenuncia}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then((data) => {
                  console.log("Asiste eliminado:", data);
                  console.log(data);
                  botonEstadoDenuncia.textContent = '¿Asistir?';
                  botonEstadoDenuncia.classList.remove('btn-success');
                  botonEstadoDenuncia.classList.add('btn-secondary');
                  //window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const li_reportados = document.getElementById('li-reportados');
  li_reportados.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'block';
    document.getElementById('section-aprende').style.display = 'none';

    const tablaUsuarios = document.getElementById('tabla-usuariosReportados');
    vaciarTabla(tablaUsuarios);
    // Realiza una solicitud GET al endpoint del backend que devuelve los usuarios en formato JSON
    fetch(`${ruta}/usuario_normal`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((usuarios) => {
        usuarios.data.forEach((objeto) => {

          const fila = document.createElement('tr');
          const celdaCI = document.createElement('td');
          const celdaNombre = document.createElement('td');
          const celdaCorreo = document.createElement('td');
          const celdaDireccion = document.createElement('td');
          const celdaFechaNac = document.createElement('td');
          const celdaGenero = document.createElement('td');
          const celdaNombreUsuario = document.createElement('td');
          const celdaTelefono = document.createElement('td');
          const celdaPassword = document.createElement('td');
          const celdaEstadoUsuario = document.createElement('td');

          let idUsuario = objeto.id_usuario;
          celdaCI.textContent = objeto.Usuario.ci;
          celdaNombre.textContent = objeto.Usuario.nombre;
          celdaCorreo.textContent = objeto.Usuario.correo;
          celdaDireccion.textContent = objeto.Usuario.direccion;

          // let fechaA = new Date(objeto.Usuario.fecha_nac);
          // let fechaFormateada = `${fechaA.getDate()}/${fechaA.getMonth()}/${fechaA.getFullYear()}`;
          let fechaA = new Date(objeto.Usuario.fecha_nac);
          let fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
          celdaFechaNac.textContent = fechaFormateada;

          celdaGenero.textContent = objeto.Usuario.genero;
          celdaNombreUsuario.textContent = objeto.Usuario.nombre_usuario;
          celdaTelefono.textContent = objeto.Usuario.telefono;
          celdaPassword.textContent = objeto.Usuario.contrasenia;
          let estadoUsuario = objeto.estado;

          const btnEstadoUsuario = document.createElement('button');
          btnEstadoUsuario.classList.add('btn');
          btnEstadoUsuario.classList.add('btn-warning');
          btnEstadoUsuario.textContent = '¿Habilitar?';
          btnEstadoUsuario.addEventListener('click', () => {
            if (btnEstadoUsuario.textContent == '¿Habilitar?') {
              btnEstadoUsuario.classList.remove('btn-warning');
              btnEstadoUsuario.classList.add('btn-success');
              btnEstadoUsuario.textContent = 'Habilitado';
              const usuarioEstado = {
                ci: celdaCI.innerText,
                nombre: celdaNombre.innerText,
                fecha_nac: celdaFechaNac.innerText,
                genero: celdaGenero.innerText,
                direccion: celdaDireccion.innerText,
                correo: celdaCorreo.innerText,
                telefono: celdaTelefono.innerText,
                nombre_usuario: celdaNombreUsuario.innerText,
                contrasenia: celdaPassword.innerText,
                estado: 'activo'

              }
              fetch(`${ruta}/usuario_normal/${idUsuario}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioEstado)
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar el Usuario");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Estado de Usuario editado:", data);
                  // window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              btnEstadoUsuario.classList.remove('btn-success');
              btnEstadoUsuario.classList.add('btn-warning');
              btnEstadoUsuario.textContent = '¿Habilitar?';
              const usuarioEstado = {
                ci: celdaCI.innerText,
                nombre: celdaNombre.innerText,
                fecha_nac: celdaFechaNac.innerText,
                genero: celdaGenero.innerText,
                direccion: celdaDireccion.innerText,
                correo: celdaCorreo.innerText,
                telefono: celdaTelefono.innerText,
                nombre_usuario: celdaNombreUsuario.innerText,
                contrasenia: celdaPassword.innerText,
                estado: 'desactivo'

              }
              fetch(`${ruta}/usuario_normal/${idUsuario}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioEstado)
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar el Usuario");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Estado de Usuario editado:", data);
                  // window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          });


          if (estadoUsuario == 'desactivo') {
            celdaEstadoUsuario.appendChild(btnEstadoUsuario);
            fila.appendChild(celdaCI);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCorreo);
            fila.appendChild(celdaDireccion);
            fila.appendChild(celdaFechaNac);
            fila.appendChild(celdaGenero);
            fila.appendChild(celdaNombreUsuario);
            fila.appendChild(celdaTelefono);
            //fila.appendChild(celdaPassword);
            fila.appendChild(celdaEstadoUsuario);
          }
          tablaUsuarios.querySelector('tbody').appendChild(fila);


          // Boton para activar o desactivar usuario

        });
      })
      .catch((error) => {
        console.error(error);
      });

  });

  const li_aprende = document.getElementById('li-aprende');
  li_aprende.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'block';

    const tablaActividades = document.getElementById('tabla-actividades');
    vaciarTabla(tablaActividades);
    fetch(`${ruta}/actividad`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener actividad');
        }
        return response.json();
      })
      .then((actividades) => {
        actividades.data.forEach((objeto) => {
          const filaActividad = document.createElement('tr');
          const celdaNombreActividad = document.createElement('td');
          const celdaTipoActividad = document.createElement('td');
          const celdaDescripcionActividad = document.createElement('td');
          const celdaFechaInicioActividad = document.createElement('td');
          const celdaFechaFinActividad = document.createElement('td');
          const celdaHoraActividad = document.createElement('td');
          const celdaEditarActividad = document.createElement('td');
          const celdaEliminarActividad = document.createElement('td');

          let idActividad = objeto.id_actividad;
          celdaNombreActividad.textContent = objeto.nombre_actividad;
          celdaTipoActividad.textContent = objeto.tipo;
          celdaDescripcionActividad.textContent = objeto.descripcion;

          let fechaA = new Date(objeto.fecha_ini);
          let fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
          celdaFechaInicioActividad.textContent = fechaFormateada;

          fechaA = new Date(objeto.fecha_fin);
          fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
          celdaFechaFinActividad.textContent = fechaFormateada;

          const fecha = new Date(objeto.hora);
          const horas = fecha.getUTCHours();
          const minutos = fecha.getMinutes();
          const horaFormateada = horas.toString().padStart(2, '0');
          const minutosFormateados = minutos.toString().padStart(2, '0');
          celdaHoraActividad.textContent = `${horaFormateada}:${minutosFormateados}`;

          // BOTON EDITAR ACTIVIDAD
          const btnEditarActividad = document.createElement('button');
          btnEditarActividad.title = "Editar";
          btnEditarActividad.classList.add('btn', 'btn-editarActividad');
          btnEditarActividad.setAttribute('data-bs-toggle', 'modal');
          btnEditarActividad.setAttribute('data-bs-target', '#modal-editarActividad');
          const iconoEditar = document.createElement('i');
          iconoEditar.classList.add('fas', 'fa-edit');
          btnEditarActividad.style.color = "#34A3FF";
          btnEditarActividad.appendChild(iconoEditar);


          btnEditarActividad.addEventListener('click', () => {
            document.getElementById('img-imagenActividadEditar').src = objeto.imagen;
            document.getElementById('input-nombreActividadEditar').value = celdaNombreActividad.textContent;
            document.getElementById('input-tipoActividadEditar').value = celdaTipoActividad.textContent;
            document.getElementById('input-descripcionActividadEditar').value = celdaDescripcionActividad.textContent;

            let fechaA = new Date(objeto.fecha_ini);
            // Ajusta la fecha a la zona horaria del usuario
            let año = fechaA.getUTCFullYear();
            let mes = (fechaA.getUTCMonth() + 1).toString().padStart(2, '0'); // Agregamos 1 porque los meses en JavaScript comienzan desde 0
            let dia = (fechaA.getUTCDate()).toString().padStart(2, '0');
            let fechaFormateadaInicio = `${año}-${mes}-${dia}`;
            document.getElementById('input-fechaInicioActividadEditar').value = fechaFormateadaInicio;

            fechaA = new Date(objeto.fecha_fin);
            año = fechaA.getUTCFullYear();
            mes = (fechaA.getUTCMonth() + 1).toString().padStart(2, '0'); // Agregamos 1 porque los meses en JavaScript comienzan desde 0
            dia = (fechaA.getUTCDate()).toString().padStart(2, '0');
            let fechaFormateadaFin = `${año}-${mes}-${dia}`;
            document.getElementById('input-fechaFinActividadEditar').value = fechaFormateadaFin

            document.getElementById('input-horaActividadEditar').value = celdaHoraActividad.textContent;

            document.getElementById('input-imagenActividadEditar').addEventListener('change', function (e) {
              const imagenSeleccionada = e.target.files[0];
              const imagenActividad = document.getElementById('img-imagenActividadEditar');

              // Verifica si se seleccionó una imagen
              if (imagenSeleccionada) {
                const urlImagen = URL.createObjectURL(imagenSeleccionada);
                imagenActividad.src = urlImagen;
              }
            });

            // document.getElementById('btn-close').addEventListener('click', (event) => {
            //   const ventana = 'section-aprende';
            //   window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}&ventana=${ventana}`;
            // });

            // document.getElementById('btn-cancelar').addEventListener('click', (event) => {
            //   window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}&ventana=${ventana}`;
            // });

            const formEditarActividad = document.getElementById('form-editarActividad');
            formEditarActividad.addEventListener('submit', function (event) {
              event.preventDefault();
              console.log(objeto)
              const nombreActividadE = document.getElementById('input-nombreActividadEditar').value;
              const tipoActividadE = document.getElementById('input-tipoActividadEditar').value;
              const descripcionActividadE = document.getElementById('input-descripcionActividadEditar').value;
              const fechaInicioActividadE = document.getElementById('input-fechaInicioActividadEditar').value;
              const fechaFinActividadE = document.getElementById('input-fechaFinActividadEditar').value;
              const horaActividadE = document.getElementById('input-horaActividadEditar').value;

              const input_imagenActividadEditar = document.getElementById('input-imagenActividadEditar');
              const archivoImagenActividadEditar = input_imagenActividadEditar.files[0];
              const formDataActividadEditar = new FormData();

              const actividadEditada = {
                nombre_actividad: nombreActividadE,
                tipo: tipoActividadE,
                descripcion: descripcionActividadE,
                fecha_ini: fechaInicioActividadE,
                fecha_fin: fechaFinActividadE,
                hora: horaActividadE,
                id_administrador: id_admin
                // se debe obtener el id administrador ---------------
              }

              formDataActividadEditar.append("nombre_actividad", actividadEditada.nombre_actividad);
              formDataActividadEditar.append("tipo", actividadEditada.tipo);
              formDataActividadEditar.append("descripcion", actividadEditada.descripcion);
              formDataActividadEditar.append("fecha_ini", actividadEditada.fecha_ini);
              formDataActividadEditar.append("fecha_fin", actividadEditada.fecha_fin);
              formDataActividadEditar.append("hora", actividadEditada.hora);
              formDataActividadEditar.append("id_administrador", actividadEditada.id_administrador);
              formDataActividadEditar.append("image", archivoImagenActividadEditar);

              fetch(`${ruta}/actividad/${idActividad}`, {
                method: "PUT",
                // headers: {
                //   "Content-Type": "application/json",
                // },
                // body: JSON.stringify(actividadEditada)
                body: formDataActividadEditar
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar la actividad");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Actividad editada:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          });

          // BOTON ELIMINAR ACTIVIDAD
          const btnEliminarActividad = document.createElement('button');
          btnEliminarActividad.title = "Eliminar";
          btnEliminarActividad.classList.add('btn', 'btn-eliminarActividad');
          btnEliminarActividad.setAttribute('data-bs-toggle', 'modal');
          btnEliminarActividad.setAttribute('data-bs-target', '#modal-eliminarActividad');
          const iconoEliminar = document.createElement('i');
          iconoEliminar.classList.add('fas', 'fa-trash-alt');
          btnEliminarActividad.style.color = "red";
          btnEliminarActividad.appendChild(iconoEliminar);
          btnEliminarActividad.addEventListener('click', () => {
            document.getElementById("p-actividad").textContent = celdaNombreActividad.textContent;
            const btnSIeliminarInstitucion = document.getElementById("btn-SIeliminarActividad");
            btnSIeliminarInstitucion.addEventListener('click', () => {
              fetch(`${ruta}/actividad/${idActividad}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al eliminar la actividad");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Actividad eliminada:", data);
                  window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
                })
                .catch((error) => {
                  console.error(error);
                });
            });

          });

          celdaEditarActividad.appendChild(btnEditarActividad);
          celdaEliminarActividad.appendChild(btnEliminarActividad);

          filaActividad.appendChild(celdaNombreActividad);
          filaActividad.appendChild(celdaTipoActividad);
          filaActividad.appendChild(celdaDescripcionActividad);
          filaActividad.appendChild(celdaFechaInicioActividad);
          filaActividad.appendChild(celdaFechaFinActividad);
          filaActividad.appendChild(celdaHoraActividad);
          filaActividad.appendChild(celdaEditarActividad);
          filaActividad.appendChild(celdaEliminarActividad);

          tablaActividades.querySelector('tbody').appendChild(filaActividad);
        })
      })
      .catch((error) => {
        console.error(error);
      });
    



    // PARA EDITAR ACTIVIDAD
    

    // BOTON AGREGAR ACTIVIDAD
    const formRegistrarActividad = document.getElementById('form-registrarActividad');
    formRegistrarActividad.addEventListener('submit', function (event) {
      event.preventDefault();
      const nombreActividad = document.getElementById('input-nombreActividad').value;
      const tipoActividad = document.getElementById('input-tipoActividad').value;
      const descripcionActividad = document.getElementById('input-descripcionActividad').value;
      const fechaInicioActividad = document.getElementById('input-fechaInicioActividad').value;
      const fechaFinActividad = document.getElementById('input-fechaFinActividad').value;
      const horaActividad = document.getElementById('input-horaActividad').value;

      const input_imagenActividad = document.getElementById('input-imagenActividad');
      const archivoImagenActividad = input_imagenActividad.files[0];
      const formDataActividad = new FormData();

      const nuevaActividad = {
        nombre_actividad: nombreActividad,
        tipo: tipoActividad,
        descripcion: descripcionActividad,
        fecha_ini: fechaInicioActividad,
        fecha_fin: fechaFinActividad,
        hora: horaActividad,
        id_administrador: id_admin
        // se debe obtener el id administrador ---------------
      }

      formDataActividad.append("nombre_actividad", nuevaActividad.nombre_actividad);
      formDataActividad.append("tipo", nuevaActividad.tipo);
      formDataActividad.append("descripcion", nuevaActividad.descripcion);
      formDataActividad.append("fecha_ini", nuevaActividad.fecha_ini);
      formDataActividad.append("fecha_fin", nuevaActividad.fecha_fin);
      formDataActividad.append("hora", nuevaActividad.hora);
      formDataActividad.append("id_administrador", nuevaActividad.id_administrador);
      formDataActividad.append("image", archivoImagenActividad);

      fetch(`${ruta}/actividad`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(nuevaActividad)
        body: formDataActividad
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al registrar la actividad");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Actividad registrada:", data);
          window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
        })
        .catch((error) => {
          console.error(error);
        });
    });


  });

  const a_mi_perfil = document.getElementById('a-mi_perfil');
  a_mi_perfil.addEventListener('click', () => {
    const img_perfil = document.getElementById('img-usuarioPerfil');
    img_perfil.style.objectFit = 'cover';

    const strong_nombreUsuarioPerfil = document.getElementById('strong-nombreUsuarioPerfil');
    const h6_correoUsuarioPerfil = document.getElementById('h6-correoUsuarioPerfil');

    const ciPerfil = document.getElementById('input-ciUsuarioPerfil');
    const nombrePerfil = document.getElementById('input-nombreUsuarioPerfil');

    const fecha_nacPerfil = document.getElementById('input-fechaUsuarioPerfil');

    const direccionPerfil = document.getElementById('input-direccionUsuarioPerfil');
    const correoPerfil = document.getElementById('input-correoUsuarioPerfil')
    const telefonoPerfil = document.getElementById('input-telefonoUsuarioPerfil');
    const userPerfil = document.getElementById('input-userUsuarioPerfil');
    const passwordPerfil = document.getElementById('input-passwordUsuarioPerfil');


    fetch(`${ruta}/administrador/${id_admin}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener Administrador");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Administrador obtenido:");

        // poner el dato de imagen aqui
        img_perfil.src = data.data.Usuario.Imagen_perfil;

        ciPerfil.value = data.data.Usuario.ci;
        nombrePerfil.value = data.data.Usuario.nombre;

        const fechaOriginal = data.data.Usuario.fecha_nac;
        const fechaFormateada = new Date(fechaOriginal).toISOString().split('T')[0];
        // document.getElementById("input-fechaUsuarioEditar").value = fechaFormateada;
        fecha_nacPerfil.value = fechaFormateada;

        let generoPerfil = data.data.Usuario.genero;
        if (generoPerfil == 'MASCULINO') {
          document.getElementById("gridRadios1Perfil").checked = true;
        }
        if (generoPerfil == 'FEMENINO') {
          document.getElementById("gridRadios2Perfil").checked = true;
        }
        if (generoPerfil == 'OTRO') {
          document.getElementById("gridRadios3Perfil").checked = true;
        }
        direccionPerfil.value = data.data.Usuario.direccion;
        correoPerfil.value = data.data.Usuario.correo;
        telefonoPerfil.value = data.data.Usuario.telefono;
        userPerfil.value = data.data.Usuario.nombre_usuario;
        passwordPerfil.value = data.data.Usuario.contrasenia;

        strong_nombreUsuarioPerfil.textContent = nombrePerfil.value;
        h6_correoUsuarioPerfil.textContent = correoPerfil.value;


        //
        // AQUI DEBERIA IR VALIDACIONES
        //

        document.getElementById('imagenPerfil').addEventListener('change', function (e) {
          const imagenSeleccionada = e.target.files[0];
          const imagenPerfilMostrada = document.getElementById('img-usuarioPerfil');

          // Verifica si se seleccionó una imagen
          if (imagenSeleccionada) {
            const urlImagen = URL.createObjectURL(imagenSeleccionada);
            imagenPerfilMostrada.src = urlImagen;
          }
        });

        const form_perfilUsuario = document.getElementById('form-perfilUsuario');
        form_perfilUsuario.addEventListener('submit', function (event) {
          event.preventDefault();
          const nombrePerfilE = nombrePerfil.value;
          const fecha_nacPerfilE = fecha_nacPerfil.value;
          const direccionPerfilE = direccionPerfil.value;
          const telefonoPerfilE = telefonoPerfil.value;
          const userPerfilE = userPerfil.value;
          const passwordPerfilE = passwordPerfil.value;

          var generoPerfilE = "";
          if (document.getElementById("gridRadios1Perfil").checked) {
            generoPerfilE = document.getElementById("gridRadios1Perfil").value.toUpperCase();
          } else {
            if (document.getElementById("gridRadios2Perfil").checked) {
              generoPerfilE = document.getElementById("gridRadios2Perfil").value.toUpperCase();
            } else {
              generoPerfilE = document.getElementById("gridRadios3Perfil").value.toUpperCase();
            }
          }

          const input_imagenPerfilUsuario = document.getElementById('imagenPerfil');
          const archivoImagenPerfilUsuario = input_imagenPerfilUsuario.files[0];
          const formDataPerfilUsuario = new FormData();

          const perfilEditadoAdministrador = {
            nombre: nombrePerfilE,
            fecha_nac: fecha_nacPerfilE,
            genero: generoPerfilE,
            direccion: direccionPerfilE,
            telefono: telefonoPerfilE,
            nombre_usuario: userPerfilE,
            contrasenia: passwordPerfilE
          }

          formDataPerfilUsuario.append("nombre", perfilEditadoAdministrador.nombre);
          formDataPerfilUsuario.append("fecha_nac", perfilEditadoAdministrador.fecha_nac);
          formDataPerfilUsuario.append("genero", perfilEditadoAdministrador.genero);
          formDataPerfilUsuario.append("direccion", perfilEditadoAdministrador.direccion);
          formDataPerfilUsuario.append("telefono", perfilEditadoAdministrador.telefono);
          formDataPerfilUsuario.append("nombre_usuario", perfilEditadoAdministrador.nombre_usuario);
          formDataPerfilUsuario.append("contrasenia", perfilEditadoAdministrador.contrasenia);
          formDataPerfilUsuario.append("image", archivoImagenPerfilUsuario);

          fetch(`${ruta}/administrador/${id_admin}`, {
            method: "PUT",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            // body: JSON.stringify(perfilEditadoAdministrador)
            body: formDataPerfilUsuario
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al editar datos de perfil");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Perfil editado:", data);
              window.location.href = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}&id_administrador=${id_admin}`;
            })
            .catch((error) => {
              console.error(error);
            });
        });

      })
      .catch((error) => {
        console.error(error);
      });
      
  });
});
