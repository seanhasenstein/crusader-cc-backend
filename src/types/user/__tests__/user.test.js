const mongoose = require('mongoose');
const resolvers = require('../user.resolvers');
const User = require('../user.model');

describe('User Resolvers', () => {
  test('signup mutation creates a new user from args', async () => {
    const args = {
      input: {
        firstName: 'Sean',
        lastName: 'Hasentein',
        email: 'sean@test.com',
        password: 'password'
      }
    };

    const result = await resolvers.Mutation.signup(null, args);
    const newUser = await User.findById(result.id)
      .lean()
      .exec();

    expect(newUser.firstName).toEqual(args.input.firstName);
    expect(newUser.lastName).toEqual(args.input.lastName);
    expect(newUser.email).toEqual(args.input.email);
    expect(newUser.password).not.toEqual(args.input.password);
  });
});
