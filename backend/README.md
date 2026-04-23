# Backend - Lost & Found Item Management System

## Overview

This is the Node.js/Express backend for the Lost & Found Item Management System with MongoDB integration.

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lost-found
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### Start Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Project Structure

```
backend/
├── models/
│   ├── User.js       # User schema with password hashing
│   └── Item.js       # Item schema with indexing
├── controllers/
│   ├── authController.js   # Register, login, logout logic
│   └── itemController.js   # CRUD operations for items
├── routes/
│   ├── auth.js       # Authentication routes
│   └── items.js      # Item management routes
├── middleware/
│   └── auth.js       # JWT verification middleware
├── server.js         # Main Express app
├── .env              # Environment variables
├── .gitignore        # Git ignore file
└── package.json      # Dependencies
```

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Item Routes
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item (protected)
- `PUT /api/items/:id` - Update item (protected, owner only)
- `DELETE /api/items/:id` - Delete item (protected, owner only)
- `GET /api/items/search?name=xyz` - Search items

## Key Features

✅ JWT Authentication
✅ Password hashing with bcrypt
✅ MongoDB integration with Mongoose
✅ Input validation
✅ Error handling
✅ CORS support
✅ Protected routes
✅ User authorization
✅ Text search on items

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT creation and verification
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables

## Security

- Passwords hashed with bcryptjs (10 rounds)
- JWT tokens for authentication
- Middleware for route protection
- Authorization checks for user-specific resources
- Input validation
- Error handling without exposing sensitive info

## Deployment

See [Deployment Guide](../DEPLOYMENT.md) for instructions on deploying to Render.

## Development

Use `npm run dev` for development with nodemon auto-restart.

## Support

For issues or questions, please create an issue in the main repository.
