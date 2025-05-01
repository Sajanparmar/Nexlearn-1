const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();

//  Apply CORS before routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

//  Parse incoming JSON requests
app.use(express.json());

//  Now define routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/instructor', instructorRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/admin', adminRoutes);

//  Health check
app.get('/', (req, res) => {
  res.send('Course Selling API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
