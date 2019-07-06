const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const me = async (_, args, ctx) => {
  // check if there is a current user ID
  if (!ctx.userId) {
    return null;
  }
  const user = await User.findById(ctx.userId);
  return user;
};

const signup = async (_, args) => {
  const lowercaseEmail = args.input.email.toLowerCase();

  // hash password
  const hashPassword = await bcrypt.hash(args.input.password, 10);

  // create user in the db
  const user = User.create({
    firstName: args.input.email,
    lastName: args.input.email,
    phone: args.input.email,
    email: lowercaseEmail,
    password: hashPassword
  });

  return user;
};

const login = async (_, args, ctx) => {
  // 1. check if there is a user with the email
  const user = await User.findOne({ email: args.input.email });
  if (!user) {
    throw new Error('No user found with that email.');
  }
  // 2. check if the password is correct
  const valid = await bcrypt.compare(args.input.password, user.password);
  if (!valid) {
    throw new Error('Invalid Password!');
  }
  // 3. generate the JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  // 4. set the cookie with the token
  ctx.res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 31
  });

  return user;
};

const logout = (_, args, ctx) => {
  ctx.res.clearCookie('token');
  return { message: 'Successfully Logged Out.' };
};

module.exports = {
  Query: {
    me
  },
  Mutation: {
    signup,
    login,
    logout
  },
  User: {
    id(user) {
      return user._id;
    }
  }
};
