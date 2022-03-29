import app from "../../src/app";
import request from "supertest";
import sql from "../../src/db";

describe("Users Router Tests", () => {
  test("Ping users route", () => {
    return request(app)
      .get("/users")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("Login as Admin", () => {
    return request(app)
      .post("/users/login")
      .send({
        username: "admin",
        password: "pass",
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        const setCookies = response.headers["set-cookie"][0] as string;
        expect(setCookies.includes("token")).toBe(true);
      });
  });

  test("Try to login with incorrect Credentials", () => {
    return request(app)
      .post("/users/login")
      .send({
        username: "random-beef",
        password: `phony-pass-${Math.random().toString(36)}`,
      })
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });

  afterAll(() => sql.end());
});
