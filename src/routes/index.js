import { Route, Routes } from "react-router-dom";
import NavbarComponen from "../pages/navbarComponen";
import Login from "../pages/auth-user/login";
import Register from "../pages/auth-user/register";
import UploadDocument from "../pages/document/uploud-document";
import ListDocument from "../pages/document/listDocument";

const RouterAplication = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return (
        <div>
            <NavbarComponen/>

            <Routes>
                <Route path="/" element={<ListDocument />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={token !== null && role === 'admin' ? <Register /> : <Login />} />
                <Route path="/uploudDocument" element={token !== null && (role === 'admin' || role === 'staff') ? <UploadDocument /> : <Login />} />
            </Routes>
        </div>
    );
};

export default RouterAplication;
