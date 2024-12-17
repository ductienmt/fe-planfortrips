import Http from "../Http";

export const RouteService = {
  getCitiesfromRouteId: async (routeId) => {
    return await Http.get(`/routes/getCityByRouteId?routeId=${routeId}`);
  },
  getAll: async (page, limit) => {
    const response = await Http.get(`routes/all?page=${page}&limit=${limit}`);
    return response.data;
  },
  getRouteRelevance: async (page, limit) => {
    return await Http.get(
      `/routes/getRouteRelevance?page=${page}&limit=${limit}`
    );
  },
  all: async () => {
    return await Http.get("/routes/getAll");
  },
};
