import Http from "../Http";

export const VehiclesService = {
  getVehicleById: async (id) => {
    return await Http.get(`/api/v1/vehicles/getById/${id}`);
  },
};
