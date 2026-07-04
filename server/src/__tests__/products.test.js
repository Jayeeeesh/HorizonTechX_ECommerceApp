const request = require("supertest");
const app = require("../app");
const Product = require("../models/product");
const User = require("../models/user");
const mongoose = require("mongoose");

describe("Products API", () => {
  let testUserId;

  beforeEach(async () => {
    // Fake user ID banao
    testUserId = new mongoose.Types.ObjectId();

    // Product seed karo
    await Product.create({
      name: "Test Sofa",
      description: "A comfortable sofa for rent",
      category: "furniture",
      monthlyRentalPrice: 1500,
      securityDeposit: 3000,
      minTenureMonths: 1,
      maxTenureMonths: 12,
      city: "Mumbai",
      isAvailableForRent: true,
      quantity: 5,
      owner: testUserId,
    });
  });

  describe("GET /api/v1/products", () => {
    it("should return a list of products", async () => {
      const response = await request(app)
        .get("/api/v1/products")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should support pagination using the limit query parameter", async () => {
      const response = await request(app)
        .get("/api/v1/products")
        .query({ limit: 3 })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should filter products by category", async () => {
      const response = await request(app)
        .get("/api/v1/products")
        .query({ category: "furniture" })
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe("GET /api/v1/products/:id", () => {
    it("should return 400 for an invalid MongoDB ObjectId", async () => {
      const response = await request(app)
        .get("/api/v1/products/invalidid123")
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it("should return 404 when the product does not exist", async () => {
      const response = await request(app)
        .get("/api/v1/products/507f191e810c19729de860ea")
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});