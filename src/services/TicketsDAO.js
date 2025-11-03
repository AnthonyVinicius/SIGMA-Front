import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class TicketDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.sigma, "/api/v1/tickets");
  }

  myTickets() {
    return this.api.get(`${this.baseURL}/my-tickets`);
  }

  gerarRelatorio(startDate, endDate) {
    return this.api.get(`${this.baseURL}/report`, {
      params: { startDate, endDate },
    });
  }
}

export default new TicketDAO();
