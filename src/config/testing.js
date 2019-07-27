const config = {
  secrets: {
    jwt: process.env.JWT_SECRET
  },
  // dbUrl: `mongodb+srv://${process.env.TEST_DB_USERNAME}:${process.env.TEST_DB_PASSWORD}@cluster0-tzckg.mongodb.net/test?retryWrites=true&w=majority`
  dbUrl: 'mongodb://localhost:27017/lhs-cc-test'
};

module.exports = config;
