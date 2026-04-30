const fs = require("fs");
const os = require("os");
const path = require("path");

const CONFIG_DIR = path.join(os.homedir(), ".insighta");
const CONFIG_FILE = path.join(CONFIG_DIR, "credentials.json");

exports.saveCredentials = (data) => {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR);
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
};

exports.getCredentials = () => {
  if (!fs.existsSync(CONFIG_FILE)) return null;
  return JSON.parse(fs.readFileSync(CONFIG_FILE));
};