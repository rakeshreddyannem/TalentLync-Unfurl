const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
const candidateRoutes = require('./routes/candidateRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB (with Memory Server fallback)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/candidates', candidateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'TalentLync Unfurl Backend API', timestamp: new Date() });
});

// Serve frontend static build files in production or when dist folder exists
const frontendDistPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Error Middleware]:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 TalentLync Unfurl server listening on port ${PORT}`);
});

