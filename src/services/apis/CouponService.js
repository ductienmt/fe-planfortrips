import Http from "../Http";

export const CouponService = {
  getCoupons: async (page, limit, id) => {
    const response = await Http.get(
      `/coupons/all?page=${page}&limit=${limit}&id=${id}`
    );
    return response.data;
  },
  findCouponById: async (id) => {
    const response = await Http.get(`/coupons/getById/${id}`);
    return response.data;
  },
  createCoupon: async (data) => {
    try {
      const response = await Http.post(`/coupons/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating coupon:", error);
      return null;
    }
  },
  updateCoupon: async (id, couponData) => {
    const response = await Http.put(`/coupons/update/${id}`, couponData);
    return response.data;
  },
  deleteCoupon: async (id) => {
    const response = await Http.post(`/coupons/delete/${id}`);
    return response;
  },
  getCouponByCode: async (code, status) => {
    const params = new URLSearchParams({ code });

    if (status) {
      params.append("status", status);
    }

    const response = await Http.get(`/coupons/getByCode?${params.toString()}`);
    return response.data;
  },
};
