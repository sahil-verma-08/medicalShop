import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const Orders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrderDetails(id);
    } else {
      fetchOrders();
    }
  }, [id]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PLACED: 'bg-blue-100 text-blue-800',
      PACKED: 'bg-yellow-100 text-yellow-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">Loading orders...</div>
    );
  }

  if (id && selectedOrder) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/orders" className="text-medical-blue hover:underline mb-4 inline-block">
          ← Back to Orders
        </Link>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">Order #{selectedOrder._id.slice(-8)}</h1>
              <p className="text-gray-600">
                Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-4 py-2 rounded ${getStatusColor(selectedOrder.status)}`}>
              {selectedOrder.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Delivery Address</h3>
              <div className="text-gray-700">
                <p>{selectedOrder.address.name}</p>
                <p>{selectedOrder.address.addressLine}</p>
                <p>
                  {selectedOrder.address.city}, {selectedOrder.address.state} -{' '}
                  {selectedOrder.address.pincode}
                </p>
                <p>Phone: {selectedOrder.address.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <div className="text-gray-700">
                <p>Method: {selectedOrder.paymentMethod}</p>
                <p>Status: {selectedOrder.paymentStatus}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded">
                  <img
                    src={item.product?.imageUrl || 'https://via.placeholder.com/100x100?text=Medicine'}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product?.name}</h4>
                    <p className="text-sm text-gray-600">{item.product?.brand}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.priceAtPurchase}</p>
                    <p className="text-sm text-gray-600">
                      Total: ₹{(item.priceAtPurchase * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total Amount</span>
              <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
        <Link
          to="/products"
          className="px-6 py-3 bg-medical-blue text-white rounded-lg hover:bg-blue-600 transition inline-block"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Order #{order._id.slice(-8)}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {new Date(order.createdAt).toLocaleDateString()} at{' '}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-600">
                  {order.items.length} item(s) • ₹{order.totalAmount.toFixed(2)}
                </p>
              </div>
              <span className={`px-4 py-2 rounded ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;







