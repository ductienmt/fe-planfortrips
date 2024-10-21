import Http from "./Http";

export const PlanServiceApi = {
  getData: async () => {
    return await Http.get("/api/v1/plans/prepare");
  },
};
