import axios from "axios";
import {useState} from "react";
import {BsFileEarmarkPlus} from "react-icons/bs";

const UploadDocument = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    const uploadDocument = (e) => {
        e.preventDefault();

        if (!file) {
            return setError('File is required');
        }

        const formData = new FormData();
        formData.append('file', file);

        axios
            .post('http://localhost:5000/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setFile(null);
                setError('');
                alert('Document uploaded successfully!');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container">
            {
                error && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <p className="text-white my-0">{error}</p>
                        <button className="btn-close" onClick={() => setError('')}></button>
                    </div>
                )
            }
            <div className="border rounded py-3 px-3">
                <div className="mb-2">
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        style={{
                            display: 'none'
                        }}
                        id="file-upload"/>
                    <label htmlFor="file-upload" className="btn btn-dark d-flex align-items-center">
                        <BsFileEarmarkPlus className="me-2"/>
                        Upload Document
                    </label>
                </div>
                <div>
                    <button onClick={uploadDocument} className="btn btn-primary w-100">UPLOAD</button>
                </div>
            </div>
        </div>
    );
};

export default UploadDocument;
