const { request } = require("../utils/api");

exports.getProfiles = async () => {
  try {
    const res = await request("GET", "/profiles");

    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
};