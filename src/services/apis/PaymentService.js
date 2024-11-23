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

  paymentVietQr: async (bookingHotelId) => {
    const response = await axiosUtil.post(`/vietqr/${bookingHotelId}`);
    return response.data;
  },
};
