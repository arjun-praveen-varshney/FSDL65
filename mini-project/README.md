# Lab Progress Tracker - Project Setup and Documentation

## Project Setup Guide

### Prerequisites
- Node.js (v14+)
- MongoDB (v4+)
- NPM or Yarn

### Step 1: Clone and Initialize the Project

```bash
# Create project directory
mkdir lab-progress-tracker
cd lab-progress-tracker

# Initialize backend
mkdir backend
cd backend
npm init -y

# Install backend dependencies
npm install express mongoose config bcryptjs jsonwebtoken express-validator multer cors

# Install development dependencies
npm install -D nodemon concurrently

# Create frontend with React
cd ..
npx create-react-app frontend
cd frontend

# Install frontend dependencies
npm install axios react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled recharts

# Return to project root
cd ..
```

### Step 2: Configure Backend

Create the directory structure for the backend according to the structure shown in the code files. Copy the provided backend code into their respective files.

Configure `package.json` in the backend directory:

```json
{
  "name": "lab-progress-tracker-backend",
  "version": "1.0.0",
  "description": "Backend for Lab Progress Tracker",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix ../frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "config": "^3.3.9",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.3",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "concurrently": "^8.0.1",
    "nodemon": "^2.0.22"
  }
}
```

### Step 3: Configure Frontend

Create a proxy in the frontend `package.json` to connect to the backend:

```json
{
  "name": "lab-progress-tracker-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.12.0",
    "axios": "^1.3.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0",
    "react-scripts": "5.0.1",
    "recharts": "^2.5.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:5000"
}
```

### Step 4: Running the Application

From the project root directory, run:

```bash
# Start the backend server
cd backend
npm run server

# In a new terminal, start the frontend
cd frontend
npm start
```

Alternatively, you can run both concurrently from the backend directory:

```bash
npm run dev
```

## Database Configuration

1. Make sure MongoDB is running on your local machine
2. Update the MongoDB connection string in `backend/config/default.json` if needed
3. The application will automatically create the required collections

## Testing the API

You can test the API endpoints using tools like Postman or Insomnia. Here's a basic workflow:

1. Register a user (POST /api/auth/register)
2. Login to get a JWT token (POST /api/auth/login)
3. Use the token in the Authorization header for subsequent requests

## Deployment Instructions

### Backend Deployment (Heroku)

1. Create a Heroku account and install the Heroku CLI
2. Initialize a Git repository in the backend directory
3. Create a Procfile with `web: node server.js`
4. Add environment variables in Heroku for MongoDB URI and JWT secret
5. Deploy using Heroku CLI:

```bash
heroku login
heroku create lab-progress-tracker-api
git add .
git commit -m "Initial deployment"
git push heroku master
```

### Frontend Deployment (Vercel)

1. Create a production build of the React app:

```bash
cd frontend
npm run build
```

2. Install Vercel CLI:

```bash
npm install -g vercel
```

3. Deploy to Vercel:

```bash
vercel login
vercel
```

4. Configure environment variables in the Vercel dashboard to point to your deployed API

## Security Considerations

1. **JWT Security**: The application uses JWT for authentication. Make sure to:
   - Use a strong, unique JWT secret
   - Set appropriate token expiration times
   - Store tokens securely on the client side (HttpOnly cookies in production)

2. **Input Validation**: The API endpoints use express-validator to validate inputs. Ensure all user inputs are properly validated.

3. **Password Security**: Passwords are hashed using bcrypt before storing in the database.

4. **File Upload Security**: The file upload utility includes:
   - File type validation
   - File size limits
   - Randomized filenames

## Adding More Features

### User Management
- Implement password reset functionality
- Add email verification for new accounts
- Create user roles and permissions management UI

### Lab Features
- Add support for lab templates
- Implement batch upload for lab resources
- Create lab scheduling calendar

### Analytics
- Generate reports on student progress
- Add data visualization for instructor insights
- Implement performance tracking metrics

## Troubleshooting Common Issues

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check MongoDB connection string
- Verify network connectivity

### Authentication Problems
- Check that the JWT secret is consistent
- Verify token expiration settings
- Ensure token is properly formatted in request headers

### File Upload Issues
- Verify upload directory permissions
- Check file size limits
- Ensure frontend form has proper enctype attribute

## Contributing to the Project

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.