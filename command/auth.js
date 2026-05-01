const open = (...args) => import("open").then(m => m.default(...args));

exports.login = async () => {
  console.log("Opening browser for GitHub login...");
  await open("https://profilegen-api-production.up.railway.app/api/v1/auth/github");
};

exports.logout = async () => {
  const api = require("../api");

  try {
    await api.post("/auth/logout");
    console.log("Logged out successfully");
  } catch (err) {
    console.error("Logout failed");
  }
};