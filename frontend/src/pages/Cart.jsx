import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">Add some products to get started!</p>
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-4 bg-gradient-to-r from-medical-blue to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 md:p-6 flex flex-col sm:flex-row gap-4 border border-gray-100"
            >
              <img
                src={item.product.imageUrl || 'https://via.placeholder.com/150x150?text=Medicine'}
                alt={item.product.name}
                className="w-full sm:w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-gray-900">{item.product.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-2">{item.product.brand}</p>
                  <p className="text-lg md:text-xl font-bold text-medical-blue mb-4">
                    ₹{item.product.price} <span className="text-sm text-gray-500 font-normal">each</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:border-medical-blue transition font-bold text-lg"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:border-medical-blue transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xl md:text-2xl font-bold text-gray-900">
                      ₹{((item.product.price * item.quantity)).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold hover:underline transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-semibold">₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">₹50</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between text-xl md:text-2xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-medical-blue">₹{(getCartTotal()+50).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full px-6 py-4 bg-gradient-to-r from-medical-blue to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Cart;

