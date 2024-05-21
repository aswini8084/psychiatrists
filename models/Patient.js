const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  psychiatrist: {
    type: Schema.Types.ObjectId,
    ref: 'Psychiatrist',
    required: true,
  },
});

module.exports = mongoose.model('Patient', PatientSchema);
