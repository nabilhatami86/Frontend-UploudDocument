import { Modal, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RenameDocumentModal = ({ show, handleClose, documentId, token, setDocuments }) => {
    const [newName, setNewName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/category')
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the categories!', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/rename/${documentId}`, {
            newName,
            categoryId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            axios.get('http://localhost:5000/list')
                .then(response => {
                    setDocuments(response.data);
                    handleClose(); // Close the modal after successful rename
                })
                .catch(error => {
                    console.error('There was an error fetching the documents!', error);
                });
        })
        .catch(error => {
            console.error('There was an error renaming the document!', error);
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Rename Document</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNewName">
                        <Form.Label>New Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategoryId" className="mt-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Open this select menu</option>
                            {category.map(data => (
                                <option key={data.id} value={data.id}>
                                    {data.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Rename
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RenameDocumentModal;
