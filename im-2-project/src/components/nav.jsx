import React, { useState } from 'react';
import '../styles/nav.css'; 
import { Link } from 'react-router-dom';
import ProfileIcon from '../assets/Images/profile-icon.png'; // You'll provide this

const Navbar = () => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    Mc. <span className="highlight">IE</span>
                </div>
                <div className="navbar-links">
                    <Link to="/home">Home</Link>
                    <Link to="/featured">Featured</Link>
                    <Link to="/rentals">Bookings</Link>
                    <Link to="/contact">Contacts</Link>
                    <Link to="/aboutus">About us</Link>
                </div>
                <div className="profile-section">
                    <img 
                        src={ProfileIcon} 
                        alt="Profile" 
                        className="profile-icon"
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    />
                    {showProfileDropdown && (
                        <div className="profile-dropdown">
                            <div className="dropdown-header">
                                <h3>Profile</h3>
                            </div>
                            <div className="dropdown-item">
                                <Link to="/account">Account</Link>
                            </div>
                            <div className="dropdown-item">
                                <Link to="/logout">Log out</Link>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item">
                                <Link to="/available-cars">View Available Cars</Link>
                            </div>
                            <div className="dropdown-item">
                                <Link to="/bookings">View Bookings</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;