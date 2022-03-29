import app from "../../src/app";
import request from "supertest";
import sql from "../../src/db";

describe("Inquiries Router Tests", () => {
  let token: string;
  let newInquiryId: number;

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
      .set("token", token)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("Create new Inquiry", () =>
    request(app)
      .post("/inquiries/new")
      .send({
        firstName: "カール",
        lastName: "マークス",
        email: "marx@revolution.org",
        phone: "080-0102-0304",
        body: "コーヒー農家は儲からないと聞くが、搾取されていませんか？",
      })
      .then(response => {
        newInquiryId = response.body.id;
        expect(response.statusCode).toBe(201);
        expect(response.body.created).toBe(true);
        expect(response.body.id);
      }));

  test("Get 2 Inquiries", () => {
    return request(app)
      .get("/inquiries?limit=2")
      .set("token", token)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
      });
  });

  test("Get 2 Inquiries from 2nd page", () => {
    return request(app)
      .get("/inquiries?limit=2&page=1")
      .set("token", token)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
      });
  });

  test("Get one Inquiry", () =>
    request(app)
      .get(`/inquiries/${newInquiryId}`)
      .set("token", token)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(newInquiryId);
        expect(response.body.firstName);
      }));

  test("Delete inquiry", () =>
    request(app)
      .delete(`/inquiries/${newInquiryId}`)
      .set("token", token)
      .then(response => {
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.deleted).toBe(true);
        expect(response.body.id).toBe(newInquiryId);
      }));

  afterAll(() => sql.end());
});
