import React from 'react';
import '../styles/featured.css';
import classicCars from '../assets/Images/classic.jpg'; // Make sure this image exists in your project

const Featured = () => {
  return (
    <div className="featured-page">
      <h2 className="section-title">Explore Our Car Categories</h2>
      <div className="category-grid">
        <div className="category-card all-card">
          <img src={classicCars} alt="All Cars" className="all-bg" />
          <div className="all-label">ALL</div>
        </div>
        <div className="category-card">SUVs</div>
        <div className="category-card">Specialty Vehicles</div>
        <div className="category-card">SPORT</div>
      </div>
    </div>
  );
};

export default Featured;
