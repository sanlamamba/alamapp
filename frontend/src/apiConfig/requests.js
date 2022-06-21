import client from "./api";

export const getData = (endpoint) => client.get(endpoint);
export const postData = (data) => client.post(data.endpoint, data.req);
export const putData = (data) => client.put(data.endpoint, data.req);
export const deleteData = (data) => client.delete(data.endpoint, data.req);

const api = {
  getData,
  postData,
  putData,
  deleteData,
};

export default api;
