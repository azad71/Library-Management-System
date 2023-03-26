const request = require("supertest");
const User = require("../models/users");
const app = require("../../../app");
const sequelize = require("../../../core/database");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  return User.destroy({ truncate: true });
});

const userPayload = {
  name: "Azad Mamun",
  address: "Dhaka, Bangladesh",
  email: "azadmamun@gmail.com",
  password: "aslkfjalskfjdlask",
};

const createUser = (payload = userPayload) => {
  return request(app).post("/api/v1/auth/user/register").send(payload);
};

describe("User registration", () => {
  it("returns errors field when validation error occurs", async () => {
    const response = await createUser({});

    expect(response.body.errors).not.toBeUndefined();
  });

  it('returns "Name is required" when no "name" field value provided', async () => {
    const response = await createUser({});

    expect(response.body.errors["name"]).toBe("Name is required");
  });

  it('returns "Name must be between 2 to 256 characters" when "name" field value is less than 2 characters', async () => {
    const response = await createUser({
      ...userPayload,
      name: "a",
    });

    expect(response.body.errors["name"]).toBe(
      "Name must be between 2 to 256 characters",
    );
  });

  it('returns "Name must be between 2 to 256 characters" when "name" field value is more than 256 characters', async () => {
    const response = await createUser({
      ...userPayload,
      name: "a".repeat(257),
    });

    expect(response.body.errors["name"]).toBe(
      "Name must be between 2 to 256 characters",
    );
  });

  it("returns 'Address is required' when no 'address' field value provided", async () => {
    const response = await createUser({ name: userPayload.name });

    expect(response.body.errors["address"]).toBe("Address is required");
  });

  it("returns 'Address must not exceeds more than 256 characters' when 'address' field value is more thant 256 characters", async () => {
    const response = await createUser({
      ...userPayload,
      address: "a".repeat(257),
    });

    expect(response.body.errors["address"]).toBe(
      "Address must not exceeds more than 256 characters",
    );
  });

  it("returns 'Email is required' when no 'email' field value provided", async () => {
    const response = await createUser({ name: userPayload.name });

    expect(response.body.errors["email"]).toBe("Email is required");
  });

  it("returns 'Invalid email, please provide a valid email address' when invalid 'email' field value provided", async () => {
    const response = await createUser({
      name: userPayload.name,
      email: "a_random_mail_address",
    });

    expect(response.body.errors["email"]).toBe(
      "Invalid email, please provide a valid email address",
    );
  });

  // it("returns 'This email is already registered' when duplicate email is used for registration", async() => {
  //   const response = await createUser()
  // })

  it("returns 'Password is required' when no 'password' field value provided", async () => {
    const response = await createUser({
      name: userPayload.name,
      email: userPayload.email,
    });

    expect(response.body.errors["password"]).toBe("Password is required");
  });

  it("returns 'Password is required' when no 'password' field value provided", async () => {
    const response = await createUser({
      name: userPayload.name,
      email: userPayload.email,
    });

    expect(response.body.errors["password"]).toBe("Password is required");
  });

  it("returns 'Password must be between 6 to 48 characters' when less than 6 characters provided in 'password'", async () => {
    const response = await createUser({
      name: userPayload.name,
      email: userPayload.email,
      password: "123",
    });

    expect(response.body.errors["password"]).toBe(
      "Password must be between 6 to 48 characters",
    );
  });

  it("returns 'Password must be between 6 to 48 characters' when more than 48 characters provided in 'password'", async () => {
    const response = await createUser({
      name: userPayload.name,
      email: userPayload.email,
      password: "a".repeat(49),
    });

    expect(response.body.errors["password"]).toBe(
      "Password must be between 6 to 48 characters",
    );
  });

  it("returns http status 200 when user register request payload is valid", async () => {
    const response = await createUser(userPayload);

    expect(response.status).toBe(200);
  });

  it("returns success message when successfully registers an user", async () => {
    const response = await createUser();

    expect(response.body.message).toBe(
      "User registered successfully! Please login to continue",
    );
  });

  it("saves user to database", async () => {
    await createUser();
    const users = await User.findAll();
    expect(users.length).toBe(1);
  });

  it("saves name to database", async () => {
    await createUser();
    const users = await User.findAll();
    expect(users[0].name).toBe(userPayload.name);
  });

  it("saves email to database", async () => {
    await createUser();
    const users = await User.findAll();
    expect(users[0].email).toBe(userPayload.email);
  });

  it("saves address to database", async () => {
    await createUser();
    const users = await User.findAll();
    expect(users[0].address).toBe(userPayload.address);
  });

  it("hashes password before saving to db", async () => {
    await createUser();
    const users = await User.findAll();
    expect(users[0].password).not.toBe(userPayload.password);
  });

  it("returns 'This email is already registered' duplicate email used", async () => {
    User.create(userPayload);

    const response = await createUser();
    expect(response.body.errors["email"]).toBe(
      "This email is already registered",
    );
  });

  it("creates account in pending status", async () => {
    const response = await createUser();
    const users = await User.findAll();

    expect(users[0].userStatus).toBe("pending");
  });
});

// describe("Auth Utilities", () => {
//   it('returns hashed password',)
// })
