import Http from "../Http";

export const HotelService = {
  getHotels: async (page, limit, keyword) => {
    const response = await Http.get(
      `api/v1/hotels?page=${page}&limit=${limit}&keyword=${keyword}`
    );
    console.log(response);
    return response.data;
  },
  findHotelById: async (id) => {
    const response = await Http.get(`api/v1/hotels/getById/${id}`);
    return response.data;
  },
  update: async (hotelId, data) => {
    const response = await Http.put(`api/v1/hotels/${hotelId}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await Http.delete(`api/v1/users/delete?id=${id}`);
    return response.data;
  },
  getImageById: async (id) => {
    const response = await Http.get(`api/v1/hotels/getImages/${id}`);
    return response.data;
  },
};
