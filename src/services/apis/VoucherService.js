import Http from "../Http";

export const VoucherService = {
  getVoucherByEnterpriseId: async (page, limit, keywords) => {
    const response = await Http.get(
      `api/v1/coupons/all?page=${page}&limit=${limit}&keywords=${keywords}`
    );
    return response.data;
  },
};
