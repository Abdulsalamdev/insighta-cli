const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");

const CREDENTIALS_PATH = path.join(
  os.homedir(),
  ".insighta",
  "credentials.json"
);

const api = axios.create({
  baseURL: "https://profilegen-api-production.up.railway.app/api/v1",
});

// 🔥 Attach token automatically
api.interceptors.request.use((config) => {
  try {
    if (fs.existsSync(CREDENTIALS_PATH)) {
      const data = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));

      if (data.access_token) {
        config.headers.Authorization = `Bearer ${data.access_token}`;
      }
    }
  } catch (err) {
    console.error("Error reading credentials:", err.message);
  }

  return config;
});

module.exports = api;