import Http from "../Http";

export const PlanServiceApi = {
  getData: async (data) => {
    return await Http.post("/plans/prepare", data);
  },
  savePlan: async (data) => {
    return await Http.post("/plans/save", data);
  },
  getPlanByUserId: async () => {
    return await Http.get(`/plans/all`);
  },
  getPlanById: async (id) => {
    return Http.get(`/plans/detail?id=${id}`);
  },  
  checkTime: async (departure, returnDate) => {
    const params = new URLSearchParams({ departure, return: returnDate });
    return await Http.get(`/plans/check-time?${params.toString()}`);
  },
};
