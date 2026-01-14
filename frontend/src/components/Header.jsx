import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartItemsCount();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-medical-blue to-medical-green bg-clip-text text-transparent">
            ArogvixPharma
            </div>
            <span className="hidden sm:inline text-xs md:text-sm text-gray-600 font-medium">
              Medical Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="px-4 py-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition font-medium"
            >
              Products
            </Link>
            {user && (
              <>
                <Link
                  to="/orders"
                  className="px-4 py-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition font-medium"
                >
                  My Orders
                </Link>
                <Link
                  to="/profile"
                  className="px-4 py-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition font-medium"
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-purple-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition font-medium"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 md:p-3 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition"
              aria-label="Shopping cart"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons - Desktop */}
            {user ? (
              <button
                onClick={handleLogout}
                className="hidden md:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow-sm"
              >
                Logout
              </button>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-medical-blue border-2 border-medical-blue rounded-lg hover:bg-medical-light transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-medical-blue text-white rounded-lg hover:bg-blue-600 transition font-medium shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition font-medium"
              >
                Products
              </Link>
              {user && (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition font-medium"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:text-medical-blue hover:bg-blue-50 rounded-lg transition font-medium"
                  >
                    Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2 text-purple-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition font-medium"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <div className="flex flex-col space-y-2 px-4 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-medical-blue border-2 border-medical-blue rounded-lg hover:bg-medical-light transition font-medium text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 bg-medical-blue text-white rounded-lg hover:bg-blue-600 transition font-medium text-center shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

