const getEnv = require("../utils/getEnv.util");

describe("Testing NODE_ENV", () => {
  it("returns .env when env passed as development", () => {
    const result = getEnv("development");

    expect(result).toBe(".env");
  });
});
