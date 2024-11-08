import Http from "../Http";

export const AuthService = {
  login: async (data) => {
    console.log(data);
    const response = await Http.post("/api/v1/auth/login", data);
    console.log(response.data);
    
    return response;
  },
  register: async (data) => {
    const response = await Http.post("/api/v1/auth/register", data);
    return response;
  },
};
export default AuthService;
