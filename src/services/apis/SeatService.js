import Http from "../Http";

export const SeatService = {
  create: async (vehicleCode, seatNumber) => {
    return await Http.post("/seats/create", {
      vehicle_code: vehicleCode,
      seat_number: seatNumber,
    });
  },
};
