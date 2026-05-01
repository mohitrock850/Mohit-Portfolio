require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// ── Startup env validation ──────────────────────────────────────────────────
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const PLACEHOLDER_VALUES = ['your_cloud_name_from_cloudinary_dashboard', 'your_jwt_secret_change_this'];
REQUIRED_ENV.forEach((key) => {
  const val = process.env[key];
  if (!val || PLACEHOLDER_VALUES.includes(val)) {
    console.warn(`⚠️  WARNING: Environment variable "${key}" is missing or still set to a placeholder value.`);
  }
});

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: 'https://mohit-portfolio-five-delta.vercel.app', // Your exact Vercel URL
    credentials: true // This allows cookies/tokens to pass between Vercel and Render
}));
app.use(express.json());
app.use(morgan('dev'));

// Mount routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));

// Health check
app.get('/', (req, res) => res.send('API is running...'));

// Global error handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));