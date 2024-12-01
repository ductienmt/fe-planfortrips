import Http from "../Http";

export const StatisticalService = {
  getCountUser: async () => {
    const response = await Http.get('/statistical/user');
    return response.data;
  },
  getCountAdmin: async () => {
    const response = await Http.get('/statistical/admin');
    return response.data;
  },
  getCountEnterprise: async () => {
    const response = await Http.get('/statistical/enterprise');
    return response.data;
  },
  getCountPlan : async () => {
    const response = await Http.get('/statistical/plan');
    return response.data;
  },
  BookingHotelDetailByYear: async (year) => {
    const response = await Http.get(`/statistical/year/bookingHotelDetail/${year}`);
    return response.data;
  }
};
