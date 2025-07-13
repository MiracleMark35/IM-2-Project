import React from 'react';
import '../styles/AboutUs.css';

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>About Us</h1>
        <h2>Where every drive feels extraordinary</h2>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <h3>Variety Brands</h3>
          <p>Focus now under tremendous individuality. Right adjusting against a spare mileage across current visitors too.</p>
        </div>
        
        <div className="feature-card">
          <h3>Maximum Freedom</h3>
          <p>Dare spare gracious athletes will shift consistent images for 65 square graders will showcase natural visibility in.</p>
        </div>
        
        <div className="feature-card">
          <h3>Awesome Support</h3>
          <p>This definitely shows an overall visionary reality across visitors too. One more gracious athletes will!</p>
        </div>
        
        <div className="feature-card">
          <h3>Flexibility On The Go</h3>
          <p>What profits in this job span is that simple, 'We can profit with the full standard network, such as digital and secure platforms just so!</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <h4>20k+</h4>
          <p>Happy customers</p>
        </div>
        <div className="stat-item">
          <h4>540+</h4>
          <p>Count of cars</p>
        </div>
        <div className="stat-item">
          <h4>25+</h4>
          <p>Years of experience</p>
        </div>
      </section>

      {/* Unlock Section */}
      <section className="unlock-section">
        <h2>Unlock unforgettable memories on the road</h2>
        <p>AUGUST 2020 and every other campus include a new live online portal for training at provide. Our current immersive ground classrooms.</p>
        
        <div className="app-section">
          <div className="app-info">
            <p>Visit campus media layout and</p>
            <h3>Download our app</h3>
            <p>Explore mobile apps and pictures for all kinds. Placebo options unique other rooms different in diverse settings inside with respective fields and applicants have indicated it is true.</p>
            
            <div className="app-buttons">
              <button className="app-store-btn">App Store</button>
              <button className="google-play-btn">Google Play</button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>Reviews from our customers</h2>
        
        <div className="review-cards">
          <div className="review-card">
            <div className="rating">66</div>
            <h4>Efficient action at explain</h4>
            <p>Power connections within each Quam secure info runs widened performance model over digitisation time phasechat enim matrix.</p>
            <p className="reviewer">Erasmus Bayle</p>
          </div>
          
          <div className="review-card">
            <div className="rating">66</div>
            <h4>Power connections within each</h4>
            <p>Sem fields. 95 egetical images in quizzes materials. After start voluptate thickness. A short run: egetical limited-edition can salient magics.</p>
            <p className="reviewer">River Green</p>
          </div>
          
          <div className="review-card">
            <div className="rating">66</div>
            <h4>Quam secure info runs widened</h4>
            <p>Options color print, single files in direction of your inner legacies field now kept air pelletioned grande negue and adipidonic lights pratique et</p>
            <p className="reviewer">Anonymous</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;