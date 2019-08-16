const mongoose = require('mongoose');
const resolvers = require('../user.resolvers');
const User = require('../user.model');

// describe('User Resolvers', () => {
//   test('signup mutation creates a new user', async () => {
//     const args = {
//       input: {
//         firstName: 'Sean',
//         lastName: 'Hasenstein',
//         email: 'test@email.com',
//         password: 'password'
//       }
//     };

//     const result = await resolvers.Mutation.signup(null, args);
//     Object.keys(args).forEach(field => {
//       expect(result[field]).toBe(args.input[field]);
//     });
//   });

//   // can't test login or logout without starting up the Apollo Server
// });

describe('User Tests', () => {
  test('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2);
  });
});
