import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import ImageSlider from "../components/ImageSlider";


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
      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to load categories'
      );
    }
  };

  
  const fetchTopProducts = async () => {
    try {
      const response = await api.get(
        '/products?topSelling=true&limit=22'
      );
      setTopProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching top products:', error);
      setError(
        error.response?.data?.message ||
        'Failed to load top selling products'
      );
    } finally {
      setLoading(false);
    }
  };

 
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  return (
    <div>

      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">Connection Error</p>
              <p className="text-sm">{error}</p>
              <p className="text-sm mt-2">
                Make sure the backend server is running on{' '}
                <strong>http://localhost:5000</strong>
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

      
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)]"></div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Affordable Medicines,{' '}
            <span className="text-medical-blue">Trusted Care</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold text-emerald-600 mb-4">
            PMGenric9018 – Sehat sabke liye
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-base md:text-lg">
            Inspired by the Jan Aushadhi vision, bringing quality medicines to
            every home at honest and affordable prices.
          </p>

          <div className="flex justify-center gap-4 text-sm md:text-base text-gray-700 mb-10 flex-wrap">
            <span>✔ Genuine Medicines</span>
            <span>✔ Affordable Prices</span>
            <span>✔ Fast Delivery</span>
          </div>

          {/* SEARCH BOX */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 bg-blue-200 backdrop-blur-xl p-3 rounded-2xl shadow-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines (by Name, DrugCode)..."
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

      
<section className="py-10 bg-white">
  <div className="container mx-auto px-4">
    <ImageSlider />
  </div>
</section>


      
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Top Selling Products
            </h2>

            
            <Link
              to="/products?topSelling=true"
              className="px-6 py-3 bg-medical-blue text-white rounded-lg hover:bg-blue-600 transition-all font-semibold shadow-md inline-flex items-center gap-2"
            >
              View All
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : topProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl p-8">
              <p className="text-gray-600">No top selling products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
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
