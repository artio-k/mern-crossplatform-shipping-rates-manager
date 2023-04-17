const express = require('express');

const cors = require('cors');

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const uploadFolder = './uploads';
const upload = multer({ dest: uploadFolder });

app.use(cors());

app.use(express.json());

const productImportRoute = require('.routes/productImportRoute');
app.use('/api/product-imports', productImportRoute);

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

// // Placeholder function for Mongoose data seeding
// app.post('/api/files/seed/:filename', (req, res) => {
//   // Implement your Mongoose data seeding logic here
//   res.send(`Data seeding for file ${req.params.filename} started.`);
// });

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
