import Http from "../Http";

export const VehiclesService = {
  getVehicles: async () => {
    return await Http.get("/api/v1/vehicles");
  },
  getVehicleById: async (id) => {
    return await Http.get(`/api/v1/vehicles/${id}`);
  },
  createVehicle: async (data) => {
    return await Http.post("/api/v1/vehicles", data);
  },
  updateVehicle: async (id, data) => {
    return await Http.put(`/api/v1/vehicles/${id}`, data);
  },
  deleteVehicle: async (id) => {
    return await Http.delete(`/api/v1/vehicles/${id}`);
  },
  getVehicleTypes: async () => {
    return await Http.get("/api/v1/vehicles/types");
  },
};
