import app from "../app";
import request from "supertest";
import sql from "../db";

describe("Posts Router Tests", () => {
  let token: string;
  let newPostId: number;

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
      .send({
        token,
        userId: 1,
        title: `Jest Test ${Math.random().toString(36).slice(4, 8)}`,
        body: `${Math.random()
          .toString(36)
          .slice(4, 8)}-note, Wheres the coffee??`,
      })
      .then(response => {
        newPostId = response.body.id;
        expect(response.statusCode).toBe(201);
        expect(response.body.id);
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
      .send({ userId: 1 })
      .then(response => {
        expect(response.statusCode).toBe(403);
      }));

  test("Delete last Post", () =>
    request(app)
      .delete(`/posts/${newPostId}`)
      .send({ token, userId: 1 })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.deleted).toBe(true);
        expect(response.body.id).toBe(newPostId);
      }));

  afterAll(() => sql.end());
});
