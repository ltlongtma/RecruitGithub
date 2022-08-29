import axiosClient from "./AxiosClient";

const questionTemplate = {
  getAll() {
    const url = `/question-template`;

    return axiosClient.get(url);
  },

  getById(id) {
    const url = `question-template/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/question-template";
    return axiosClient.post(url, data);
  },

  delete(id) {
    const url = `/question-template/${id}`;
    return axiosClient.delete(url);
  },
  reject(id) {
    const url = `/question-template/reject/${id}`;
    return axiosClient.delete(url);
  },
  approve(id) {
    const url = `/question-template/approve/${id}`;
    return axiosClient.post(url);
  },

  getFilter(params) {
    const url = `/question-template/filter`;
    return axiosClient.get(url, { params: params });
  },
  filterByAdmin(params) {
    const url = `/question-template/admin-filter`;
    return axiosClient.get(url, { params: params });
  },
  upDate(id, params) {
    const url = `/question-template/${id}`;
    return axiosClient.put(url, params);
  },
  subMitToQueue(id) {
    const url = `/question-template/submit-to-queue/${id}`;
    return axiosClient.post(url);
  },
  
};

export default questionTemplate;
