# Troubleshooting Guide - No Data Showing in Frontend

## Common Issues and Solutions

### 1. Backend Not Running

**Symptoms:**
- No data showing on homepage
- Categories and products not loading
- Connection error messages

**Solution:**
```bash
# Navigate to backend folder
cd backend

# Make sure .env file exists with correct MongoDB URI
# Then start the server
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

### 2. MongoDB Not Connected

**Symptoms:**
- Backend starts but shows MongoDB connection error
- Seed script fails

**Solution:**
- Make sure MongoDB is running locally, OR
- Update `.env` file with correct MongoDB Atlas connection string:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medibazaar
  ```

### 3. Seed Script Not Run

**Symptoms:**
- Backend running but no products/categories in database

**Solution:**
```bash
cd backend
npm run seed
```

You should see:
```
MongoDB connected successfully
Cleared existing data
Created X categories
Created X products
Created admin user: admin@medibazaar.com / admin123
Database seeded successfully!
```

### 4. Frontend Not Connecting to Backend

**Symptoms:**
- Connection error banner at top of page
- Network errors in browser console

**Solution:**
1. Check backend is running on port 5000
2. Check browser console for errors (F12)
3. Verify CORS is enabled in backend (it is by default)
4. Try accessing backend directly: http://localhost:5000/api/health

### 5. Port Conflicts

**Symptoms:**
- Backend won't start
- "Port already in use" error

**Solution:**
- Change PORT in backend `.env` file
- Update frontend `vite.config.js` proxy target if needed

### 6. Check Data in Database

**Verify data exists:**
```bash
# Using MongoDB Compass or CLI
# Connect to your database
# Check collections: categories, products, users
```

### Quick Diagnostic Steps

1. **Check Backend:**
   ```bash
   cd backend
   npm run dev
   # Should see "MongoDB connected successfully" and "Server running on port 5000"
   ```

2. **Check Frontend:**
   ```bash
   cd frontend
   npm run dev
   # Should start on http://localhost:3000
   ```

3. **Test Backend API:**
   - Open browser: http://localhost:5000/api/health
   - Should see: `{"status":"OK","message":"MediBazaar API is running"}`
   - Test products: http://localhost:5000/api/products
   - Test categories: http://localhost:5000/api/categories

4. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab to see if API calls are failing

### Still Not Working?

1. **Clear browser cache and localStorage:**
   - Open DevTools (F12)
   - Application tab > Clear storage > Clear site data

2. **Check .env file:**
   - Make sure it's in `backend/` folder
   - No quotes around values
   - Correct MongoDB URI

3. **Reinstall dependencies:**
   ```bash
   # Backend
   cd backend
   rm -rf node_modules
   npm install
   
   # Frontend
   cd frontend
   rm -rf node_modules
   npm install
   ```

4. **Check MongoDB connection:**
   - Test connection string in MongoDB Compass
   - Make sure database name is correct

### Expected Behavior

When everything works:
- Homepage shows categories and products
- No error messages
- Connection test banner doesn't show (or shows success)
- Can browse products, add to cart, etc.







