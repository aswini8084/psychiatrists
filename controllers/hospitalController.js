const Hospital = require('../models/Hospital');

const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    if (hospitals.length === 0) {
      return res.json([]);
    }
    res.json(hospitals);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getHospitals,
};
