import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../homepages/Navbar';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const authToken = localStorage.getItem('authToken');
  const userId = authToken ? JSON.parse(atob(authToken.split('.')[1])).user_id : null;

  useEffect(() => {
    if (userId) {
      fetchUploadedFiles(userId);
    }
  }, [userId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError('Please select a file');
        return;
      }

      if (!authToken) {
        setError('Token is missing or empty');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      setIsLoading(true);

      const response = await axios.post(
        `http://localhost:5000/upload-file?user_id=${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Server response:', response.data.message);

      fetchUploadedFiles(userId);
    } catch (error) {
      console.error('Error uploading file:', error.response?.data?.error || 'Unknown error');
      setError('Error uploading file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (fileId, filename) => {
    try {
      const response = await axios.get(`http://localhost:5000/download-file/${fileId}?user_id=${userId}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // ... rest of the code
    } catch (error) {
      console.error('Error downloading file:', error.response?.data?.error || 'Unknown error');
      setError('Error downloading file. Please try again.');
    }
  };

  const fetchUploadedFiles = async (userId) => {
    try {
      if (!authToken) {
        setError('Token is missing or empty');
        return;
      }

      setIsLoading(true);

      const response = await axios.get(`http://localhost:5000/uploaded-files?user_id=${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('Uploaded Files:', response.data.uploaded_files);

      setUploadedFiles(response.data.uploaded_files);
    } catch (error) {
      console.error('Error fetching uploaded files:', error.response?.data?.error || 'Unknown error');
      setError('Error fetching uploaded files. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="main_box">
        <Navbar />
        <div className="container-xl" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
          <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>
                      File <b>Upload</b>
                    </h2>
                  </div>
                  <div className="col-sm-6">
                    <input type="file" onChange={handleFileChange} />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={handleUpload} disabled={isLoading}>
                      {isLoading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Id:</th>
                    <th>Filename:</th>
                    <th>File Path:</th>
                    <th>Uploaded Date:</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.map((file) => (
                    <tr key={file.id}>
                      <td>{file.id}</td>
                      <td>{file.filename}</td>
                      <td>{file.last_modified}</td>
                      <td>{file.uploaded_date}</td>
                      <td>
                        <button onClick={() => handleDownload(file.id, file.filename)} className='btn btn-primary'>
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
