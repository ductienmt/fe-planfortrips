import Http from "../Http";

export const VehiclesService = {
  getVehicles: async (page, limit, keyword) => {
    return await Http.get(`/api/v1/vehicles/all?page=${page}&limit=${limit}&keyword=${keyword}`);
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
  findVehicleById: async (id) => {
    return await Http.get(`/api/v1/vehicles/getById/${id}`);
  },
  getVehicleByEnterpriseId: async () => {
    return await Http.get("/api/v1/vehicles/getByEnterpriseId")
  }
  // getVehicleTypes: async () => {
  //   return await Http.get("/vehicles/types");
  // }, em tạo cho tôi hơi rắc rối đó babi :D
};
