import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

axiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  //   console.log("CONFIG AXIOS >>>" + JSON.stringify(config));
  return config;
});

export default axiosInstance;
