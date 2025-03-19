import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
import Projects from './Projects';

export default function App() {
  const [projects] = useState([
    { id: 1, name: 'React', progress: 75 },
    { id: 2, name: 'Angular', progress: 90 },
    { id: 3, name: 'MERN', progress: 60 },
    { id: 3, name: 'MEAN', progress: 40 },
  ]);

  return (
    <Router>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">Lab Progress Tracker</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects projects={projects} />} />
      </Routes>
    </Router>
  );
}