const Psychiatrist = require('../models/Psychiatrist');
const Hospital = require('../models/Hospital');

const getPsychiatristsByHospital = async (req, res) => {
  try {
    const { hospitalId } = req.body;

    // Fetch hospital details
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ msg: 'Hospital not found' });
    }

    // Fetch psychiatrists for the hospital
    const psychiatrists = await Psychiatrist.find({ hospitalId });

    // Calculate patient count for each psychiatrist
    const psychiatristDetails = psychiatrists.map((psychiatrist) => ({
      id: psychiatrist._id,
      name: psychiatrist.name,
      patientsCount: psychiatrist.patients.length,
    }));

    // Send response with hospital details, psychiatrist count, and patient details
    res.json({
      hospitalName: hospital.name,
      totalPsychiatristsCount: psychiatrists.length,
      psychiatristDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getPsychiatristsByHospital,
};
