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
  },
  CountEtpByYear: async (year) => {
    const response = await Http.get(`statistical/enterprise/${year}`);
    return response;
  },
  CountUserByYear: async (year) => {
    const response = await Http.get(`statistical/user/${year}`);
    return response;
  },
  CountPlanByYear: async (year) => {
    const response = await Http.get(`statistical/plan/${year}`);
    return response;
  },
  CountVehicleByYear: async (year) => {
    const response = await Http.get(`statistical/vehicle/${year}`);
    return response;
  }
};
