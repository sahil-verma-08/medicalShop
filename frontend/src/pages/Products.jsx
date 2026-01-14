import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
   
  });

  /* ---------------- FETCH CATEGORIES ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      params.append('limit', 40);
      const res = await api.get(`/products?${params.toString()}`);
      setProducts(res.data.products);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load products'
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER HANDLERS ---------------- */
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));

    const newParams = new URLSearchParams(searchParams);
    value ? newParams.set(key, value) : newParams.delete(key);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
     
    });
    setSearchParams({});
  };

  /* ======================= UI ======================= */
  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* SEARCH + FILTER BAR */}
        <div className="mb-6">
          <div className="flex items-center gap-3 max-w-3xl">
            <div className="flex items-center flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-medical-blue">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  handleFilterChange('search', e.target.value)
                }
                placeholder="Search medicines or health products..."
                className="w-full outline-none text-gray-700"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-medical-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              ⚙ Filters
            </button>
          </div>

          {/* FILTER PANEL */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-xl shadow-lg border p-5 max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-medical-blue font-semibold hover:underline"
                >
                  Clear
                </button>
              </div>

              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  handleFilterChange('category', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-medical-blue outline-none"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* HEADING */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
          All Products
        </h1>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold">No products found</p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;
