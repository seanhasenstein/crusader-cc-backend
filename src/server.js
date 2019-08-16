require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const merge = require('lodash.merge');
const connect = require('./db');
const config = require('./config');
const loadTypeSchema = require('./utils/schema');
const User = require('./types/user/user.model');
const product = require('./types/product/product.resolvers');
const user = require('./types/user/user.resolvers');
const order = require('./types/order/order.resolvers');
const season = require('./types/season/season.resolvers');
const student = require('./types/student/student.resolvers');

const types = ['product', 'user', 'order', 'season', 'student'];

const start = async () => {
  connect(config.dbUrl);

  const rootSchema = `
		schema {
      query: Query,
      mutation: Mutation
		}
	`;

  const schemaTypes = await Promise.all(types.map(loadTypeSchema));

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, product, user, season, order, student),
    context({ req }) {
      return { ...req };
    }
  });

  const app = express();
  var corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true // <-- required backend setting
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use((req, res, next) => {
    // checks for user in cookies and adds userId to the requests
    const { token } = req.cookies;
    if (token) {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = userId;
    }
    next();
  });
  app.use(async (req, res, next) => {
    if (!req.userId) return next();
    const user = await User.findById(req.userId).exec();
    req.user = user;
    next();
  });

  server.applyMiddleware({
    app,
    path: '/',
    cors: false // disables the apollo-server-express cors to allow the cors middleware use
  });

  app.listen({ port: 4000 }, () => {
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
  });
};

module.exports = start;
