import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"
import logo from '../assets/logo.png'

const NavbarComponen = () => {
    const Navigate = useNavigate()
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        Navigate('/login')
    }

    console.log(token)

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-red">
                <div className="container">
                <Link className="navbar-brand" to="/">
                        <img src={logo} alt="SNKI Logo" style={{ width: '125px', height: '50px' }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" aria-current="page" to='/'>Home</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='d-none d-lg-block'>
                        {
                            token && role ? (
                                <button onClick={logout} className='btn btn-danger ms-2 custom-btn'>Logout</button>
                            ) : (
                                <div className='d-flex'>
                                    <button onClick={() => Navigate('/login')} className='btn btn-danger custom-btn'>Login</button>
                                    <button onClick={() => Navigate('/register')} className='btn btn-danger ms-2 custom-btn'>Register</button>
                                </div>
                            )
                        }
                    </div>

                    <style jsx>{`
                        .custom-btn {
                            border: 2px solid white;
                        }
                    `}</style>

                </div>
            </nav>
        </div>
    )
}

export default NavbarComponen