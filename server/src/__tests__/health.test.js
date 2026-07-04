const request = require("supertest");
const app = require("../app");

describe("Health Check API", () => {
  describe("GET /health", () => {
    it("should return a healthy application status", async () => {
      const response = await request(app)
        .get("/health")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          status: "UP",
          application: "RentEase API",
        }),
      );

      // Optional fields (if your API returns them)
      if (response.body.timestamp) {
        expect(response.body.timestamp).toEqual(expect.any(String));
      }

      if (response.body.uptime) {
        expect(response.body.uptime).toEqual(
          expect.objectContaining({
            seconds: expect.any(Number),
          }),
        );
      }

      if (response.body.version) {
        expect(response.body.version).toEqual(expect.any(String));
      }
    });
  });
});
