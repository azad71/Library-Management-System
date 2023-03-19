const getEnv = require("../utils/getEnv.util");

describe("Testing getEnv", () => {
  it("returns .env when env passed as development", () => {
    const result = getEnv("development");

    expect(result).toBe(".env");
  });

  it("returns .env.test when env passed as test", () => {
    const result = getEnv("test");

    expect(result).toBe(".env.test");
  });

  it("returns .env when no env passed", () => {
    const result = getEnv();

    expect(result).toBe(".env");
  });

  it("returns .env when anything other than development and test is passed as env", () => {
    const result = getEnv("notValidParams");

    expect(result).toBe(".env");
  });
});
