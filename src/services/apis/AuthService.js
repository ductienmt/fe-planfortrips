import Http from "../Http";

export const AuthService = {
  loginUser: async (data) => {
    const response = await Http.post("/api/v1/auth/user/login", data);
    return response;
  },
  register: async (data) => {
    const response = await Http.post("/api/v1/auth/register", data);
    return response;
  },
  loginEnterprise: async (data, type) => {
    const response = await Http.post(
      `/api/v1/auth/enterprise/login?type=${type}`,
      data
    );
    return response;
  },
};
export default AuthService;
