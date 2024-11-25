import Http from "../Http";

export const CarService = {
  getAll: async () => {
    const response = await Http.get(`/car-companies/all`);
    return response.data;
  },
};
