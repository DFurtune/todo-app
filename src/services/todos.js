import axios from "axios";

const API = `https://672cb2b21600dda5a9f98805.mockapi.io/todos`;

const service = {
  get: (id) =>
    axios(id ? API + `/${id}` : API)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
  delete: (id) =>
    axios
      .delete(API + `/${id}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
  put: (id, item) =>
    axios
      .put(API + `/${id}`, item)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
  post: (item) =>
    axios
      .post(API, item)
      .then(({ data }) => data)
      .catch((err) => console.log(err)),
};

export default service;
