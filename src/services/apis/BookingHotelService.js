import Http from "../Http";

export const BookingHotelService = {
  getAllBookings: async () => {
    const response = await Http.get(`api/v1/booking-hotels/all`);
    return response.data;
  },
  create: async (data) => {
    return await Http.post(`api/v1/booking-hotels/create`, data);
  },
};
