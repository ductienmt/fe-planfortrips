import axiosUtil from "../AxiosUtil";

export const PaymentService = {
  createPayment: async (vnpay) => {
    const response = await axiosUtil.post(`/payments/vnpay/create-payment`,vnpay);
    return response.data;
  },
};
