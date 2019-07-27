const mongoose = require('mongoose');
const resolvers = require('../product.resolvers');
const Product = require('../product.model');

describe.skip('Product Resolvers', () => {
  test('Product query gets one by id in args', async () => {
    const id = mongoose.Types.ObjectId();
    const product = await Product.create({
      id,
      productId: 'abc123',
      name: 'Short Sleeve Dri-Fit',
      brand: 'Sport-Tek',
      color: 'Gold',
      category: 't-shirt',
      gender: 'UNISEX',
      material: 'Dri-Fit',
      price: 1200,
      sizes: ['s', 'm', 'l', 'xl'],
      imageUrl: 'dri-fit-t-shirt.jpg',
      isFree: true
    });

    const result = await resolvers.Query.product(null, { id: product._id });

    expect(`${result._id}`).toBe(`${product._id}`);
    expect(result.productId).toBe(product.productId);
    expect(result.isFree).toBe(product.isFree);
  });

  test('Products query gets all products', async () => {
    const products = await Product.create([
      {
        id: mongoose.Types.ObjectId,
        productId: 'abc123',
        name: 'Short Sleeve Dri-Fit',
        brand: 'Sport-Tek',
        color: 'Gold',
        category: 't-shirt',
        gender: 'UNISEX',
        material: 'Dri-Fit',
        price: 1200,
        sizes: ['s', 'm', 'l', 'xl'],
        imageUrl: 'dri-fit-t-shirt.jpg',
        isFree: true
      },
      {
        id: mongoose.Types.ObjectId,
        productId: 'def456',
        name: 'Dri-Fit Hoodie',
        brand: 'Sport-Tek',
        color: 'Gold',
        category: 'hooded sweatshirt',
        gender: 'WOMENS',
        material: 'Dri-Fit',
        price: 3000,
        sizes: ['xs', 's', 'm', 'l', 'xl'],
        imageUrl: 'dri-fit-hoodie.jpg',
        isFree: false
      }
    ]);

    const result = await resolvers.Query.products();

    expect(result).toHaveLength(2);
  });

  test('NewProduct creates a new product from args', async () => {
    const args = {
      input: {
        productId: 'abc123',
        name: 'Short Sleeve Dri-Fit',
        brand: 'Sport-Tek',
        color: 'Gold',
        category: 't-shirt',
        gender: 'UNISEX',
        material: 'Dri-Fit',
        price: 1200,
        sizes: ['s', 'm', 'l', 'xl'],
        imageUrl: 'dri-fit-t-shirt.jpg',
        isFree: true
      }
    };

    const result = await resolvers.Mutation.newProduct(null, args);
    const newProduct = await Product.findById(result.id)
      .lean()
      .exec();
    Object.keys(args.input).forEach(field => {
      expect(newProduct[field]).toEqual(args.input[field]);
    });
  });

  test('UpdateProduct updates existing product from args', async () => {
    const product = await Product.create({
      productId: 'abc123',
      name: 'Short Sleeve Dri-Fit',
      brand: 'Sport-Tek',
      color: 'Gold',
      category: 't-shirt',
      gender: 'UNISEX',
      material: 'Dri-Fit',
      price: 1200,
      sizes: ['s', 'm', 'l', 'xl'],
      imageUrl: 'dri-fit-t-shirt.jpg',
      isFree: true
    });

    const args = {
      id: product._id,
      input: { price: 1000 }
    };

    const result = await resolvers.Mutation.updateProduct(null, args);

    expect(`${result._id}`).toBe(`${product._id}`);
    expect(result.price).toBe(1000);
  });

  test('RemoveProduct removes existing product from args', async () => {
    const product = await Product.create({
      productId: 'abc123',
      name: 'Short Sleeve Dri-Fit',
      brand: 'Sport-Tek',
      color: 'Gold',
      category: 't-shirt',
      gender: 'UNISEX',
      material: 'Dri-Fit',
      price: 1200,
      sizes: ['s', 'm', 'l', 'xl'],
      imageUrl: 'dri-fit-t-shirt.jpg',
      isFree: true
    });

    const args = {
      id: product._id
    };

    const result = await resolvers.Mutation.removeProduct(null, args);
    const products = await resolvers.Query.products();

    expect(`${result._id}`).toBe(`${product._id}`);
    expect(products).toHaveLength(0);
  });
});
