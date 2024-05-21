// controllers/patientController.js
const multer = require('multer');
const Patient = require('../models/Patient');
const Psychiatrist = require('../models/Psychiatrist');

// Configure multer storage (you can customize this as needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const registerPatient = async (req, res) => {
  try {
    const { name, address, email, phone, password, psychiatristId } = req.body;
    const photo = req.file;

    if (!photo) {
      return res.status(400).json({ msg: 'Photo is required' });
    }

    // Check other required fields
    if (!name || !address || !email || !phone || !password || !psychiatristId) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Validate address length
    if (address.length < 10) {
      return res.status(400).json({ msg: 'Address must be at least 10 characters long' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'Invalid email format' });
    }

    // Validate phone number format
    const phoneRegex = /^\+\d{1,3}\d{10}$/; // Adjust this regex according to your country code requirements
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ msg: 'Invalid phone number format' });
    }

    // Create a new patient
    const newPatient = new Patient({
      name,
      address,
      email,
      phone,
      password,
      photo: photo.buffer.toString('base64'), // Save photo as a base64 string
      psychiatrist: psychiatristId,
    });

    await newPatient.save();
    res.status(201).json({ msg: 'Patient registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  registerPatient,
  upload,
};
