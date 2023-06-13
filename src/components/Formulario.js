import React, { useState } from 'react';

import axios from "axios";
import Dropzone from './Dropzone';
import TipoSolicitud from './TipoSolicitud';

const Formulario = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [opcion, setOpcion] = useState('');
  const [campos, setCampos] = useState(['Nombre']);
  
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivos, setArchivos] = useState([]);

  const [asunto, setAsunto] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const handleAsuntoChange = (newValue) => {
    setAsunto(newValue);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };
 
  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleArchivosDrop = (acceptedFiles) => {
    setArchivos((prevArchivos) => [...prevArchivos, ...acceptedFiles]);
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
        setCampos(['Identificacion', 'Nombre' ]);
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
  
    const data = {
      descripcion: descripcion,
      estado: "En proceso",
      fecha: new Date().toISOString(),
      correoAdicionado: correo,
      telefonoAdicionado: telefono,
      rutaArchivos: "",
      tipoSolicitud: {
        id: asunto,
      },
    };
    console.log(data);
  
    setIsFormSubmitted(true);
  
    axios.post(apiUrl + "solicitudes/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const responseData = response.data; 
        subirArchivos(responseData.id);
        console.log(responseData); 
        alert("El formulario ha sido enviado con éxito.");
      })
      .catch((error) => {
        // Hubo un error en la solicitud
        console.error(error); // Mostrar el error en la consola o hacer algo con él
        alert("Ocurrió un error al enviar el formulario.");
      });
  };

  const handleFormReset = () => {
    setNombre("");
    setCorreo("");
    setTelefono("");
    setDescripcion("");
    setArchivos([]);
    setAsunto("");
    setIsFormSubmitted(false);
  };

  const subirArchivos = async (idSolicitud) => {
    console.log(idSolicitud); 
    const formData = new FormData();
    archivos.forEach((archivo) => {
      formData.append("archivos", archivo);
    });
    axios.post(apiUrl + "solitudes/"+idSolicitud+"/archivos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
        handleFormReset();
      })
      .catch((error) => {
        console.error(error);
        alert("Ocurrió un error al añadir archivos.");
      });
    
    }


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
        <input type="number" id="telefonoAdjunto" value={telefono} onChange={handleTelefonoChange} placeholder="Telefono adjunto"/>
      </div>
      
        <div>
          <TipoSolicitud onAsuntoChange={handleAsuntoChange}/>
        </div>
      <div>
        <textarea id="descripcion" value={descripcion} onChange={handleDescripcionChange} placeholder="Descripcion"/>
      </div>
      
      <div>
        <Dropzone onDrop={handleArchivosDrop}  archivos={archivos}/>
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