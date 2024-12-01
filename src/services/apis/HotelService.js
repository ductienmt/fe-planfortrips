import Http from "../Http";

export const HotelService = {
  getHotels: async (page, limit, keyword) => {
    const response = await Http.get(
      `/hotels/all?page=${page}&limit=${limit}&keyword=${keyword}`
    );
    return response.data;
  },
  findHotelById: async (id) => {
    const response = await Http.get(`/hotels/getById/${id}`);
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
  getHotelSamePrice: async (price) => {
    const response = await Http.get(
      `/hotels/getHotelsSamePrice?price=${price}`
    );
    return response.data;
  },
};
