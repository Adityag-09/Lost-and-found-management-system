# Setup Instructions - Lost & Found Item Management System

Complete step-by-step guide to set up and run the Lost & Found Management System locally.

## Prerequisites

Before starting, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local development)
- [npm](https://www.npmjs.com/) or yarn
- A code editor (VS Code recommended)
- [Git](https://git-scm.com/)

## Part 1: Backend Setup

### Step 1.1: Navigate to Backend Directory
```bash
cd Lost&found-auth
cd backend
```

### Step 1.2: Install Dependencies
```bash
npm install
```

This installs all required packages:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon (for development)

### Step 1.3: Configure Environment Variables

Create a `.env` file in the backend directory with the following content:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (Local)
MONGO_URI=mongodb://localhost:27017/lost-found

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

**Note**: Replace `your_super_secret_jwt_key_change_this_in_production` with a strong secret key.

### Step 1.4: Start MongoDB

**Option A: Local MongoDB (if installed)**
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Get connection string
5. Update `MONGO_URI` in `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/lost-found
```

### Step 1.5: Start Backend Server

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

The backend API is now running at: `http://localhost:5000`

**Test the connection:**
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Part 2: Frontend Setup

### Step 2.1: Open New Terminal (Keep Backend Running)

In your project root, open a new terminal window while keeping the backend running.

### Step 2.2: Navigate to Frontend Directory

```bash
cd Lost&found-auth
cd frontend
```

### Step 2.3: Install Dependencies

```bash
npm install
```

This installs:
- react
- react-dom
- react-router-dom
- axios
- react-scripts

### Step 2.4: Configure Environment Variables

The `.env` file is already created. Verify it contains:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 2.5: Start Frontend Development Server

```bash
npm start
```

The application will automatically open at: `http://localhost:3000`

If not, open your browser and go to: `http://localhost:3000`

---

## Part 3: Testing the Application

### Test User Registration

1. Click "Register" on the login page (or go to `/register`)
2. Fill in the form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Register"
4. You should be redirected to the dashboard

### Test Login

1. Log out if already logged in
2. Go to login page
3. Enter credentials:
   - Email: `john@example.com`
   - Password: `password123`
4. Click "Login"

### Test Add Item

1. On Dashboard, click "Add New Item"
2. Fill in the form:
   - Item Name: `Lost Wallet`
   - Type: `Lost`
   - Description: `Black leather wallet with ID card`
   - Location: `Library Building, 2nd Floor`
   - Date: `2024-01-15`
   - Phone: `9876543210`
   - Email: `john@example.com`
3. Click "Add Item"
4. Item should appear in the items list

### Test Search

1. Use the search bar to find items
2. Try searching for: `wallet`
3. Results should filter in real-time

### Test Edit/Delete

1. Find an item you added
2. Click "Edit" to modify it
3. Click "Delete" to remove it (confirm when prompted)

### Test Logout

1. Click "Logout" button at the top right
2. You should be redirected to the login page

---

## Project File Structure

After setup, your project should look like:

```
Lost&found-auth/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── itemController.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── items.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── node_modules/
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddItemForm.js
│   │   │   ├── ItemList.js
│   │   │   └── SearchBar.js
│   │   ├── pages/
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   └── Dashboard.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── .env
│   └── node_modules/
│
├── README.md
├── DEPLOYMENT.md
└── SETUP_INSTRUCTIONS.md
```

---

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseError: Could not connect to MongoDB`

**Solution**:
1. Ensure MongoDB is running
2. Check connection string in `.env`
3. For MongoDB Atlas, whitelist your IP
4. Verify credentials are correct

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or change PORT in .env to 5001
```

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Ensure backend is running
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Backend already has CORS enabled

### Frontend Cannot Reach Backend

**Error**: `Network Error` or `Failed to fetch`

**Solution**:
1. Ensure backend server is running (port 5000)
2. Verify API URL in frontend `.env`
3. Check if port 5000 is not blocked by firewall

### npm install Issues

**Error**: `npm ERR!`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Development Commands

### Backend Commands

```bash
cd backend

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Frontend Commands

```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## Next Steps

1. **Customize Styling**: Modify CSS files in `src/styles/`
2. **Add More Features**: Extend controllers and add routes
3. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **Database**: Connect to MongoDB Atlas for production
5. **Security**: Change JWT_SECRET and use strong passwords

---

## API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Items
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item details
- `POST /api/items` - Create item (requires auth)
- `PUT /api/items/:id` - Update item (requires auth)
- `DELETE /api/items/:id` - Delete item (requires auth)
- `GET /api/items/search?name=xyz` - Search items

---

## Support

For issues or questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Review logs in browser console (F12)
3. Check backend terminal for errors
4. Create an issue on GitHub

---

**Happy Coding!** 🚀
