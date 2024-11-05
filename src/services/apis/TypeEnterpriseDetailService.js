import Http from "../Http";

export const TypeEnterpriseDetailService = {
  getAll: async () => {
    return await Http.get("/api/v1/type-enterprise-details/all");
  },
};
