import React, { useEffect, useState } from 'react';
import './style-document.css';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import '../../routes/index';

const ListDocument = () => {
    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/list')
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the documents!', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRename = (id) => {
        const newName = prompt("Enter the new name for the document:");
        if (newName) {
            axios.put(`http://localhost:5000/rename/${id}`, { title: newName })
                .then(response => {
                    setDocuments(documents.map(doc => doc.id === id ? { ...doc, title: newName } : doc));
                })
                .catch(error => {
                    console.error('There was an error renaming the document!', error);
                });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this document?")) {
            axios.delete(`http://localhost:5000/document/${id}`)
                .then(response => {
                    setDocuments(documents.filter(doc => doc.id !== id));
                })
                .catch(error => {
                    console.error('There was an error deleting the document!', error);
                });
        }
    };

    const handleDownload = (link) => {
        window.open(link, "_blank");
    };

    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container py-5">
            <div className="contenNav mb-5">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/pepree">Pepres</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/notulen">Notulen</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/nota-dinas">Nota Dinas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/undangan">Undangan</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/st">ST</Link>
                    </li>
                </ul>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search" 
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            
            <Table striped bordered hover responsive className="table-custom">
                <thead className="table table-striped">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocuments.map((document, index) => (
                        <tr key={document.id}>
                            <td>{index + 1}</td>
                            <td>{document.title}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleRename(document.id)}>Rename</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(document.id)}>Delete</Button>{' '}
                                <Button variant="primary" size="sm" onClick={() => handleDownload(document.link)}>Download</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ListDocument;
