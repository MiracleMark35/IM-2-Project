import './VehicleCard.css';

export default function VehicleCard({ vehicle, onRentClick, onDetailClick }) {
  return (
    <div className="vehicle-card" onClick={() => onDetailClick(vehicle)} style={{ cursor: 'pointer' }}>
      <div className="vehicle-image-container">
        <img src={vehicle.image} alt={vehicle.name} className="vehicle-card-image" />
      </div>
      <div className="vehicle-card-body">
        <div className="vehicle-card-header">
          <h2 className="vehicle-name">{vehicle.name}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRentClick(vehicle);
            }}
            className="rent-button"
          >
            +
          </button>
        </div>
        <p className="vehicle-category">{vehicle.category}</p>
        <div className="vehicle-options">
          <p>• weekly</p>
          <p>• daily</p>
        </div>
        <div className="vehicle-card-footer">
          <p className="vehicle-price">
            {vehicle.price} <span className="vehicle-price-frequency">{vehicle.frequency}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
