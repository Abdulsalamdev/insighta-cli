const axios = require("axios");
const { getCredentials } = require("./config");

const BASE_URL = "https://your-backend-url/api/v1";

exports.request = async (method, url, data = {}) => {
  const creds = getCredentials();

  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      Authorization: creds ? `Bearer ${creds.access_token}` : ""
    }
  });
};