import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Card({ nombre, identificacion, telefono, edad, usuario, onCardClick }) {
  const handleClick = () => {
    onCardClick(identificacion);
  };

  return (
    <div className="card text-white bg-primary mb-3" onClick={handleClick}>
      <div className="card-header">{nombre}</div>
      <div className="card-body">
        <h5 className="card-text">Usuario: {usuario}</h5>
        <p className="card-title">Identificación: {identificacion}</p>
        <p className="card-text">Teléfono: {telefono}</p>
        <p className="card-text">Edad: {edad}</p>
      </div>
    </div>
  );
}

export default Card;

