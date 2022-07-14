import axiosClient from "./AxiosClient";

const questionCriteriaApi = {
  getAll() {
    const url = `question-criteria`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `question-criteria/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "question-criteria";
    return axiosClient.post(url, data);
  },

  delete(id) {
    const url = `question-criteria/${id}`;
    return axiosClient.delete(url);
  },

  update(data) {
    const url = `question-criteria/${data.id}`;
    return axiosClient.put(url, data);
  },
};

export default questionCriteriaApi;
