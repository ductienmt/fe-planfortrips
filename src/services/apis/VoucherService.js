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
      `api/v1/coupons/getByEnterpriseId?${params.toString()}`
    );
    return response.data;
  },
};
