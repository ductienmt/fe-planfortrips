import React from "react";
import "./ChangePassword.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { InputFlied } from "../../../Components/Input/InputFlied";
import { useSnackbar } from "notistack";
import { UserService } from "../../../../services/apis/UserService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import Loader from "../../../Components/Loading";

const ChangePassword = ({ email }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [timeLeft, setTimeLeft] = React.useState(300);
  const [isTimerActive, setIsTimerActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [formData, setFormData] = React.useState({
    oldPassword: "",
    newPassword: "",
  });

  const inputRefs = React.useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
    });
    setConfirmPassword("");
    setOtp(new Array(6).fill(""));
    inputRefs.current.forEach((ref) => {
      if (ref) ref.value = "";
    });
    setLoading(false);
  };

  const validatePassword = () => {
    if (formData.newPassword !== confirmPassword) {
      enqueueSnackbar("Mật khẩu không khớp", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (formData.oldPassword === "" || formData.newPassword === "") {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword() || !validateForm()) {
      return;
    }

    try {
      const res = await UserService.changePassword(formData);
      enqueueSnackbar(res.data.message, {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          handleReset();
          logout();
          navigate("/login");
        },
      });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Đã có lỗi xảy ra", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const handleKeyUp = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];

    if (/^[0-9]$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (e.key === "Backspace") {
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }

    // console.log("Current OTP:", newOtp.join(""));
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    const maskedUsername =
      "*".repeat(Math.max(username.length - 2, 0)) + username.slice(-2);
    return `${maskedUsername}@${domain}`;
  };

  const sendEmail = async () => {
    try {
      setIsTimerActive(true);
      await UserService.sendOTP(email, "thay đổi mật khẩu");
      enqueueSnackbar("Đã gửi mã OTP", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.response?.data?.message || "Đã có lỗi xảy ra khi gửi mail",
        {
          variant: "error",
          autoHideDuration: 1000,
        }
      );
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      enqueueSnackbar("Vui lòng nhập đầy đủ mã OTP", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return;
    }

    try {
      await UserService.verifyOTP(email, otpCode);
      enqueueSnackbar("Xác thực thành công", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          handleReset();
          handleStartTimer();
          document.getElementById("showPass").click();
        },
      });
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Đã có lỗi xảy ra khi xác thực",
        {
          variant: "error",
          autoHideDuration: 1000,
        }
      );
    }
  };

  React.useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive]);

  const handleStartTimer = () => {
    setTimeLeft(300);
    setIsTimerActive(false);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="change-pass-container">
            <div className="head">
              <h2 style={{ fontWeight: "600" }}>Mật khẩu</h2>
              <span>Thay đổi mật khẩu của bạn tại đây !</span>
            </div>
            <button
              style={{ display: "none" }}
              data-bs-toggle="modal"
              data-bs-target="#pass"
              id="showPass"
            ></button>
            <div
              className="change-pass-card mt-4"
              onClick={sendEmail}
              data-bs-toggle="modal"
              data-bs-target="#verifyOTP"
            >
              <span>Thay đổi mật khẩu</span>
              <ArrowForwardIosIcon
                data-bs-toggle="modal"
                data-bs-target="#verifyOTP"
              />
            </div>
          </div>

          <div
            className="modal fade"
            id="pass"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-profile-custom custom-change-pass">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body" style={{ paddingTop: "0" }}>
                  <h3 style={{ fontWeight: "600" }} className="text-center">
                    Đổi mật khẩu
                  </h3>
                  <InputFlied
                    value={formData.oldPassword}
                    onChange={handleChange}
                    content={"Mật khẩu hiện tại"}
                    nameInput={"oldPassword"}
                    typeInput={"password"}
                    onBlur={validateForm}
                  />
                  <InputFlied
                    value={formData.newPassword}
                    onChange={handleChange}
                    content={"Mật khẩu mới"}
                    nameInput={"newPassword"}
                    typeInput={"password"}
                    onBlur={validateForm}
                  />
                  <InputFlied
                    content={"Xác nhận mật khẩu"}
                    nameInput={"confirmPassword"}
                    typeInput={"password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validatePassword}
                  />
                </div>
                <div
                  className="modal-footer"
                  style={{ width: "100%", borderTop: "none" }}
                >
                  <button
                    data-bs-dismiss="modal"
                    type="button"
                    className="custome-button-footer"
                    onClick={handleSubmit}
                    style={{
                      width: "100%",
                      height: "50px",
                      margin: "0",
                      border: "none",
                    }}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="verifyOTP"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-profile-custom">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <h3
                    style={{ fontWeight: "600" }}
                    className="text-center mb-0"
                  >
                    Xác nhận mã OTP
                  </h3>
                  <p className="text-center w-75 mx-auto">
                    Mã OTP 6 số được gửi qua <span>{maskEmail(email)}</span> vui
                    lòng nhập để tiếp tục !
                  </p>
                  <div className="timer">
                    <div className="timer-box">
                      <span className="timer-digit">{minutes[0]}</span>
                      <span className="timer-digit">{minutes[1]}</span>
                      <span className="timer-separator">:</span>
                      <span className="timer-digit">{seconds[0]}</span>
                      <span className="timer-digit">{seconds[1]}</span>
                    </div>
                  </div>
                  <div className="inputContainer">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="otp-input"
                        required
                        ref={(el) => (inputRefs.current[index] = el)}
                        onKeyUp={(e) => handleKeyUp(e, index)}
                        onFocus={(e) => e.target.select()}
                      />
                    ))}
                  </div>
                </div>
                <div
                  className="modal-footer"
                  style={{ width: "100%", borderTop: "none" }}
                >
                  <button
                    className="custom-button-verified"
                    type="submit"
                    onClick={handleVerifyOTP}
                  >
                    Xác nhận
                  </button>
                  <p
                    className="resendNote"
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: "#6c757d",
                      marginTop: "10px",
                      width: "100%",
                    }}
                  >
                    Bạn không nhận được mã?{" "}
                    <button
                      className="resendBtn"
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#007bff",
                        fontWeight: "bold",
                      }}
                      onClick={sendEmail}
                    >
                      Gửi lại
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChangePassword;
