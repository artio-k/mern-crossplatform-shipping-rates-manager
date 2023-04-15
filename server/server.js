// // server.js
// const express = require('express');
// const fileUpload = require('express-fileupload');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const uploadFolder = './uploads';

// app.use(express.json());
// app.use(fileUpload());
// // app.use(express.static('client/build')); // serve the React app

// // Upload a file
// app.post('/api/files/upload', (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   const file = req.files.file;
//   const uploadPath = path.join(uploadFolder, file.name);

//   if (fs.existsSync(uploadPath)) {
//     return res.status(400).send('A file with the same name already exists.');
//   }

//   file.mv(uploadPath, (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.send('File uploaded successfully.');
//   });
// });

// // Get a list of uploaded files
// app.get('/api/files', (req, res) => {
//   fs.readdir(uploadFolder, (err, files) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.json(files);
//     }
//   });
// });

// // Delete a file
// app.delete('/api/files/:filename', (req, res) => {
//   const filePath = path.join(uploadFolder, req.params.filename);
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.send('File deleted successfully.');
//     }
//   });
// });

// // Placeholder function for Mongoose data seeding
// app.post('/api/files/seed/:filename', (req, res) => {
//   // Implement your Mongoose data seeding logic here
//   res.send(`Data seeding for file ${req.params.filename} started.`);
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });










// const express = require('express');
// const multer = require('multer');
// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.post('/api/upload', upload.single('file'), (req, res) => {
//   // You can perform any additional processing of the uploaded file here.
//   res.json(req.file);
// });

// app.listen(3001, () => {
//   console.log('Server running on port 3001');
// });


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

// Upload a file
app.post('/api/upload', upload.single('file'), (req, res) => {
  // You can perform any additional processing of the uploaded file here.
  res.json(req.file);
});

// Get a list of uploaded files
app.get('/api/files', (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(files);
    }
  });
});

// Delete a file
app.delete('/api/files/:filename', (req, res) => {
  const filePath = path.join(uploadFolder, req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('File deleted successfully.');
    }
  });
});

// Placeholder function for Mongoose data seeding
app.post('/api/files/seed/:filename', (req, res) => {
  // Implement your Mongoose data seeding logic here
  res.send(`Data seeding for file ${req.params.filename} started.`);
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
