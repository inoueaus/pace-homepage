import app from "../app";
import request from "supertest";
import sql from "../db";

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
        expect(response.body.token);
      });
  });

  afterAll(() => sql.end());
});
