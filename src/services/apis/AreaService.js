import Http from "../Http";

export const AreaService = {
  getAll: async () => {
    const response = await Http.get(`/areas/all`);
    return response.data.data;
  },
};
