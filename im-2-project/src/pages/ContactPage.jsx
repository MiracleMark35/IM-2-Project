import React, { useState } from 'react';
import '../styles/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Your message has been sent to the moon!');
  };

  return (
    <div className="contact-container">
      {/* Header Section */}
      <div className="contact-header">
        <h1>Let's connect constellations</h1>
        <p>Let's align our constellations! Reach out and let the magic of collaboration illuminate our skies.</p>
      </div>

      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Send it to the moon
            </button>
          </form>

          <div className="testimonial">
            <p className="quote">"Two lunar months revealed Earth's fragile beauty against vast silence, transforming my view of our place in the universe."</p>
            <p className="author">- Itinei Traista</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Address</h3>
          <p>Oxford Ave. Cary, NC 275</p>

          <h3>Email</h3>
          <p>nwiger@yahoo.co</p>

          <h3>Phone</h3>
          <p>+537 547-64</p>

          <h3>Opening hours</h3>
          <p>Sun-Mon: 10am - 10pm</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;