import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  useEffect(() => {
    // Set default dates
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setFromDate(formatDate(now));
    setToDate(formatDate(tomorrow));
    
    // Sample location options
    setLocationOptions([
      'Current Location',
      'Downtown',
      'Shopping District',
      'Business Center',
      'City Outskirts',
      'Train Station',
      'Bus Terminal'
    ]);
  }, []);

  const formatDate = (date) => {
    const options = { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };

  const handleGoClick = () => {
    navigate('/car');
  };

   const handleGoClick2 = () => {
    navigate('/booking');
  };

  const handleLocationSelect = (e) => {
    if (e.target.value === 'Current Location') {
      setLocation('Current Location (Detected)');
    } else {
      setLocation(e.target.value);
    }
  };

  const handleFromDateChange = (e) => {
    setFromDate(formatDate(new Date(e.target.value)));
    setShowFromPicker(false);
  };

  const handleToDateChange = (e) => {
    setToDate(formatDate(new Date(e.target.value)));
    setShowToPicker(false);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="overlay">
          <h1 className="hero-text">
            Your trusted partner for travel, business, and special events.
          </h1>

          <div className="search-box">
            <div className="input-group">
              <input 
                type="text" 
                list="locations"
                placeholder="WHERE" 
                className="search-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onSelect={handleLocationSelect}
              />
              <datalist id="locations">
                {locationOptions.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
            </div>

            <div className="input-group date-input-group">
              <div 
                className="date-display"
                onClick={() => setShowFromPicker(!showFromPicker)}
              >
                {fromDate}
              </div>
              {showFromPicker && (
                <input 
                  type="datetime-local" 
                  className="date-picker"
                  onChange={handleFromDateChange}
                  onBlur={() => setShowFromPicker(false)}
                  autoFocus
                />
              )}
            </div>

            <div className="input-group date-input-group">
              <div 
                className="date-display"
                onClick={() => setShowToPicker(!showToPicker)}
              >
                {toDate}
              </div>
              {showToPicker && (
                <input 
                  type="datetime-local" 
                  className="date-picker"
                  onChange={handleToDateChange}
                  onBlur={() => setShowToPicker(false)}
                  autoFocus
                />
              )}
            </div>

            <button className="go-button" onClick={handleGoClick}>Go</button>
          </div>

          <div className="buttons">
            <button className="action-btn" >View Available Cars</button>
            <button className="action-btn" onClick={handleGoClick2} >View bookings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;