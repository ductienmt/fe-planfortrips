import Http from "../Http";

export const RouteService = {
  getCitiesfromRouteId: async (routeId) => {
    return await Http.get(`/routes/getCityByRouteId?routeId=${routeId}`);
  },
};
