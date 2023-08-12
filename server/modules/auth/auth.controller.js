const authUtils = require("./auth.utils");
const authRepository = require("./auth.repository");
const {
  USER_TYPE,
  AUTH_TOKEN_REASON,
  AUTH_TOKEN_EXPIRY_TIME,
} = require("../../core/constants");

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

    const token = authUtils.getOTP();
    const expiresAt = new Date(Date.now() + AUTH_TOKEN_EXPIRY_TIME);

    await authRepository.addAuthTokenInfo({
      token,
      email: payload.email,
      userType: USER_TYPE.USER,
      reason: AUTH_TOKEN_REASON.SIGNUP,
      expiresAt,
    });

    return res.status(201).json({
      message: "User registered successfully! Please login to continue",
    });
  } catch (error) {
    next(new Error("Failed to register user"));
  }
}

module.exports = { registerUser };
