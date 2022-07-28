import axiosClient from "./AxiosClient";

const questionBankApi = {
  getAll(params) {
    const url = `/question/filter`;
    return axiosClient.get(url, { params: params });
  },
  
  getFilterCategory() {
    const url = `/question-category`;
    return axiosClient.get(url);
  },

  getById(id) {
    const url = `/question/${id}`;
    return axiosClient.get(url);
  },
  
  approveQuestion(id, params) {
    const url = `/question/${id}/approve`;
    return axiosClient.post(url, params);
  },

  create(data) {
    const url = "/question";
    return axiosClient.post(url, data);
  },

  delete(id) {
    const url = `/question/${id}`;
    return axiosClient.delete(url);
  },

  update(data) {
    const url = `/question/${data.id}`;
    return axiosClient.put(url, data);
  },
};

export default questionBankApi;
