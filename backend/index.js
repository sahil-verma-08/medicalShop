import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   ROUTES
======================= */
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payments', paymentRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API running' });
});

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

/* =======================
   DB CONNECTION
======================= */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB error:', err.message);
  }
};

connectDB();

/* =======================
   🚀 LOCAL vs VERCEL LOGIC
======================= */
const PORT = process.env.PORT || 5000;

// ✅ LOCAL ONLY
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

// ✅ VERCEL EXPORT
export default app;
