// import configuracion from './constantes.mjs';
// const ruta = configuracion.ruta;
const ruta = "https://render-proyecto281-backend.onrender.com/"+"api";
// -------------------------------------------
const queryStringDenuncia = window.location.search;
const urlParamsDenuncia = new URLSearchParams(queryStringDenuncia);
const correoUsuario = urlParamsDenuncia.get('correo');
const id_usuario = urlParamsDenuncia.get('id_usuario');
const rol = urlParamsDenuncia.get('rol');

if (correoUsuario != null) {
  document.getElementById('btnRegInicio').style.display = 'none';
  document.getElementById('correoUsuario').style.display = 'block';
  document.getElementById('spanCorreo').textContent = correoUsuario;
  document.getElementById('h6nomUsuario').textContent = correoUsuario;
  document.getElementById('a-contacto').style.display = 'block';
  document.getElementById('a-denuncia').style.display = 'block';
  document.getElementById('a-evaluacion').style.display = 'block';
}
const cerrarSesionLink = document.getElementById("cerrar_sesion");
cerrarSesionLink.addEventListener("click", function(event) {
  window.location.href = 'index.html';
});

// -------------------------------------------------------------
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  const h1_nomasviolencia = document.getElementById("h1-nomasviolencia");
  h1_nomasviolencia.addEventListener("click", function(event) {
    if(correoUsuario!=null){
    event.preventDefault();
    const nuevaURL = `index.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
    }
  });
  const a_inicio = document.getElementById("a-inicio");
  a_inicio.addEventListener("click", function(event) {
    if(correoUsuario!=null){
    event.preventDefault();
    const nuevaURL = `index.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
    }
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
  const a_evaluacion = document.getElementById("a-evaluacion");
  a_evaluacion.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `evaluacion.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  const a_denunciaPublica = document.getElementById("a-denunciaPublica");
  a_denunciaPublica.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevaURL = `denunciaPublica.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
    window.location.href = nuevaURL;
  });
  // --------------------------------------------
    // --------------------------------------------
    const tablaDenuncia = document.getElementById('tabla-denuncias');
    const valNombreContacto = /^[a-zA-Z\s]{3,30}$/;
    const valNumeroContacto = /^(6\d{7}|7\d{7}|2\d{6})$/;
  
    fetch(`${ruta}/api/denuncia/usuario_normal/${id_usuario}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las denuncias');
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((denuncia) => {
        denuncia.data.forEach((objeto) => {
          const fila = document.createElement('tr');
          const celdaEstado=document.createElement('td');
          const celdaNombreVictima = document.createElement('td');
          const celdaNombreAgresor = document.createElement('td');
          const celdaVerDenuncia = document.createElement('td');
          const celdaEditar = document.createElement('td');
          const celdaEliminar = document.createElement('td');
          const celdaTipoViolencia=document.createElement('td');
          const celdaTipoDenuncia=document.createElement('td');
          const celdaFecha=document.createElement('td');
          const celdaDescripcion=document.createElement('td');
          const celdaPruebas=document.createElement('td');
          const celdaUbicacion=document.createElement('td');
          const celdaIdDenuncia=document.createElement('td');


  
          let idContacto = objeto.id_usuario;
  
          celdaIdDenuncia.textContent=objeto.id_denuncia;
          celdaNombreVictima.textContent = objeto.nombre_victima;
          celdaNombreAgresor.textContent = objeto.nombre_agresor;
          celdaTipoViolencia.textContent=objeto.tipo_violencia;
          celdaTipoDenuncia.textContent=objeto.tipo_denuncia;
          celdaFecha.textContent=objeto.fecha;
          celdaDescripcion.textContent=objeto.descripcion;
          celdaPruebas.textContent=objeto.pruebas;
          celdaUbicacion.textContent=objeto.ubicacion;
          celdaEstado.textContent=objeto.estado;

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
            const idDenuncia=celdaIdDenuncia.textContent;
            
            fetch(`${ruta}/api/denuncia/${idDenuncia}`)      
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
              //document.getElementById("input-tipoDenuncia").value = objeto.tipo_denuncia;
              document.getElementById("input-fecha").value = `${año}-${mes}-${día}`;
              document.getElementById("input-descripcion").value =objeto.descripcion;
              document.getElementById("input-pruebas").value = objeto.pruebas;
              document.getElementById("input-ubicacion").value = objeto.ubicacion;
              
            })
            const formEditarDenuncia = document.getElementById("form-editarDenuncia");
  
            formEditarDenuncia.addEventListener('submit', function (event) {
              event.preventDefault();
              console.log("click en guardar");

              
              const nomVic=document.getElementById("input-nomDenunciaEditar").value;
              const nomAgre=document.getElementById("input-nomAgresor").value;
              const tipoViolen=document.getElementById("input-tipoViolenci").value;
              const tipoDenun=document.getElementById("input-tipoDenuncia").value;
              const fechaa=document.getElementById("input-fecha").value ;
              const descrrip=document.getElementById("input-descripcion").value ;
              const prueba=document.getElementById("input-pruebas").value;
              const ubicacionn=document.getElementById("input-ubicacion").value;
  
  
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
              fetch(`${ruta}/api/denuncia/${idDenuncia}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(denunciaEditada)
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al editar denuncia");
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Denuncia editado:", data);
                  window.location.href = `denuncia.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
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
            const idDenuncia=celdaIdDenuncia.textContent;
            document.getElementById("p-denuncia").textContent =  "Eliminar  Denuncia número :  " + idDenuncia+" ";
  
            const btnSIeliminar = document.getElementById("btn-SIeliminarDenuncia");
            btnSIeliminar.addEventListener('click', () => {
              fetch(`${ruta}/api/denuncia/${idDenuncia}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                }
              })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Error al eliminar denuncia");
                }
                return response.json();
              })
              .then((data) => {
                console.log("Denuncia eliminado:", data);
                window.location.href = `denuncia.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
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
          if(celdaEstado.textContent == 'false'){
          celdaEditar.appendChild(btnEditar);
          celdaEliminar.appendChild(btnEliminar);
          }
          
          fila.appendChild(celdaIdDenuncia);
          fila.appendChild(celdaNombreVictima);
          fila.appendChild(celdaNombreAgresor);
          fila.appendChild(celdaEditar);
          fila.appendChild(celdaEliminar);
          if(celdaEstado.textContent == 'false'){
            fila.appendChild(icono);
          }else{
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

  const formRegistrarContracto = document.getElementById("form-registrarDenuncia");
  formRegistrarContracto.addEventListener("submit", function (event) {
    event.preventDefault();
    

    // const id_usuario = io;
    const nombreVictima = document.getElementById("input-nomVictimaRR").value;
    const nombreAgresor = document.getElementById("input-nomAgresorRR").value;
    const tipoViolencia = document.getElementById("input-tipoViolenciaRR").value;

    var tipoDenuncia;
    if (document.getElementById("gridRadios1").checked) {
      tipoDenuncia ="Anonimo";
    }else{
      tipoDenuncia=id_usuario;
    }
    const fecha = document.getElementById("input-fechaRR").value;
    const descripcion = document.getElementById("input-descripcionRR").value;
    const pruebas = document.getElementById("input-pruebasRR").value;
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
      pruebas: pruebas,
      ubicacion: ubicacion,
      estado: 0,
      id_usuario: id_usuario
      // id_usuario: id_usuario;
    };

    fetch(`${ruta}/api/denuncia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoDenuncia)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar la denuncia");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Denuncia agregado:", data);
        window.location.href = `denuncia.html?correo=${correoUsuario}&id_usuario=${id_usuario}&rol=${rol}`;
      })
      .catch((error) => {
        console.error(error);
      });
  });


  
});
