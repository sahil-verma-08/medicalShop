# Environment Setup Guide

## Quick Fix for JWT_SECRET Error

If you're getting the error: **"secretOrPrivateKey must have a value"**, follow these steps:

### Step 1: Create .env file in backend folder

Navigate to the `backend` folder and create a file named `.env` (not `.env.example`)

### Step 2: Add the following content to .env file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medibazaar
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
NODE_ENV=development
```

### Step 3: Important Notes:

1. **JWT_SECRET** must be at least 32 characters long for security
2. **MONGODB_URI** - Use your MongoDB connection string:
   - Local MongoDB: `mongodb://localhost:27017/medibazaar`
   - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/medibazaar`

### Step 4: Restart the backend server

After creating/updating the .env file:
```bash
cd backend
npm run dev
```

### Example .env file content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medibazaar
JWT_SECRET=medibazaar_super_secret_jwt_key_2024_production_use_strong_key_here
NODE_ENV=development
```

### Verify .env file is being read:

When you start the backend, you should see:
```
MongoDB connected successfully
Server running on port 5000
```

If you see an error about JWT_SECRET, the .env file is not being read correctly.







