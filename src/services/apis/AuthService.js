import Http from "../Http";

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
};

export default AuthService;
