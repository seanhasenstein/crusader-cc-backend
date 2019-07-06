const config = {
  secrets: {
    jwt: process.env.JWT_SECRET
  },
  dbUrl: `mongodb+srv://${process.env.DEV_DB_USERNAME}:${process.env.DEV_DB_PASSWORD}@cluster0-l6qfl.mongodb.net/test?retryWrites=true&w=majority`
};

module.exports = config;
