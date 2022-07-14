import axiosClient from "./AxiosClient";

const questionBankApi = {
  getAll(params) {
    const url = `question/filter`;
    return axiosClient.get(url, { params: params });
  },
  getFilterCategory() {
    const url = `question-category`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `/question/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/products";
    return axiosClient.post(url, data);
  },

  delete(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },

  update(data) {
    const url = `/products/${data.id}`;
    return axiosClient.put(url, data);
  },
};

export default questionBankApi;
