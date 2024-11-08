import Http from "../Http";

export const ScheduleService = {
  getStation: async (id) => {
    return await Http.get(
      `/api/v1/schedules/getStationByScheduleId?scheduleId=${id}`
    );
  },

  getSchedules: async (data) => {
    return await Http.post(`/api/v1/schedules/getSchedules`, data);
  },

  getScheduleID: async (scheduleId) => {
    return await Http.get(`/api/v1/schedules/getById/${scheduleId}`);
  },
};
