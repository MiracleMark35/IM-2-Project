import React from 'react';
import './nav.css'; // Make sure to create this CSS file

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    Mc. <span className="highlight">IE</span>
                </div>
                <div className="navbar-links">
                    <a href="/">Home</a>
                    <a href="/rentals">Rentals</a>
                    <a href="/contact">Contacts</a>
                </div>
                <div className="login-button">
                    <a href="/login">Login</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
