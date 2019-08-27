const Order = require('./order.model');
const Product = require('../product/product.model');

const order = async (_, { id }) => {
  return Order.findById(id)
    .lean()
    .exec();
};

const orders = async () => {
  return Order.find({})
    .lean()
    .exec();
};

const newOrder = async (_, args) => {
  const { firstName, lastName, email, phone, student, items } = args.input;

  const customer = `${firstName} ${lastName}`;
  const filterItems = items.map(({ productId, quantity, size }) => {
    return {
      productId,
      quantity,
      size
    };
  });

  const orderTotal = await Promise.resolve(
    items.reduce(async (acc, curr) => {
      const current = await acc;
      const product = await Product.findById(curr.productId);
      const itemTotal = curr.quantity * product.price;
      return itemTotal + current;
    }, 0)
  ).then(value => {
    return value;
  });

  const order = await Order.create({
    customer,
    email,
    phone,
    student,
    items: filterItems,
    orderTotal
  });

  return order;
};

const updateOrder = (_, args) => {
  const update = args.input;
  return Order.findOneAndUpdate(args.id, update, { new: true })
    .lean()
    .exec();
};

const removeOrder = (_, args) => {
  return Order.findByIdAndRemove(args.id)
    .lean()
    .exec();
};

module.exports = {
  Query: {
    order,
    orders
  },
  Mutation: {
    newOrder,
    updateOrder,
    removeOrder
  },
  Order: {
    id(order) {
      return `${order._id}`;
    }
  }
};
