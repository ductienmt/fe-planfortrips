import Http from "../Http";

export const CityService = {
  getAllByAreaId: async (id) => {
    const response = await Http.get(`/cities/all?area_id=${id}`);
    return response.data;
  },
  getAll: async () => {
    const response = await Http.get(`/cities/getAll`);
    return response.data;
  },
  getCitiesByAreaId: async (id) => {
    const params = new URLSearchParams({ id });
    const response = await Http.get(`/cities/getByAreaId?${params.toString()}`);
    return response.data;
  },
  searchCityByName: async (name) => {
    const response = await Http.get(`/cities/findCityByName?name=${name}`);
    return response.data;
  },
  getFavoriteCity: async () => {
    const response = await Http.get(`/cities/getFavoriteCity`);
    return response.data;
  },
};
