// hospitalRoutes.js

const express = require('express');
const router = express.Router();
const { getPsychiatristsByHospital } = require('../controllers/psychiatristController');

// Define the route to fetch psychiatrists and patients by hospital ID
router.post('/api/psychiatrists/hospital', getPsychiatristsByHospital);

module.exports = router;
