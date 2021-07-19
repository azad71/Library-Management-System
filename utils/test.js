var request = require("request");

request(
  {
    method: "GET",
    url: "http://books.cloudfoundry.com/data/books",
    headers: {
      Accept: "application/json",
    },
  },
  function (error, response, body) {
    // console.log("Status:", response.statusCode);
    // console.log("Headers:", JSON.stringify(response.headers));
    console.log("Response:", error);
  }
);
