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
<<<<<<< HEAD
export default AuthService;
=======
>>>>>>> 76db1c8a218942b2c80fc8277cebdf515e1c39f9
