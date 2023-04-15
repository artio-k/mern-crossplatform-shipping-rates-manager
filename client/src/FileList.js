// FileList.js
import React from 'react';

const FileList = ({ files, onFileDelete }) => {
  const handleFileDelete = (file) => {
    onFileDelete(file);
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name}
            <button onClick={() => handleFileDelete(file)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
