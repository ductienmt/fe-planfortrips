import Http from "../Http";

export const RouteService = {
  getCitiesfromRouteId: async (routeId) => {
    return await Http.get(`/api/v1/routes/getCityByRouteId?routeId=${routeId}`);
  },
};
