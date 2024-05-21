const express = require('express');
const router = express.Router();
const { getPsychiatristsByHospital } = require('../controllers/psychiatristController');

// POST request to fetch psychiatrists by hospital ID
router.post('/hospital', getPsychiatristsByHospital);

module.exports = router;
