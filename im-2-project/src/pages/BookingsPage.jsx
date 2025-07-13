import React from 'react';
import '../styles/BookingsPage.css';

const BookingsPage = () => {
  // Sample booking data
  const bookings = [
    {
      id: 1,
      carName: 'Nissan GTR',
      type: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'PB 95',
      features: ['Air Conditioner', 'Premium Sound System', 'Leather Seats'],
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      status: 'Active',
      pickupDate: '2023-08-15',
      returnDate: '2023-08-20'
    },
    {
      id: 2,
      carName: 'Mercedes',
      type: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'PB 95',
      features: ['Air Conditioner', 'Panoramic Sunroof', 'Heated Seats'],
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80',
      status: 'Completed',
      pickupDate: '2023-07-10',
      returnDate: '2023-07-15'
    },
    {
      id: 3,
      carName: 'BMW M5',
      type: 'Sedan',
      transmission: 'Automatic',
      fuelType: 'PB 95',
      features: ['Air Conditioner', 'Sport Package', 'Navigation System'],
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      status: 'Upcoming',
      pickupDate: '2023-09-05',
      returnDate: '2023-09-10'
    }
  ];

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h1>Your Bookings</h1>
        <p>View all your current and past car rentals</p>
      </div>

      <div className="bookings-container">
        {bookings.map((booking) => (
          <div key={booking.id} className={`booking-card ${booking.status.toLowerCase()}`}>
            <div className="car-image-container">
              <img src={booking.image} alt={booking.carName} className="car-image" />
              <div className="status-badge">{booking.status}</div>
            </div>
            
            <div className="booking-details">
              <div className="car-header">
                <h2>{booking.carName}</h2>
                <span className="car-type">{booking.type}</span>
              </div>
              
              <div className="car-specs">
                <div className="spec-item">
                  <span className="spec-label">Transmission:</span>
                  <span className="spec-value">{booking.transmission}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fuel Type:</span>
                  <span className="spec-value">{booking.fuelType}</span>
                </div>
              </div>
              
              <div className="car-features">
                <h4>Features:</h4>
                <ul>
                  {booking.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="booking-dates">
                <div className="date-item">
                  <span className="date-label">Pickup:</span>
                  <span className="date-value">{booking.pickupDate}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Return:</span>
                  <span className="date-value">{booking.returnDate}</span>
                </div>
              </div>
              
              <button className="details-button">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;