import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    pincode: '',
    addressLine: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/addresses');
      setAddresses(response.data);
      if (response.data.length > 0) {
        setSelectedAddress(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/addresses', newAddress);
      setAddresses([...addresses, response.data]);
      setSelectedAddress(response.data._id);
      setShowAddressForm(false);
      setNewAddress({
        name: user?.name || '',
        phone: user?.phone || '',
        pincode: '',
        addressLine: '',
        city: '',
        state: ''
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding address');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select or add a delivery address');
      return;
    }

    const address = addresses.find((addr) => addr._id === selectedAddress);
    if (!address) {
      alert('Please select a valid address');
      return;
    }

    setLoading(true);
    try {
      // 1) Pehle order create karo
      const orderData = {
        items: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        address: {
          name: address.name,
          phone: address.phone,
          pincode: address.pincode,
          addressLine: address.addressLine,
          city: address.city,
          state: address.state
        },
        paymentMethod
      };

      const orderRes = await api.post('/orders', orderData);
      const createdOrder = orderRes.data;

      // Cart clear kar do (order DB me aa chuka hai)
     

      // 2) Agar COD hai to direct navigate
      if (paymentMethod === 'COD') {
        clearCart();
        navigate(`/orders/${createdOrder._id}`);
        return;
      }

      // 3) ONLINE_TEST => PayU payment start karo
      if (paymentMethod === 'ONLINE_TEST') {
        const payuRes = await api.post('/payments/payu/init', {
          orderId: createdOrder._id
        });
        

        if (!payuRes.data.success) {
          alert('Failed to start online payment');
          return;
        }
         
        const { action, params } = payuRes.data;

        // Dynamic form create + submit to PayU
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = action;

        Object.entries(params).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit(); // Browser PayU ke hosted page par chala jayega

        // User payment karne ke baad backend /payu/response pe jayega
        // Orders page pe wapas aana ho to user khud /orders UI se dekh sakta hai
        return;
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error placing order');
    } finally {
      setLoading(false);
    }
  };


  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Delivery Address</h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-medical-blue hover:underline"
              >
                {showAddressForm ? 'Cancel' : '+ Add New Address'}
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="mb-4 p-4 bg-gray-50 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    required
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-medical-blue"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    required
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-medical-blue"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    required
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-medical-blue"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    required
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-medical-blue"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    required
                    className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-medical-blue"
                  />
                  <div className="md:col-span-2">
                    <textarea
                      placeholder="Full Address"
                      value={newAddress.addressLine}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                      required
                      rows="3"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-medical-blue"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-medical-blue text-white rounded hover:bg-blue-600 transition"
                >
                  Save Address
                </button>
              </form>
            )}

            <div className="space-y-2">
              {addresses.map((address) => (
                <label
                  key={address._id}
                  className={`block p-4 border-2 rounded cursor-pointer ${
                    selectedAddress === address._id
                      ? 'border-medical-blue bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={address._id}
                    checked={selectedAddress === address._id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="mr-2"
                  />
                  <div>
                    <p className="font-semibold">{address.name}</p>
                    <p className="text-sm text-gray-600">{address.addressLine}</p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p className="text-sm text-gray-600">Phone: {address.phone}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center p-4 border-2 rounded cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <div>
                  <p className="font-semibold">Cash on Delivery (COD)</p>
                  <p className="text-sm text-gray-600">Pay when you receive your order</p>
                </div>
              </label>
             <p className='text-red-500 font-bold'>We will verify your order via phone call, Please provide a valid phone number.</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-2 mb-6">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  
                </div>
                
                
              ))}
            </div>
            <div className="space-y-2 mb-6">
              
                <div  className="flex justify-between text-sm">
                  <span>
                   Shipping fee
                  </span>
                  <span className='text-green-700 '>+ ₹50</span>
                  
                </div>
                
                
            
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>
                <span>₹{(getCartTotal()+50).toFixed(2)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={loading || !selectedAddress}
                className="w-full px-6 py-3 bg-medical-blue text-white rounded-lg hover:bg-blue-600 transition font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;







