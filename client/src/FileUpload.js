// FileUpload.js
import React, { useRef } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef();

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const uploadedFile = await response.json();
        onFileUpload(uploadedFile);
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
