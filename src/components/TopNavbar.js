import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faCog, faSignOutAlt, faBars, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import '../css/estilos.css'
const TopNavbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    // Lógica para cerrar sesión
  };

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleSideBarOptions = () => {
    if (document.getElementById('sidebarMenu').classList.contains('collapse')) {
      document.getElementById('sidebarMenu').classList.remove('collapse');
    } else {
      document.getElementById('sidebarMenu').classList.add('collapse');
    }

  };

  const handleToggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">

        <a className="navbar-brand" href="#" onClick={handleSideBarOptions}><FontAwesomeIcon icon={faBook} size="lg" />Biblioteca</a>

        <form className="form-inline my-2 my-lg-0">
          <div className="input-group">
            <input className="form-control border-0" type="search" placeholder="Buscar" aria-label="Buscar" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary border-0" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </form>
        <button className="navbar-toggler" type="button" onClick={handleToggleOptions}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`collapse navbar-collapse justify-content-end ${showOptions ? 'show' : ''}`}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" onClick={handleToggleLogout} id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                <FontAwesomeIcon icon={faBell} /> Jhony Quintero
              </a>
              <div className={`dropdown-menu dropdown-menu-right ${showLogout ? 'show' : ''}`} aria-labelledby="userDropdown">
                <button className="dropdown-item" >
                  <FontAwesomeIcon className="mr-2" icon={faUser} />
                  Mi Perfil
                </button>
                <button className="dropdown-item" >
                  <FontAwesomeIcon className="mr-2" icon={faCog} />
                  Configuración
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
                  Cerrar Sesión
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
