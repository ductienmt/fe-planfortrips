import { InputFlied } from "../../../Components/Input/InputFlied";
import "./ForgotPassword.css";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { UserService } from "../../../../services/apis/UserService";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext/AuthProvider";
import debounce from "lodash.debounce";

const ForgotPassword = ({ initialEmail }) => {
  const [email, setEmail] = useState(initialEmail || "");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { logout } = useAuth();

  const [formState, setFormState] = useState("enterEmail");
  const [formData, setFormData] = useState({
    // oldPassword: "",
    newPassword: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const validatePassword = useCallback(() => {
    if (formData.newPassword !== confirmPassword) {
      enqueueSnackbar("Mật khẩu không khớp", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return false;
    }
    return true;
  }, [formData.newPassword, confirmPassword]);

  const validateForm = useCallback(() => {
    if (formData.newPassword === "") {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return false;
    }
    return true;
  }, [formData.newPassword]);

  const sendEmail = useCallback(
    debounce(async () => {
      try {
        setIsTimerActive(true);
        await UserService.sendOTP(email, "quên mật khẩu");
        enqueueSnackbar("Đã gửi mã OTP", {
          variant: "success",
          autoHideDuration: 1000,
        });
        document.getElementById("openModalOTP").click();
      } catch (error) {
        enqueueSnackbar(
          error.response?.data || "Email không tồn tại trong hệ thống",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
    }, 300),
    [email]
  );

  const handleKeyUp = useCallback(
    (e, index) => {
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
    },
    [otp]
  );

  const maskEmail = useCallback((email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    const maskedUsername =
      "*".repeat(Math.max(username.length - 2, 0)) + username.slice(-2);
    return `${maskedUsername}@${domain}`;
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleVerifyOTP = useCallback(async () => {
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
          document.getElementById("closeVerifyOTP").click();
        },
      });
      setFormState("enterNewPassword");
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Đã có lỗi xảy ra khi xác thực",
        {
          variant: "error",
          autoHideDuration: 1000,
        }
      );
    }
  }, [otp, email]);

  useEffect(() => {
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

  useEffect(() => {
    window.scrollTo(0, 200);
  }, []);

  const handleStartTimer = useCallback(() => {
    setTimeLeft(300);
    setIsTimerActive(false);
  }, []);

  const handleReset = useCallback(() => {
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
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validatePassword() || !validateForm()) {
        return;
      }

      if (formData.newPassword !== confirmPassword) {
        enqueueSnackbar("Mật khẩu và xác nhận mật khẩu không khớp!", {
          variant: "error",
          autoHideDuration: 1000,
        });
      }

      try {
        await UserService.resetPassword(email, formData.newPassword);
        enqueueSnackbar("Đổi mật khẩu thành công", {
          variant: "success",
          autoHideDuration: 1000,
          onExit: () => {
            handleReset();
            logout();
            navigate("/login");
          },
        });
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message || "Đã có lỗi xảy ra khi đổi mật khẩu",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
    },
    [
      validatePassword,
      validateForm,
      formData.newPassword,
      confirmPassword,
      email,
      handleReset,
      logout,
      navigate,
    ]
  );

  return (
    <>
      <section className="vh-100 fgp-container">
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
              <form className="fgp-form">
                <div className="input-group" style={{ width: "100%" }}>
                  <div className="custom-input form-outline mb-4">
                    {formState === "enterEmail" && (
                      <>
                        <div className="text-center mt-4">
                          <h2 className="fgp-title">QUÊN MẬT KHẨU</h2>
                        </div>

                        <InputFlied
                          typeInput={"text"}
                          nameInput={"Email"}
                          content={"Email"}
                          dai={400}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div
                          className="auth-action text-center mt-3"
                          style={{ width: "100%" }}
                        >
                          <button
                            type="button"
                            className="btn fgp-btn btn-lg mb-1"
                            onClick={sendEmail}
                          >
                            Xác nhận
                          </button>
                        </div>
                      </>
                    )}

                    {formState === "enterNewPassword" && (
                      <>
                        <div className="forgot-pass-new">
                          <div className="text-center mt-4">
                            <h2 className="fgp-title">ĐỔI MẬT KHẨU</h2>
                          </div>

                          <div className="mb-3">
                            <InputFlied
                              value={formData.newPassword}
                              onChange={handleChange}
                              content={"Mật khẩu mới"}
                              nameInput={"newPassword"}
                              typeInput={"password"}
                              onBlur={validateForm}
                              dai={400}
                            />
                          </div>
                          <div className="mb-3">
                            <InputFlied
                              content={"Xác nhận mật khẩu"}
                              nameInput={"confirmPassword"}
                              typeInput={"password"}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              onBlur={validatePassword}
                              dai={400}
                            />
                          </div>
                          <div
                            className="auth-action text-center"
                            style={{ width: "100%" }}
                          >
                            <button
                              type="button"
                              className="btn fgp-btn btn-lg mb-1"
                              onClick={handleSubmit}
                            >
                              Đổi mật khẩu
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <button
        id="openModalOTP"
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#verifyFpOTP"
      ></button>

      <div
        className="modal fade"
        id="verifyFpOTP"
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
                id="closeVerifyOTP"
              ></button>
            </div>
            <div className="modal-body">
              <h3 style={{ fontWeight: "600" }} className="text-center mb-0">
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
                className="custom-button-verified-Fp"
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
  );
};

export default React.memo(ForgotPassword);
