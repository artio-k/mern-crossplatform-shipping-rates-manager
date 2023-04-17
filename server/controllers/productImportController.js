

const splitCsvByCompleteness = require('../helpers/splitCsvByCompleteness');

const processCsvMiddleware = (req, res, next) => {
    const inputFilePath = req.file.path;
    const completeOutputFilePath = `./processed/complete_${req.file.filename}.csv`;
    const incompleteOutputFilePath = `./processed/incomplete_${req.file.filename}.csv`;
  
    splitCsvByCompleteness(inputFilePath, completeOutputFilePath, incompleteOutputFilePath);
    next();
  };

  module.exports = { processCsvMiddleware };