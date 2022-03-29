import app from "../../src/app";
import request from "supertest";
import sql from "../../src/db";

describe("Posts Router Tests", () => {
  let cookie: string;
  let newPostId: number;

  beforeAll(() => {
    return request(app)
      .post("/users/login")
      .send({
        username: "admin",
        password: "pass",
      })
      .then(response => {
        const [tokenCookie] = response.headers["set-cookie"] as string;
        cookie = tokenCookie.split(";")[0] + ";";
        expect(response.statusCode).toBe(200);
      });
  });

  test("Get all Posts", () => {
    return request(app)
      .get("/posts")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(10);
      });
  });

  test("Get 3 Posts", () => {
    return request(app)
      .get("/posts?limit=3")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
      });
  });

  test("Get 5 Posts from second page", () => {
    return request(app)
      .get("/posts?limit=5&page=1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(5);
      });
  });

  test("Create new Post", () => {
    return request(app)
      .post("/posts/new")
      .set("Cookie", cookie)
      .send({
        title: `Jest Test ${Math.random().toString(36).slice(4, 8)}`,
        body: `${Math.random()
          .toString(36)
          .slice(4, 8)}-note, Wheres the coffee??`,
      })
      .then(response => {
        newPostId = response.body.id;
        expect(response.statusCode).toBe(201);
        expect(typeof response.body.id).toBe("number");
        expect(response.body.created).toBe(true);
      });
  });

  test("Get single Post", () =>
    request(app)
      .get(`/posts/${newPostId}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(newPostId);
      }));

  test("Send delete request without token", () =>
    request(app)
      .delete(`/posts/${newPostId}`)
      .then(response => {
        expect(response.statusCode).toBe(403);
      }));

  test("Delete last Post", () =>
    request(app)
      .delete(`/posts/${newPostId}`)
      .set("Cookie", cookie)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.deleted).toBe(true);
        expect(response.body.id).toBe(newPostId);
      }));

  afterAll(() => sql.end());
});
