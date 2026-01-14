import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">Loading product details...</div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.imageUrl || 'https://via.placeholder.com/500x500?text=Medicine'}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">by {product.brand}</p>
          {product.category && (
            <p className="text-sm text-gray-500 mb-4">Category: {product.category.name}</p>
          )}

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-medical-blue">₹{product.price}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">₹{product.mrp}</span>
                <span className="text-green-600 font-semibold">
                  {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          <div className="mb-6">
            <span
              className={`inline-block px-3 py-1 rounded ${
                product.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
            {product.isPrescriptionRequired && (
              <span className="inline-block ml-2 px-3 py-1 rounded bg-yellow-100 text-yellow-800">
                Prescription Required
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-700 mb-6">{product.description}</p>
          )}

          {/* Quantity Selector */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1));
                    setQuantity(val);
                  }}
                  min="1"
                  max={product.stock}
                  className="w-20 px-3 py-2 border rounded text-center"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full md:w-auto px-8 py-3 bg-medical-blue text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold text-lg"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Disclaimer */}
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Disclaimer:</strong> The information on this page is for general
              knowledge only. Do not self-medicate. Consult your doctor for exact dosage and
              suitability.
            </p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            <div className="py-4 border-b-2 border-medical-blue">
              <h3 className="font-semibold">Composition</h3>
            </div>
            <div className="py-4 text-gray-600">
              <h3 className="font-semibold">Uses</h3>
            </div>
            <div className="py-4 text-gray-600">
              <h3 className="font-semibold">How to Use</h3>
            </div>
            <div className="py-4 text-gray-600">
              <h3 className="font-semibold">Side Effects</h3>
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Composition</h4>
              <p className="text-gray-700">{product.composition}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Uses</h4>
              <p className="text-gray-700">{product.uses}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">How to Use</h4>
              <p className="text-gray-700">{product.howToUse}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Side Effects</h4>
              <p className="text-gray-700">{product.sideEffects}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;







