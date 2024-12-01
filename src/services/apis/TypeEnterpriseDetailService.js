import Http from "../Http";

export const TypeEnterpriseDetailService = {
  getAll: async () => {
    return await Http.get("/type-enterprise-details/all");
  },
};
