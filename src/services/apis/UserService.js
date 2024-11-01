import Http from "../Http";

export const UserService = {
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
};
