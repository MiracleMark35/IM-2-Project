import React, { useState, useEffect, useRef } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import '../styles/Home.css';
import img1 from '../assets/Images/stranger-things.jpg';
import img2 from '../assets/Images/sss.png';
import car from '../assets/Images/car.png';

const slides = [
  {
    image: img1,
    text: "Your trusted partner for travel, business, and special events."
  },
  {
    image: img2,
    text: "Take a look at how our vehicles have been featured in movies, TV shoots, and exclusive projects."
  }
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const secondSectionRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const week = new Date(now);
    week.setDate(now.getDate() + 7);
    setFromDate(now.toISOString().slice(0, 16));
    setToDate(week.toISOString().slice(0, 16));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
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
              <div className="slide-text">{slide.text}</div>
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
          <input
            className="search-input"
            placeholder="WHERE"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <div className="date-group">
            <label className="date-label">From</label>
            <input
              className="search-date"
              type="datetime-local"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
            />
          </div>
          <div className="date-group">
            <label className="date-label">Until</label>
            <input
              className="search-date"
              type="datetime-local"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
            />
          </div>
          <button className="go-btn">Go</button>
        </div>
        <div className="action-buttons">
          <button className="action-btn">View Available Cars</button>
          <button className="action-btn">Check Application Status</button>
        </div>
      </div>

      <button
        className="scroll-down-btn"
        onClick={scrollToSecondSection}
        aria-label="Scroll down"
      >
        <FaArrowDown />
      </button>

      {/* Second Section - Car Display with Side-by-Side Layout */}
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
              <div className="car-slider-dots">
                <span className="car-dot active"></span>
                <span className="car-dot"></span>
                <span className="car-dot"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Button */}
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
          <button className="floating-cta-btn">Check Our Cars</button>
        </div>
      </div>

      {/* Third Section Placeholder */}
      <section className="third-section">
        <div className="third-section-content">
          <h2>Third Section</h2>
          <p>This is a placeholder for the third section content.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
