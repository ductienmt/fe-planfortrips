import Http from "../Http";

export const RoomService = {
  getRooms: async (page, limit, keyword) => {
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

    const response = await Http.get(`/rooms?${params.toString()}`);
    console.log(response);
    return response.data;
  },
  findRoomById: async (id) => {
    const response = await Http.get(`/rooms/getById/${id}`);
    return response.data;
  },
  getRoomsByHotelId: async (
    id,
    checkinDate,
    checkoutDate,
    pageNo,
    pageSize,
    sortBy,
    sortType
  ) => {
    const params = new URLSearchParams({ id, checkinDate, checkoutDate });
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
      `/rooms/getRoomByHotelId?${params.toString()}`
    );
    console.log(response.data);

    return response.data;
  },
  addRoom: async (roomData) => {
    const response = await Http.post(`/rooms/create`, roomData);
    return response.data;
  },
  updateRoom: async (id, roomData) => {
    const response = await Http.put(`/rooms/update/${id}`, roomData);
    return response.data;
  },
  deleteRoom: async (id) => {
    const response = await Http.delete(`/rooms/delete/${id}`);
    return response;
  },
  getRoomByStatus: async (
    hotelId,
    status,
    pageNo,
    pageSize,
    sortBy,
    sortType
  ) => {
    const params = new URLSearchParams({ hotelId, status });
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
      `/rooms/getRoomAvailableByHotelId?${params.toString()}`
    );
    return response.data;
  },
  getFilteredRooms: async (
    hotelId,
    roomType,
    status,
    pageNo,
    pageSize,
    sortBy,
    sortType
  ) => {
    const params = new URLSearchParams({ hotelId });
    if (roomType) {
      params.append("roomType", roomType);
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
    if (status) {
      params.append("status", status);
    }
    const response = await Http.get(`/rooms/filter?${params.toString()}`);
    return response.data;
  },
  uploadRoomImage: async (file, roomId) => {
    const response = await Http.post(`/rooms/upload-image/${roomId}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  getRoomsByEnterpriseId: async () => {
    const response = await Http.get(`/rooms/getRoomByEnterpriseId`);
    return response.data;
  },
};
