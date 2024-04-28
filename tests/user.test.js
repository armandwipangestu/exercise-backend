import request from "supertest";
import app from "../src/app.js";

let accessToken;
let userId;

describe("User Endpoints", () => {
    // beforeAll(async () => {
    //     const loginResponse = await request(app).post("/api/v1/login").send({
    //         email: "Trey23@hotmail.com",
    //         password: "12345",
    //     });

    //     accessToken = loginResponse.body.data.accessToken;
    // });

    // Tahap 1: Add / Create / SignUp User
    describe(`POST ${process.env.API_VERSION}/users`, () => {
        it("should create a new user", async () => {
            const res = await request(app).post("/api/v1/users").send({
                email: "test@test.com",
                password: "12345",
                name: "John Doe",
                role: "ADMIN",
            });

            expect(res.statusCode).toEqual(201);
            expect(res.body.status).toEqual("success");
            userId = res.body.data.userId;
        });
    });

    // Tahap 2: Login dengan user yang sudah dibuat
    describe(`POST ${process.env.API_VERSION}/login`, () => {
        it("should login and receive accessToken", async () => {
            const res = await request(app).post("/api/v1/login").send({
                email: "test@test.com",
                password: "12345",
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("success");
            accessToken = res.body.data.accessToken;
        });
    });

    // Tahap 3: Refresh Token
    describe(`GET ${process.env.API_VERSION}/token`, () => {
        it("should refresh token", async () => {
            const res = await request(app)
                .get("/api/v1/token")
                .set("Authorization", `Bearer ${accessToken}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.status).toEqual("success");
            accessToken = res.body.data.accessToken;
        });
    });
});
