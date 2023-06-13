import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './TopNavbar';
import '../css/Dashboard.css';
import CardWithDataTable from './CardWithDataTable';
import Sidebar from './Sidebar';
import { Routes, Route,BrowserRouter as Router } from 'react-router-dom';
import Formulario from './Formulario';
import UsuariosCards from './UsuariosCards';



const Dashboard = () => {
    const rowPrincial = {
        padding: '0px 0px',
    };
    return (
        <div className="d-flex flex-column min-vh-100">
            <header><TopNavbar /></header>
            <div className="container-fluid ">
                <div className="row" style={rowPrincial}>
                    <Sidebar />
                    <Router>
                        <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">Principal</h1>
                                <div className="btn-toolbar mb-2 mb-md-0">
                                </div>
                            </div>
                            <Routes>
                                <Route path="/Home" element={<CardWithDataTable/>} />
                                <Route path="/Form" element={<Formulario/>} />
                                <Route path="/Usuarios" element={<UsuariosCards/>} />
                            </Routes>
                        </main>
                    </Router>
                </div>
            </div>


        </div>
    );
};

export default Dashboard;
