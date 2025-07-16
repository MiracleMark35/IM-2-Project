import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/nav';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Featured from './pages/Featured';
import RentalsPage from './pages/RentalsPage';
import AboutUs from './pages/AboutUs';
import Bookings from './pages/Bookings';
import Account from './pages/Account';
import Profile from './pages/Profile';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/featured" element={<><Navbar /><Featured /><Footer /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
        <Route path="/account" element={<><Navbar /><Account /><Footer /></>} />
        <Route path="/rentals" element={<><Navbar /><RentalsPage /><Footer /></>} />
        <Route path="/aboutus" element={<><Navbar /><AboutUs /><Footer /></>} />
        <Route path="/booking" element={<><Navbar /><Bookings /><Footer /></>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
