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
   MONGODB CONNECTION
   (SERVERLESS SAFE)
======================= */
const connectDB = async () => {
  try {
    // already connected
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    throw error;
  }
};

// 🔥 ensure DB before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

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
  res.status(200).json({
    status: 'OK',
    message: 'API is running',
  });
});

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
});

/* =======================
   LOCAL SERVER ONLY
======================= */
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

/* =======================
   EXPORT FOR VERCEL
======================= */
export default app;
