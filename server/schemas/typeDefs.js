// Require schema and model from mongoose
const mongoose = require('mongoose');

// Construct a new instance of the schema class
const shippingRatesSchema = new mongoose.Schema({
    // Configure individual properties using Schema Types
    sku: { type: String, required: true },
    substate: { type: String, required: true },
    suburb: { type: String, required: true },
    state: { type: String, required: true },
    postcode: { type: String, required: true },
    shippingRate: { 
        type: Number, 
        required: true,
        set: function(value) {
            return parseFloat(value).toFixed(2);
          }
    },
  });

// Using mongoose.model() to compile a model based on the schema 'bookSchema'
const shippingRateRecord = mongoose.model('shippingRateRecord', shippingRatesSchema);

const handleError = (err) => console.error(err);

// // Post request to add multiple document to collection
// app.post('/create-many', (req, res) => {
//     db.collection('shippingRatesCollection').insertMany(
//       [
//         { "title": "Oh the Places We Will Go!" },
//         { "title": "Diary of Anne Frank" }
//       ]
//     )
//       .then(results => res.json(results))
//       .catch(err => {
//         if (err) throw err;
//       });
//   });
  

shippingRatesSchema.exports = shippingRateRecord;