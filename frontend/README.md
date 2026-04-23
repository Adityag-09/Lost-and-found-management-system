# Frontend - Lost & Found Item Management System

## Overview

This is a React-based frontend for the Lost & Found Item Management System with user authentication and item management features.

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

```bash
npm install
```

### Configure Backend API

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Start Application

```bash
npm start
```

App runs on `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html         # Main HTML file
├── src/
│   ├── pages/
│   │   ├── Register.js    # User registration page
│   │   ├── Login.js       # User login page
│   │   └── Dashboard.js   # Main dashboard page
│   ├── components/
│   │   ├── AddItemForm.js # Form to add new items
│   │   ├── ItemList.js    # Display items list
│   │   └── SearchBar.js   # Search functionality
│   ├── styles/
│   │   ├── Auth.css       # Authentication pages styling
│   │   ├── Dashboard.css  # Dashboard page styling
│   │   └── index.css      # Global styles
│   ├── api.js             # Axios API client
│   ├── App.js             # Main App component
│   ├── App.css            # App styles
│   └── index.js           # React entry point
├── .env                   # Environment variables
├── package.json           # Dependencies
└── .gitignore             # Git ignore file
```

## Available Pages

### 1. Register Page (`/register`)
- User registration form
- Name, email, password fields
- Form validation
- Link to login page
- Success redirects to dashboard

### 2. Login Page (`/login`)
- User login form
- Email and password fields
- Form validation
- Link to register page
- Success redirects to dashboard

### 3. Dashboard Page (`/dashboard`)
- Add new item form
- Display all items
- Search functionality
- Edit items (owner only)
- Delete items (owner only)
- User logout
- Protected route (requires authentication)

## Features

✅ User authentication with JWT
✅ Registration and login
✅ Add/edit/delete items
✅ Search and filter items
✅ Responsive design
✅ Error handling
✅ Form validation
✅ Token storage in localStorage
✅ Protected routes

## Components

### AddItemForm
- Collects item details including:
  - Item name
  - Description
  - Type (Lost/Found)
  - Location
  - Date
  - Contact information
- Form validation
- Axios API integration

### ItemList
- Displays items in responsive grid
- Shows item details
- Edit option for owners
- Delete option for owners
- Fetch items on mount
- Real-time updates

### SearchBar
- Real-time search filtering
- Search by name or description
- Responsive design

## API Integration

The app uses Axios for API calls with automatic token attachment:

```javascript
// auto adds Authorization header with JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Styling

- **Modern CSS**: Clean and responsive design
- **Color Scheme**: Professional purple gradient headers
- **Responsive**: Works on mobile, tablet, desktop
- **Interactive**: Hover effects and transitions
- **Status Indicators**: Color-coded Lost/Found badges

## Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder

## Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Change to your backend URL when deploying

## Deployment

1. Build application: `npm run build`
2. Deploy `build/` folder to Render or Vercel
3. Update API URL in `.env` for production

See [Deployment Guide](../DEPLOYMENT.md)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For issues or questions, please create an issue in the main repository.
