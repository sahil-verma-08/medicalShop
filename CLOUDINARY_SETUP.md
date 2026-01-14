# Cloudinary Integration Guide

## What is Cloudinary?

Cloudinary is a cloud-based image and video management service that provides:
- ✅ Unlimited storage and bandwidth
- ✅ Automatic image optimization and resizing
- ✅ CDN (Content Delivery Network) for fast loading
- ✅ Support for large files
- ✅ Image transformations on-the-fly
- ✅ Free tier available (25GB storage, 25GB bandwidth/month)

## Setup Instructions

### Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account (or login if you already have one)
3. You'll be taken to your dashboard

### Step 2: Get Your Cloudinary Credentials

1. In your Cloudinary dashboard, you'll see your account details
2. Copy these three values:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### Step 3: Add Credentials to Backend .env

Open your `backend/.env` file and add:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

### Step 4: Install Dependencies

```bash
cd backend
npm install
```

This will install the `cloudinary` package.

### Step 5: Restart Backend Server

```bash
npm run dev
```

You should see the server start without Cloudinary warnings.

## How It Works

### Image Upload Flow

1. Admin selects an image file in the product form
2. Image is sent to backend `/api/upload/image` endpoint
3. Backend uploads image to Cloudinary
4. Cloudinary:
   - Stores the image
   - Optimizes it automatically
   - Resizes to max 800x800px
   - Returns a CDN URL
5. The CDN URL is saved to the product in database
6. Images load fast from Cloudinary's CDN worldwide

### Image Storage Structure

Images are stored in Cloudinary with this structure:
```
medibazaar/products/product-{timestamp}-{random}.{ext}
```

### Image Transformations

Cloudinary automatically:
- Resizes images to max 800x800px (maintains aspect ratio)
- Optimizes file size
- Converts to best format (WebP when supported)
- Provides responsive images

## Features

### ✅ Automatic Optimization
- Images are automatically optimized for web
- Format conversion (WebP when browser supports it)
- Quality optimization

### ✅ CDN Delivery
- Images served from Cloudinary's global CDN
- Fast loading worldwide
- Reduced server load

### ✅ Large File Support
- Supports files up to 10MB (configurable)
- Handles high-resolution images
- No storage limits on your server

### ✅ Image Transformations
You can add transformations to image URLs:
- Resize: `?w=400&h=400`
- Crop: `?c_fill,w=400,h=400`
- Quality: `?q_auto`
- Format: `?f_auto`

Example:
```
https://res.cloudinary.com/your-cloud/image/upload/w_400,h_400,c_fill,q_auto,f_auto/medibazaar/products/image.jpg
```

## Testing

1. Go to Admin Dashboard → Products
2. Click "+ Add Product"
3. Upload an image file
4. Check the browser console for the Cloudinary URL
5. The image should appear in the preview
6. Save the product
7. View the product - image should load from Cloudinary CDN

## Troubleshooting

### Error: "Cloudinary is not configured"
- Make sure you added all three Cloudinary credentials to `.env`
- Restart the backend server after adding credentials
- Check for typos in the credentials

### Error: "Invalid API credentials"
- Verify your Cloud Name, API Key, and API Secret are correct
- Make sure there are no extra spaces in `.env` file
- Re-copy credentials from Cloudinary dashboard

### Images not uploading
- Check browser console for errors
- Verify you're logged in as admin
- Check backend console for Cloudinary errors
- Ensure file size is under 10MB

### Images not displaying
- Check the image URL in product data
- Verify the URL starts with `https://res.cloudinary.com`
- Check browser console for CORS or loading errors

## Free Tier Limits

Cloudinary Free Plan includes:
- 25GB storage
- 25GB bandwidth/month
- 25,000 transformations/month

For most small to medium projects, this is sufficient.

## Production Considerations

1. **Security**: Keep your API Secret secure, never commit it to git
2. **Monitoring**: Monitor your usage in Cloudinary dashboard
3. **Backup**: Consider backing up important images
4. **Upgrade**: If you exceed free tier, upgrade to paid plan

## Alternative: Keep Local Uploads

If you prefer local storage, you can:
1. Remove Cloudinary credentials from `.env`
2. The system will show a warning but still work
3. Images will be stored locally in `backend/uploads/`

However, Cloudinary is recommended for production use.







