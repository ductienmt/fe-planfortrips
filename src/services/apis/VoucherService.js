import Http from "../Http";

export const VoucherService = {
  getVoucherByEnterpriseId: async (
    pageNo,
    pageSize,
    status,
    sortBy,
    sortType
  ) => {
    const params = new URLSearchParams();
    if (pageNo) {
      params.append("pageNo", pageNo);
    }
    if (pageSize) {
      params.append("pageSize", pageSize);
    }
    if (status) {
      params.append("status", status);
    }
    if (sortBy) {
      params.append("sortBy", sortBy);
    }
    if (sortType) {
      params.append("sortType", sortType);
    }
    const response = await Http.get(
      `/coupons/getByEnterpriseId?${params.toString()}`
    );
    return response.data;
  },
  createRoomVoucher: async (data, roomId) => {
    const params = new URLSearchParams({ roomId });
    const response = await Http.post(
      `/coupons/create-coupon-room?${params.toString()}`,
      data
    );
    return response.data;
  },
  deleteVoucher: async (voucherId) => {
    const response = await Http.post(`/coupons/delete/${voucherId}`);
    return response.data;
  },
  searchEnterprise: async (
    keyword,
    status,
    discountType,
    pageNo,
    pageSize,
    sortBy,
    sortType
  ) => {
    const params = new URLSearchParams();
    if (keyword) {
      params.append("keyword", keyword);
    }
    if (status) {
      params.append("status", status);
    }
    if (discountType) {
      params.append("discountType", discountType);
    }
    if (pageNo) {
      params.append("pageNo", pageNo);
    }
    if (pageSize) {
      params.append("pageSize", pageSize);
    }
    if (sortBy) {
      params.append("sortBy", sortBy);
    }
    if (sortType) {
      params.append("sortType", sortType);
    }
    const response = await Http.get(
      `/coupons/searchEnterprise?${params.toString()}`
    );
    return response.data;
  },
};
