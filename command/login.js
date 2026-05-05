const open = (...args) => import("open").then(m => m.default(...args));
const http = require("http");
const axios = require("axios"); 
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");

const CREDENTIALS_PATH = path.join(os.homedir(), ".insighta", "credentials.json");

exports.login = async () => {
  console.log("Starting CLI login...");

  fs.mkdirSync(path.dirname(CREDENTIALS_PATH), { recursive: true });

  // 🔐 PKCE (NEW)
  const codeVerifier = crypto.randomBytes(32).toString("hex");

  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost:5174");

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");

      if (!code) {
        console.error("Login failed: No code received");
        res.end("Login failed");
        return;
      }

      try {
        // 🔥 CALL YOUR NEW ENDPOINT
        const response = await axios.post(
          "https://profilegen-api-production.up.railway.app/api/v1/auth/cli/exchange",
          {
            code,
            code_verifier: codeVerifier,
          }
        );

        const { access_token, refresh_token } = response.data;

        // Save credentials
        fs.writeFileSync(
          CREDENTIALS_PATH,
          JSON.stringify({ access_token, refresh_token }, null, 2)
        );

        console.log("Login successful!");
        console.log(`Saved to: ${CREDENTIALS_PATH}`);

        res.end("Login successful! You can close this tab.");

        server.close();
      } catch (err) {
        console.error("Exchange failed:", err.response?.data || err.message);
        res.end("Login failed");
      }
    }
  });

  server.listen(5174, async () => {
    console.log("Waiting for authentication...");

    await open(
      `https://profilegen-api-production.up.railway.app/api/v1/auth/github?cli=true&code_challenge=${codeChallenge}&state=cli`
    );
  });
};