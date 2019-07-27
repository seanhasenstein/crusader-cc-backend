const Product = require('./product.model');

const product = (_, args) => {
  const product = Product.findById(args.id)
    .lean()
    .exec();

  return product;
};

const products = () => {
  const products = Product.find({})
    .lean()
    .exec();
  return products;
};

const newProduct = (_, args) => {
  const {
    productId,
    name,
    brand,
    color,
    category,
    gender,
    material,
    price,
    sizes,
    imageUrl,
    isFree
  } = args.input;
  const product = Product.create({
    productId,
    name,
    brand,
    color,
    category,
    gender,
    material,
    price,
    sizes,
    imageUrl,
    isFree
  });
  return product;
};

const updateProduct = async (_, args) => {
  const update = args.input;
  const product = await Product.findByIdAndUpdate(args.id, update, {
    new: true
  })
    .lean()
    .exec();
  return product;
};

const removeProduct = (_, args) => {
  return Product.findByIdAndRemove(args.id)
    .lean()
    .exec();
};

module.exports = {
  Query: {
    products,
    product
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    id(product) {
      return String(product._id);
    }
  }
};
