const axios = require("axios");

const api = axios.create({
  baseURL: "https://profilegen-api-production.up.railway.app/api/v1",
  withCredentials: true,
});

module.exports = api;