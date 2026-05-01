const api = require("../api");
const ora = require("ora");

exports.list = async () => {
  const spinner = ora("Fetching profiles...").start();

  try {
    const res = await api.get("/profiles");
    spinner.stop();

    console.table(res.data.data);
  } catch (err) {
    spinner.fail("Failed to fetch profiles");
  }
};

exports.create = async (options) => {
  const spinner = ora("Creating profile...").start();

  try {
    const res = await api.post("/profiles", {
      name: options.name,
    });

    spinner.succeed("Profile created");
    console.log(res.data);
  } catch (err) {
    spinner.fail("Failed to create profile");
  }
};

exports.exportCSV = async () => {
  const spinner = ora("Exporting CSV...").start();

  try {
    const res = await api.get("/profiles/export", {
      responseType: "stream",
    });

    const fs = require("fs");
    const path = require("path");

    const filePath = path.join(process.cwd(), "profiles.csv");
    const writer = fs.createWriteStream(filePath);

    res.data.pipe(writer);

    writer.on("finish", () => {
      spinner.succeed("CSV exported → profiles.csv");
    });
  } catch (err) {
    spinner.fail("Export failed");
  }
};