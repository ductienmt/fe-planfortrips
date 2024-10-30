// import Http from "../Http";

// // các phương thức liên quan tới auth
// const AuthService = {
//   // hàm xử lý đăng nhập
//   // truyền vào data gồm (username, pass)
//   // trả về response từ server
//   login: async (data) => {
//     const response = await Http.post("/api/v1/auth/login", data);
//     return response;
//   },
//   // register: async (data) => {},
//   // đăng ký
//   Register: async (data) => {
//     const response = await Http.post("/api/v1/auth/Register", data);
//     return response;
//   },
// };
const AuthService = {
  login: async (data) => {
    const response = await Http.post("/api/v1/auth/login", data);
    return response;
  },
  register: async (data) => {
    const response = await Http.post("/api/v1/auth/register", data);
    return response;
  },
};
// export default AuthService;
