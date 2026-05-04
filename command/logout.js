exports.logout = async () => {
  const fs = require("fs");
  const os = require("os");
  const path = require("path");

  const file = path.join(os.homedir(), ".insighta", "credentials.json");

  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }

  console.log("Logged out successfully");
};
