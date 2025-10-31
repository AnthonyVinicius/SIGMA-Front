class GenericDAO {
  constructor(apiInstance, baseURL) {
    if (!apiInstance) throw new Error("Instância da API é obrigatória.");
    if (!baseURL) throw new Error("A URL base do recurso é obrigatória.");

    this.api = apiInstance;
    this.baseURL = baseURL;
  }

  async getAll(params = {}) {
    const res = await this.api.get(this.baseURL, { params });
    return res.data;
  }

  async getById(id) {
    const res = await this.api.get(`${this.baseURL}/${id}`);
    return res.data;
  }

  async insert(object) {
    const res = await this.api.post(this.baseURL, object);
    return res.data;
  }

  async update(id, object) {
    const res = await this.api.put(`${this.baseURL}/${id}`, object);
    return res.data;
  }

  async delete(id) {
    const res = await this.api.delete(`${this.baseURL}/${id}`);
    return res.data;
  }
}

export default GenericDAO;
