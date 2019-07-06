const products = () => {
  return [
    {
      name: 'Dri-Fit T-Shirt',
      price: 1200
    }
  ];
};

const newProduct = () => {
  return {
    name: 'Dri-Fit T-Shirt',
    price: 1200
  };
};

module.exports = {
  Query: {
    products
  },
  Mutation: {
    newProduct
  }
};
