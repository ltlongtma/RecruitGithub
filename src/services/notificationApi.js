import axiosClient from "./AxiosClient";

const notification = {
  getAllNotification(params) {
    const url = `/notification`;
    return axiosClient.get(url, { params: params });
  },

  getById(id) {
    const url = `/notification/${id}`;
    return axiosClient.get(url);
  },

  getUnreadNotificationNumber() {
    const url = `/notification/unread/count`;
    return axiosClient.get(url);
  },
 
  readAll() {
    const url = `/notification/read-all`;
    return axiosClient.post(url);
  },
};

export default notification;
