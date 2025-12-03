import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class TicketDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.sigma, "/api/v1/tickets");
  }

  myTickets() {
    return this.api.get(`${this.baseURL}/my-tickets`, {});
  }

  gerarRelatorio(startDate, endDate) {
    return this.api.get(`${this.baseURL}/report`, {
      params: { startDate, endDate },
    });
  }
}

/*
  insert(payload) {
    const formData = new FormData();

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const value = payload[key];

        if (key === "ticketFile" && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("ticketFile", file);
          });
        } 
        else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    }

    const config = { headers: {} };
    const token = localStorage.getItem('user-token');
    
    if (token) {
      const cleanToken = token.replace(/"/g, ''); 
      config.headers['Authorization'] = `Bearer ${cleanToken}`;
    }

    return this.api.post(this.baseURL, formData, config);
  }
  */

export default new TicketDAO();
