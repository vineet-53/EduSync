import axios from "axios";
const apiConnector = async (method, url, body = null, headers = {}) => {
  const response = await axios({
    method,
    url,
    data: body,
    headers,
  });
  return response;
};

export default apiConnector;

