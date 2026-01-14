import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300x300?text=Medicine'}
          alt={product.name}
          className="w-full h-40 sm:h-44 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {product.discountPercent > 0 && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
            {product.discountPercent}% OFF
          </div>
        )}

        {product.isPrescriptionRequired && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
            Rx Required
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow text-xs sm:text-sm">
        {/* Name */}
        <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 line-clamp-2 text-gray-900 group-hover:text-medical-blue transition">
          {product.name}
        </h3>

        {/* Brand */}
        {product.brand && (
          <p className="text-gray-600 text-[11px] sm:text-sm mb-0.5">
            {product.brand}
          </p>
        )}

        {/* Category */}
        {product.category && (
          <p className="text-[10px] sm:text-xs text-gray-400 mb-2">
            {product.category.name}
          </p>
        )}

        {/* PRICE */}
        <div className="flex flex-wrap items-baseline gap-1.5 mb-3">
          <span className="text-base sm:text-xl md:text-2xl font-bold text-medical-blue">
            ₹{product.price}
          </span>

          {product.mrp > product.price && (
            <>
              <span className="text-[11px] sm:text-sm text-gray-400 line-through">
                ₹{product.mrp}
              </span>
              <span className="text-[10px] sm:text-xs text-green-600 font-semibold">
                Save ₹{product.mrp - product.price}
              </span>
            </>
          )}
        </div>

        {/* STOCK + BUTTON */}
        <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span
            className={`inline-block text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium text-center ${
              product.stock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-medical-blue to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
