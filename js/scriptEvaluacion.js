// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com";
//-------------------------------------------------
const queryStringEvaluacion = window.location.search;
const urlParamsEvaluacion = new URLSearchParams(queryStringEvaluacion);
const correoUsuario = urlParamsEvaluacion.get('correo');
const id_usuario = urlParamsEvaluacion.get('id_usuario');
const rol = urlParamsEvaluacion.get('rol');
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
//nada agresivo , un poco agresivo ,muy agresivo
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
    console.log('holaaaaaaaaaaaaaaaaaaaa')
    const nuevaURL = `instituciones.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    console.log(nuevaURL)
    // window.location.href = nuevaURL;
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
  
  

  // -------------------------------------------tdbody-
  const tablaEvaluacion = document.getElementById('tabla-evaluacion');

  fetch(`${ruta}/api/evaluacion/usuario_normal/${id_usuario}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener las evaluaciones');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then((evaluacion) => {
      evaluacion.data.forEach((objeto) => {
        const fila = document.createElement('tr');
        const celdatitulo = document.createElement('td');
        const celdaRiesgo = document.createElement('td');
        const celdaRecomendaciones = document.createElement('td');
        //const celdaEliminar = document.createElement('td');

        celdatitulo.textContent = objeto.titulo;
        celdaRiesgo.textContent = objeto.nivel_de_riesgo;
        celdaRecomendaciones.textContent=objeto.recomendaciones;

        






























        //celdaEliminar.appendChild(btnEliminar);

        fila.appendChild(celdatitulo);
        fila.appendChild(celdaRiesgo);
        fila.appendChild(celdaRecomendaciones);
       // fila.appendChild(celdaEliminar);

       tablaEvaluacion.querySelector('tbody').appendChild(fila);

      });
     })







    // --------------------------------------------
  //test -1 ----------------------------------------
  const botonEnviar=document.getElementById("form-test");
  botonEnviar.addEventListener('submit', function (event) {
    var pnj=0;
    event.preventDefault();
    if (document.getElementById("gridRadios11").checked ) {
        pnj=pnj+1;
      } 
    if (document.getElementById("gridRadios21").checked ) {
        pnj=pnj+1;
      } 
      if (document.getElementById("gridRadios31").checked ) {
        pnj=pnj+1;
      } 
      if (document.getElementById("gridRadios41").checked ) {
        pnj=pnj+1;
      } 
    if (document.getElementById("gridRadios51").checked ) {
        pnj=pnj+1;
      } 
    if (document.getElementById("gridRadios61").checked ) {
        pnj=pnj+1;
      } 
      if (document.getElementById("gridRadios71").checked ) {
        pnj=pnj+1;
      } 
      if (document.getElementById("gridRadios81").checked ) {
        pnj=pnj+1;
      } 
      if (document.getElementById("gridRadios91").checked ) {
        pnj=pnj+1;
      } 
      if (document.getElementById("gridRadios101").checked ) {
        pnj=pnj+1;
      } 
      //nada agresivo , un poco agresivo ,muy agresivo
    console.log("click en guardar");
      var nivelRiesgo;
      var recomiend;

    if(pnj>8){
        alert("puntaje mayor a 10");
        nivelRiesgo="muy agresivo";
        recomiend="es muy urgente que busque ayuda por su nivel de agresividad, pongase en contacto con nosotros o nuestras instituciones ayuda";
    }
    if(pnj<8 & pnj>4){
        alert("puntaje medio");
        nivelRiesgo="un poco agresivo";
        recomiend="Busque ayuda por su nivel de agresividad, busque un poco de ayuda en las instituciones de ayuda que le proporcionamos";
    }
    if(pnj<4 && pnj>=0){
        alert("puntaje menor")
        nivelRiesgo="nada agresivo";
        recomiend="su nivel de agresividad es muy leve , es una persona ejemplar";
    }
    console.log("salio con puntaje: " +pnj);

    // "titulo": "¿soy violento?",
    // "nivel_de_riesgo": "agresivo",
    // "recomendaciones": "tomar medidas en el control de ",
    // "id_usuario": "29"

        // Creando un objeto
        const titulod = document.getElementById("nomTest");
    const nuevaEvaluacion = {
      titulo: titulod.textContent,
      nivel_de_riesgo: nivelRiesgo,
      recomendaciones: recomiend,
      id_usuario: id_usuario
      // id_usuario: id_usuario;
    };
    console.log(titulod.textContent);
    console.log(nivelRiesgo);
    console.log(recomiend);
    console.log(id_usuario);
    fetch(`${ruta}/api/evaluacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaEvaluacion)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar evalacion");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Contacto agregado:", data);
        window.location.href = `evaluacion.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
      })    
  });
  //fin del test-1 ----------------------------------------

    //test -2----------------------------------------
    const botonEnviar2=document.getElementById("form-test2");
    botonEnviar2.addEventListener('submit', function (event) {
      var pnj=0;
      event.preventDefault();
      if (document.getElementById("gridRadiost211").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost221").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost231").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost241").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost251").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost261").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost271").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost281").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost291").checked ) {
          pnj=pnj+1;
        } 
        if (document.getElementById("gridRadiost2101").checked ) {
          pnj=pnj+1;
        } 
        //nada agresivo , un poco agresivo ,muy agresivo
      console.log("click en guardar");
        var nivelRiesgo;
        var recomiend;
  
      if(pnj>8){
          alert("puntaje mayor a 10");
          nivelRiesgo="muy agresivo";
          recomiend="es muy urgente que busque ayuda por su nivel de agresividad, pongase en contacto con nosotros o nuestras instituciones ayuda";
      }
      if(pnj<8 & pnj>4){
          alert("puntaje medio");
          nivelRiesgo="un poco agresivo";
          recomiend="Busque ayuda por su nivel de agresividad, busque un poco de ayuda en las instituciones de ayuda que le proporcionamos";
      }
      if(pnj<4 && pnj>0){
          alert("puntaje menor")
          nivelRiesgo="nada agresivo";
          recomiend="su nivel de agresividad es muy leve , es una persona ejemplar";
      }
      console.log("salio con puntaje: " +pnj);
  
      // "titulo": "¿soy violento?",
      // "nivel_de_riesgo": "agresivo",
      // "recomendaciones": "tomar medidas en el control de ",
      // "id_usuario": "29"
  
          // Creando un objeto
      const titulod = document.getElementById("nomTest2");
      const nuevaEvaluacion = {
        titulo: titulod.textContent,
        nivel_de_riesgo: nivelRiesgo,
        recomendaciones: recomiend,
        id_usuario: id_usuario
        // id_usuario: id_usuario;
      };
      console.log(titulod.textContent);
      console.log(nivelRiesgo);
      console.log(recomiend);
      console.log(id_usuario);
      fetch(`${ruta}/api/evaluacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaEvaluacion)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar evalacion");
          }
          return response.json();
        })
        .then((data) => {
          console.log("evaluacion agregado:", data);
          window.location.href = `evaluacion.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
        })    
    });
    //fin del test -2






})
