import React, { useState, useEffect, useRef } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import '../styles/Home.css';
import img1 from '../assets/Images/stranger-things.jpg';
import img2 from '../assets/Images/sss.png';
import car from '../assets/Images/car.png';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../api/apiConfig';

const slides = [
  {
    image: img1,
    text: "Your trusted partner for travel, business, and special events.",
    subtext: "Experience luxury like never before"
  },
  {
    image: img2,
    text: "Take a look at how our vehicles have been featured in movies, TV shoots, and exclusive projects.",
    subtext: "Hollywood-grade luxury fleet"
  }
];


const Home = () => {
  

  const navigate = useNavigate(); // ✅ Place this FIRST

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (!id) {
      navigate('/');
    }
  }, []);

  
  const [current, setCurrent] = useState(0);
  const [location, setLocation] = useState('main_branch');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const secondSectionRef = useRef(null);

  const handleSearch = async () => {
    if (!location || !fromDate || !toDate) {
      setError('Please complete all fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/cars/available.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location,
          from: fromDate,
          to: toDate
        })
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      console.log('Parsed data:', data);

      if (data.status === 'success' && data.cars && data.cars.length > 0) {
        localStorage.setItem('availableCars', JSON.stringify(data.cars));
        localStorage.setItem('fromDate', fromDate);
        localStorage.setItem('toDate', toDate);
        localStorage.setItem('location', location);
        navigate('/rentals');
      } else {
        setError(data.message || 'No available cars for the selected dates');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch available cars');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const now = new Date();
    const week = new Date(now);
    week.setDate(now.getDate() + 7);

    const formatDate = (date) => {
      const pad = (num) => num.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    setFromDate(formatDate(now));
    setToDate(formatDate(week));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [current]);

  const scrollToSecondSection = () => {
    if (secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-bg">
      <div className="slider">
        {slides.map((slide, idx) => (
          <div
            className={`slide${idx === current ? ' active' : ''}`}
            key={idx}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay">
              <div className="slide-content">
                <h1 className="slide-title">{slide.text}</h1>
                <p className="slide-subtitle">{slide.subtext}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot${idx === current ? ' active' : ''}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <select
            className="search-input"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="main_branch">Main Branch</option>
          </select>
          <div className="date-group">
            <label className="date-label">From</label>
            <input
              className="search-date"
              type="datetime-local"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <div className="date-group">
            <label className="date-label">Until</label>
            <input
              className="search-date"
              type="datetime-local"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              min={fromDate}
            />
          </div>
          <button 
            className="go-btn" 
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Go'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="action-buttons">
          <button className="action-btn">View Available Cars</button>
          <button className="action-btn">Check Application Status</button>
        </div>
      </div>

      <button className="scroll-down-btn" onClick={scrollToSecondSection} aria-label="Scroll down">
        <FaArrowDown />
      </button>

      <section className="second-section" ref={secondSectionRef}>
        <div className="second-section-content">
          <div className="car-section-layout">
            <div className="car-text-content">
              <h2 className="second-section-title">Safer, Faster And Comfortable</h2>
              <p className="second-section-subtitle">Get in touch with our luxury cars</p>
            </div>
            <div className="car-display">
              <div className="radial-background"></div>
              <img 
                src={car} 
                alt="Luxury Sports Car" 
                className="car-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="floating-button-container">
        <div className="floating-button">
          <div className="floating-button-content">
            <h3>Book Your Dream Car Now!</h3>
            <p>
              Rent a car online now from one of our worldwide locations. 
              With over 2,000 representative luxury and sports car automobiles, 
              all we need is your ID and you can book any car.
            </p>
          </div>
          <button className="floating-cta-btn">Check Out Our Cars</button>
        </div>
      </div>

      <section className="third-section">
        <div className="third-section-content">
          <div className="services-layout">
            <div className="car-services-display">
              <div className="services-bg-circle-dark"></div>
              <div className="services-bg-circle-gold"></div>
              <img 
                src={car} 
                alt="Luxury Convertible Car" 
                className="services-car-image"
              />
            </div>
            
            <div className="services-content">
              <h2 className="services-title">Our Services</h2>
              <div className="services-list">
                <div className="service-item">
                  <div className="service-bullet"></div>
                  <div className="service-text">
                    <h3>Car Hire</h3>
                    <p>We pride ourselves in always going the extra mile for our customers.</p>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-bullet"></div>
                  <div className="service-text">
                    <h3>Car Sales</h3>
                    <p>We sell the best luxury cars across the world at a competitive price.</p>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-bullet"></div>
                  <div className="service-text">
                    <h3>Hire a Driver</h3>
                    <p>You want to travel and feel comfortable? Our drivers are available.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
