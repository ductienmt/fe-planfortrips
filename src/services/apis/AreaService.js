import Http from "../Http";

export const AreaService = {
  getAll: async () => {
    const response = await Http.get(
      `api/v1/areas/all`
    );
    return response.data.data;
  },
};
