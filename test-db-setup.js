const mongoose = require('mongoose');
const config = require('./src/config');
const cuid = require('cuid');

// Load models since we will not be instantiating our express server.
require('./src/types/product/product.model');

beforeEach(async done => {
  const db = cuid();
  /*
		Loops thru all the collections in the mongoose connection and drop them
	*/
  function clearDB() {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteOne(() => {});
    }
    return done();
  }

  /*
		If the mongoose connection is closed,
		start it up using the test url and db name
		provided by the node runtime ENV
	*/
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(config.dbUrl + db, {
        useNewUrlParser: true,
        autoIndex: true
      });
      await clearDB();
    } catch (e) {
      console.log('connection error');
      console.log(e);
      throw e;
    }
  } else {
    await clearDB();
  }
});

afterEach(async done => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});
