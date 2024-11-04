import Http from "../Http";

export const AuthService = {
  login: async (data) => {
    const response = await Http.post("/api/v1/auth/login", data);
    return response;
  },
  register: async (data) => {
    const response = await Http.post("/api/v1/auth/register", data);
    return response;
  },
};
