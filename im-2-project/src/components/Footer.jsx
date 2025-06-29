export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-bold text-white">MC. IE Car Rentals</span>. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="mailto:mc.ie.rentals@example.com" className="hover:text-white transition">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}