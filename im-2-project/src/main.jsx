// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RentalsPage from './pages/RentalsPage'; // This is where you'll define your <Routes>
import './index.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <RentalsPage />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
