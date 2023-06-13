import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const Usuarios = (props) => {

const {onUsuarioChange} = props;
const apiUrl = process.env.REACT_APP_API_URL;

const [usuario, setUsuario] = useState("");
const [usuarios, setUsuarios] = useState([]);

const handleUsuarioChange = (e) => { 
    const newValue = e.target.value;
    setUsuario(newValue);
    onUsuarioChange(newValue);
};


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "usuario/");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los tipos de solicitud:", error);
      }
    };
  
    fetchData();
  }, []);


  
  return (
    <select id="usuario" className="form-select" value={usuario} onChange={handleUsuarioChange}>
    <option value="">Selecciona un usuario</option>
    {usuarios.map((user) => (
      <option key={user.id} value={user.id}>
        {user.usuario}
      </option>
    ))}
  </select>
  );
                  };

export default Usuarios;