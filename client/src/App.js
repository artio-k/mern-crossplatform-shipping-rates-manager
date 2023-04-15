// App.js
import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';

const App = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('/api/files')
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  const onFileUpload = (newFile) => {
    setFiles([...files, newFile]);
  };

  const onFileDelete = (deletedFile) => {
    setFiles(files.filter((file) => file !== deletedFile));
  };

  return (
    <div>
      <h1>File Manager</h1>
      <FileUpload onFileUpload={onFileUpload} />
      <FileList files={files} onFileDelete={onFileDelete} />
    </div>
  );
};

export default App;