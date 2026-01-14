import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔹 Slug generate BEFORE validation
categorySchema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // space -> dash
      .replace(/[^\w-]+/g, '');    // special chars remove
  }
  next();
});

// 🔹 Agar name update ho raha hai to slug bhi update ho jaye (findByIdAndUpdate wale case me)
categorySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();

  if (update && update.name && !update.slug) {
    const slug = update.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    // direct update object modify
    update.slug = slug;
    this.setUpdate(update);
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
