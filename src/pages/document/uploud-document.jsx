import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('Choose file');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
             await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    setUploadProgress(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    );
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

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Upload Document</h5>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Select File</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    onChange={handleFileChange}/>
                            </div>
                            <button className="btn btn-primary" onClick={handleUpload}>
                                <i className="fas fa-upload me-1"></i>
                                Upload
                            </button>

                        </div>
                        {
                            selectedFile && (
                                <div className="alert alert-info" role="alert">
                                    {fileName}
                                </div>
                            )
                        }
                        {
                            uploadProgress > 0 && (
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{
                                            width: `${uploadProgress}%`
                                        }}
                                        aria-valuenow={uploadProgress}
                                        aria-valuemin="0"
                                        aria-valuemax="100">
                                        {uploadProgress}%
                                    </div>
                                </div>
                            )
                        }
                        {
                            message && (
                                <div
                                    className={`alert ${message.includes('successfully')
                                        ? 'alert-success'
                                        : 'alert-danger'}`}
                                    role="alert">
                                    {message}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
