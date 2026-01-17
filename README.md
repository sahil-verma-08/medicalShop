# pmgeneric9018 - Medical E-Commerce Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for an online medical store, similar to a clothing e-commerce site but adapted for medicines and healthcare products.

## 🚀 Features

### User Features
- **Home Page**: Hero section with search, categories, and top products
- **Product Browsing**: Search, filter by category, price range, and prescription requirement
- **Product Details**: Complete product information with medical disclaimers
- **Shopping Cart**: Add, remove, and update quantities
- **Checkout**: Address management and payment options (COD/Online Test)
- **Order Management**: View order history and track order status
- **User Profile**: Manage account information
- **Authentication**: Secure JWT-based login and registration

### Admin Features
- **Product Management**: Create, edit, and delete products
- **Category Management**: Manage product categories
- **Order Management**: View all orders and update order status
- **Admin Dashboard**: Centralized admin panel

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "new project"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medibazaar
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development

# Cloudinary Configuration (for image uploads - optional but recommended)
# Get credentials from https://cloudinary.com/users/register/free
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Note**: Cloudinary is optional but highly recommended for image uploads. See `CLOUDINARY_SETUP.md` for setup instructions.

**Note**: Replace `MONGODB_URI` with your MongoDB connection string. For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medibazaar
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Seed the Database (Optional)

To populate the database with sample products and categories:

```bash
cd backend
npm run seed
```

This will create:
- Sample categories (Tablets, Syrups, Personal Care, etc.)
- Sample products
- Admin user: `admin@medibazaar.com` / `admin123`

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
medibazaar/
├── backend/
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── middleware/       # Auth and admin middleware
│   ├── scripts/          # Seed script
│   ├── index.js          # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React Context (Auth, Cart)
│   │   ├── utils/        # API utilities
│   │   └── App.jsx       # Main app component
│   └── package.json
│
└── README.md
```

## 🔐 Default Admin Credentials

After running the seed script:
- **Email**: `admin@medibazaar.com`
- **Password**: `admin123`

## 🎨 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- Cloudinary for image uploads and CDN
- Multer for file handling

### Frontend
- React 18
- React Router v6
- Vite (build tool)
- Tailwind CSS
- Axios for API calls
- Context API for state management

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/my` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order details (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Addresses
- `GET /api/addresses` - Get user's addresses (Protected)
- `POST /api/addresses` - Create address (Protected)
- `PUT /api/addresses/:id` - Update address (Protected)
- `DELETE /api/addresses/:id` - Delete address (Protected)

## ⚠️ Important Disclaimers

This is a **demo project** for educational purposes. The medical information and product descriptions are placeholders only.

**Always consult a doctor before using any medicine. This website does not replace professional medical advice. Do not self-medicate.**

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify the database name in the connection string

### Port Already in Use
- Change the PORT in backend `.env` file
- Update the proxy URL in `frontend/vite.config.js` if needed

### CORS Issues
- CORS is enabled in the backend for all origins (development only)
- For production, configure CORS to allow only your frontend domain

## 📦 Production Build

### Build Frontend

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`

### Production Considerations

1. Set `NODE_ENV=production` in backend `.env`
2. Use a strong `JWT_SECRET`
3. Configure CORS properly
4. Use environment variables for all sensitive data
5. Set up proper error logging
6. Use a process manager like PM2 for Node.js
7. Serve frontend build from a static file server or CDN

## 📄 License

This project is for educational/demo purposes only.

## 👨‍💻 Development

### Adding New Features

1. Backend: Add routes in `backend/routes/`, controllers in `backend/controllers/`
2. Frontend: Add pages in `frontend/src/pages/`, components in `frontend/src/components/`
3. Update API calls in `frontend/src/utils/api.js` if needed

### Code Style

- Use ES6+ features
- Follow RESTful API conventions
- Use meaningful variable and function names
- Add comments for complex logic

---



