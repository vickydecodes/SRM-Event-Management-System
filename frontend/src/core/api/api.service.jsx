import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
//   withCredentials: true,
});

export const getRequest = async (url, params = {}, headers = {}) => {
  const response = await api.get(url, { params, headers });
  return response.data;
};

export const postRequest = async (url, data = {}, headers = {}) => {
  const response = await api.post(url, data, { headers });
  return response.data;
};

export const putRequest = async (url, data = {}, headers = {}) => {
  const response = await api.put(url, data, { headers });
  return response.data;
};

export const patchRequest = async (url, data = {}, headers = {}) => {
  const response = await api.patch(url, data, { headers });
  return response.data;
};

export const deleteRequest = async (url, params = {}, headers = {}) => {
  const response = await api.delete(url, { params, headers });
  return response.data;
};

export const downloadFile = async (url) => {
  let filename = 'download';
  const response = await api.get(url, {
    responseType: 'blob',
  });

  const disposition = response.headers['content-disposition'] || '';
  const match = disposition.match(/filename="(.+)"/);
  if (match) filename = match[1];

  const blobUrl = window.URL.createObjectURL(response.data);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(blobUrl);

  return filename;
};
