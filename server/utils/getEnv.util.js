const getEnv = (env) => {
  switch (env) {
    case "development":
      return ".env";
    case "test":
      return ".env.test";
    default:
      return ".env";
  }
};

module.exports = getEnv;
