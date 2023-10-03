document.addEventListener("DOMContentLoaded", function () {
    const formularioDenuncia = document.getElementById("formulario-denuncia");
  
    formularioDenuncia.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita que se recargue la página
  
      // Obtén los datos del formulario
      const denunciante = document.getElementById("denunciante").value;
      const ci = document.getElementById("ci").value;
      const victima = document.getElementById("victima").value;
      const agresor = document.getElementById("agresor").value; 

      var tipo_violencia = "";
      var selectElement = document.getElementById("tipo_violencia");
      var selectedOption = selectElement.options[selectElement.selectedIndex];
      
      if (selectedOption) {
        tipo_violencia = selectedOption.value;
      }
      
      var tipo_denuncia="";
      var checkbox = document.getElementById("tipo_denuncia");
      if (checkbox.checked) {
    
        tipo_denuncia = "Anónimo";
      } else {
        tipo_denuncia = "Público";
      }

      const fecha_den = document.getElementById("fecha_den").value;
      const ubicacion = document.getElementById("ubicacion").value;

      const prueba = document.getElementById("prueba").value;
      var estado_den = ""
      /*;
      var selectElement = document.getElementById("estado_den");
      var selectedOption = selectElement.options[selectElement.selectedIndex];
      
      if (selectedOption) {
        estado_den = selectedOption.value;
      }*/

      const descripcion = document.getElementById("descripcion").value;

      
  
  
  
      // Crea un objeto con los datos del nuevo usuario

      const nuevaDenuncia = {
        
        nombre_victima: victima,
        nombre_agresor: agresor,
        tipo_violencia: tipo_violencia,
        tipo_denuncia: tipo_denuncia,
        fecha: fecha_den,
        descripcion: descripcion,
        pruebas: prueba,
        ubicacion: ubicacion,
        estado: estado_den
       
        // Agrega otros campos aquí según corresponda
      };

      
  
      // Realiza una solicitud POST al backend
      fetch("https://prueba3-281-production.up.railway.app/api/denuncia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaDenuncia),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar la denuncia");
          }
          return response.json(); // Si el backend devuelve una respuesta JSON
        })
        .then((data) => {
          // la denuncia ha sido agregado exitosamente
          console.log("denuncia agregada:", data);
          alert("La denuncia se ha registrado correctamente.");
          window.location.href = 'index.html';
  
        })
        .catch((error) => {
          console.error(error);
          // Maneja el error, muestra un mensaje de error, etc.
        });
    });
  });
  
  