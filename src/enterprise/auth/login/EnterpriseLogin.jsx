import { useState, useEffect } from "react";
import "./EnterpriseLogin.css";
import { TypeEnterpriseDetailService } from "../../../services/apis/TypeEnterpriseDetailService";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/apis/AuthService";
import { useAuth } from "../../../context/AuthContext/AuthProvider";
import { useSnackbar } from "notistack";

const EnterpriseLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [serviceTypes, setServiceTypes] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    typeDe: null,
    userName: "",
    password: "",
    role: "ROLE_ENTERPRISE",
  });

  const loadServiceType = async () => {
    try {
      const res = await TypeEnterpriseDetailService.getAll();
      setServiceTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Doanh nghiệp - Đăng nhập";
    loadServiceType();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prevState) => ({
      ...prevState,
      [name]: name === "typeDe" ? parseInt(value) || null : value,
    }));
  };

  const handleLogin = async () => {
    try {
      console.log(loginForm);

      const res = await AuthService.login(loginForm);
      login(res.data.data.token, res.data.data.role, res.data.data.userName);
      enqueueSnackbar(res.data.message, {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          navigate("/enerprise/dashboard");
        },
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response?.data?.message || "Đăng nhập thất bại", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className="enterprise-login-container">
      <div className="form-login">
        <form>
          <div className="form-title text-center mt-2 text-white">
            <h1>Đăng nhập</h1>
          </div>
          <div className="form-body">
            <div className="form-group">
              <label htmlFor="serviceType">Loại dịch vụ</label>
              <select
                name="typeDe"
                id="serviceType"
                value={loginForm.typeDe}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Chọn dịch vụ của bạn
                </option>
                {serviceTypes.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="username">Tên tài khoản</label>
              <input
                type="text"
                name="userName"
                id="username"
                placeholder="Nhập tên đăng nhập"
                value={loginForm.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <Link
                to="/enterprise/forgot-password"
                className="forgot-password"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              className="btn custom-button-login"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterpriseLogin;
