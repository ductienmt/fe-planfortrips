import Http from "../Http";

export const BookingHotelService = {
  getAllBookings: async () => {
    const response = await Http.get(`/booking-hotels/all`);
    return response.data;
  },
  create: async (data) => {
    return await Http.post(`/booking-hotels/create`, data);
  },
};
