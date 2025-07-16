import React, { useState } from 'react';
import '../styles/nav.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import ProfileIcon from '../assets/Images/profile-icon.png';

const Navbar = () => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userFullName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
        navigate('/'); 
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                  <div className="navbar-left">
                <div className="logo">
                    Mc. <span className="highlight">IE</span>
                </div>

                <div className="navbar-links">
                    <Link to="/home">Home</Link>
                    <Link to="/featured">Featured</Link>
                    <Link to="/rentals">Rentals</Link>
                    <Link to="/aboutus">About us</Link>
                    <Link to="/aboutus">Contact Us</Link>
                </div>
            </div>
                <div className="profile-section">
                    <div 
                        className="profile-button"
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    >
                        Profile
                    </div>
                    {showProfileDropdown && (
                        <div className="profile-dropdown">
                            <div className="dropdown-header">
                                <Link to="/profile">Profile</Link>
                            </div>
                            <div className="dropdown-item">
                                <Link to="/account">Account</Link>
                            </div>
                            <div className="dropdown-item" onClick={handleLogout}>
                                Logout
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item">
                                <Link to="/rentals">View Available Cars</Link>
                            </div>
                            <div className="dropdown-item">
                                <Link to="/booking">View Bookings</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
