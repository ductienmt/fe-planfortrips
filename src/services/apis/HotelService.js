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
  findHotelByRoomId: async (id) => {
    const response = await Http.get(`/hotels/getByRoomId/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await Http.post(`/hotels/create`, data);
    return response.data;
  },
  update: async (hotelId, data) => {
    const response = await Http.put(`/hotels/update/${hotelId}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await Http.post(`/hotels/delete/${id}`);
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
  changeHotelStatus: async (id) => {
    const params = new URLSearchParams({ id });
    const response = await Http.patch(
      `/hotels/changeStatus?${params.toString()}`
    );
    return response.data;
  },
  search: async (keyword, pageNo, pageSize, sortBy, sortType) => {
    const params = new URLSearchParams({});
    if (keyword) {
      params.append("keyword", keyword);
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
      `/hotels/searchEnterprise?${params.toString()}`
    );
    return response.data;
  },
};
