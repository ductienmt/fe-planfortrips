import Http from "../Http";

export const TourService = {

  getToursClient : async () => {
        const response = await Http.get('api/v1/tours/client/');
        return response.data;
  },
  getTourDetail : async (tourId) => {
    const response = await Http.get(`api/v1/tours/available/${tourId}`);    
    return response.data;
  },

  getTours: async (page, limit) => {
    const response = await Http.get(`/tours/all?page=${page}&limit=${limit}`);
    console.log(response);
    return response.data;
  },
  findTourById: async (id) => {
    const response = await Http.get(`/tours/findById/${id}`);
    return response.data;
  },
  createTour: async (data) => {
    try {
      const response = await Http.post(`/tours/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating tour:", error);
      return null;
    }
  },
  updateTour: async (id, tourData) => {
    const response = await Http.put(`/tours/update/${id}`, tourData);
    return response.data;
  },
  deleteTour: async (id) => {
    const response = await Http.delete(`/tours/delete/${id}`);
    return response;
  },
  uploadImage: async (id, formData) => {
    const response = await Http.post(`/tours/uploads/${id}`, formData);
    return response.data;
  },
};
