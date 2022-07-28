import axiosClient from "./AxiosClient";

const userApi = {
  login(data) {
    const url = `user/login`;
    return axiosClient.post(url, data);
  },

  signUp(data) {
    const url = `user/sign-up`;
    return axiosClient.post(url, data);
  },

  changePassword(data) {
    const url = `user/change-password`;
    return axiosClient.post(url, data);
  },

  getAllUsers() {
    const url = `user`;
    return axiosClient.get(url);
  },

  deleteUser(id) {
    const url = `user/${id}`;
    return axiosClient.delete(url);
  },

  filterUser(data) {
    const url = `user/filter`;
    return axiosClient.get(url, { params: data });
  },

  postNewUser(data) {
    const url = `user`;
    return axiosClient.post(url, data);
  },
  
  changeRoleUser(id, roleId) {
    const data = {
      roles: [{ id: roleId }],
    };
    const url = `user/${id}`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
