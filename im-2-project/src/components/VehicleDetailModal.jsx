import { useState } from 'react';
import './VehicleDetailModal.css';
import RentalFormModal from './RentalFormModal';

export default function VehicleDetailModal({ vehicle, isOpen, onClose }) {
  const [showRentalForm, setShowRentalForm] = useState(false);

  if (!isOpen || !vehicle) return null;

  const details = vehicle.details || {
    description: `Ready for the ultimate island adventure? Our brand-new 2024 Jeep Wrangler Softtop in Silver is perfect for cruising around Honolulu in style! Feel the tropical breeze as you drop the top and take in the stunning views. Whether you're driving along the coast or heading to your favorite restaurant, this Jeep makes every journey feel like a mini-vacation. Its sleek Silver color will turn heads wherever you go, and the open-air experience is the perfect way to enjoy the Hawaiian sunshine. Book now for a fun, unforgettable ride through paradise!`,
    features: {
      safety: ['All-wheel drive', 'Backup camera'],
      connectivity: ['Android Auto', 'Apple CarPlay', 'Bluetooth', 'USB charger', 'USB input'],
      convenience: ['Keyless entry'],
      additional: ['Must be 21+ to book', 'Convertible', 'Sunroof'],
    },
    fuel: '80L',
    transmission: 'Manual',
    seats: 2,
    rating: 4,
    reviews: 440,
  };

  // Handle plus button: open rental form and close this modal
  const handlePlusClick = () => {
    setShowRentalForm(true);
    onClose();
  };

  return (
    <>
      <div className="vehicle-modal-overlay">
        <div className="vehicle-modal-popup">
          <button className="vehicle-modal-close" onClick={onClose}>×</button>
          <div className="vehicle-modal-grid">
            {/* Left: Info */}
            <div className="vehicle-modal-info">
              <h1 className="vehicle-modal-title">{vehicle.name}</h1>
              <div className="vehicle-modal-price-block">
                <span className="vehicle-modal-price">${vehicle.dailyPrice || '99.00'}/<span className="vehicle-modal-price-unit">day</span></span>
                <div className="vehicle-modal-monthly">${vehicle.price || '120,000'} <span>Monthly</span></div>
              </div>
              <div className="vehicle-modal-section">
                <div className="vehicle-modal-section-title">Description</div>
                <p className="vehicle-modal-section-desc">{details.description}</p>
              </div>
              <div className="vehicle-modal-section">
                <div className="vehicle-modal-section-title">Vehicle features</div>
                <div className="vehicle-modal-features">
                  <div>
                    <div className="vehicle-modal-feature-cat">Safety</div>
                    <ul>
                      {details.features.safety.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="vehicle-modal-feature-cat">Device connectivity</div>
                    <ul>
                      {details.features.connectivity.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="vehicle-modal-feature-cat">Convenience</div>
                    <ul>
                      {details.features.convenience.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="vehicle-modal-feature-cat">Additional features</div>
                    <ul>
                      {details.features.additional.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Image & Icons */}
            <div className="vehicle-modal-image-col">
              <div className="vehicle-modal-image-box">
                <img src={vehicle.image} alt={vehicle.name} />
              </div>
             <div className="vehicle-modal-icons">
                <span className="icon-text">
                    {/* Gas SVG */}
                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 3v1a1 1 0 0 1-1 1H5a1 1 0 0 0-1 1v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a1 1 0 0 0-1-1h-1V3" stroke="#bfc9e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="9" width="6" height="6" rx="1" fill="#bfc9e0"/></svg>
                    <span>80L</span>
                </span>
                <span className="icon-text">
                    {/* Manual SVG */}
                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#bfc9e0" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" stroke="#bfc9e0" strokeWidth="2"/></svg>
                    <span>Manual</span>
                </span>
                <span className="icon-text">
                    {/* Seats SVG */}
                    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 17a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2z" stroke="#bfc9e0" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke="#bfc9e0" strokeWidth="2"/></svg>
                    <span>2 People</span>
                </span>
                </div>

              <div className="vehicle-modal-rating">
                <span className="stars">
                  {'★'.repeat(details.rating)}
                  {'☆'.repeat(5 - details.rating)}
                </span>
                <span className="review-count">{details.reviews}+ Reviewer</span>
              </div>
              <div className="vehicle-modal-actions">
                <button className="vehicle-modal-action" title="Add to favorites">
                  {/* Heart SVG */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21s-6.5-4.35-9-7.5C1.5 10.5 2.5 7 6 7c2 0 3.5 1.5 3.5 1.5S11.5 7 13.5 7c3.5 0 4.5 3.5 3 6.5-2.5 3.15-9 7.5-9 7.5z" stroke="#bfc9e0" strokeWidth="2" fill="none"/></svg>
                </button>
                <button className="vehicle-modal-action" title="Rent this car" onClick={handlePlusClick}>
                  {/* Plus SVG */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#bfc9e0" strokeWidth="2" fill="none"/><path d="M12 8v8M8 12h8" stroke="#bfc9e0" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Rental Form Modal */}
      <RentalFormModal
        vehicle={vehicle}
        isOpen={showRentalForm}
        onClose={() => setShowRentalForm(false)}
      />
    </>
  );
}
