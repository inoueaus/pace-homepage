import app from "../../src/app";
import request from "supertest";
import sql from "../../src/db";

describe("Users Router Tests", () => {
  let cookie: string;

  test("Ping users route", () => {
    return request(app)
      .get("/users")
      .then(response => {
        expect(response.statusCode).toBe(200);
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

  test("Try to login with incorrect password", () => {
    return request(app)
      .post("/users/login")
      .send({
        username: "admin",
        password: `phony-pass-${Math.random().toString(36)}`,
      })
      .then(response => {
        expect(response.statusCode).toBe(401);
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
        cookie = setCookies.split(";")[0] + ";";
        expect(setCookies.includes("token")).toBe(true);
      });
  });

  test("Try using invalid Token to access restricted content", () =>
    request(app)
      .get("/inquiries")
      .set("Cookie", "token=2-05DU1MFeAlLs+y5HyOpW4YQNIaM;")
      .then(result => {
        expect(result.statusCode).toBe(401);
      }));

  test("Logout", () =>
    request(app)
      .post("/users/logout")
      .set("Cookie", cookie)
      .then(response => {
        expect(response.statusCode).toBe(200);
      }));

  afterAll(() => sql.end());
});
