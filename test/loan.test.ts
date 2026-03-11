import request from "supertest";
import app from "../src/app";

describe("Loan API", () => {

  it("GET /api/v1/loans should return 200", async () => {
    const res = await request(app).get("/api/v1/loans");
    expect(res.statusCode).toBe(200);
  });

});