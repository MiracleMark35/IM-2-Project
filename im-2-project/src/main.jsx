import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Footer from './components/Footer';
import Navbar from './components/nav';
import Login from './pages/Login';
import Home from './pages/Home';
import Featured from './pages/Featured';
import AboutUs from './pages/AboutUs';
import RentalsPage from './pages/RentalsPage';
import Register from './pages/Register';
import Bookings from './pages/Bookings';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Login page (standalone) */}
        <Route path="/" element={<Login />} />
        <Route path ='/register' element={<Register />} />
        {/* Home page (with Navbar & Footer) */}
        <Route path="/home" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
         {/* Home page (with Navbar & Footer) */}
        <Route path="/featured" element={
          <>
            <Navbar />
            <Featured />
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
          
         {/* Home page (with Navbar & Footer) */}
        <Route path="/aboutus" element={
          <>
            <Navbar />
            <AboutUs />
            <Footer />
          </>
        } />
         {/* Home page (with Navbar & Footer) */}
        <Route path="/booking" element={
          <>
            <Navbar />
            <Bookings />
            <Footer />
          </>
        } />
        
       
      </Routes>
    </BrowserRouter>
  </StrictMode>
);