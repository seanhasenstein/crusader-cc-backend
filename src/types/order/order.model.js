const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema(
  {
    name: {
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
