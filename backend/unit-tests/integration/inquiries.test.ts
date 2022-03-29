import app from "../../src/app"
import request from "supertest";
import sql from "../../src/db";

describe("Inquiries Router Tests", () => {
  let token: string;

  beforeAll(() => {
    return request(app)
      .post("/users/login")
      .send({
        username: "admin",
        password: "pass",
      })
      .then(response => {
        token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body.token);
      });
  });

  test("Get all Inquiries", () => {
    return request(app)
      .get("/inquiries")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  afterAll(() => sql.end());
});
