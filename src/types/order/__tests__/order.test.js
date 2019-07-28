const mongoose = require('mongoose');
const resolvers = require('../order.resolvers');
const Order = require('../order.model');

describe('Order Resolvers', () => {
  test('order query gets the correct query from args.id', async () => {
    const order = await Order.create({
      name: 'Original Name',
      email: 'test@email.com',
      phone: '1234567890',
      student: 'Students Name',
      items: [
        {
          product: mongoose.Types.ObjectId(),
          price: 1000,
          quantity: 2,
          size: 'Small'
        }
      ],
      orderTotal: 2000
    });

    const args = {
      id: order._id
    };

    const result = await resolvers.Query.order(null, args);

    expect(`${result._id}`).toBe(`${order._id}`);
  });

  test('orders query gets all orders from the db', async () => {
    const order = await Order.create([
      {
        name: 'Original Name',
        email: 'test@email.com',
        phone: '1234567890',
        student: 'Students Name',
        items: [
          {
            product: mongoose.Types.ObjectId(),
            price: 1000,
            quantity: 2,
            size: 'Small'
          }
        ],
        orderTotal: 2000
      },
      {
        name: 'Original Name2',
        email: 'test@email.com2',
        phone: '1234567892',
        student: 'Students Name2',
        items: [
          {
            product: mongoose.Types.ObjectId(),
            price: 2000,
            quantity: 2,
            size: 'Medium'
          }
        ],
        orderTotal: 4000
      }
    ]);

    const result = await resolvers.Query.orders();

    expect(result.length).toBe(2);
  });

  test('newOrder mutation creates a new order from args', async () => {
    const args = {
      input: {
        name: 'Sean Hasenstein',
        email: 'test@email.com',
        phone: '1234567890',
        student: 'Jonah Jurss',
        items: [
          {
            product: mongoose.Types.ObjectId(),
            price: 1000,
            quantity: 2,
            size: 'Small'
          },
          {
            product: mongoose.Types.ObjectId(),
            price: 3000,
            quantity: 1,
            size: 'Medium'
          },
          {
            product: mongoose.Types.ObjectId(),
            price: 1200,
            quantity: 2,
            size: 'Large'
          }
        ]
      }
    };

    const result = await resolvers.Mutation.newOrder(null, args);

    expect(result.name).toBe(args.input.name);
  });

  test('newOrder mutation correctly calculates orderTotal', async () => {
    const args = {
      input: {
        name: 'Sean Hasenstein',
        email: 'test@email.com',
        phone: '1234567890',
        student: 'Jonah Jurss',
        items: [
          {
            product: mongoose.Types.ObjectId(),
            price: 1000,
            quantity: 2,
            size: 'Small'
          },
          {
            product: mongoose.Types.ObjectId(),
            price: 3000,
            quantity: 1,
            size: 'Medium'
          },
          {
            product: mongoose.Types.ObjectId(),
            price: 1200,
            quantity: 2,
            size: 'Large'
          }
        ]
      }
    };

    const result = await resolvers.Mutation.newOrder(null, args);

    expect(result.orderTotal).toBe(7400);
  });

  test('updateOrder mutation correctly updates an order', async () => {
    const order = await Order.create({
      name: 'Original Name',
      email: 'test@email.com',
      phone: '1234567890',
      student: 'Students Name',
      items: [
        {
          product: mongoose.Types.ObjectId(),
          price: 1000,
          quantity: 2,
          size: 'Small'
        }
      ],
      orderTotal: 2000
    });

    const args = {
      id: order._id,
      input: { name: 'New Updated Name' }
    };

    const result = await resolvers.Mutation.updateOrder(null, args);

    expect(result.name).not.toBe(order.name);
    expect(result.name).toBe(args.input.name);
  });

  test('removeOrder mutation correctly removes an order from the db', async () => {
    const order = await Order.create({
      name: 'Original Name',
      email: 'test@email.com',
      phone: '1234567890',
      student: 'Students Name',
      items: [
        {
          product: mongoose.Types.ObjectId(),
          price: 1000,
          quantity: 2,
          size: 'Small'
        }
      ],
      orderTotal: 2000
    });

    const args = {
      id: order._id
    };

    const result = await resolvers.Mutation.removeOrder(null, args);

    expect(`${result._id}`).toBe(`${order._id}`);
  });
});
