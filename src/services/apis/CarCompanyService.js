import Http from "../Http";

export const CarService = {
  getcars: async (page, limit) => {
    const response = await Http.get(
      `api/v1/car-companies/all?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  },
  findcarById: async (id) => {
    const response = await Http.get(`api/v1/car-companies/getById/${id}`);
    return response.data;
  },
  createcar: async (data) => {
    try {
      const response = await Http.post(`/api/v1/car-companies/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating car:", error);
      return null;
    }
  },
  updatecar: async (id, carData) => {
    const response = await Http.put(
      `api/v1/car-companies/update/${id}`,
      carData
    );
    return response.data;
  },
  deletecar: async (id) => {
    const response = await Http.delete(`api/v1/car-companies/delete/${id}`);
    return response;
  },
};
