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
};
