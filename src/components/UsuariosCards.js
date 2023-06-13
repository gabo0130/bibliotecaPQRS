import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from "axios";
import CardWithDataTableUser from './CardWithDataTableUser';

function UsuariosCard() {
    const [usuarios, setUsuarios] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
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

      const [selectedUserId, setSelectedUserId] = useState(null);

      const handleCardClick = (usuario) => {
        console.log('Clic en la card del usuario:', usuario);
        setSelectedUserId(usuario.id);
      };

      

    return (
            <div className="row">
                <h1>Usuarios aprobadores</h1>
                {usuarios.map((usuario) => (
                    <div className="col-sm-6 col-md-4 col-lg-3" key={usuario.identificacion}>
                        <Card
                            key={usuario.identificacion}
                            nombre={usuario.nombre}
                            identificacion={usuario.identificacion}
                            telefono={usuario.telefono}
                            edad={usuario.edad}
                            usuario={usuario.usuario}
                            onCardClick={() => handleCardClick(usuario)}
                        />
                    </div>
                ))}
                {selectedUserId && (
        <div className="col-12">
          <CardWithDataTableUser idUser={selectedUserId} key={selectedUserId} />
        </div>
      )}
            </div>
    );
}

export default UsuariosCard;
