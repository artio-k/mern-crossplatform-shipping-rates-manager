

// csv_validation_helper.js
const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('fast-csv').write;

function splitCsvByCompleteness(inputFilePath, completeOutputFilePath, incompleteOutputFilePath) {
  const completeRows = [];
  const incompleteRows = [];

  const skuData = new Map();

  fs.createReadStream(inputFilePath)
    .pipe(csvParser({ separator: ',' }))
    .on('data', (row) => {
      const sku = row['SKU'];
      if (!skuData.has(sku)) {
        skuData.set(sku, []);
      }
      skuData.get(sku).push(row);
    })
    .on('end', () => {
      for (const [sku, rows] of skuData.entries()) {
        if (rows.length === 17) {
          completeRows.push(...rows);
        } else {
          incompleteRows.push(...rows);
        }
      }

      const csvHeaders = [
        'SKU',
        'SubState',
        'Suburb',
        'State',
        'Postcode',
        'ShippingRate',
      ];

      createCsvWriter(completeRows, { headers: csvHeaders })
        .pipe(fs.createWriteStream(completeOutputFilePath))
        .on('finish', () => console.log('Complete data written to', completeOutputFilePath));

      createCsvWriter(incompleteRows, { headers: csvHeaders })
        .pipe(fs.createWriteStream(incompleteOutputFilePath))
        .on('finish', () => console.log('Incomplete data written to', incompleteOutputFilePath));
    });
}

module.exports = splitCsvByCompleteness;
