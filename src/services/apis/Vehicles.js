import Http from "../Http";

export const VehiclesService = {
  getVehicles: async () => {
    return await Http.get("/vehicles/all");
  },
  getVehicleById: async (id) => {
    return await Http.get(`/vehicles/getById/${id}`);
  },
  createVehicle: async (data) => {
    return await Http.post("/vehicles/create", data);
  },
  updateVehicle: async (id, data) => {
    return await Http.put(`/vehicles/update/${id}`, data);
  },
  deleteVehicle: async (id) => {
    return await Http.delete(`/vehicles/delete/${id}`);
  },
  // getVehicleTypes: async () => {
  //   return await Http.get("/vehicles/types");
  // }, em tạo cho tôi hơi rắc rối đó babi :D
};
