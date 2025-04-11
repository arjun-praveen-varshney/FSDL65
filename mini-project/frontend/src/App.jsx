import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import LabList from './components/labs/LabList';
import LabDetail from './components/labs/LabDetail';
import LabForm from './components/labs/LabForm';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <div className="container">
              <Sidebar />
              <main className="content">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/profile" element={
                    <PrivateRate>
                      <Profile />
                    </PrivateRate>
                  } />
                  <Route path="/labs" element={
                    <PrivateRoute>
                      <LabList />
                    </PrivateRoute>
                  } />
                  <Route path="/labs/:id" element={
                    <PrivateRoute>
                      <LabDetail />
                    </PrivateRoute>
                  } />
                  <Route path="/labs/new" element={
                    <PrivateRoute>
                      <LabForm />
                    </PrivateRoute>
                  } />
                  <Route path="/labs/edit/:id" element={
                    <PrivateRoute>
                      <LabForm />
                    </PrivateRoute>
                  } />
                </Routes>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;