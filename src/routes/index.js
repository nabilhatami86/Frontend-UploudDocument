import {Route, Routes} from "react-router-dom"
import NavbarComponen from "../pages/navbarComponen"
import Login from "../pages/auth-user/login"
import Register from "../pages/auth-user/register"
import UploadDocument from "../pages/document/uploud-document"
import ListDocument from "../pages/document/listDocument"

const RouterAplication = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    

    console.log('Token:', token);
    console.log('Role:', role);
    

    return (
        <div>
            <NavbarComponen/>

            <Routes>
                
                <Route path="/" element={<ListDocument />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route
                    path="/"
                    element={token !== null && role === 'admin'
                        ? <UploadDocument/>
                        : <Login/>
                    }
                />

            </Routes>
        </div>
    );
};

export default RouterAplication