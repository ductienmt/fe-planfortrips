import Http from "../Http";

export const AdminService = {
  findAdminUsername: async (userName) => {
    const response = await Http.get(
      `/admins/findByUserName?userName=${userName}`
    );
    return response.data;
  },
  login: async (username, password) => {
    const response = await Http.post("/auth/admin/login", {
      userName: username,
      password: password,
    });
    console.log(response);
    return response.data;
  },
};
