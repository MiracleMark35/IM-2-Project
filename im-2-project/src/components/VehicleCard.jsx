import './VehicleCard.css';

export default function VehicleCard({ vehicle, onRentClick, onDetailClick }) {
  return (
    <div
      className="vehicle-card"
      onClick={() => onDetailClick(vehicle)}
      style={{ cursor: 'pointer' }}
    >
      <div className="vehicle-image-container">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="vehicle-card-image"
        />
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
            title="Rent this vehicle"
          >
            +
          </button>
        </div>
        <p className="vehicle-category">{vehicle.category.toUpperCase()}</p>
        <div className="vehicle-attributes">
          <p><strong>Make:</strong> {vehicle.make}</p>
          <p><strong>Year:</strong> {vehicle.year}</p>
          <p><strong>Plate:</strong> {vehicle.plate_number}</p>
          <p><strong>Transmission:</strong> {vehicle.transmission}</p>
          <p><strong>Fuel:</strong> {vehicle.fuel_type}</p>
          <p><strong>Seats:</strong> {vehicle.seats}</p>
        </div>
        <div className="vehicle-card-footer">
          <p className="vehicle-price">
            ₱{vehicle.price}
            <span className="vehicle-price-frequency"> /day</span>
          </p>
        </div>
      </div>
    </div>
  );
}
