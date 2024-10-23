import Http from "../Http";

export const ScheduleService = {
  getStation: async (id) => {
    return await Http.get(
      `/api/v1/schedules/getStationByScheduleId?scheduleId=${id}`
    );
  },
};
