import Http from "../Http";

export const UserService = {
  findUserById: async (id) => {
    const response = await Http.get(`api/v1/users/getDetail?id=${id}`);
    return response.data;
  getImage: async () => {
    return await Http.get("/api/v1/users/getImage");
  },
  getDetail: async () => {
    return await Http.get("/api/v1/users/detail");
  },
  upadateInfo: async (data) => {
    return await Http.put("/api/v1/users/update", data);
  },
  updateImage: async (file) => {
    return await Http.post("/api/v1/users/upload", file);
  },
  changePassword: async (data) => {
    return await Http.patch("/api/v1/users/changePassword", data);
  },
  sendOTP: async (email, content) => {
    return await Http.post(
      `/api/v1/email/send?email=${email}&content=${content}`
    );
  },
  verifyOTP: async (email, otp) => {
    return await Http.post(`/api/v1/email/validate?email=${email}&otp=${otp}`);
  },
  verifyPassword: async (password) => {
    return await Http.get(`/api/v1/users/verify-password?password=${password}`);
  },
};
