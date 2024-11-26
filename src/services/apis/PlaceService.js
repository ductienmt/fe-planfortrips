import Http from "../Http";

export const PlaceService = {
  getData: async () => {
    const response = await Http.get("/check-in/all");
    console.log(response.data);
    return response.data.data;
  },
};
