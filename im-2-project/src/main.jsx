import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import RentalsPage from './pages/RentalsPage';
import './index.css';
import Footer from './components/Footer';
import Navbar from './components/nav'; // Ensure this matches your file structure

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<RentalsPage />} /> {/* Define your routes here */}
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
