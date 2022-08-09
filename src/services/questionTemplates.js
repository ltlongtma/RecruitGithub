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


  getFilter(params) {
    const url = `/question-template/filter`;
    return axiosClient.get(url, { params: params });
  },
 
};

export default questionTemplate;
