import { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import RentalFormModal from '../components/RentalFormModal';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/background1.png';
import img from '../assets/car_example.png';
import Footer from '../components/Footer';

const categories = ['ALL', 'convertible', 'intermediate SUV', 'economy'];

const vehicles = [
  {
    id: 1,
    name: 'Mazda MX-5',
    category: 'convertible',
    price: '₱130,000',
    frequency: 'Monthly',
    image: img || 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Hyundai Santa Fe',
    category: 'intermediate SUV',
    price: '₱110,000',
    frequency: 'Monthly',
    image: img || 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Hyundai Elantra',
    category: 'economy',
    price: '₱120,000',
    frequency: 'Monthly',
    image: img || 'https://via.placeholder.com/150',
  },
];

export default function RentalsPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles =
    selectedCategory === 'ALL'
      ? vehicles
      : vehicles.filter((v) => v.category === selectedCategory);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-black/60 bg-blend-darken text-white px-4 sm:px-8 pt-24 pb-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="w-full md:w-52 mb-6">
          <div className="border border-gray-300 rounded-sm bg-white p-2 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select category
            </label>
            <select
              className="w-full text-black px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle Cards - Now below the filter */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onRentClick={setSelectedVehicle}
            />
          ))}
        </div>
      </div>

      {/* Rental Form Modal */}
      <RentalFormModal
        vehicle={selectedVehicle}
        isOpen={selectedVehicle !== null}
        onClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
}