import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import './navbar.css';
import '../routes/index';
import './document/uploud-document';

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
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="SNKI Logo" style={{ width: '125px', height: '50px' }} />
                </Link>
                <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        {token && role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link text-white d-flex align-items-center" to="/uploudDocument">
                                    <FontAwesomeIcon icon={faUpload} className="me-2" /> Upload
                                </Link>
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
                            <button onClick={() => navigate('/login')} className='btn btn-danger custom-btn small-btn d-flex align-items-center'>
                                <FontAwesomeIcon icon={faSignInAlt} className="me-2" /> Login
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    );
};

export default NavbarComponent;
