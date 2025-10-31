import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class UserDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.registerIF, "/api/v1/registerif/user");
  }
}

export default new UserDAO();
