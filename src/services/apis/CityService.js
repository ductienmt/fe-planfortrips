import Http from "../Http";

export const CityService = {
  getAllByAreaId: async (id) => {
    const response = await Http.get(
      `api/v1/cities/all?area_id=${id}`
    );
    
    return response.data;
  },
};
