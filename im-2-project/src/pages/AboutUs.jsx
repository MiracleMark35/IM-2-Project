import React, { useEffect, useRef } from 'react';
import '../styles/AboutUs.css';

const AboutUsPage = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            
            <h1>
              Your Trusted Partner for 
              <span className="highlight-text"> Long-Term </span>
              Car Rentals
            </h1>
            <p>
              We specialize in affordable, long-term car rentals—not short trips. 
              Whether you need a car for a month or more, we make it easy, flexible, 
              and cost-effective. Our rates are consistently lower than traditional 
              rental companies, without hidden fees or unnecessary upsells.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                <span>Get Started</span>
                <i className="btn-icon">→</i>
              </button>
              <button className="btn-secondary">
                <span>Learn More</span>
                <i className="btn-icon">📖</i>
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="car-showcase">
              <div className="car-main">
                <div className="car-icon">🚗</div>
                <div className="car-glow"></div>
              </div>
              <div className="floating-elements">
                <div className="float-element float-1">⚡</div>
                <div className="float-element float-2">💰</div>
                <div className="float-element float-3">🔧</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Long-Term Section */}
      <section className="why-longterm-section animate-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">The Smart Choice</span>
            <h2>Why Long-Term Rentals?</h2>
            <div className="section-divider"></div>
          </div>
          <div className="longterm-content">
            <div className="longterm-text">
              <p>
                Traditional rentals charge daily rates that add up fast. Our platform is built 
                for drivers who need more time behind the wheel—remote workers, students, travelers, 
                or anyone between cars. The longer you rent, the more you save.
              </p>
              <div className="savings-highlight">
                <div className="savings-icon">💡</div>
                <div className="savings-text">
                  <strong>Pro Tip:</strong> Save up to 60% compared to daily rentals
                </div>
              </div>
            </div>
            <div className="longterm-visual">
              <div className="comparison-chart">
                <div className="chart-item traditional">
                  <div className="chart-bar"></div>
                  <span>Traditional</span>
                </div>
                <div className="chart-item longterm">
                  <div className="chart-bar"></div>
                  <span>Long-term</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section animate-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <span className="section-subtitle">Our Promise</span>
            <h2>Simple, Transparent, Flexible</h2>
            <p>No confusing terms. No surprise charges. Just honest car rentals.</p>
            <div className="section-divider"></div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚡</div>
                <div className="icon-bg"></div>
              </div>
              <h3>Book in Minutes</h3>
              <p>Quick and easy booking process with instant confirmation</p>
              <div className="feature-arrow">→</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">💳</div>
                <div className="icon-bg"></div>
              </div>
              <h3>Flat Monthly Rates</h3>
              <p>Predictable pricing with no hidden fees or surprises</p>
              <div className="feature-arrow">→</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🔄</div>
                <div className="icon-bg"></div>
              </div>
              <h3>Extend Anytime</h3>
              <p>Flexible rental periods that adapt to your changing needs</p>
              <div className="feature-arrow">→</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">✨</div>
                <div className="icon-bg"></div>
              </div>
              <h3>Return Easily</h3>
              <p>Hassle-free return process when you're ready</p>
              <div className="feature-arrow">→</div>
            </div>
          </div>
        </div>
      </section>

      {/* Drive Smarter Section */}
      <section className="drive-smarter-section animate-on-scroll">
        <div className="section-container">
          <div className="drive-smarter-content">
            <div className="drive-smarter-text">
              <h2>Drive Smarter, Not Harder</h2>
              <p>
                Skip the high prices and time limits of short-term rentals.
                <br />
                <strong>Drive longer. Pay less. Live better.</strong>
              </p>
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>No daily rate stress</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Predictable monthly costs</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>Better long-term value</span>
                </div>
              </div>
            </div>
            
            <div className="cars-showcase">
              <div className="car-carousel">
                <div className="car-item luxury">
                  <div className="car-emoji">🚙</div>
                  <span>SUV</span>
                </div>
                <div className="car-item featured">
                  <div className="car-emoji">🚗</div>
                  <span>Sedan</span>
                </div>
                <div className="car-item compact">
                  <div className="car-emoji">🚘</div>
                  <span>Compact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section animate-on-scroll">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-number">50%</div>
              <div className="stat-label">Lower rates than traditional rentals</div>
              <div className="stat-description">Average savings per month</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-number">30+</div>
              <div className="stat-label">Day minimum rental periods</div>
              <div className="stat-description">Flexible long-term options</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🕐</div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer support available</div>
              <div className="stat-description">Always here to help</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section animate-on-scroll">
        <div className="section-container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Get Started?</h2>
              <p>
                Join thousands of drivers who choose long-term rentals for 
                better rates and more flexibility. Get your car today and 
                experience the difference.
              </p>
              <div className="cta-features">
                <div className="cta-feature">
                  <span className="cta-feature-icon">🚀</span>
                  <span>Instant booking</span>
                </div>
                <div className="cta-feature">
                  <span className="cta-feature-icon">💰</span>
                  <span>Best prices guaranteed</span>
                </div>
                <div className="cta-feature">
                  <span className="cta-feature-icon">🔒</span>
                  <span>Secure & trusted</span>
                </div>
              </div>
            </div>
            <div className="cta-visual">
              <div className="cta-icon-wrapper">
                <div className="cta-icon">👋</div>
                <div className="cta-pulse"></div>
              </div>
            </div>
          </div>
          <div className="cta-buttons">
            <button className="cta-button primary">
              <span>Start Your Rental</span>
              <i className="btn-icon">🚗</i>
            </button>
            <button className="cta-button secondary">
              <span>Contact Us</span>
              <i className="btn-icon">📞</i>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
