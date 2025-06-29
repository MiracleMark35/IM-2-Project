import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-3 fixed top-0 w-full z-50">
      <div className="w-full px-6 flex items-center justify-between">
        {/* Group logo + links together */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="text-purple-800 text-2xl font-extrabold tracking-wide">
            Mc. <span className="text-yellow-600">IE</span>
          </div>

          {/* Links (visible on md+ screens) */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-purple-700 transition">Home</Link>
            <Link to="/rentals" className="hover:text-purple-700 transition">Rentals</Link>
            <Link to="/contact" className="hover:text-purple-700 transition">Contacts</Link>
          </div>
        </div>

        {/* Login button (stays on the far right) */}
        <Link
          to="/login"
          className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}