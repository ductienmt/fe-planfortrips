import { useState } from "react";
import AuthService from "../../../../services/apis/AuthService";
import "./Register.css"; // Custom CSS

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !username ||
      !password ||
      !confirmPassword ||
      !fullName ||
      !email ||
      !phone
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp.");
      return;
    }

    try {
      const response = await AuthService.register({
        username,
        password,
        fullName,
        email,
        phone,
      });
      console.log("Đăng ký thành công:", response.data);
      // Chuyển hướng đến trang đăng nhập hoặc trang chính
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <section className="vh-100 register-container">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-7 d-flex justify-content-center position-relative">
            <img
              src="https://www.banjaluka.com/wp-content/uploads/2024/10/amac0-440x315.jpeg"
              alt="Background"
              className="register-custom-image"
            />

            {/* Đặt thông báo và nút Đăng Nhập bên trái */}
            <div className="position-absolute custom-left-container">
              <div className="register-divider d-flex ">
                <p className="">Hoặc đăng nhập bằng</p>
              </div>

              {/* Nút Đăng Nhập bằng Google và Facebook */}
              <div className="d-flex flex-column align-items-center">
                <button className="btn register-google  ">
                  <a href="#" className="text-decoration-none ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      class="main-grid-item-icon"
                      fill="none"
                    >
                      <path
                        d="M24 12.276c0-.816-.067-1.636-.211-2.438H12.242v4.62h6.612a5.549 5.549 0 0 1-2.447 3.647v2.998h3.945C22.669 19.013 24 15.927 24 12.276Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.241 24c3.302 0 6.086-1.063 8.115-2.897l-3.945-2.998c-1.097.732-2.514 1.146-4.165 1.146-3.194 0-5.902-2.112-6.873-4.951H1.302v3.09C3.38 21.444 7.612 24 12.242 24Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.369 14.3a7.053 7.053 0 0 1 0-4.595v-3.09H1.302a11.798 11.798 0 0 0 0 10.776L5.369 14.3Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M12.241 4.75a6.727 6.727 0 0 1 4.696 1.798l3.495-3.425A11.898 11.898 0 0 0 12.243 0C7.611 0 3.38 2.558 1.301 6.615l4.067 3.09C6.336 6.862 9.048 4.75 12.24 4.75Z"
                        fill="#EA4335"
                      />
                    </svg>{" "}
                    <span className="icon-text">Google</span>
                  </a>
                </button>
                <button className="btn register-facebook  ">
                  <a href="#" className="text-decoration-none ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      class="main-grid-item-icon"
                      fill="none"
                    >
                      <path
                        d="m17.543 13.398.661-4.31h-4.136V6.29c0-1.18.578-2.329 2.43-2.329h1.88V.291S16.673 0 15.042 0c-3.407 0-5.633 2.064-5.633 5.802v3.285H5.622v4.311h3.786v10.42a15.015 15.015 0 0 0 4.66 0v-10.42h3.475Z"
                        fill="#1877F2"
                      />
                    </svg>
                    <span className="icon-text1">Facebook</span>
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className=" col-md-5 text-center ">
            <form className="registration">
              <div className="text-center mt-4">
                <h2 className="title-registration ">Đăng ký</h2>
              </div>

              <div className="register-input form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control  "
                  placeholder=" "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  
                />
                <label className="form-label" htmlFor="username">
                  Tên tài khoản
                </label>
              </div>

              {/* Mật khẩu input */}
              <div className="register-input form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control " // Sử dụng lớp mới
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="password">
                  Mật khẩu
                </label>
              </div>

              {/* Xác nhận mật khẩu input */}
              <div className=" register-input form-outline mb-4">
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control " // Sử dụng lớp mới
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="confirmPassword">
                  Xác nhận mật khẩu
                </label>
              </div>

              {/* Họ và Tên input */}
              <div className=" register-input form-outline mb-4">
                <input
                  type="text"
                  id="fullName"
                  className="form-control " // Sử dụng lớp mới
                  placeholder=" "
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="fullName">
                  Họ và Tên
                </label>
              </div>

              {/* Email input */}
              <div className="register-input form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control " // Sử dụng lớp mới
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  
                />
                <label className="form-label" htmlFor="email">
                  Email
                </label>
              </div>

              {/* Số điện thoại input */}
              <div className="register-input form-outline mb-4">
                <input
                  type="tel"
                  id="phone"
                  className="form-control " // Sử dụng lớp mới
                  placeholder=" "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="phone">
                  Số điện thoại
                </label>
              </div>

              <div className="text-center">
                <button type="submit" className="btn registration-button mb-4">
                  Đăng ký
                </button>
                <p className="small fw-bold">
                  Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay!</a>
                </p>
              </div>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
