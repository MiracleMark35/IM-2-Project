import React, { useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard';
import RentalFormModal from '../components/RentalFormModal';
import FilterDropdownButton from '../components/FilterDropdownButton';
import VehicleDetailModal from '../components/VehicleDetailModal';
import backgroundImage from '../assets/Images/bg_rental.png';
import '../styles/RentalsPage.css';
import { API_BASE_URL } from '../api/apiConfig'; // ✅ Ensure API_BASE_URL is imported

export default function RentalsPage() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [filters, setFilters] = useState({
    sortBy: 'Relevance',
    transmission: '',
    eco: '',
    seats: ''
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [detailModalVehicle, setDetailModalVehicle] = useState(null);

 useEffect(() => {
  const fetchCars = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cars/available.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location: 'main_branch' }) // adjust if needed
      });

      const result = await response.json();

      if (result.status === 'success') {
        setVehicles(result.cars);
        localStorage.setItem('availableCars', JSON.stringify(result.cars)); // optional cache
      } else {
        console.error('Fetch failed:', result.message);
      }
    } catch (err) {
      console.error('Error fetching cars:', err);
    }
  };

  fetchCars();
}, []);
 const filtered = vehicles
  .filter(v => selectedCategory === 'ALL' || v.type === selectedCategory.toLowerCase())
  .filter(v =>
    (!filters.transmission || v.transmission.toLowerCase() === filters.transmission.toLowerCase()) &&
    (!filters.eco || v.fuel_type.toLowerCase() === filters.eco.toLowerCase()) &&
    (!filters.seats || (
      filters.seats === '8 or more'
        ? v.seats >= 8
        : v.seats === parseInt(filters.seats)
    ))
  )
  .sort((a, b) => {
    if (filters.sortBy === 'price: low to high') return a.price - b.price;
    if (filters.sortBy === 'high to low') return b.price - a.price;
    return 0; // Default to Relevance (no sorting)
  });

  return (
    <div className="rentals-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="rentals-container">
        <div className="filter-container">
          <label>Select category</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {['ALL', ...[...new Set(vehicles.map(v => v.type))].map(t => t.toUpperCase())].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <FilterDropdownButton filters={filters} setFilters={setFilters} />
        </div>

  <div className="slider-wrapper">
  {filtered.map(vehicle => (
    <VehicleCard
      key={vehicle.id}
      vehicle={{
        id: vehicle.id,
        name: vehicle.name,
        make: vehicle.make,
        year: vehicle.year,
        plate_number: vehicle.plate_number,
        category: vehicle.type,
        price: `₱${vehicle.price}`,
         transmission: vehicle.transmission,   // ✅ add this
    fuel_type: vehicle.fuel_type,         // ✅ add this
    seats: vehicle.seats,      
        frequency: 'Per day',
       image: `http://localhost/car-rental-api/uploads/cars/${vehicle.image_path}`


// FULL image URL
      }}
      onRentClick={setSelectedVehicle}
      onDetailClick={setDetailModalVehicle}
    />
  ))}
</div>
      </div>

      <RentalFormModal
        vehicle={selectedVehicle}
        isOpen={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        selectedDateRange={`${localStorage.getItem('fromDate')} - ${localStorage.getItem('toDate')}`}
      />

      <VehicleDetailModal
        vehicle={detailModalVehicle}
        isOpen={!!detailModalVehicle}
        onClose={() => setDetailModalVehicle(null)}
      />
    </div>
  );
}
