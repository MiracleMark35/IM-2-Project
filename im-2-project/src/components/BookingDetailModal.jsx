import React from 'react';
import './BookingDetailModal.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaCar, FaUserFriends, FaGasPump, FaCogs } from 'react-icons/fa';

export default function BookingDetailModal({ booking, isOpen, onClose }) {
  if (!isOpen || !booking) return null;

  return (
    <div className="modal-overlay">
      <div className="booking-detail-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="booking-header">
          <h2>{booking.car_name}</h2>
          <p className="price">₱{Number(booking.total_price).toFixed(2)} / day</p>
        </div>

        <div className="modal-body">
          <div className="left-info">
            <div className="section">
              <FaCalendarAlt /> {new Date(booking.start_date).toLocaleDateString()} – {new Date(booking.end_date).toLocaleDateString()}
            </div>
            <div className="section">
              <FaMapMarkerAlt /> Pickup: {booking.pickup_location}
            </div>
            <div className="section">
              <FaMoneyBillWave /> Total: ₱{Number(booking.total_price).toFixed(2)}
            </div>
            <div className="section">
              <strong>Status:</strong> {booking.booking_status}
            </div>
            <div className="section">
              <strong>Payment Method:</strong> {booking.payment_method || 'N/A'}
            </div>
          </div>

          <div className="right-image">
            <img
              src={`http://localhost/car-rental-api/uploads/cars/${booking.car_image_path}`}
              alt={booking.car_name}
              onError={e => { e.target.src = '/images/car-placeholder.jpg'; }}
            />
            <div className="specs">
              <div><FaGasPump /> 80L</div>
              <div><FaCogs /> {booking.transmission || 'Manual'}</div>
              <div><FaUserFriends /> {booking.seats || '2 People'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
