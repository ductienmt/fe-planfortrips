import Http from "../Http";

export const StatisticalService = {
  getCountUser: async () => {
    const response = await Http.get('/api/v1/statistical/user');
    return response.data;
  },
  getCountAdmin: async () => {
    const response = await Http.get('/api/v1/statistical/admin');
    return response.data;
  },
  getCountEnterprise: async () => {
    const response = await Http.get('/api/v1/statistical/enterprise');
    return response.data;
  },
  getCountPlan : async () => {
    const response = await Http.get('/api/v1/statistical/plan');
    return response.data;
  },
  BookingHotelDetailByYear: async (year) => {
    const response = await Http.get(`/api/v1/statistical/year/bookingHotelDetail/${year}`);
    return response.data;
  }
};
