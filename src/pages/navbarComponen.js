import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import './navbar.css';
import '../routes/index'
import './document/uploud-document'

const NavbarComponent = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-red">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="SNKI Logo" style={{ width: '125px', height: '50px' }} />
                </Link>
                <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
                        </li>
                        {token && role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/uploudDocument">Uploud</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className='d-none d-lg-block'>
                    {token && role ? (
                       <div className='d-inline-flex'>
                            <button onClick={logout} className='btn btn-danger ms-2 custom-btn small-btn d-flex align-items-center'>
                                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
                            </button>
                            <button onClick={() => navigate('/register')} className='btn btn-danger ms-2 custom-btn small-btn d-flex align-items-center'>
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Register
                            </button>
                        </div>
                    ) : (
                        <div className='d-flex'>
                            <button onClick={() => navigate('/login')} className='btn btn-danger custom-btn'>Login</button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .custom-btn {
                    border: 2px solid white;
                }
            `}</style>
        </nav>
    );
};

export default NavbarComponent;
