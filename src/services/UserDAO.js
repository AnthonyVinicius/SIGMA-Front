import GenericDAO from "./GenericDAO";

class UserDAO extends GenericDAO {
  constructor() {
    super("/api/v1/registerif/user");
  }
}

export default new UserDAO();
