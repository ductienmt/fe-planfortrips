import { useState, useEffect, useCallback, useRef } from "react";
import "./ForgotPasswordEnterprise.css";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { TypeEnterpriseDetailService } from "../../../../services/apis/TypeEnterpriseDetailService";
import debounce from "lodash.debounce";
import AccountEtpService from "../../../../services/apis/AccountEnterprise";
import { useAuth } from "../../../../context/AuthContext/AuthProvider";

const ForgotPasswordEnterprise = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const { logout } = useAuth();
  const [fgpEForm, setfgpEForm] = useState({
    email: "",
    phone: "",
  });

  //start
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const sendEmail = useCallback(
    debounce(async () => {
      // Kiểm tra nếu chưa chọn loại dịch vụ
      if (!selectedType) {
        enqueueSnackbar("Vui lòng chọn loại dịch vụ", {
          variant: "error",
          autoHideDuration: 1000,
        });
        return;
      }

      try {
        // setLoading(true);

        // Gửi yêu cầu resetPasswordE để kiểm tra thông tin và gửi OTP
        const response = await AccountEtpService.validateContact(
          selectedType,
          fgpEForm.email,
          fgpEForm.phone
        );
        setIsTimerActive(true);
        await AccountEtpService.sendOTP(fgpEForm.email, "quên mật khẩu");
        enqueueSnackbar("Đã gửi mã OTP", {
          variant: "success",
          autoHideDuration: 1000,
        });
        document.getElementById("openModalOTPEnterprise").click();
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message ||
            "Không thể gửi OTP. Vui lòng thử lại.",
          {
            variant: "error",
            autoHideDuration: 1000,
          }
        );
      }
      // finally {
      //   setLoading(false);
      // }
    }, 300),
    [fgpEForm, selectedType]
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
      await AccountEtpService.verifyOTP(fgpEForm.email, otpCode);
      enqueueSnackbar(
        "Xác thực thành công, mật khẩu sẽ được gửi về email trong 24h !",
        {
          variant: "success",
          autoHideDuration: 1000,
          onExit: () => {
            handleReset();
            handleStartTimer();
            logout();
            navigate("/enterprise/login");
            document.getElementById("closeVerifyOTP").click();
          },
        }
      );
      const response = await AccountEtpService.resetPasswordE(
        selectedType,
        fgpEForm.email,
        fgpEForm.phone
      );
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Đã có lỗi xảy ra khi xác thực",
        {
          variant: "error",
          autoHideDuration: 1000,
        }
      );
    }
  }, [otp, fgpEForm.email]);

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
    setOtp(new Array(6).fill(""));
    inputRefs.current.forEach((ref) => {
      if (ref) ref.value = "";
    });
    setLoading(false);
  }, []);

  //end

  const loadServiceType = async () => {
    try {
      const res = await TypeEnterpriseDetailService.getAll();
      setServiceTypes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Doanh nghiệp - Quên mật khẩu";
    sessionStorage.clear();
    loadServiceType();
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^(0[3|5|7|8|9])+([0-9]{8})$/; // Số điện thoại Việt Nam
    return regex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email" && !validateEmail(value)) {
      enqueueSnackbar("Email không đúng định dạng!", { variant: "error" });
    }

    if (name === "phone" && !validatePhone(value)) {
      enqueueSnackbar("Số điện thoại không hợp lệ!", { variant: "error" });
    }

    if (name === "typeDe") {
      setSelectedType(parseInt(value));
      const selectedService = serviceTypes.find(
        (service) => service.id === parseInt(value)
      );
      setServiceName(selectedService ? selectedService.name : "");
    }

    setfgpEForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="enterprise-forgotPasswordE-container">
        <div className="form-forgotPasswordE">
          <form>
            <div className="form-title text-center mt-2 text-white">
              <h1>QUÊN MẬT KHẨU</h1>
            </div>
            <div className="form-body">
              <div className="form-group">
                <label htmlFor="serviceType">Loại dịch vụ</label>
                <select
                  name="typeDe"
                  id="serviceType"
                  value={selectedType || ""}
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
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={fgpEForm.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Nhập mật khẩu"
                  value={fgpEForm.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn custom-button-forgotPasswordE"
                onClick={(e) => {
                  e.preventDefault();
                  sendEmail();
                }}
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>

      <button
        id="openModalOTPEnterprise"
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#verifyFpOTPE"
      ></button>

      <div
        className="modal fade"
        id="verifyFpOTPE"
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
                Mã OTP 6 số được gửi qua{" "}
                <span>{maskEmail(fgpEForm.email)}</span> vui lòng nhập để tiếp
                tục !
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

export default ForgotPasswordEnterprise;
