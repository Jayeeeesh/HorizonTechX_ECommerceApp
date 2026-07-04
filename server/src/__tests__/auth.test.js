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

    it("should register a new user successfully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Test User",
          email: "testuser@example.com",
          password: "Test@1234",
          phone: "9876543210",
        })
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
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

    it("should login successfully with valid credentials", async () => {
      // Pehle register karo
      await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Login User",
          email: "loginuser@example.com",
          password: "Test@1234",
          phone: "9876543211",
        });

      // Phir login karo
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "loginuser@example.com",
          password: "Test@1234",
        })
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
        })
      );
    });
  });
});