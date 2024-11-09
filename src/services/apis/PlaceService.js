import Http from "../Http";

export const PlaceService = {
  getData: async () => {
    const response = await Http.get("/api/v1/check-in/all");
    console.log(response.data);
    return response.data.data;
  },
};
