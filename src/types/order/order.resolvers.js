const Order = require('./order.model');

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
  const { customer, email, phone, student, items } = args.input;

  const orderTotal = items.reduce((acc, curr) => {
    return curr.quantity * curr.price + acc;
  }, 0);

  const order = await Order.create({
    customer,
    email,
    phone,
    student,
    items,
    orderTotal,
    paymentStatus
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
  }
};
