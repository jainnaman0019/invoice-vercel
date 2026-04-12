const serverless = require("serverless-http");
const app = require("../BACKEND/index");

module.exports = serverless(app);