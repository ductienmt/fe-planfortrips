import axiosUtil from "../AxiosUtil";
import Http from "../Http";

export const PaymentService = {
  createPayment: async (vnpay) => {
    const response = await axiosUtil.post(
      `/payments/vnpay/create-payment`,
      vnpay
    );
    return response.data;
  },
  createPaymentPlan: async (
    planId,
    ticketDeId,
    ticketReId,
    bookingid,
    amount
  ) => {
    const params = new URLSearchParams();
    if (planId) {
      params.append("plan_id", planId);
    }
    if (ticketDeId) {
      params.append("departure_ticket_id", ticketDeId);
    }
    if (ticketReId) {
      params.append("return_ticket_id", ticketReId);
    }
    if (bookingid) {
      params.append("booking_id", bookingid);
    }
    if (amount) {
      params.append("amount", amount);
    }
    const response = await Http.post(
      `/payments/vnpay/create-payment-plan?${params.toString()}`
    );
    return response.data;
  },

  paymentVietQrBookingHotel: async (bookingHotelId) => {
    const response = await axiosUtil.post(`/vietqr/${bookingHotelId}`);
    return response.data;
  },
  paymentVietQrTrans: async (ticketId) => {
    const response = await axiosUtil.post(
      `/vietqr/payment-transportation?ticketId=${ticketId}`
    );
    return response.data;
  },
  paymentVietQrPlan: async (data) => {
    const response = await axiosUtil.post(
      `/vietqr/payment-plan?${data.toString()}`
    );
    return response.data;
  },
};
