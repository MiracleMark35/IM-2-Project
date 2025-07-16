import './footer.css';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">MC. IE Car Rentals</h2>
          <p className="footer-tagline">Experience rides like never before.</p>
          <button className="footer-button">Subscribe Newsletter</button>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/featured">Featured</a></li>
            <li><a href="/rentals">Rentals</a></li>
            <li><a href="/aboutus">About Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p>Email: <a href="mailto:info@mcierentals.com">info@mcierentals.com</a></p>
          <p>Phone: <a href="tel:+123456789">+1 234 567 89</a></p>
          <p>Address: Cebu City, Philippines</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-socials">
            <a href="#"><FaFacebook size={20} /></a>
            <a href="#"><FaInstagram size={20} /></a>
            <a href="#"><FaTwitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} <strong>MC. IE Car Rentals</strong>. All rights reserved.
        <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  );
}
