import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faShoppingCart, faUsers, faChartBar, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import '../css/Dashboard.css';
function Sidebar() {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className=" pt-5">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="Home">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Dashboard <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faFile} className="me-2" />
              Orders
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Usuarios">
              <FontAwesomeIcon icon={faUsers} className="me-2" />
              Usuarios
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faChartBar} className="me-2" />
              Reportes
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="Form">
              <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
              Formulario
            </a>
          </li>
        </ul>
      </div>
    </nav>  
  );
}

export default Sidebar;
