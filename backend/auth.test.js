const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authRoutes = require('../routes/auth');
const itemRoutes = require('../routes/items'); // Needed for auth middleware context
const User = require('../models/User');

// Mock the JWT secret for a consistent test environment
process.env.JWT_SECRET = 'test-secret';

let mongoServer;
let app;

// Setup before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Create a minimal express app for testing
  app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/items', itemRoutes); // Include to avoid middleware errors if routes are intertwined
});

// Teardown after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clear user collection before each test
afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user and return a token', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.name).toBe('Test User');
    });

    it('should return a 400 error if the email is already registered', async () => {
      // First, create a user
      await User.create({ name: 'Existing User', email: 'test@example.com', password: 'password123' });

      // Then, attempt to register with the same email
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Another User', email: 'test@example.com', password: 'password456' });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Email is already registered');
    });
  });
});