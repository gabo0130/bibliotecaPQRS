import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Button, Modal, Table } from 'react-bootstrap';
import Usuarios from './Usuarios';

function CardWithDataTable() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [usuario, setUsuario] = useState("");
  

  const customStyles = {
    rows: {
        style: {
            minHeight: '72px',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', 
            paddingRight: '8px',
            fontWeight: 'bold',
            fontSize: '14px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    };
  const handleUsuarioChange = (newValue) => {
    setUsuario(newValue);
  };

  const handleViewButtonClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  
  const actualizarSolicitud = async (e) => {
    e.preventDefault();
    selectedItem.estado = "Asignado";
    if (selectedItem.usuarioAprobador === null) {
        selectedItem.usuarioAprobador = {
        "id": usuario
      };
    }
    const data = selectedItem;
    console.log(data);

    axios.patch(apiUrl + "solicitudes/"+selectedItem.id, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const responseData = response.data; 
        console.log(responseData); 
        alert("El formulario ha sido enviado con éxito.");
        setShowModal(false);
      })
      .catch((error) => {
        // Hubo un error en la solicitud
        console.error(error); // Mostrar el error en la consola o hacer algo con él
        alert("Ocurrió un error al enviar el formulario.");
      });
  };


  const columns = [
    {
      name: '',
      button: true,
      cell: (row) => (
        <button type="button" class="btn btn-outline-primary" onClick={() => handleViewButtonClick(row)}><FontAwesomeIcon icon={faEye} size='l' /></button>
      ),
    },
    {
      name: 'Correo',
      selector: 'correoAdicionado',
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: 'descripcion',
      sortable: false,
      wrap: true,
      width: '40%',
    },
    {
      name: 'Teléfono',
      selector: 'telefonoAdicionado',
      sortable: true,
    },
    {
      name: 'Tipo',
      selector: 'tipoSolicitud.descripcion',
      sortable: true,
    },
    {
      name: 'Estado',
      selector: 'estado',
      sortable: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + 'solicitudes/');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">Solicitudes</div>
      <div className="card-body">
        <DataTable
          columns={columns}
          data={data}
          pagination
          responsive
          customStyles={customStyles}
        />
        {selectedItem && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>ID: {selectedItem.id}</p>
            <p>Nombre: {selectedItem.personaSolicitante!=null?selectedItem.personaSolicitante.nombre:"Anonima"}</p>
            <p>Descripción: {selectedItem.descripcion}</p>
            <p>Fecha: {selectedItem.fecha}</p>
            <p>Correo Adicionado: {selectedItem.correoAdicionado}</p>
            <p>Telefono: {selectedItem.telefonoAdicionado}</p>
            <p>Tipo: {selectedItem.tipoSolicitud.descripcion}</p>
            <Usuarios  onUsuarioChange={handleUsuarioChange}/>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={actualizarSolicitud}>
              Asignar
          </Button>
          <Button variant="danger" onClick={handleCloseModal}>
              Denegar
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      </div>
    </div>
  );
}

export default CardWithDataTable;
