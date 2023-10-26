// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/"+"api";

//  ----------------------------------------------------------------------
const queryStringRecurso = window.location.search;
const urlParamsRecurso = new URLSearchParams(queryStringRecurso);
const correoUsuario = urlParamsRecurso.get('correo');
const id_usuario = urlParamsRecurso.get('id_usuario');
const rol = urlParamsRecurso.get('rol');
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
  // -------------------------------------------------------------

  const div_principalActividad = document.getElementById('div-principalActividad');
  fetch(`${ruta}/actividad`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener las actividaes');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then((actividad) => {
      actividad.data.forEach((objeto) => {
        // console.log(objeto);

        const div_card = document.createElement('div');

        const img_actividad = document.createElement('img');

        const div_intro = document.createElement('div');
        const h3_titulo = document.createElement('h3');
        const h5_tipo = document.createElement('h5');
        const p_descripcion = document.createElement('strong');
        const p_fechaIni = document.createElement('strong');
        const p_fechaFin = document.createElement('strong');
        const p_hora = document.createElement('strong');

        const div_fechaIni = document.createElement('div');
        const div_fechaFin = document.createElement('div');
        const div_hora = document.createElement('div');
        const strong_fechaIni = document.createElement('strong');
        const strong_fechaFin = document.createElement('strong');
        const strong_hora = document.createElement('strong');

        div_card.classList.add('card');
        img_actividad.classList.add('card-img-top', 'w-100');
        // img_actividad.classList.add('img-fluid');
        div_intro.classList.add('card-body');
        h3_titulo.classList.add('card-title');
        h5_tipo.classList.add('card-title');
        p_descripcion.classList.add('card-text');
        p_fechaIni.classList.add('card-text');
        p_fechaFin.classList.add('card-text');
        p_hora.classList.add('card-text');

        div_fechaIni.classList.add('col');



        // Agregando estilos directamente a los elementos
        div_card.style.width = '30rem'; // Ancho de la tarjeta
        div_card.style.border = '1px solid #ccc'; // Borde
        div_card.style.borderRadius = '10px'; // Borde redondeado
        div_card.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra
        div_card.style.overflow = 'hidden'; // Ocultar desbordamiento
        div_card.style.margin = '20px'; // Espacio entre tarjetas
        div_card.style.padding = '0px 0px';

        img_actividad.style.height = '345px';
        img_actividad.style.width = '500px';
        img_actividad.style.transition = '0.5s';
        img_actividad.style.objectFit = 'cover';


        div_intro.style.padding = '6px';
        div_intro.style.boxSizing = 'border-box';
        div_intro.style.position = 'absolute';
        div_intro.style.top = '260px';
        div_intro.style.left = '0'; // Establece el borde izquierdo en 0
        div_intro.style.width = '100%'; // Haz que div_intro ocupe todo el ancho
        div_intro.style.background = '#C0EABE';
        div_intro.style.color = 'black';
        div_intro.style.opacity = '0.85';
        div_intro.style.transition = '0.5s';
        div_intro.style.height = '300px'; // Haz que div_intro ocupe todo el alto
        div_intro.style.overflow = 'auto';

        p_descripcion.style.margin = '0px';
        p_fechaIni.style.margin = '0px';
        p_fechaFin.style.margin = '0px';
        p_hora.style.margin = '0px';

        strong_fechaIni.style.color = '#50160A';
        strong_fechaFin.style.color = '#50160A';
        strong_hora.style.color = '#50160A';

        div_fechaIni.style.display = 'flex';
        div_fechaFin.style.display = 'flex';
        div_hora.style.display = 'flex';

        div_intro.addEventListener('mouseenter', function () {
          div_intro.style.top = '110px';
        });
        div_intro.addEventListener('mouseleave', function () {
          div_intro.style.top = '260px';
        });
        div_card.addEventListener('mouseenter', function () {
          img_actividad.style.transform = 'scale(1.2) rotate(-3deg)';
        });
        div_card.addEventListener('mouseleave', function () {
          img_actividad.style.transform = 'scale(1)';
        });


        


        // Adicionando los datos
        strong_fechaIni.textContent = 'Fecha de inicio:';
        strong_fechaFin.textContent = 'Fecha de Finalización:';
        strong_hora.textContent = 'Hora:';


        img_actividad.src = objeto.imagen;
        h3_titulo.textContent = objeto.nombre_actividad;
        h5_tipo.textContent = objeto.tipo;
        p_descripcion.textContent = objeto.descripcion;

        // let fechaA = new Date(objeto.fecha_ini);
        // let fechaFormateada = `${fechaA.getDate()}/${fechaA.getMonth()}/${fechaA.getFullYear()}`;
        let fechaA = new Date(objeto.fecha_ini);
        let fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;

        p_fechaIni.textContent = fechaFormateada;

        fechaA = new Date(objeto.fecha_fin);
        fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
        // fechaA = new Date(objeto.fecha_fin);
        // fechaFormateada = `${fechaA.getDate()}/${fechaA.getMonth()}/${fechaA.getFullYear()}`;
        p_fechaFin.textContent = fechaFormateada;

        const fecha = new Date(objeto.hora);
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();
        const horaFormateada = horas.toString().padStart(2, '0');
        const minutosFormateados = minutos.toString().padStart(2, '0');
        p_hora.textContent = horaFormateada + ':' + minutosFormateados;
        //

        div_fechaIni.append(strong_fechaIni);
        div_fechaIni.append(p_fechaIni);
        div_fechaFin.appendChild(strong_fechaFin);
        div_fechaFin.appendChild(p_fechaFin);
        div_hora.appendChild(strong_hora);
        div_hora.appendChild(p_hora);

        div_intro.appendChild(h3_titulo);
        div_intro.appendChild(h5_tipo);
        div_intro.appendChild(p_descripcion);

        div_intro.appendChild(div_fechaIni);
        div_intro.appendChild(div_fechaFin);
        div_intro.appendChild(div_hora);

        div_card.appendChild(img_actividad);
        div_card.appendChild(div_intro);
        div_principalActividad.appendChild(div_card);
      })
    })
    .catch((error) => {
      console.error(error);
    });
})
