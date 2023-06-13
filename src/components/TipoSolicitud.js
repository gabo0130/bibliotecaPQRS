import React, { useState, useEffect } from 'react';
import axios from "axios";

const TipoSolicitud = (props) => {

const {onAsuntoChange} = props;
const apiUrl = process.env.REACT_APP_API_URL;

const [asunto, setAsunto] = useState("");
const [tiposSolicitud, setTiposSolicitud] = useState([]);

const handleAsuntoChange = (e) => { 
    const newValue = e.target.value;
    setAsunto(newValue);
    onAsuntoChange(newValue);
};


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "TipoSolicitud/");
        setTiposSolicitud(response.data);
      } catch (error) {
        console.error("Error al obtener los tipos de solicitud:", error);
      }
    };
  
    fetchData();
  }, []);


  
  return (
        <select id="asunto" value={asunto} onChange={handleAsuntoChange}>
            <option value="">Selecciona un asunto</option>
                {tiposSolicitud.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                        {tipo.descripcion}
                    </option>
                ))}
        </select>
  );
                  };

export default TipoSolicitud;