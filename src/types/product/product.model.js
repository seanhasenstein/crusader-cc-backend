const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ['WOMENS', 'MENS', 'UNISEX'],
      required: true,
      trim: true
    },
    material: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    sizes: {
      type: [String],
      required: true
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    },
    isFree: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
