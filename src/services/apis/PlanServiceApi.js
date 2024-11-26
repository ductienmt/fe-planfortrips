import Http from "../Http";

export const PlanServiceApi = {
  getData: async (data) => {
    return await Http.post("/plans/prepare", data);
  },
  savePlan: async (data) => {
    return await Http.post("/plans/save", data);
  },
  getPlanById: async () => {
    return await Http.get(`/plans/all`);
  },
};
