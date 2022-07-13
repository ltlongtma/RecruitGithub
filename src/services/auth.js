import axiosClient from "./AxiosClient";

const auth = {
  login(data) {
    const url = "/user/login";
    return axiosClient.post(url, data);
  },
  register() {},
};

export default auth;
