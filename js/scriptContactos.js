// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/"+"api";
//---------------------------------------------------------------
const queryStringContacto = window.location.search;
const urlParamsContacto = new URLSearchParams(queryStringContacto);
const correoUsuario = urlParamsContacto.get('correo');
const id_usuario = urlParamsContacto.get('id_usuario');
const rol = urlParamsContacto.get('rol');
if (correoUsuario != 'null') {
  document.getElementById('btnRegInicio').style.display = 'none';
  document.getElementById('correoUsuario').style.display = 'block';
  document.getElementById('spanCorreo').textContent = correoUsuario;
  document.getElementById('h6nomUsuario').textContent = correoUsuario;
  document.getElementById('a-contacto').style.display = 'block';
}
const cerrarSesionLink = document.getElementById("cerrar_sesion");
cerrarSesionLink.addEventListener("click", function(event) {
  window.location.href = 'index.html';
});

// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Funcines para enviar datos a los nav--------------------------
  const h1_nomasviolencia = document.getElementById("h1-nomasviolencia");
  h1_nomasviolencia.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `index.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_inicio = document.getElementById("a-inicio");
  a_inicio.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `index.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_actividad = document.getElementById("a-actividad");
  a_actividad.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `actividad.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_recurso = document.getElementById("a-recurso");
  a_recurso.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `recurso.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_denuncia = document.getElementById("a-denuncia");
  a_denuncia.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `denuncia.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_contacto = document.getElementById("a-contacto");
  a_contacto.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `contacto.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_politica = document.getElementById("a-politica");
  a_politica.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `politica.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_institucion = document.getElementById("a-institucion");
  a_institucion.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `instituciones.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_perfil = document.getElementById("a-perfil");
  a_perfil.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  // --------------------------------------------
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
                window.location.href = `contacto.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
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
              window.location.href = `contacto.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
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

  //-------------------------------------------------------------
  // REGISTRAR CONTACTO

  const formRegistrarContracto = document.getElementById("form-registrarContacto");
  formRegistrarContracto.addEventListener("submit", function (event) {
    event.preventDefault();

    // const id_usuario = io;
    const nombreContacto = document.getElementById("input-nomContacto").value;
    const numeroContacto = document.getElementById("input-numContacto").value;

    if (!valNombreContacto.test(nombreContacto)) {
      document.getElementById("input-nomContacto").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      document.getElementById("input-nomContacto").classList.add("is-invalid");
      setTimeout(function () {
        document.getElementById("input-nomContacto").classList.remove("is-invalid");
      }, 30000);
      return;
    }
    if (!valNumeroContacto.test(numeroContacto)) {
      document.getElementById("input-numContacto").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      document.getElementById("input-numContacto").classList.add("is-invalid");
      setTimeout(function () {
        document.getElementById("input-numContacto").classList.remove("is-invalid");
      }, 30000);
      return;
    }

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
        window.location.href = `contacto.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
      })
      .catch((error) => {
        console.error(error);
      });
  });

});



