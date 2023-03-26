const authUtils = require("./auth.utils");
const authRepository = require("./auth.repository");

async function registerUser(req, res, next) {
  try {
    const payload = req.body;

    const hashedPassword = await authUtils.hashPassword(payload.password);

    const userPayload = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      password: hashedPassword,
      userStatus: "pending",
    };

    await authRepository.createUser(userPayload);

    return res.json({
      message: "User registered successfully! Please login to continue",
    });
  } catch (error) {
    next(new Error("Failed to register user"));
  }
}

module.exports = { registerUser };
