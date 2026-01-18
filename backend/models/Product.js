import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [false, 'Category is required']
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  mrp: {
    type: Number,
    required: [true, 'MRP is required'],
    min: [0, 'MRP cannot be negative']
  },
  discountPercent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },

  // 🔥 ADD THIS
  topSelling: {
    type: Boolean,
    default: false
  },

  isPrescriptionRequired: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Medicine'
  },

  composition: {
    type: String,
    default: 'Please consult your doctor for detailed composition information.'
  },
  uses: {
    type: String,
    default: 'This medicine is used for various conditions. Please consult your doctor for proper diagnosis and treatment.'
  },
  howToUse: {
    type: String,
    default: 'Dosage and usage instructions should be followed as per your doctor\'s prescription. Do not self-medicate.'
  },
  sideEffects: {
    type: String,
    default: 'Side effects may vary from person to person. Consult your doctor if you experience any adverse effects.'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Auto discount calculation
productSchema.pre('save', function(next) {
  if (this.mrp > this.price && !this.discountPercent) {
    this.discountPercent = Math.round(((this.mrp - this.price) / this.mrp) * 100);
  }
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
