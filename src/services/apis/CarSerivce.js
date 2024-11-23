import Http from "../Http";

export const CarService = {
  getAll: async () => {
    const response = await Http.get(
      `api/v1/car-companies/all`
    );
    return response.data;
  },
};
