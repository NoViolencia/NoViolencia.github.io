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
