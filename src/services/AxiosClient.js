import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("isToken");

    // console.log("configRequest >>>", config);
    config.headers["Authorization"] = `Bearer ${token}`;
    // console.log("configRequest >>>", config);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // console.log("configResponse >>>", response);
    return response.data;
  },
  function (error) {
    if (error.response.data === "INVALID JWT") {
      sessionStorage.clear();
      //dispatch a DeleteAction to the store to redirect back to the login pages//
     
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
