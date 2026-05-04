const api = require("../api");
const ora = require("ora").default;

exports.list = async () => {
  const spinner = ora("Fetching profiles...").start();

  try {
    const res = await api.get("/profiles/");
    spinner.stop();

    console.table(res.data.data);
  } catch (err) {
    spinner.fail("Failed to fetch profiles");
    console.error(err.response?.data || err.message);
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
     console.error(err.response?.data || err.message);
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
     console.error(err.response?.data || err.message);
  }
};

exports.search = async (options) => {
  const spinner = ora("Searching profiles...").start();

  try {
    if (!options.q) {
      spinner.fail("Missing query. Use --q \"your query\"");
      return;
    }

    const res = await api.get("/profiles/search", {
      params: { q: options.q },
    });

    spinner.stop();
    console.table(res.data.data);
  } catch (err) {
    spinner.fail("Search failed");
    console.error(err.response?.data || err.message);
  }
};

exports.getOne = async (id) => {
  const spinner = ora("Fetching profile...").start();

  try {
    if (!id) {
      spinner.fail("Please provide profile ID");
      return;
    }

    const res = await api.get(`/profiles/${id}`);

    spinner.stop();
    console.log(res.data.data);
  } catch (err) {
    spinner.fail("Failed to fetch profile");
    console.error(err.response?.data || err.message);
  }
};

exports.delete = async (id) => {
  const spinner = ora("Deleting profile...").start();

  try {
    if (!id) {
      spinner.fail("Please provide profile ID");
      return;
    }

    await api.delete(`/profiles/${id}`);

    spinner.succeed("Profile deleted");
  } catch (err) {
    spinner.fail("Delete failed");
    console.error(err.response?.data || err.message);
  }
};