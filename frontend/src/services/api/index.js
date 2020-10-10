import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: __myapp.env.API_URL,
  responseType: "json",
});

api.interceptors.request.use(
  async function (config) {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      config.headers.authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  function (res) {
    console.log(
      `${res.config.method.toUpperCase()} ${res.config.url} ${res.status}`
    );
    return res.data;
  },
  function (err) {
    console.log(
      `${err.config.method.toUpperCase()} ${err.config.url} ${
        err.response.status
      }`,
      err.response.data?.error || "",
      err.response.data?.message || ""
    );
    return Promise.reject(err);
  }
);

export default api;
