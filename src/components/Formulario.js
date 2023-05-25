import React, { useState } from "react";
import axios from "axios";
import Dropzone from './Dropzone';


const Formulario = () => {
  
  const [opcion, setOpcion] = useState('');
  const [campos, setCampos] = useState(['Nombre']);
  
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivos, setArchivos] = useState([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleAsuntoChange = (e) => {
    setAsunto(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleArchivosDrop = (acceptedFiles) => {
    setArchivos(acceptedFiles);
  };

  const handleFormButtonClick = (opcion) => {
    setOpcion(opcion);
    document.getElementById("anonimo").classList.remove("is-active");
    document.getElementById("usual").classList.remove("is-active");
    document.getElementById("nuevo").classList.remove("is-active");
    switch (opcion) {
      case 'boton1':
        document.getElementById("anonimo").classList.add("is-active");
        setCampos(['Nombre']);
        break;
      case 'boton2':
        document.getElementById("usual").classList.add("is-active");
        setCampos(['Nombre', 'Identificacion']);
        break;
      case 'boton3':
        document.getElementById("nuevo").classList.add("is-active");
        setCampos(['Nombre', 'Identificacion', 'Direccion', 'Edad', 'Telefono', 'CorreoPersonal']);
        break;
      default:
        setCampos([]);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    setIsFormSubmitted(true);
    formData.append("Nombre", nombre);
    formData.append("Correo", correo);
    formData.append("Asunto", asunto);
    formData.append("Descripcion", descripcion);

    archivos.forEach((archivo) => {
      formData.append("archivos", archivo);
    });

    try {
      await axios.post("api aqui xd", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("El formulario ha sido enviado con éxito.");
    } catch (error) {
      alert("Ocurrió un error al enviar el formulario.");
    }
  };

  return (
    <div class="container">
      <div class="wrapper">
      <ul class="steps">
        <li id="anonimo" class="is-active" onClick={() => handleFormButtonClick('boton1')} >Anonimo</li>
        <li id="usual" onClick={() => handleFormButtonClick('boton2')} >Usuario Usual</li>
        <li id="nuevo" onClick={() => handleFormButtonClick('boton3')} >Nuevo Usuario</li>
      </ul>
      {campos.length > 0 && (
        <form onSubmit={handleSubmit} className={isFormSubmitted ? 'form-wrapper form-submitted' : 'form-wrapper'}>
          <fieldset class="section is-active">
          {campos.map((campo) => (
            <div key={campo}>
              <input type="text" id={campo} name={campo} placeholder={campo} />
            </div>
          ))}
      <div>
        <input type="email" id="correoAdjunto" value={correo} onChange={handleCorreoChange} placeholder="Correo adjunto"/>
      </div>
      
      <div>
        <input type="number" id="telefonoAdjunto" value={correo} onChange={handleCorreoChange} placeholder="Telefono adjunto"/>
      </div>
      <div>
        <select id="asunto" value={asunto} onChange={handleAsuntoChange}>
          <option value="">Selecciona un asunto</option>
          <option value="1">Peticiones</option>
          <option value="2">Quejas</option>
          <option value="3">Reclamos</option>
          <option value="4">Sugerencias</option>
        </select>
      </div>
      <div>
        <textarea id="descripcion" value={descripcion} onChange={handleDescripcionChange} placeholder="Descripcion"/>
      </div>
      <div>
        <Dropzone onDrop={handleArchivosDrop} />
      </div>

      <button type="submit" class="button">Enviar</button>
          </fieldset>
        </form>
      )}
      
      </div>
    </div>
  );
};


export default Formulario;