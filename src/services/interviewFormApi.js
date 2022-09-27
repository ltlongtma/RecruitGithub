import axiosClient from "./AxiosClient";

const interviewApi = {
  filterByAdmin(data) {
    const url = `interview-form/admin-filter`;
    return axiosClient.get(url, { params: data });
  },
  create(data) {
    const url = `interview-form`;
    return axiosClient.post(url,  data);
  },
  getById(id) {
    const url = `interview-form/${id}`;
    return axiosClient.get(url);
  },
};

export default interviewApi;

