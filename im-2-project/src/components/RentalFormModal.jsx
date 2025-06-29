export default function RentalFormModal({ vehicle, isOpen, onClose }) {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 py-8">
      <div className="bg-[#bfa47c] text-white w-full max-w-md p-6 rounded-2xl shadow-xl relative max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-2xl font-bold hover:text-red-500"
        >
          ×
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4">Rent {vehicle.name}</h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="w-full rounded px-3 py-1.5 mt-1 text-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full rounded px-3 py-1.5 mt-1 text-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-white">Phone #</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number" 
              className="w-full rounded px-3 py-1.5 mt-1 text-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
            />
          </div>

          {/* Vehicle (read-only) */}
          <div>
            <label className="block text-sm font-medium text-white">Vehicle</label>
            <input 
              type="text" 
              value={vehicle.name} 
              readOnly 
              className="w-full rounded px-3 py-1.5 mt-1 text-sm bg-gray-200 text-gray-800 cursor-not-allowed" 
            />
          </div>

          {/* Pick-up Location */}
          <div>
            <label className="block text-sm font-medium text-white">Pick-up Location</label>
            <input 
              type="text" 
              placeholder="Enter location" 
              className="w-full rounded px-3 py-1.5 mt-1 text-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" 
            />
          </div>

          {/* Date Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">Pick-up Date</label>
              <input 
                type="datetime-local" 
                className="w-full rounded px-3 py-1.5 mt-1 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Return Date</label>
              <input 
                type="datetime-local" 
                className="w-full rounded px-3 py-1.5 mt-1 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
            </div>
          </div>

          {/* File Uploads */}
          <div>
            <label className="block text-sm font-medium text-white">Attach Required Documents</label>
            <div className="flex flex-col gap-2 mt-1">
              <input 
                type="file" 
                className="w-full rounded px-3 py-1.5 bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                accept="image/*,application/pdf" 
              />
              <input 
                type="file" 
                className="w-full rounded px-3 py-1.5 bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                accept="image/*,application/pdf" 
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#3e2d1c] text-white py-2 rounded hover:bg-[#2e1f14] transition-colors text-sm font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}