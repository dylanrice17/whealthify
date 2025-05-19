const mongoose = require('mongoose');
const Doctor = require('../src/models/Doctor');
const config = require('../src/config/config');

async function createDoctor() {
  await mongoose.connect(config.mongodbUri);

  const doctor = new Doctor({
    name: 'Dr. John Doe',
    email: 'doctor@example.com',
    password: 'password123', // Plain text for now
  });

  await doctor.save();
  console.log('Doctor created:', doctor);
  mongoose.disconnect();
}

createDoctor().catch(err => {
  console.error(err);
  mongoose.disconnect();
}); 