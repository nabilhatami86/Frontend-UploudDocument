import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo2.png'
import { FaUpload, FaFileAlt, FaChevronDown } from 'react-icons/fa';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('Choose file');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/category')
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('categoryId', categoryId);

        try {
            await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });

            setMessage('File uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading file');
            console.error('Error uploading file:', error);
        }
        // Reset the file input
        setSelectedFile(null);
        setFileName('Choose file');
        setUploadProgress(0);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body text-center">
                            <img src={logo} alt="Upload Icon" style={{ width: '100px', marginBottom: '20px' }} />
                            <h5 className="card-title"><FaUpload /> Upload Document</h5>
                            <div className="mb-3">
                                <label htmlFor="categorySelect" className="form-label mt-3 d-flex justify-content-start align-items-center">Category</label>
                                <Form.Select 
                                    id="categorySelect" 
                                    aria-label="Default select example" 
                                    onChange={e => setCategoryId(e.target.value)} 
                                    className="mb-3">
                                    <option>Open this select menu</option>
                                    {category.map((data, index) => (
                                        <option key={index} value={data.id}>{data.name}</option>
                                    ))}
                                </Form.Select>
                                <label htmlFor="formFile" className="form-label d-none">Select File</label>
                                <div className="d-flex justify-content-center">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
                                            <FaFileAlt className="me-2" />
                                            <span>{fileName}</span>
                                            <FaChevronDown className="ms-2" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Form.Control
                                                type="file"
                                                id="formFile"
                                                onChange={handleFileChange}
                                                className="d-none" />
                                            <Dropdown.Item as="label" htmlFor="formFile" className="cursor-pointer">
                                                Choose file
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <button className="btn btn-danger" onClick={handleUpload}>
                                <FaUpload className="me-1" />
                                Upload
                            </button>
                        </div>
                        {selectedFile && (
                            <div className="alert alert-info mt-3" role="alert">
                                {fileName}
                            </div>
                        )}
                        {uploadProgress > 0 && (
                            <div className="progress mt-3">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${uploadProgress}%` }}
                                    aria-valuenow={uploadProgress}
                                    aria-valuemin="0"
                                    aria-valuemax="100">
                                    {uploadProgress}%
                                </div>
                            </div>
                        )}
                        {message && (
                            <div
                                className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-3`}
                                role="alert">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
