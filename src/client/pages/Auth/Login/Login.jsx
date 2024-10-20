// src/components/Auth/Login.jsx
import { useEffect, useState } from "react";
import "./Login.css";
import {
  callBackUrlGoogle,
  getAuthUrl,
} from "../../../../services/apis/Oauth2Service";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../../services/apis/AuthService";
import { useSnackbar } from "notistack";
import handleToken from "../../../../services/HandleToken";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryParam = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [authUrl, setAuthUrl] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        return enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
      const response = await AuthService.login(formData);
      console.log("Đăng nhập thành công:", response.data);
      handleToken.save(
        response.data.data.token,
        response.data.data.userName,
        response.data.data.role
      );
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          navigate("/");
        },
      });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Đăng nhập thất bại", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const validateForm = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    localStorage.clear();
    document.title = "Đăng nhập";
    window.scrollTo(0, 200);
    getAuthUrl().then((res) => {
      setAuthUrl(res);
    });
    const code = queryParam.get("code");
    if (code) {
      handleLoginWithGoogle(code);
    }
  }, [queryParam]);

  const handleLoginWithGoogle = async (code) => {
    const res = await callBackUrlGoogle(code);
    if (res.firstOauth2)
      enqueueSnackbar("Chào mừng bạn lần đầu đăng nhập Google!", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          navigate("/");
        },
      });
    // Đi đâu sau khi đăng nhập thành công thì bỏ vào
    else
      enqueueSnackbar("Chào mừng bạn quay trở lại!", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          navigate("/");
        },
      });
  };

  return (
    <section className="vh-100 login-container">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-7 d-flex justify-content-center">
            <img
              src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
              alt="Background"
              className="auth-image"
            />
          </div>

          <div className="col-md-5">
            <form className="login-form" onSubmit={handleLogin}>
              <div className="text-center mt-4">
                <h2 className="login-title">Đăng nhập</h2>
              </div>

              <div className="input-grup">
                {/* Tên tài khoản input */}
                <div className="custom-input form-outline mb-4">
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    placeholder=" "
                    value={formData.userName}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="form-label">Tên tài khoản</label>
                </div>
                <div className="custom-input form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder=" "
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <label className="form-label" htmlFor="password">
                    Mật khẩu
                  </label>
                </div>
                <div className="forgot-password text-body mb-2">
                  <a href="#!" className="text-body">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <div className="auth-action text-center">
                <button type="submit" className="btn login-btn btn-lg mb-1">
                  Đăng nhập
                </button>
                <p className="small fw-bold">
                  Bạn đã có tài khoản? <a href="/register">Đăng ký ngay!</a>
                </p>
              </div>

              <div className="divider d-flex">
                <p className="">Hoặc đăng nhập bằng</p>
              </div>

              {/* Nút Đăng Nhập bằng Google và Facebook */}
              <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                <Link to={authUrl} className="btn btn-google">
                  <div className="text-decoration-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="main-grid-item-icon"
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
                    </svg>
                    <span className="icon-text1">Google</span>
                  </div>
                </Link>

                <button className="btn btn-facebook">
                  <a href="#" className="text-decoration-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="main-grid-item-icon"
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
