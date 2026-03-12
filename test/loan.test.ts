import request from "supertest";
import app from "../src/app";

describe("Loan API Authentication & Authorization", () => {
  let officerToken: string;
  let managerToken: string;
  let adminToken: string;

  // Get tokens for all roles
  beforeAll(async () => {
    const officerRes = await request(app)
      .post("/api/v1/signin")
      .send({ email: "officer@pixell-river.com" });

    officerToken = officerRes.body.idToken;

    const managerRes = await request(app)
      .post("/api/v1/signin")
      .send({ email: "manager@pixell-river.com" });

    managerToken = managerRes.body.idToken;

    const adminRes = await request(app)
      .post("/api/v1/signin")
      .send({ email: "admin@pixell-river.com" });

    adminToken = adminRes.body.idToken;
  });

  /*
  -----------------------------
  AUTHENTICATION TESTS
  -----------------------------
  */

  it("should return 401 when no token is provided", async () => {
    const res = await request(app).get("/api/v1/loans");

    expect(res.statusCode).toBe(401);
  });

  it("should return 401 when token is invalid", async () => {
    const res = await request(app)
      .get("/api/v1/loans")
      .set("Authorization", "Bearer invalid-token");

    expect(res.statusCode).toBe(401);
  });

  /*
  -----------------------------
  OFFICER ROLE TESTS
  -----------------------------
  */

  it("officer should access GET /loans", async () => {
    const res = await request(app)
      .get("/api/v1/loans")
      .set("Authorization", `Bearer ${officerToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("officer should NOT delete loans", async () => {
    const res = await request(app)
      .delete("/api/v1/loans/1")
      .set("Authorization", `Bearer ${officerToken}`);

    expect(res.statusCode).toBe(403);
  });

  /*
  -----------------------------
  MANAGER ROLE TESTS
  -----------------------------
  */

  it("manager should create a loan", async () => {
    const res = await request(app)
      .post("/api/v1/loans")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        applicant: "Test User",
        amount: 5000
      });

    expect(res.statusCode).toBe(200);
  });

  it("manager should NOT delete loans", async () => {
    const res = await request(app)
      .delete("/api/v1/loans/1")
      .set("Authorization", `Bearer ${managerToken}`);

    expect(res.statusCode).toBe(403);
  });

  /*
  -----------------------------
  ADMIN ROLE TESTS
  -----------------------------
  */

  it("admin should delete loans", async () => {
    const res = await request(app)
      .delete("/api/v1/loans/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });

});