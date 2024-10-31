import Http from "../Http";

export const UserService = {
  getImage: async () => {
    return await Http.get("/api/v1/users/getImage");
  },
};
