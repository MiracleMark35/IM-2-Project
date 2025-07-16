import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VehicleCard from '../components/VehicleCard';
import RentalFormModal from '../components/RentalFormModal';
import FilterDropdownButton from '../components/FilterDropdownButton';
import VehicleDetailModal from '../components/VehicleDetailModal';
import VehicleTypeFilter from '../components/VehicleTypeFilter';
import backgroundImage from '../assets/Images/bg_rental.png';
import '../styles/RentalsPage.css';
import '../components/VehicleTypeFilter.css';
import { API_BASE_URL } from '../api/apiConfig';

export default function RentalsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultType = queryParams.get('type') || 'ALL';

  const [vehicles, setVehicles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(defaultType.toUpperCase());
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [detailModalVehicle, setDetailModalVehicle] = useState(null);

  const [filters, setFilters] = useState({
    sortBy: 'Relevance',
    transmission: '',
    eco: '',
    seats: '',
    type: ''
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cars/available.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location: 'main_branch' })
        });

        const result = await response.json();

        if (result.status === 'success') {
          setVehicles(result.cars);
          localStorage.setItem('availableCars', JSON.stringify(result.cars));
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
    .filter(v =>
      (selectedCategory === 'ALL' || v.type === selectedCategory.toLowerCase()) &&
      (!filters.type || v.type === filters.type)
    )
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
      return 0;
    });

  return (
    <div className="rentals-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="rentals-container">

        <div className="filter-container">
          <VehicleTypeFilter 
            selectedType={selectedCategory}
            setSelectedType={setSelectedCategory}
          />

          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {['ALL', ...[...new Set(vehicles.map(v => v.type))].map(t => t.toUpperCase())].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <FilterDropdownButton filters={filters} setFilters={setFilters} />
        </div>

        <div className="slider-wrapper">
          <div className="vehicle-grid">
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
                  transmission: vehicle.transmission,
                  fuel_type: vehicle.fuel_type,
                  seats: vehicle.seats,
                  frequency: 'Per day',
                  image: `http://localhost/car-rental-api/uploads/cars/${vehicle.image_path}`
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
    </div>
  );
}
