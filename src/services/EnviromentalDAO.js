import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class EnviromentalDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.sigma, "/api/v1/environments");
  }
}

export default new EnviromentalDAO();
