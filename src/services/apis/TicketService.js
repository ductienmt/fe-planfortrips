import Http from "../Http";

export const TicketService = {
  create: async (data, seats) => {
    return await Http.get(`/api/v1/tickets/create?seatIds=${seats}`, data);
  },
  getById: async (id) => {
    return await Http.get(`/api/v1/tickets/getById/${id}`);
  },


};
