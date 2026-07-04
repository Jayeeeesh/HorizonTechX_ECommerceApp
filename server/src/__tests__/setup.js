const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri(), {
    dbName: "jest-test-db",
  });
});

afterEach(async () => {
  // Clear all collections after each test
  const collections = mongoose.connection.collections;

  for (const collection of Object.values(collections)) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Close MongoDB connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  // Stop in-memory MongoDB
  if (mongoServer) {
    await mongoServer.stop();
  }
});