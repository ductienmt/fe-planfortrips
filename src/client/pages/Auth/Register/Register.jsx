import { useEffect, useState } from "react";
import "./Register.css"; // Custom CSS
import { useSnackbar } from "notistack";
import background from "../../../../assets/image 37.png";
import { Link, useNavigate } from "react-router-dom";
import {
  callBackUrlGoogle,
  getAuthUrl,
} from "../../../../services/apis/Oauth2Service";
import { InputFlied } from "../../../Components/Input/InputFlied";
import { FlatpickrComponent } from "../../../Components/Flatpickr";
import { SelectOptionField } from "../../../Components/Select/SelectOptionField";
import { AuthService } from "../../../../services/apis/AuthService";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryParam = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [authUrl, setAuthUrl] = useState("");
  // const [genderss, setGenderss] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "Nam",
    fullName: "",
    email: "",
    birthdate: "",
  });

  const optionsGender = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
    { value: "Khác", label: "Khác" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData.birthdate.target.value);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData.birthdate);
  };

  const handleRegister = async () => {
    try {
      console.log(formData);

      if (!validateForm()) {
        return enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }

      if (!validatePassword(formData.password, formData.confirmPassword)) {
        return;
      }

      const formDataCopy = {
        ...formData,
        birthdate: new Date(formData.birthdate).toISOString().split("T")[0],
      };

      const response = await AuthService.register(formDataCopy);
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          handleResetForm();
          navigate("/login");
        },
      });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Đăng ký thất bại", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const validateForm = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleResetForm = () => {
    setFormData({
      userName: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      fullName: "",
      email: "",
      birthdate: "",
    });
  };

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      enqueueSnackbar("Mật khẩu không khớp", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return false;
    }
    return true;
  };

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
    else
      enqueueSnackbar("Chào mừng bạn quay trở lại!", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => navigate("/"),
      });
  };

  useEffect(() => {
    document.title = "Đăng ký";
    window.scrollTo(0, 200);
    localStorage.clear();

    getAuthUrl().then((res) => {
      setAuthUrl(res);
    });

    const code = queryParam.get("code");
    if (code) {
      handleLoginWithGoogle(code);
    }
  }, [queryParam]);

  return (
    <section className="vh-100 register-container">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-7 d-flex justify-content-center position-relative">
            <img
              src={background}
              alt="Background"
              className="register-custom-image"
            />
            <div className="position-absolute custom-left-container">
              <div className="register-divider d-flex ">
                <p className="">Hoặc đăng nhập bằng</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <Link to={authUrl} className="btn register-google">
                  <div className="text-decoration-none ">
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
                    </svg>{" "}
                    <span className="icon-text">Google</span>
                  </div>
                </Link>
                <button className="btn register-facebook">
                  <a href="#" className="text-decoration-none ">
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
            </div>
          </div>
          <div className="col-md-5 text-center">
            <form className="registration">
              <div className="text-center mt-4">
                <h2 className="title-registration">Đăng ký</h2>
              </div>

              <div
                className="register-input form-outline mb-4"
                style={{ width: "100%" }}
              >
                <InputFlied
                  typeInput={"text"}
                  content={"Username"}
                  nameInput={"userName"}
                  onChange={handleChange}
                  value={formData.userName}
                />
              </div>

              <div
                className="register-input form-outline mb-4"
                style={{ width: "100%" }}
              >
                <InputFlied
                  typeInput={"password"}
                  content={"Mật khẩu"}
                  nameInput={"password"}
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>

              <div
                className="register-input form-outline mb-4"
                style={{ width: "100%" }}
              >
                <InputFlied
                  content={"Xác nhận mật khẩu"}
                  nameInput={"confirmPassword"}
                  typeInput={"password"}
                  onChange={handleChange}
                  onBlur={() =>
                    validatePassword(
                      formData.password,
                      formData.confirmPassword
                    )
                  }
                />
              </div>

              <div
                className="register-input form-outline mb-4"
                style={{ width: "100%" }}
              >
                <InputFlied
                  typeInput={"text"}
                  content={"Họ tên"}
                  nameInput={"fullName"}
                  onChange={handleChange}
                  value={formData.fullName}
                />
              </div>

              <div
                className="register-input form-outline mb-4"
                style={{ width: "100%" }}
              >
                <InputFlied
                  typeInput={"email"}
                  content={"Email"}
                  nameInput={"email"}
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div
                className="register-input form-outline mb-4"
                style={{ width: "100%" }}
              >
                <InputFlied
                  typeInput={"text"}
                  content={"Số điện thoại"}
                  nameInput={"phoneNumber"}
                  onChange={handleChange}
                  value={formData.phoneNumber}
                />
              </div>

              <div
                className="register-input form-outline"
                style={{ width: "100%" }}
              >
                <FlatpickrComponent
                  name={"birthdate"}
                  value={formData.birthdate}
                  onChange={handleDateChange}
                ></FlatpickrComponent>
              </div>

              <div className="gender-selection" style={{ width: "100%" }}>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setGenderss(e.target.value) & handleChange(e)
                  }
                  style={{
                    width: "100%",
                    height: "40px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <option value="" disabled>
                    Chọn giới tính
                  </option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="text-center" style={{ width: "100%" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRegister}
                  style={{ width: "100%", height: "50px", fontSize: "20px" }}
                >
                  Đăng ký
                </button>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <p className="mb-0">Bạn đã có tài khoản?</p>
                <Link to="/login" className="text-decoration-none mx-2">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
