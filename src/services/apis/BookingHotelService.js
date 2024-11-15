import Http from "../Http";

export const BookingHotelService = {
  getAllBookings: async () =>{
    const response = await Http.get(`api/v1/booking-hotels/all`);
    return response.data;
  }
};
