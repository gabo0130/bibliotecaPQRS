// Configuración de Dropzone
Dropzone.autoDiscover = false;
var myDropzone = new Dropzone("#mi-dropzone", {
  url: "../html/index.html",
  maxFiles: 5,
  acceptedFiles: ".jpg,.jpeg,.png,.pdf",
  dictDefaultMessage: "Arrastra aquí un archivo o haz clic para seleccionar uno"
});

// Manejador del evento submit del formulario
document.getElementById("formulario-pqrs").addEventListener("submit", function(event) {
  event.preventDefault();
  myDropzone.processQueue();
});

// Manejador del evento completo de subida del archivo
myDropzone.on("complete", function(file) {
  if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
    //document.getElementById("formulario-pqrs").submit();
  }
});

function eliminarArchivo() {
  // Obtiene el archivo actualmente cargado en Dropzone
  var archivo = myDropzone.files[0];
  
  // Verifica si hay un archivo cargado
  if (archivo) {
    // Elimina el archivo de Dropzone
    myDropzone.removeFile(archivo);
  } else {
    // Muestra un mensaje si no hay un archivo cargado
    alert("No hay archivo cargado");
  }
}

document.getElementById("eliminar-archivo").addEventListener("click", function() {
  eliminarArchivo();
});
