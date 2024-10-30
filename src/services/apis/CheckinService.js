import Http from "../Http";

export const CheckinService = {
  getImageById: async (id) => {
    const response = await Http.get(
      `api/v1/check-in/getImages?checkinId=${id}`
    );
    return response.data;
  },
};
