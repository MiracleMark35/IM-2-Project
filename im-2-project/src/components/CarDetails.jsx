import React from 'react';
import '../styles/CarDetails.css';

const CarDetails = ({ vehicle, isOpen, onClose }) => {
  if (!isOpen || !vehicle) return null;


  return (
    <div className="car-details-overlay">
      <div className="car-details-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        
        <div className="car-details-header">
          <h2>{vehicle.name}</h2>
        </div>

        <div className="car-details-content">
          <div className="car-image-container">
            <img src={vehicle.image} alt={vehicle.name} className="car-image" />
          </div>

          <div className="car-info-section">
            <h3>Description</h3>
            <p>
              Ready for the ultimate adventure? Our brand new {vehicle.name} is perfect for cruising around in style! 
              Feel the breeze as you take in the stunning views. Whether you're driving along the coast or heading 
              to your favorite restaurant, this vehicle will make every journey feel special.
            </p>
          </div>

          <div className="car-features-section">
            <h3>Vehicle features</h3>
            <div className="features-grid">
              <div className="feature-column">
                <ul>
                  <li>Safety</li>
                  <li>All-wheel drive</li>
                  <li>Backup camera</li>
                </ul>
              </div>
              <div className="feature-column">
                <ul>
                  <li>Android Auto</li>
                  <li>Apple CarPlay</li>
                  <li>Bluetooth</li>
                </ul>
              </div>
              <div className="feature-column">
                <ul>
                  <li>USB charger</li>
                  <li>USB input</li>
                  <li>Keyless entry</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="car-pricing-section">
            <div className="pricing-info">
              <span className="daily-price">$99.00/day</span>
              <span className="monthly-price">$100,000 Monthly</span>
            </div>
            <div className="capacity-info">
              <span className="fuel-capacity">80L</span>
              <span className="rental-type">Monthly</span>
              <span className="passenger-capacity">2 People</span>
            </div>
          </div>

          <button className="rent-now-button">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;