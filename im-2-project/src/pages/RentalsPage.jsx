import { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import RentalFormModal from '../components/RentalFormModal';
import FilterDropdownButton from '../components/FilterDropdownButton';
import VehicleDetailModal from '../components/VehicleDetailModal';
import backgroundImage from '../assets/Images/bg_rental.png';
import img from '../assets/Images/car_example.png';
import img1 from '../assets/Images/a.png';
import img2 from '../assets/Images/b.png';
import img3 from '../assets/Images/c.png';

// Import Swiper components and base styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import the CSS file for this component
import './RentalsPage.css';

const categories = ['ALL', 'convertible', 'intermediate SUV', 'economy'];


const vehicles = [
  {
    id: 1,
    name: 'Mazda MX-5',
    category: 'convertible',
    price: '₱130,000',
    frequency: 'Monthly',
    image: img1 || 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Hyundai Santa Fe',
    category: 'intermediate SUV',
    price: '₱110,000',
    frequency: 'Monthly',
    image: img2 || 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Hyundai Elantra',
    category: 'economy',
    price: '₱120,000',
    frequency: 'Monthly',
    image: img3 || 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Toyota Vios',
    category: 'economy',
    price: '₱95,000',
    frequency: 'Monthly',
    image: img1 || 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Ford Mustang',
    category: 'convertible',
    price: '₱150,000',
    frequency: 'Monthly',
    image: img3 || 'https://via.placeholder.com/150',
  },
];

export default function RentalsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [detailModalVehicle, setDetailModalVehicle] = useState(null);
  const [filters, setFilters] = useState({
    paymentStatus: "Relevance",
    transmission: "Any",
    eco: "",
  });

  const [selectedDateRange, setSelectedDateRange] = useState('06/24 - 06/30');

  const filteredVehicles =
    selectedCategory === 'ALL'
      ? vehicles
      : vehicles.filter((v) => v.category === selectedCategory);

  return (
    <div
      className="rentals-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="rentals-container">
        {/* Category Filter */}
        <div className="filter-container">
          <label className="filter-label">
            Select category
          </label>
          <div className="select-wrapper">
            <select className="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="select-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <FilterDropdownButton
            filters={filters}
            setFilters={setFilters}
            appliedCount={
              Object.values(filters).filter(
                v => v && v !== "Relevance" && v !== "Any"
              ).length
            }
          />
        </div>

        {/* Vehicle Slider Wrapper */}
        <div className="slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="vehicle-slider"
          >
            {filteredVehicles.map((vehicle) => (
              <SwiperSlide key={vehicle.id}>
                <VehicleCard
                  vehicle={vehicle}
                  onRentClick={setSelectedVehicle}
                  onDetailClick={setDetailModalVehicle}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="swiper-button-prev-custom">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          <div className="swiper-button-next-custom">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>

        <div className="date-display-box">
          SELECT CAR FOR DATE: {selectedDateRange}
        </div>
      </div>

      {/* Pass the selectedDateRange to the modal */}
      <RentalFormModal
        vehicle={selectedVehicle}
        isOpen={selectedVehicle !== null}
        onClose={() => setSelectedVehicle(null)}
        selectedDateRange={selectedDateRange}
      />

      <VehicleDetailModal
        vehicle={detailModalVehicle}
        isOpen={!!detailModalVehicle}
        onClose={() => setDetailModalVehicle(null)}
      />
    </div>

    
  );
}
