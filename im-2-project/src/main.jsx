import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RentalsPage from './pages/RentalsPage';
import './index.css';
import Footer from './components/Footer';
import Navbar from './components/nav';
import Login from './pages/Login';
import Home from './pages/Home';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Login page (standalone) */}
        <Route path="/" element={<Login />} />
        
        {/* Home page (with Navbar & Footer) */}
        <Route path="/home" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        
        {/* Rentals page (with Navbar & Footer) */}
        <Route path="/rentals" element={
          <>
            <Navbar />
            <RentalsPage />
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);