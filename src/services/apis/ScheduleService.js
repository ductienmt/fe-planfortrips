import Http from "../Http";

export const ScheduleService = {
  getStation: async (id) => {
    return await Http.get(`/schedules/getStationByScheduleId?scheduleId=${id}`);
  },

  getSchedules: async (data) => {
    return await Http.post(`/schedules/getSchedules`, data);
  },

  getScheduleID: async (scheduleId) => {
    return await Http.get(`/schedules/getById/${scheduleId}`);
  },
  getSamePrice: async (price, originalLocation, destination, departureDate) => {
    const params = new URLSearchParams({
      price,
      originalLocation,
      destination,
      departureDate,
    });
    return await Http.get(`/schedules/getSamePrice?${params.toString()}`);
  },
  getScheduleByEnterpriseId: async (filter) => {
    return await Http.get(`/schedules/getByEnterpriseId?filter=${filter}`);
  },
  getSeatsByScheduleId: async (scheduleId) => {
    const params = new URLSearchParams({ scheduleId });
    return await Http.get(
      `/schedules/getSeatsByScheduleId?${params.toString()}`
    );
  },
};
