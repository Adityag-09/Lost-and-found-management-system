// 1. CRITICAL DNS FIX
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 2. EXPLICIT CORS & PREFLIGHT HANDLING (The "Preflight Fix")
const corsOptions = {
    origin: "*", // Allows any frontend URL to connect
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    optionsSuccessStatus: 204
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Specifically handle the OPTIONS (Preflight) request for all routes
app.options('*', cors(corsOptions));

app.use(express.json());

// 3. JWT SECRET CHECK
if (!process.env.JWT_SECRET) {
    console.warn("⚠️ WARNING: JWT_SECRET is not defined in .env file!");
}

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log('⏳ Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, 
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

connectDB();

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Lost & Found API is Live',
    developed_by: 'Aditya Kanaujiya'
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});