import axiosClient from "./AxiosClient";

const questionCategoryApi = {
  getAll() {
    const url = `question-category`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `question-category/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "question-category";
    return axiosClient.post(url, data);
  },

  delete(id) {
    const url = `question-category/${id}`;
    return axiosClient.delete(url);
  },

  update(data) {
    const url = `question-category/${data.id}`;
    return axiosClient.put(url, data);
  },
};

export default questionCategoryApi;
