import axiosClient from "./AxiosClient";

const questionCategoryApi = {
  getAll() {
    const url = `/question-category?showDisabled=true`;
    return axiosClient.get(url);
  },
  getFilter(params) {
    const url = `/question-category/filter`;
    return axiosClient.get(url, { params: params });
  },

  getById(id) {
    const url = `/question-category/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/question-category";
    return axiosClient.post(url, data);
  },
  changeName(id, name) {
    const url = `/question-category/${id}`;
    return axiosClient.put(url, { name: name });
  },
  //Switch statusCategory
  update(id, params) {
    const url = `/question-category/update-enable/${id}`;
    return axiosClient.put(url, params);
  },


};

export default questionCategoryApi;
