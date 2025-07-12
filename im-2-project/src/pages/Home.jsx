import React from 'react';
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="overlay">
          <h1 className="hero-text">
            Your trusted partner for travel, business, and special events.
          </h1>

          <div className="search-box">
            <input type="text" placeholder="WHERE" className="search-input" />
            <input type="text" placeholder="From" defaultValue="06/24/2021 - 01:30PM" className="search-date" />
            <input type="text" placeholder="Until" defaultValue="06/30/2021 - 12:34PM" className="search-date" />
            <button className="go-button">Go</button>
          </div>

          <div className="buttons">
            <button className="action-btn">View Available Cars</button>
            <button className="action-btn">Check Application Status</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
