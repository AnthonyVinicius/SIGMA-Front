import GenericDAO from './GenericDAO'

const dao = new GenericDAO('/api/v1/tickets')

export default {
  listar() {
    return dao.getAll()
  },
  buscarPorId(id) {
    return dao.getById(id)
  },
  criar(ticket) {
    return dao.insert(ticket)
  },
  atualizar(id, ticket) {
    return dao.update(id, ticket)
  },
  deletar(id) {
    return dao.delete(id)
  },
  listarMeusTickets() {
    return apiRequest("get", "/api/v1/tickets/my-tickets")
  },
  gerarRelatorio(startDate, endDate) {
    return apiRequest("get", `/api/v1/tickets/report?startDate=${startDate}&endDate=${endDate}`)
  }
}
