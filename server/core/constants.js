module.exports = {
  USER_TYPE: {
    USER: "user",
    ADMIN: "admin",
  },

  AUTH_TOKEN_REASON: {
    SIGNUP: "signup",
    PASSWORD_RESET: "password_reset",
    RESEND_TOKEN: "resend_token",
  },

  AUTH_TOKEN_EXPIRY_TIME: 5 * 60 * 1000,
};
