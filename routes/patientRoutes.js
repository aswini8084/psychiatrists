// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const { registerPatient, upload } = require('../controllers/patientController');

router.post('/register', upload.single('photo'), registerPatient);

module.exports = router;
