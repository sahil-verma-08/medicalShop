import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { validationResult } from 'express-validator';

/* =====================================
   CREATE NEW ORDER
   POST /api/orders
   Private
===================================== */
export const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    let itemsTotal = 0;
    const orderItems = [];

    // 🔁 LOOP: calculate items total ONLY
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product || !product.isActive) {
        return res.status(404).json({
          message: `Product ${item.product} not found`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
        });
      }

      const itemTotal = product.price * item.quantity;
      itemsTotal += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price
      });
    }

    // 🚚 DELIVERY FEE (ONCE)
    let deliveryFee = 50;

    // OPTIONAL: free delivery condition
    // if (itemsTotal >= 500) deliveryFee = 0;

    // 💰 FINAL AMOUNT
    const totalAmount = itemsTotal + deliveryFee;

    // 📝 CREATE ORDER
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      itemsTotal,
      deliveryFee,
      totalAmount,
      address,
      paymentMethod,
      paymentStatus: 'PENDING',
      status: 'PLACED'
    });

    // 📉 UPDATE STOCK
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    await order.populate('items.product', 'name brand imageUrl');
    await order.populate('user', 'name email phone');

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================
   GET MY ORDERS
   GET /api/orders/my
   Private
===================================== */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name brand imageUrl')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================
   GET ORDER BY ID
   GET /api/orders/:id
   Private
===================================== */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name brand imageUrl')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================
   GET ALL ORDERS (ADMIN)
   GET /api/orders
   Private/Admin
===================================== */
export const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const orders = await Order.find(query)
      .populate('items.product', 'name brand imageUrl')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================
   UPDATE ORDER STATUS (ADMIN)
   PUT /api/orders/:id/status
   Private/Admin
===================================== */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      'PLACED',
      'PACKED',
      'SHIPPED',
      'DELIVERED',
      'CANCELLED'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('items.product', 'name brand imageUrl')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
