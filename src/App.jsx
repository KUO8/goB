import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SchedulePage from './pages/SchedulePage';
import TrainersPage from './pages/TrainersPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" replace />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;