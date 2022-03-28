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

  afterAll(() => sql.end());
});
