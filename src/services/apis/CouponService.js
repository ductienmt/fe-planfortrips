import Http from "../Http";

export const CouponService = {
  getCoupons: async (page, limit, id) => {
    const response = await Http.get(
      `api/v1/coupons/all?page=${page}&limit=${limit}&id=${id}`
    );
    console.log(response);
    return response.data;
  },
  findCouponById: async (id) => {
    const response = await Http.get(`api/v1/coupons/getById/${id}`);
    return response.data;
  },
  createCoupon: async (data) => {
    const response = await Http.post(`api/v1/coupons/create`, data);
    return response.data;
  },
  updateCoupon: async (id,data) => {
    const response = await Http.put(`api/v1/coupons/update?id=${id}`,data);
    return response.data;
  },
  deleteCoupon: async (id) => {
    const response = await Http.put(`api/v1/coupons/delete?id=${id}`);
    return response.data;
  },
};
