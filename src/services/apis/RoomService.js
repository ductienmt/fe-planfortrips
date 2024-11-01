import Http from "../Http";

export const RoomService = {
    getRooms: async (page, limit, keyword) => {
        const response = await Http.get(`api/v1/rooms/all?page=${page}&limit=${limit}`);
        console.log(response);
        return response.data;
    },
    findRoomById: async (id) => {
        const response = await Http.get(`api/v1/rooms/getById/${id}`);
        return response.data;
    },
}