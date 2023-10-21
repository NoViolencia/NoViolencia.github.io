// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/"+"api";
//  ----------------------------------------------------------------------
const queryStringInstitucion = window.location.search;
const urlParamsInstitucion = new URLSearchParams(queryStringInstitucion);
const correoUsuario = urlParamsInstitucion.get('correo');
const id_usuario = urlParamsInstitucion.get('id_usuario');
const rol = urlParamsInstitucion.get('rol');
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

// -------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
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
  const a_denunciaPublica = document.getElementById("a-denunciaPublica");
  a_denunciaPublica.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `denunciaPublica.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_instituciones = document.getElementById("a-institucion");
  a_instituciones.addEventListener("click", function(event) {
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
  a_politica.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `politica.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_perfil = document.getElementById("a-perfil");
  a_perfil.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `perfil.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  // --------------------------------------------
  const divPrincipal = document.getElementById('div-principal');
  fetch(`${ruta}/institucion_ayuda`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener las instituciones');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then((institucion) => {
      institucion.data.forEach((objeto) => {
        // console.log(objeto);
        const divcard = document.createElement('div');

        const imgInst = document.createElement('img');
        imgInst.classList.add('card-img-top', 'w-100');

        const divcardbody = document.createElement('div');
        divcard.classList.add('card-body');

        const h5titulo = document.createElement('h5');
        h5titulo.classList.add('card-title');

        const p_desc = document.createElement('p');
        p_desc.classList.add('card-text');

        const p_telefono = document.createElement('p');
        p_telefono.classList.add('card-text');

        const a_url = document.createElement('a');
        a_url.classList.add('btn');
        a_url.classList.add('btn-primary');
        a_url.setAttribute('data-bs-toggle', 'modal');
        a_url.setAttribute('data-bs-target', '#modal-institucionAyuda');
        // a_url.href = objeto.url;

        const h5_nombreInstitucionAyuda = document.getElementById('h5-nombreInstitucionAyuda');
        a_url.addEventListener('click', () => {
          h5_nombreInstitucionAyuda.textContent = objeto.nombre_institucion;
          // const urlInstitucionAyuda = objeto.url;

          const iframe_urlInstitucionAyuda = document.getElementById('iframe-urlInstitucionAyuda');
          iframe_urlInstitucionAyuda.style.width = '100%';
          iframe_urlInstitucionAyuda.style.height = '500px';
          iframe_urlInstitucionAyuda.src = objeto.url;
        });
        
        
        h5titulo.textContent = objeto.nombre_institucion;
        p_desc.textContent = 'Descripción: ' + objeto.descripcion;
        p_telefono.textContent = 'Contáctanos al: ' + objeto.telefono;
        a_url.textContent = 'Ir a sitio web';

        imgInst.src = objeto.imagen;

        // Agregar estilos directamente a los elementos
        divcard.style.width = '18rem'; // Ancho de la tarjeta
        divcard.style.padding = '0px 0px';
        divcard.style.border = '1px solid #ccc'; // Borde
        divcard.style.borderRadius = '10px'; // Borde redondeado
        divcard.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra
        divcard.style.overflow = 'hidden'; // Ocultar desbordamiento
        divcard.style.margin = '20px'; // Espacio entre tarjetas

        divcardbody.style.padding = '12px';
        
        a_url.style.display = 'block';
        a_url.style.width = '100%';

        imgInst.style.height = '300px';
        imgInst.style.width = '500px';
        imgInst.style.transition = '0.5s';
        // imgInst.style.objectFit = 'cover';

        divcard.addEventListener('mouseenter', function () {
          imgInst.style.transform = 'scale(0.98)';
        });
        divcard.addEventListener('mouseleave', function () {
          imgInst.style.transform = 'scale(1)';
        });


        // Armando el árbol
        divcardbody.appendChild(h5titulo);
        divcardbody.appendChild(p_desc);
        divcardbody.appendChild(p_telefono);
        // divcardbody.appendChild(a_url);

        divcard.appendChild(imgInst);
        divcard.appendChild(divcardbody);
        divcard.appendChild(a_url);
        
        divPrincipal.appendChild(divcard);
      });
    })
    .catch((error) => {
      console.error(error);
    });

});



