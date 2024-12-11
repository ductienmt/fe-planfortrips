import Http from "../Http";

export const HotelService = {
  getHotels: async (page, limit, keyword) => {
    const params = new URLSearchParams();
    if (page) {
      params.append("page", page);
    }
    if (limit) {
      params.append("limit", limit);
    }
    if (keyword) {
      params.append("keyword", keyword);
    }
    const response = await Http.get(`api/v1/hotels/all?${params.toString()}`);
    console.log(response);

    return response.data;
  },
  findHotelById: async (id) => {
    const response = await Http.get(`/hotels/getById/${id}`);
    return response.data;
  },
  findHotelByRoomId: async (id) => {
    const response = await Http.get(`/hotels/getByRoomId/${id}`);
    return response.data;
  },
  update: async (hotelId, data) => {
    const response = await Http.put(`/hotels/update/${hotelId}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await Http.delete(`/users/delete/${id}`);
    return response.data;
  },
  detail: async () => {
    const response = await Http.get(`/hotels/detail`);
    return response.data;
  },
  getHotelSamePrice: async (price, destination) => {
    const params = new URLSearchParams({ price, destination });
    const response = await Http.get(
      `/hotels/getHotelsSamePrice?${params.toString()}`
    );
    return response.data;
  },
  getAvailableHotels: async (keyword, date, days, page, limit) => {
    const response = await Http.get(
      `/hotels/findHotelAvailable?keyword=${keyword}&date=${date}&days=${days}&page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  },
};
