import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    priceAtPurchase: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  address: {
    name: String,
    phone: String,
    pincode: String,
    addressLine: String,
    city: String,
    state: String
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'ONLINE_TEST'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },
  status: {
    type: String,
    enum: ['PLACED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PLACED'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;







