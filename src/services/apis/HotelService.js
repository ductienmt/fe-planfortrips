import Http from "../Http";

const HotelService = {
    //path variable
    update: async (hotelId, data) => {
        const response = await Http.put(`/api/v1/hotels/${hotelId}`,data);
        return response;
    },
    //request param
    delete: async (id) => {
        const response = await Http.delete(`/api/v1/users/delete?id=${id}`);
        return response;
    }
}