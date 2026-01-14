# Image Upload Guide for Admin

## Setup Instructions

### 1. Install Dependencies

First, install the multer package in the backend:

```bash
cd backend
npm install
```

This will install `multer` which is needed for file uploads.

### 2. Create Uploads Directory

The uploads directory should be created automatically, but if it doesn't exist:

```bash
cd backend
mkdir uploads
```

### 3. Restart Backend Server

After installing dependencies, restart your backend server:

```bash
npm run dev
```

## How to Upload Images

### Option 1: Upload Image File (Recommended)

1. Go to Admin Dashboard → Products
2. Click "+ Add Product" or "Edit" on an existing product
3. In the "Product Image" section:
   - Click on the "📷 Upload Image" area
   - Select an image file from your computer (JPG, PNG, GIF, or WebP)
   - Maximum file size: 5MB
   - The image will be uploaded to the server automatically

### Option 2: Use Image URL

1. In the same form, below the upload area
2. Paste an image URL in the "Enter Image URL" field
3. The image will be used directly from that URL

## Features

- ✅ Image preview before saving
- ✅ Support for JPG, PNG, GIF, WebP formats
- ✅ 5MB file size limit
- ✅ Automatic file naming (prevents conflicts)
- ✅ Images stored in `backend/uploads/` directory
- ✅ Images accessible at `http://localhost:5000/uploads/filename`

## Image Storage

- **Location**: `backend/uploads/`
- **URL Format**: `http://localhost:5000/uploads/product-{timestamp}-{random}.{ext}`
- **Naming**: Files are automatically renamed to prevent conflicts

## Troubleshooting

### Error: "Only image files are allowed"
- Make sure you're uploading an image file (JPG, PNG, GIF, or WebP)
- Check the file extension

### Error: "File size too large"
- Maximum file size is 5MB
- Compress your image or use a smaller file

### Error: "Failed to upload image"
- Make sure the backend server is running
- Check that the `uploads` directory exists in the backend folder
- Verify you're logged in as admin

### Images not displaying
- Check that the backend server is running on port 5000
- Verify the image URL in the product data
- Check browser console for errors

## Notes

- Uploaded images are stored locally on the server
- For production, consider using cloud storage (AWS S3, Cloudinary, etc.)
- The uploads directory should be added to `.gitignore` if you don't want to commit images to git







