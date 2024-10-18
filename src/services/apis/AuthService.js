import Http from "../Http";
import Login from "../../pages/Auth/Login/Login";
import Register from "../../pages/Auth/Login/Register";


// các phương thức liên quan tới auth
const AuthService = {
  // hàm xử lý đăng nhập
  // truyền vào data gồm (username, pass)
  // trả về response từ server
  login: async (data) => {
    const response = await Http.post("/api/v1/auth/login", data);
    return response;
  },
  // register: async (data) => {},
  // đăng ký
Register: async (data) =>{
  const response = await Http.post("/api/v1/auth/Register", data);
  return response;
}
};



export default AuthService;
