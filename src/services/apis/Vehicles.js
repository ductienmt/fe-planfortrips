import Http from "../Http";

export const VehiclesService = {
  getVehicles: async () => {
    return await Http.get("/api/v1/vehicles/all");
  },
  getVehicleById: async (id) => {
    return await Http.get(`/api/v1/vehicles/getById/${id}`);
  },
  createVehicle: async (data) => {
    return await Http.post("/api/v1/vehicles/create", data);
  },
  updateVehicle: async (id, data) => {
    return await Http.put(`/api/v1/vehicles/update/${id}`, data);
  },
  deleteVehicle: async (id) => {
    return await Http.delete(`/api/v1/vehicles/delete/${id}`);
  },
  // getVehicleTypes: async () => {
  //   return await Http.get("/api/v1/vehicles/types");
  // }, em tạo cho tôi hơi rắc rối đó babi :D

};
