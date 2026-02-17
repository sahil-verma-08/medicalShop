import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto border-t-4 border-medical-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* TOP GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* QUICK LINKS + HELP & CONTACT */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-medical-blue transition flex items-center gap-2"
                >
                  <span>→</span> Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-medical-blue transition flex items-center gap-2"
                >
                  <span>→</span> Products
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-medical-blue transition flex items-center gap-2"
                >
                  <span>→</span> My Account
                </Link>
              </li>
            </ul>

            {/* HELP & CONTACT */}
            <h4 className="font-semibold text-md mt-6 mb-3 text-white">
              Help & Contact
            </h4>

            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                📞
                <a
                  href="tel:+919876543210"
                  className="hover:text-medical-blue transition"
                >
                  +91 8218177670
                </a>
              </li>

              <li className="flex items-center gap-2">
                📧
                <a
                  href="mailto:support@medibazaar.com"
                  className="hover:text-medical-blue transition"
                >
                  arogvixpharma@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>💊 Tablets</li>
              <li>🥤 Syrups</li>
              <li>🧴 Personal Care</li>
              <li>💪 Health Supplements</li>
              <li>👶 Baby Care</li>
              <li>📱 Devices</li>
            </ul>
          </div>

        </div>

       
       

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2026 PMGenric9018. All rights reserved.</p>
            <p className="text-xs">Made for healthcare</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
