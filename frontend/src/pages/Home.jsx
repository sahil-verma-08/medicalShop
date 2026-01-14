import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchTopProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(`Failed to load categories: ${error.response?.data?.message || error.message || 'Please check if backend is running on port 5000'}`);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const response = await api.get('/products?limit=15');
      setTopProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(`Failed to load products: ${error.response?.data?.message || error.message || 'Please check if backend is running on port 5000'}`);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div>
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">Connection Error</p>
              <p className="text-sm">{error}</p>
              <p className="text-sm mt-2">
                Make sure the backend server is running on <strong>http://localhost:5000</strong>
              </p>
            </div>
            <button
              onClick={() => {
                setError('');
                fetchCategories();
                fetchTopProducts();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-16 md:py-24">
  
  {/* soft background blur */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)]"></div>

  <div className="relative container mx-auto px-4 text-center">

    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
      Affordable Medicines, <span className="text-medical-blue">Trusted Care</span>
    </h1>

    <h2 className="text-xl md:text-2xl font-semibold text-emerald-600 mb-4">
    ArogvixPharma – Sehat sabke liye
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-base md:text-lg">
      Inspired by the Jan Aushadhi vision, bringing quality medicines to every
      home at honest and affordable prices.
    </p>

    <div className="flex justify-center gap-4 text-sm md:text-base text-gray-700 mb-10 flex-wrap">
      <span>✔ Genuine Medicines</span>
      <span>✔ Affordable Prices</span>
      <span>✔ Fast Delivery</span>
    </div>

    {/* Search Box */}
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3  bg-blue-200 backdrop-blur-xl p-3 rounded-2xl shadow-xl">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search medicines or health products..."
          className="flex-1 px-5 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-medical-blue"
        />
        <button
          type="submit"
          className="px-8 py-4 bg-medical-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
        >
          🔍 Search
        </button>
      </div>
    </form>

  </div>
</section>



      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center text-gray-900">
            Shop by Category
          </h2>
          {categories.length === 0 && !error ? (
            <div className="text-center py-12 text-gray-600">
              <p>No categories found. Make sure you've run the seed script.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 md:gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category._id}`}
                  className="group bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 hover:border-medical-blue transform hover:scale-105"
                >
                  <div className="text-4xl md:text-5xl mb-3 transform group-hover:scale-110 transition-transform">
                    💊
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-800 group-hover:text-medical-blue transition">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Products Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Top Selling Products
              </h2>
              
            </div>
            <Link
              to="/products"
              className="px-6 py-3 bg-medical-blue text-white rounded-lg hover:bg-blue-600 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 inline-flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : topProducts.length === 0 && !error ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl p-8">
              <p className="text-gray-600 mb-4">No products found. Make sure you've run the seed script.</p>
              <p className="text-sm text-gray-500">Run: <code className="bg-gray-200 px-2 py-1 rounded">cd backend && npm run seed</code></p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
  {topProducts.map((product) => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>

          )}
        </div>
      </section>
     
    </div>
  );
};

export default Home;

