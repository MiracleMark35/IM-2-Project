import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api/apiConfig';
import '../styles/Bookings.css';
import { FaCar, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import BookingDetailModal from '../components/BookingDetailModal';



export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('current');
  const [viewBooking, setViewBooking] = useState(null);
  useEffect(() => {
    async function fetchBookings() {
      const userId = localStorage.getItem('id');
      if (!userId) return setError('Not logged in');

      try {
        const res = await fetch(`${API_BASE_URL}/bookings/user.php?user_id=${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load');
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchBookings();
  }, []);

 const filtered = bookings.filter(b => {
  const now = new Date();
  const end = new Date(b.end_date);
  if (activeTab === 'current') {
    return end >= now && b.booking_status.toLowerCase() !== 'cancelled';
  } else {
    return end < now || b.booking_status.toLowerCase() === 'cancelled';
  }
});

  const statusIcon = status => {
    const s = status.toLowerCase();
    if (s === 'approved' || s === 'completed') return <FaCheckCircle className={`icon ${s}`} />;
    if (s === 'rejected' || s === 'cancelled') return <FaTimesCircle className={`icon ${s}`} />;
    return <FaClock className="icon pending" />;
  };

  const cancelBooking = async id => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/cancel.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: id })
      });
      const resp = await res.json();
      if (!res.ok) throw new Error(resp.message);
      setBookings(bookings.map(b => b.id === id ? { ...b, booking_status: 'cancelled' } : b));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="spinner">Loading…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>
      <div className="tabs">
        {['current', 'past'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'current' ? 'Current & Upcoming' : 'Past Bookings'}
          </button>
        ))}
      </div>

      {!filtered.length ? (
        <div className="no-bookings-card">
          <img src="/images/no-bookings.svg" alt="No bookings" />
          <h2>No {activeTab === 'current' ? 'current' : 'past'} bookings</h2>
          <p>
            {activeTab === 'current'
              ? 'You don’t have any active bookings yet.'
              : 'Once a rental ends, it’ll show up here.'}
          </p>
          <button onClick={() => window.location.href = '/rentals'}>
            Explore Cars
          </button>
        </div>
      ) : (
        <div className="bookings-grid">
          {filtered.map(b => (
            <div key={b.id} className="booking-card">
              <div className="top-row">
                <div className="car-img">
                <img 
  src={`http://localhost/car-rental-api/uploads/cars/${b.car_image_path}`} 
  alt={b.car_name}
  
/>
               
                </div>
                <div className="car-summary">
                  <h3>{b.car_name}</h3>
                  <p>{b.car_make} • {b.car_year}</p>
                  <div className="status-line">
                    {statusIcon(b.booking_status)}
                    <span className={`status-text ${b.booking_status.toLowerCase()}`}>
                      {b.booking_status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-row">
                <div className="detail">
                  <FaCalendarAlt /><span>{new Date(b.start_date).toLocaleDateString()} – {new Date(b.end_date).toLocaleDateString()}</span>
                </div>
                <div className="detail">
                  <FaMapMarkerAlt /><span>{b.pickup_location}</span>
                </div>
                <div className="detail">
                  <FaMoneyBillWave /><span>₱{Number(b.total_price).toFixed(2)}</span>
                </div>
              </div>

              <div className="action-row">
                {activeTab === 'current' && ['pending', 'approved'].includes(b.booking_status.toLowerCase()) && (
                  <button className="cancel-btn" onClick={() => cancelBooking(b.id)}>
                    Cancel
                  </button>
                )}
                <button className="details-btn" onClick={() => setViewBooking(b)}>
  View Details
</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <BookingDetailModal
  booking={viewBooking}
  isOpen={!!viewBooking}
  onClose={() => setViewBooking(null)}
/>
    </div>
    
  );
}
