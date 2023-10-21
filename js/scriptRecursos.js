// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/"+"api";
//  ----------------------------------------------------------------------
const queryStringRecurso = window.location.search;
const urlParamsRecurso = new URLSearchParams(queryStringRecurso);
const correoUsuario = urlParamsRecurso.get('correo');
const id_usuario = urlParamsRecurso.get('id_usuario');
const rol = urlParamsRecurso.get('rol');
// console.log(typeof correoUsuario);
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

  const divPrincipalRecurso = document.getElementById('div-principalRecurso');
  fetch(`${ruta}/recurso`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener las instituciones');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then((recurso) => {
      recurso.data.forEach((objeto) => {
        const div_card = document.createElement('div');
        const div_row = document.createElement('div');

        const div_imagen = document.createElement('div');
        const img_imagen = document.createElement('img'); //dato

        const div_contenidoPrincipal = document.createElement('div');
        const div_contenidoCardBody = document.createElement('div');
        const h3_titulo = document.createElement('h3');//dato
        const p_autor = document.createElement('p');//dato
        const p_contenido = document.createElement('p');//dato
        const p_descripcion = document.createElement('p');//dato

        // const button_url = document.createElement('button');//dato

        const small_autor = document.createElement('small');
        const small_contenido = document.createElement('small');
        const small_descripcion = document.createElement('small');

        const div_comentario = document.createElement('div');
        const h5_titulocomentario = document.createElement('h5');
        const div_comentarioUsuario = document.createElement('div');

        const div_escribirComentario = document.createElement('div');
        const input_comentario = document.createElement('input');
        const button_enviarComentario = document.createElement('button');

        const div_registrarInicioSesion = document.createElement('ul');
        const li_registrarse = document.createElement('li');
        const li_iniciarSesion = document.createElement('li');
        const a_registrarse = document.createElement('a');
        const a_iniciarSesion = document.createElement('a');

        //adicionamos clases 
        div_card.classList.add('card', 'mb-3'); //padre
        div_row.classList.add('row', 'g-0');

        // para la imagen
        div_imagen.classList.add('col-md-4');//padre
        div_imagen.style.overflow = 'hidden';
        div_imagen.style.height = '320';
        div_imagen.style.width = '';
        img_imagen.classList.add('img-fluid');
        img_imagen.style.height = '250px';
        img_imagen.style.width = '100%';
        img_imagen.style.transition = '0.5s';
        img_imagen.style.objectFit = 'cover';

        // para el contenido del recurso
        div_contenidoPrincipal.classList.add('col-md-4');//padre
        div_contenidoCardBody.classList.add('card-body');
        h3_titulo.classList.add('card-title');
        p_autor.classList.add('card-text');
        p_contenido.classList.add('card-text');
        p_descripcion.classList.add('card-text');
        // button_url.classList.add('btn', 'btn-primary');

        small_autor.classList.add('text-muted');
        small_contenido.classList.add('text-muted');
        small_descripcion.classList.add('text-muted');

        // para los comentarios
        div_comentario.classList.add('col-md-4', 'card-body');
        h5_titulocomentario.classList.add('card-title');
        div_comentarioUsuario.classList.add('col-md-12');

        // para el input y button de enviar comentario
        div_escribirComentario.classList.add('col');
        input_comentario.classList.add("col-md-10", "rounded", "shadow", "bg-light");
        input_comentario.placeholder = 'Escribe tu comentario';
        button_enviarComentario.classList.add('btn-succes');
        const iconoFlecha = document.createElement('i');
        button_enviarComentario.classList.add('fas', 'fa-arrow-right');
        button_enviarComentario.style.color = "green";
        button_enviarComentario.appendChild(iconoFlecha);
        button_enviarComentario.title = 'Públicar Comentario'

        // para registrarse e iniciar sesion
        div_registrarInicioSesion.classList.add('nav', 'nav-tabs');
        li_registrarse.classList.add('nav-item');
        li_iniciarSesion.classList.add('nav-item');
        a_registrarse.classList.add('nav-link');
        a_iniciarSesion.classList.add('nav-link');
        a_registrarse.textContent = 'regístrarte';
        a_registrarse.href = 'registro.html';
        a_iniciarSesion.textContent = 'iniciar sesión';
        a_iniciarSesion.href = 'inicio_sesion.html';

        // Estilos   
        div_card.style.border = '1px solid #ccc'; // Borde
        div_card.style.borderRadius = '10px'; // Borde redondeado
        div_card.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra
        div_card.style.overflow = 'hidden'; // Ocultar desbordamiento
        div_card.style.margin = '5px'; // Espacio entre tarjetas
        // button_url.style.display = 'block';
        // button_url.style.width = '100%';

        div_comentarioUsuario.style.border = '1px solid #ccc';
        // div_comentarioUsuario.style.borderRadius = '10px'; // Borde redondeado
        div_comentarioUsuario.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra
        div_comentarioUsuario.style.overflow = 'hidden'; // Ocultar desbordamiento
        div_comentarioUsuario.style.margin = '5px'; // Espacio entre tarjetas
        div_comentarioUsuario.style.padding = '10px';
        div_comentarioUsuario.style.maxHeight = '300px';
        div_comentarioUsuario.style.overflow = 'auto';
        div_comentarioUsuario.style.border = '1px solid #ccc;';

        div_escribirComentario.style.marginBottom = '5px';


        div_imagen.addEventListener('mouseenter', function () {
          img_imagen.style.transform = 'scale(1.2)';
        });
        div_imagen.addEventListener('mouseleave', function () {
          img_imagen.style.transform = 'scale(1)';
        });


        //Asignando datos
        const idRecurso = objeto.id_recurso;
        // img_imagen.src = './img/newsletter.png';  // ----------------------
        img_imagen.src = objeto.url;  // ----------------------
        h3_titulo.textContent = objeto.titulo;
        p_autor.textContent = objeto.autor;
        p_contenido.textContent = objeto.contenido;
        p_descripcion.textContent = objeto.descripcion;

        // button_url.textContent = 'Ir a sitio web';

        button_enviarComentario.addEventListener('click', () => {
          const fechaActual = new Date();
          const nuevoComentario = {
            fecha: fechaActual.toISOString(),
            descripcion: input_comentario.value,
            estado: true,
            id_recurso: idRecurso,
            id_usuario: id_usuario
          };
          fetch(`${ruta}/comentario`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoComentario),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al agregar comentario");
              }
              return response.json(); // Si el backend devuelve una respuesta JSON
            })
            .then((data) => {
              console.log('Comentario agregado', data);
              window.location.href = `recurso.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
            })
            .catch((error) => {
              console.error(error);
            });
        });




        small_autor.textContent = 'Autor: ';
        small_contenido.textContent = 'Contenido: ';
        small_descripcion.textContent = 'Descripción: ';

        h5_titulocomentario.textContent = 'Comentarios';

        fetch(`${ruta}/recurso/comentario/${idRecurso}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error al obtener los comentarios de institucion');
            }
            return response.json(); // Convierte la respuesta a JSON
          })
          .then((comentario) => {
            comentario.data.forEach((objetoC) => {

              // if (objetoC.estado == 1) {
              const p_correoComentario = document.createElement('p');
              const small_fechaComentario = document.createElement('small');
              const p_descripcionComentario = document.createElement('p');
              const hr_lineaHorizontal = document.createElement('hr');

              p_correoComentario.classList.add('card-title');
              small_fechaComentario.classList.add('text-muted');
              p_descripcionComentario.classList.add('card-text');
              hr_lineaHorizontal.classList.add('bg-secondary');

              p_correoComentario.style.color = 'green';
              p_correoComentario.style.margin = '0px';
              p_descripcionComentario.style.margin = '0px';
              hr_lineaHorizontal.style.margin = '2px';

              div_comentarioUsuario.appendChild(small_fechaComentario);
              div_comentarioUsuario.appendChild(p_correoComentario);
              div_comentarioUsuario.appendChild(p_descripcionComentario);
              div_comentarioUsuario.appendChild(hr_lineaHorizontal);

              p_correoComentario.textContent = objetoC.Usuario_normal.Usuario.correo;
              const idusr = objetoC.id_usuario;

              // const fechaC = new Date(objetoC.fecha);
              // const fechaFormateada = `${fechaC.getDate()}/${fechaC.getMonth()}/${fechaC.getFullYear()}`;
              let fechaA = new Date(objetoC.fecha);
              let fechaFormateada = `${fechaA.getUTCDate()}/${fechaA.getUTCMonth() + 1}/${fechaA.getUTCFullYear()}`;
              small_fechaComentario.textContent = fechaFormateada;
              p_descripcionComentario.textContent = objetoC.descripcion;
              //}

            });
          })
          .catch((error) => {
            console.error(error);
          })

        li_registrarse.appendChild(a_registrarse);
        li_iniciarSesion.appendChild(a_iniciarSesion);
        div_registrarInicioSesion.appendChild(li_iniciarSesion);
        div_registrarInicioSesion.appendChild(li_registrarse);


        div_escribirComentario.appendChild(input_comentario);
        div_escribirComentario.appendChild(button_enviarComentario);
        div_comentario.appendChild(h5_titulocomentario);
        if (correoUsuario != 'null') {
          div_comentario.appendChild(div_escribirComentario);
        } else {
          div_comentario.appendChild(div_registrarInicioSesion);
        }

        div_comentario.appendChild(div_comentarioUsuario);

        div_contenidoCardBody.appendChild(h3_titulo);
        div_contenidoCardBody.appendChild(small_autor);
        div_contenidoCardBody.appendChild(p_autor);

        div_contenidoCardBody.appendChild(small_contenido);
        div_contenidoCardBody.appendChild(p_contenido);

        div_contenidoCardBody.appendChild(small_descripcion);
        div_contenidoCardBody.appendChild(p_descripcion);
        // div_contenidoCardBody.appendChild(button_url);

        div_contenidoPrincipal.appendChild(div_contenidoCardBody);

        div_imagen.appendChild(img_imagen);

        div_row.appendChild(div_imagen);
        div_row.appendChild(div_contenidoPrincipal);
        div_row.appendChild(div_comentario);

        if (objeto.visibilidad == 1) {
          div_card.appendChild(div_row);
          divPrincipalRecurso.append(div_card);
        }
      })
    })
    .catch((error) => {
      console.error(error);
    });
})