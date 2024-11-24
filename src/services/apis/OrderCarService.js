import Http from "../Http";

export const OrderCarService = {
  getAllTickets: async () => {
    const response = await Http.get(`/tickets/all?page=0&limit=5`);
    return response.data;
  },
};
