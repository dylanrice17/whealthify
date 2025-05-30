const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./src/config/config');
const authRoutes = require('./src/routes/authRoutes');
const doctorAuthRoutes = require('./src/routes/doctorAuthRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorAuthRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Connect to MongoDB
mongoose.connect(config.mongodbUri)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 