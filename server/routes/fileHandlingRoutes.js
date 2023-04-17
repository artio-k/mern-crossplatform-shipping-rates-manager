const express = require('express');
const router = express.Router();


// Get a list of uploaded files
app.get('/api/product-imports/files', (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(files);
      }
    });
  });
  
  // Delete a file
  app.delete('/api/product-imports/files/:filename', (req, res) => {
    const filePath = path.join(uploadFolder, req.params.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('File deleted successfully.');
      }
    });
  });


  module.exports = router;