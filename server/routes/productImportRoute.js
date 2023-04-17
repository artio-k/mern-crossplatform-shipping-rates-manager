const express = require('express');
const router = express.Router();

const multer = require('multer');

const { processCsvMiddleware } = require('./controllers/productImportController');

// Upload a file
// /api/product-imports
router.post('/', upload.single('file'), processCsvMiddleware, (req, res) => {
    // You can perform any additional processing of the uploaded file here.
    res.json(req.file);
  });


  module.exports = router;