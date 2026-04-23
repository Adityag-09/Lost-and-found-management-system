// 1. CRITICAL DNS FIX (Bypasses Windows/Hotspot DNS issues)
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 2. UPDATED CORS (Ensures Frontend can communicate with Backend on Render)
app.use(cors({
    origin: "*", // Allows access from any origin (Essential for your Vercel/Render frontend)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"]
}));

app.use(express.json());

// 3. JWT SECRET CHECK (Prevents server crash if .env is missing)
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
    console.error('❌ MongoDB connection error:');
    console.error(err.message);
    console.log('👉 TIP: Ensure your IP is whitelisted (0.0.0.0/0) in Atlas.');
  }
};

connectDB();

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Lost & Found API is Live',
    developed_by: 'Aditya Kanaujiya',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      items: '/api/items'
    }
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy and running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});