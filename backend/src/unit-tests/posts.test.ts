import app from "../app";
import request from "supertest";
import sql from "../db";

describe("Posts Router Tests", () => {
  test("Get all Posts", () => {
    return request(app)
      .get("/posts")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  afterAll(() => sql.end());
});
