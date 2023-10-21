// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/"+"api";
// /---------------------------------------------
const queryStringDenuncia = window.location.search;
const urlParamsDenuncia = new URLSearchParams(queryStringDenuncia);
const correoUsuario = urlParamsDenuncia.get('correo');
const id_usuario = urlParamsDenuncia.get('id_usuario');
const rol = urlParamsDenuncia.get('rol');
if (correoUsuario != 'null') {
  document.getElementById('btnRegInicio').style.display = 'none';
  document.getElementById('correoUsuario').style.display = 'block';
  document.getElementById('spanCorreo').textContent = correoUsuario;
  document.getElementById('h6nomUsuario').textContent = correoUsuario;
  document.getElementById('a-evaluacion').style.display = 'block';
}
const cerrarSesionLink = document.getElementById("cerrar_sesion");
cerrarSesionLink.addEventListener("click", function(event) {
  window.location.href = 'index.html';
});

// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
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
  const divPrincipalDenunciaPublica = document.getElementById('div-principalDenunciaPublica');
  fetch(`${ruta}/denuncia/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener las denuncias');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then((denunciaP) => {
      const objetosDenunciaPublica = denunciaP.data.filter((objeto) => {
        return objeto.tipo_denuncia === "publica";
      });
      objetosDenunciaPublica.forEach((objeto) => {
        const div_card = document.createElement('div');
        //const div_row = document.createElement('div');

        const div_contenidoPrincipal = document.createElement('div');
        const div_contenidoCardBody = document.createElement('div');
        const h3_titulo = document.createElement('h3');//dato
        const p_nombre_victima= document.createElement('p');//dato
        const p_nombre_agresor = document.createElement('p');//dato
        const p_tipo_violencia = document.createElement('p');//dato
        const p_fecha = document.createElement('p');//dato
        const p_descripcion = document.createElement('p');//dato
        const p_ubicacion = document.createElement('p');//dato
        const button_url_img = document.createElement('button');//dato
        const small_nombre_victima = document.createElement('small');
        const small_nombre_agresor = document.createElement('small');
        const small_tipo_violencia = document.createElement('small');
        const small_fecha = document.createElement('small');
        const small_descripcion = document.createElement('small');
        const small_ubicacion = document.createElement('small');

      //adicionamos clases 
      div_card.classList.add('card', 'mb-3'); //padre
      //div_row.classList.add('row', 'g-0');

      // para el contenido del recurso
      div_contenidoPrincipal.classList.add('col-md-4');//padre
      div_contenidoCardBody.classList.add('card-body');
      h3_titulo.classList.add('card-title');
      p_nombre_victima.classList.add('card-text');
      p_nombre_agresor.classList.add('card-text');
      p_tipo_violencia.classList.add('card-text');
      p_fecha.classList.add('card-text');
      p_descripcion.classList.add('card-text');
      p_ubicacion.classList.add('card-text');
      button_url_img.classList.add('btn', 'btn-primary');

      small_nombre_victima.classList.add('text-muted');
      small_nombre_agresor.classList.add('text-muted');
      small_tipo_violencia.classList.add('text-muted');
      small_fecha.classList.add('text-muted');
      small_descripcion.classList.add('text-muted');
      small_ubicacion.classList.add('text-muted');

      // Estilos   
      div_card.style.border = '1px solid #ccc'; // Borde
      div_card.style.borderRadius = '10px'; // Borde redondeado
      div_card.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra
      div_card.style.overflow = 'hidden'; // Ocultar desbordamiento
      div_card.style.margin = '5px'; // Espacio entre tarjetas
      button_url_img.style.display = 'block';
      button_url_img.style.width = '100%';

      //Asignando datos
      //img_imagen.src = './img/newsletter.png';
      h3_titulo.textContent = 'Denuncias Públicas';
      p_nombre_victima.textContent = objeto.nombre_victima;
      p_nombre_agresor.textContent = objeto.nombre_agresor;
      p_tipo_violencia.textContent = objeto.tipo_violencia;
      p_fecha.textContent = objeto.fecha;
      p_descripcion.textContent = objeto.descripcion;
      p_ubicacion.textContent = objeto.ubicacion;
      button_url_img.textContent = 'Ver Imagen';
      button_url_img.setAttribute('data-bs-toggle', 'modal');
      button_url_img.setAttribute('data-bs-target', '#modal-pruebaDenuncia');

      small_nombre_victima.textContent = 'Nombre de la Víctima: ';
      small_nombre_agresor.textContent = 'Nombre del Agresor: ';
      small_tipo_violencia.textContent = 'Tipo De Violencia: ';
      small_fecha.textContent = 'Fecha : ';
      small_descripcion.textContent = 'Descripcion de la Violencia: ';
      small_ubicacion.textContent = 'Ubicacion : ';
      
      const img_prueba = document.getElementById('img-prueba');
      button_url_img.addEventListener('click', () => {
        img_prueba.src = objeto.pruebas;
      });

      div_contenidoCardBody.appendChild(h3_titulo);
      div_contenidoCardBody.appendChild(small_nombre_victima);
      div_contenidoCardBody.appendChild(p_nombre_victima);

      div_contenidoCardBody.appendChild(small_nombre_agresor);
      div_contenidoCardBody.appendChild(p_nombre_agresor);

      div_contenidoCardBody.appendChild(small_tipo_violencia);
      div_contenidoCardBody.appendChild(p_tipo_violencia);

      div_contenidoCardBody.appendChild(small_fecha);
      div_contenidoCardBody.appendChild(p_fecha);

      div_contenidoCardBody.appendChild(small_descripcion);
      div_contenidoCardBody.appendChild(p_descripcion);

      div_contenidoCardBody.appendChild(small_ubicacion);
      div_contenidoCardBody.appendChild(p_ubicacion);

      div_contenidoCardBody.appendChild(button_url_img);
      div_contenidoPrincipal.appendChild(div_contenidoCardBody);

      // div_row.appendChild(div_contenidoPrincipal);
      // div_card.appendChild(div_row);

      divPrincipalDenunciaPublica.append(div_contenidoPrincipal);
      });
    })
    .catch((error) => {
      console.error(error);
    });
  // --------------------------------------------
});
