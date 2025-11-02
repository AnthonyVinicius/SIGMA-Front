import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class EnviromentalDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.sigma, "/api/v1/environments");
  }


  async getComponentsByEnviromentId(environmentId) {
    const res = await this.api.get(`/api/v1/environments/${environmentId}/components`);
    return res.data;
  }

}
export default new EnviromentalDAO();
