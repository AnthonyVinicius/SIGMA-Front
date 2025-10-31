import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class ComponentDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.sigma, "/api/v1/components");
  }
}

export default new ComponentDAO();
