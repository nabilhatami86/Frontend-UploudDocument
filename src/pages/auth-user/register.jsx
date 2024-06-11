import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, ToastContainer } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const registerUser = () => {
    if (!email || !password || !role) {
      return setError('Data form User harus di isi semua');
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return setError('Email tidak valid');
    }

    const data = {
      email,
      password,
      role,
    };

    axios
      .post('http://localhost:5000/register', data)
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError('Registrasi gagal, coba lagi.');
      });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-select"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="user">User</option>
          </select>
        </div>
        <button className="btn btn-danger w-100" onClick={registerUser}>Register</button>
        <p className="mt-3 text-center">Already have an account? <Link to="/login">Login here</Link></p>
      </div>

      <ToastContainer position="center-center" className="p-3">
        <Toast onClose={() => setShowSuccess(false)} show={showSuccess} delay={3000} autohide bg="success">
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Registrasi berhasil</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Register;
