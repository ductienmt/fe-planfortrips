import Http from "../Http";

export const VietQRPaymentService = {
  createPlan: async (
    planId,
    bookingHotelId,
    departureTicketId,
    returnTicketId
  ) => {
    const params = new URLSearchParams();
    if (planId) {
      params.append("planId", planId);
    }
    if (bookingHotelId) {
      params.append("bookingHotelId", bookingHotelId);
    }
    if (departureTicketId) {
      params.append("departureTicketId", departureTicketId);
    }
    if (returnTicketId) {
      params.append("returnTicketId", returnTicketId);
    }
    return await Http.post(`/vietqr/payment-plan?${params.toString()}`);
  },
  createBooking: async (bookingHotelId) => {
    const params = new URLSearchParams();
    if (bookingHotelId) {
      params.append("bookingHotelId", bookingHotelId);
    }
    return await Http.post(`/vietqr?${params.toString()}`);
  },
  createTicket: async (ticketId) => {
    const params = new URLSearchParams();
    if (ticketId) {
      params.append("ticketId", ticketId);
    }

    return await Http.post(
      `/vietqr/payment-transportation?${params.toString()}`
    );
  },
};
