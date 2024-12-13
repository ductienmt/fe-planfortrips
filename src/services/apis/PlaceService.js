import Http from "../Http";

export const PlaceService = {
  getData: async (page) => {
    const response = await Http.get(`/check-in/all?page=${page}`);
    console.log(response.data);
    return response.data.data;
  },
};
