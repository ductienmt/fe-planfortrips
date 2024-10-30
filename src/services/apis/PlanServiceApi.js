import Http from "../Http";

export const PlanServiceApi = {
  getData: async (data) => {
    return await Http.post("/api/v1/plans/prepare", data);
  },
  savePlan: async (data) => {
    return await Http.post("/api/v1/plans/save", data);
  },
};
