export default function VehicleCard({ vehicle, onRentClick }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 shadow-lg flex flex-col text-white">
      <img 
        src={vehicle.image} 
        alt={vehicle.name} 
        className="w-full h-40 object-contain mb-4 rounded-lg" 
      />
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-xl font-bold">{vehicle.name}</h2>
          <button
            onClick={() => onRentClick(vehicle)}
            className="w-10 h-10 bg-purple-500 rounded-full text-white text-xl font-bold hover:bg-purple-600 transition-colors flex items-center justify-center ml-2"
          >
            +
          </button>
        </div>
        
        <p className="text-sm text-gray-300 capitalize">{vehicle.category}</p>
        
        <div className="mt-2 mb-3">
          <p className="text-sm text-gray-400">• weekly</p>
          {/* Uncomment if you want to show daily option */}
          {/* <p className="text-sm text-gray-400">• daily</p> */}
        </div>
        
        <div className="mt-auto">
          <p className="text-lg font-bold text-yellow-400">
            ${vehicle.price} <span className="text-white text-sm font-normal">{vehicle.frequency}</span>
          </p>
        </div>
      </div>
    </div>
  );
}