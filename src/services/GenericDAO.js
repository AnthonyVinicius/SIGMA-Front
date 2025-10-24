import apiRequest from "../api/apiService";

class GenericDAO {
  constructor(baseURL) {
    if (!baseURL) {
      throw new Error("A URL base do recurso é obrigatória.");
    }
    this.baseURL = baseURL;
  }

  async getAll() {
    return await apiRequest("get", this.baseURL);
  }

  async getById(id) {
    return await apiRequest("get", `${this.baseURL}/${id}`);
  }

  async insert(object) {
    return await apiRequest("post", this.baseURL, object);
  }

  async update(id, object) {
    return await apiRequest("put", `${this.baseURL}/${id}`, object);
  }

  async delete(id) {
    return await apiRequest("delete", `${this.baseURL}/${id}`);
  }
}

export default GenericDAO;
