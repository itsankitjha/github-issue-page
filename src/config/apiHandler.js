import axios from "axios";

const API_URL = "";

const headers = {};

const requestApi = async (resourcePath, method, params) => {
  const url = API_URL + resourcePath;

  let response;
  if (["POST", "PUT", "DELETE"].indexOf(method) > -1 && params) {
    response = await axios({ url, method, data: params, headers });
    return response.data;
  }
  console.log(resourcePath);
  response = await axios({ url, method, headers });
  return response.data;
};

export default requestApi;
