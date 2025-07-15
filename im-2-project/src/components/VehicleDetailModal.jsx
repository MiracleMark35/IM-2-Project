import { useState } from 'react';
import './VehicleDetailModal.css';
import RentalFormModal from './RentalFormModal';

export default function VehicleDetailModal({ vehicle, isOpen, onClose }) {
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen || !vehicle) return null;

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
            {/* Info Column */}
            <div className="vehicle-modal-info">
              <h1 className="vehicle-modal-title">{vehicle.name}</h1>
              <div className="vehicle-details-list">
                <p><strong>Make:</strong> {vehicle.make}</p>
                <p><strong>Year:</strong> {vehicle.year}</p>
                <p><strong>Plate Number:</strong> {vehicle.plate_number}</p>
                <p><strong>Type:</strong> {vehicle.category || vehicle.type}</p>
                <p><strong>Seats:</strong> {vehicle.seats}</p>
                <p><strong>Transmission:</strong> {vehicle.transmission}</p>
                <p><strong>Fuel Type:</strong> {vehicle.fuel_type}</p>
                <p><strong>Price per day:</strong> ₱{vehicle.price}</p>
              </div>

              <div className="vehicle-modal-actions">
                <button className="vehicle-modal-action" onClick={handlePlusClick}>
                  Rent This Vehicle
                </button>
              </div>
            </div>

            <div className="vehicle-modal-image-col">
          
                <img
                 src={vehicle.image}
              />
  
          
            </div>
          </div>
        </div>
      </div>

      <RentalFormModal
        vehicle={vehicle}
        isOpen={showRentalForm}
        onClose={() => setShowRentalForm(false)}
      />
    </>
  );
}
