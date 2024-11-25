import Http from "../Http";

export const TicketService = {
  create: async (data, seats, codeCoupon) => {
    if (codeCoupon) {
      return await Http.post(
        `/tickets/create?seatIds=${seats}&codeCoupon=${codeCoupon}`,
        data
      );
    }
    return await Http.post(`/tickets/create?seatIds=${seats}`, data);
  },
  getById: async (id) => {
    return await Http.get(`/tickets/getById/${id}`);
  },
};
