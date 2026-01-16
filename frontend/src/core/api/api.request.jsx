import { getRequest, postRequest, putRequest, deleteRequest, patchRequest, downloadFile } from "./api.service"; // your axios wrappers


export const apiRequest = async (method, url, options = {}) => {
  const { data, params, headers } = options;
  const lower = method.toLowerCase();

  switch (lower) {
    case "get":
      return await getRequest(url, params, headers);
    case "post":
      return await postRequest(url, data, headers);
    case "put":
      return await putRequest(url, data, headers);
    case "patch":
      return await patchRequest(url, data, headers); // or make patchRequest if needed
    case "delete":
      return await deleteRequest(url, params, headers);
    case "download":
      return await downloadFile(url, params, headers)
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};


