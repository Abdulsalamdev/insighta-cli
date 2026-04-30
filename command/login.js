// const open = require("open");
const open = (...args) => import("open").then(mod => mod.default(...args));
const readline = require("readline");
const { saveCredentials } = require("../utils/config");

exports.login = async () => {
  console.log("Opening GitHub login...");

  const authUrl = "https://your-backend-url/api/v1/auth/github";

  await open(authUrl);

  // Ask user to paste token manually
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Paste your access token: ", (token) => {
    saveCredentials({ access_token: token });
    console.log("Logged in successfully");
    rl.close();
  });
};