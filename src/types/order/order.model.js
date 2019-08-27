const mongoose = require('mongoose');
const Product = require('../product/product.model');

const itemSchema = new mongoose.Schema({
  productId: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  },
  size: {
    type: String
  }
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    student: {
      type: String,
      trim: true
    },
    items: [itemSchema],
    orderTotal: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
);

const Item = mongoose.model('item', itemSchema);
const Order = mongoose.model('order', orderSchema);

module.exports = Order;
