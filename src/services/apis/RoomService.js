import Http from "../Http";

export const RoomService = {
  getRooms: async (page, limit, keyword) => {
    const response = await Http.get(`api/v1/rooms?page=${page}&limit=${limit}`);
    console.log(response);
    return response.data;
  },
  findRoomById: async (id) => {
    const response = await Http.get(`api/v1/rooms/${id}`);
    return response.data;
  },
  getRoomsByHotelId: async (id, pageNo, pageSize, sortBy, sortType) => {
    const params = new URLSearchParams({ id });
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
      `api/v1/rooms/getRoomByHotelId?${params.toString()}`
    );
    console.log(params.toString());

    return response.data;
  },
  addRoom: async (roomData) => {
    const response = await Http.post(`api/v1/rooms/create`, roomData);
    return response.data;
  },
  updateRoom: async (id, roomData) => {
    const response = await Http.put(`api/v1/rooms/update/${id}`, roomData);
    return response.data;
  },
  deleteRoom: async (id) => {
    const response = await Http.delete(`api/v1/rooms/delete/${id}`);
    return response;
  },
};
