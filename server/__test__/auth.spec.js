const request = require("supertest");
const User = require("../modules/auth/models/users");
const app = require("../app");
const sequelize = require("../core/database");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  return User.destroy({ truncate: true });
});

describe("User registration", () => {
  it("returns http status 200 when user register request is valid", async () => {
    const response = await request(app)
      .post("/api/v1/auth/user/register")
      .send({});

    expect(response.status).toBe(200);
  });

  it('returns "Please provide fullname" when no "name" field value provided', async () => {
    const response = await request(app)
      .post("/api/v1/auth/user/register")
      .send({});

    expect(response.body.errorMessage).toBe("Please provide fullname");
  });
});
