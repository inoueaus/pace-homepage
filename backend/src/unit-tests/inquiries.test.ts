import app from "../app";
import request from "supertest";
import sql from "../db";

describe("Inquiries Router Tests", () => {
  test("Get all Inquiries", () => {
    return request(app)
      .get("/inquiries")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  afterAll(() => sql.end());
});
