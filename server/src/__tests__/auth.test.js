const request = require("supertest");
const app = require("../app");

describe("Authentication API", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should return 400 when required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
        })
      );
    });

    it("should return 400 for an invalid email address", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Test User",
          email: "invalid-email",
          password: "123456",
        })
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
        })
      );
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should return 400 when email and password are missing", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
        })
      );
    });

    it("should return 401 for invalid credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "wrong@test.com",
          password: "wrongpass",
        })
        .expect("Content-Type", /json/)
        .expect(401);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
        })
      );
    });
  });
});