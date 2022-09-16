import axiosClient from "./AxiosClient";



const questionCriteriaApi = {
  getAll(params) {
    const url = `/question-criteria?showDisabled=true`;

    return axiosClient.get(url,
      { params: params },
     
      );
  },

  getById(id) {
    const url = `question-criteria/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/question-criteria";
    return axiosClient.post(url, data);
  },

  delete(id) {
    const url = `/question-criteria/${id}`;
    return axiosClient.delete(url);
  },

  update(data) {
    const url = `/question-criteria/${data.id}`;
    return axiosClient.put(url, data);
  },
  getFilter(params) {
    const url = `/question-criteria/filter`;
    return axiosClient.get(url, { params: params });
  },
  changeName(id, name) {
    const url = `/question-criteria/${id}`;
    return axiosClient.put(url, { name: name });
  },
  //Switch statusCriteria
  updateStatus(id, params) {
    const url = `/question-criteria/update-active/${id}`;
    return axiosClient.put(url, params);
  },
};

export default questionCriteriaApi;
