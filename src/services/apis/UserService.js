import Http from "../Http";

export const UserService = {
  getAll: async () => {
    return await Http.get("/users/all");
  },
  changeStageUser: async (userId, state) => {
    try {
      const response = await Http.patch(
        `/users/setStage?id=${userId}&stage=${state}`
      );
      return response.data;
    } catch (error) {
      console.error("Cập nhật trạng thái không thành công:", error);
      throw error;
    }
  },

  findUserById: async (id) => {
    const response = await Http.get(`users/getDetail?id=${id}`);
    return response.data;
  },
  getImage: async () => {
    return await Http.get("/users/getImage");
  },
  getDetail: async () => {
    return await Http.get("/users/detail");
  },
  upadateInfo: async (data) => {
    return await Http.put("/users/update", data);
  },
  updateImage: async (file) => {
    return await Http.post("/users/upload", file);
  },
  changePassword: async (data) => {
    return await Http.patch("/users/changePassword", data);
  },
  sendOTP: async (email, content) => {
    return await Http.post(`/email/send?email=${email}&content=${content}`);
  },
  verifyOTP: async (email, otp) => {
    return await Http.post(`/email/validate?email=${email}&otp=${otp}`);
  },
  verifyPassword: async (password) => {
    return await Http.get(`/users/verify-password?password=${password}`);
  },
  findUserByUsername: async (userName) => {
    const response = await Http.get(
      `users/findByUsername?username=${userName}`
    );
    return response.data;
  },
  // findUserById: async (id) => {
  //   const response = await Http.get(`api/v1/users/getDetail?id=${id}`);
  //   return response.data;
  // },
};
