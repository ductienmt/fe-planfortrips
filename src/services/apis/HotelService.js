import Http from "../Http";

export const HotelService = {
  getHotels: async (page, limit, keyword) => {
    const params = new URLSearchParams();
    if (page) {
      params.append("page", page)
    }
    if (limit) {
      params.append("limit", limit)
    }
    if (keyword) {
      params.append("keyword", keyword)
    }
    const response = await Http.get(
      `api/v1/hotels/all?${params.toString()}`
    );
    return response.data;
  },
  findHotelById: async (id) => {
    const response = await Http.get(`api/v1/hotels/getById/${id}`);
    return response.data;
  },
  update: async (hotelId, data) => {
    const response = await Http.put(`api/v1/hotels/update/${hotelId}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await Http.delete(`api/v1/users/delete/${id}`);
    return response.data;
  },
  detail: async () => {
    const response = await Http.get(`api/v1/hotels/detail`);
    return response.data;
  },
};
