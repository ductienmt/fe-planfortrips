import Http from "../Http";

export const CompileEnterpriseService = {
  // Accommodation APIs
  getAccommodationRevenue: async (time) => {
    return await Http.get(`/accommodation-dashboard/revenue?time=${time}`);
  },
  getAccommodationInfo: async () => {
    return await Http.get(`/accommodation-dashboard/info`);
  },
  getAccommodationFeedback: async () => {
    return await Http.get(`/accommodation-dashboard/feedback`);
  },

  // Transportation APIs
  getTransportationRevenue: async (time) => {
    return await Http.get(`/transportation-dashboard/revenue?time=${time}`);
  },
  getTransportationInfo: async () => {
    return await Http.get(`/transportation-dashboard/info`);
  },
  getTransportationFeedback: async () => {
    return await Http.get(`/transportation-dashboard/feedback`);
  },
};
