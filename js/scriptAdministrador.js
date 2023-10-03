const queryStringAdmin = window.location.search;
const urlParamsAdmin = new URLSearchParams(queryStringAdmin);
const correoUsuario = urlParamsAdmin.get('correo');
const id_usuario = urlParamsAdmin.get('id_usuario');
const rol = urlParamsAdmin.get('rol');
if (correoUsuario != null) {
  document.getElementById('span-correoUsuario').textContent = correoUsuario;
  console.log(document.getElementById('h6-correoUsuario'));
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
}
const cerrarSesionLink = document.getElementById("cerrar_sesion");
cerrarSesionLink.addEventListener("click", function (event) {
  event.preventDefault();
  history.replaceState({}, '', 'index.html');
  window.location.href = 'index.html';
});
// -----------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const li_usuarios = document.getElementById('li-usuarios');
  li_usuarios.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'block';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';

    const tablaUsuarios = document.getElementById('tabla-usuarios');
    // Realiza una solicitud GET al endpoint del backend que devuelve los usuarios en formato JSON
    fetch('http://127.0.0.1:3000/api/usuario')
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

          celdaCI.textContent = objeto.ci;
          celdaNombre.textContent = objeto.nombre;
          celdaCorreo.textContent = objeto.correo;
          celdaDireccion.textContent = objeto.direccion;
          celdaFechaNac.textContent = objeto.fecha_nac;
          celdaGenero.textContent = objeto.genero;
          celdaNombreUsuario.textContent = objeto.nombre_usuario;
          celdaTelefono.textContent = objeto.telefono;

          fila.appendChild(celdaCI);
          fila.appendChild(celdaNombre);
          fila.appendChild(celdaCorreo);
          fila.appendChild(celdaDireccion);
          fila.appendChild(celdaFechaNac);
          fila.appendChild(celdaGenero);
          fila.appendChild(celdaNombreUsuario);
          fila.appendChild(celdaTelefono);

          tablaUsuarios.querySelector('tbody').appendChild(fila);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  
  const a_tituloRol = document.getElementById('a-tituloRol');
  a_tituloRol.addEventListener('click', function(event){
    event.preventDefault();
    const nuevaURL = `indexAdministrador.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  // Funciones para el sidebar
  const li_permisos = document.getElementById('li-permisos');
  li_permisos.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'block';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';
  });

  const li_recursos = document.getElementById('li-recursos');
  li_recursos.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'block';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';
  });

  const li_ayuda = document.getElementById('li-ayuda');
  li_ayuda.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'block';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';
  });

  const li_denuncias = document.getElementById('li-denuncias');
  li_denuncias.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'block';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'none';
  });

  const li_reportados = document.getElementById('li-reportados');
  li_reportados.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'block';
    document.getElementById('section-aprende').style.display = 'none';
  });

  const li_aprende = document.getElementById('li-aprende');
  li_aprende.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('section-principal').style.display = 'none';
    document.getElementById('section-usuarios').style.display = 'none';
    document.getElementById('section-permisos').style.display = 'none';
    document.getElementById('section-recursos').style.display = 'none';
    document.getElementById('section-ayuda').style.display = 'none';
    document.getElementById('section-denuncias').style.display = 'none';
    document.getElementById('section-reportados').style.display = 'none';
    document.getElementById('section-aprende').style.display = 'block';
  });
});
