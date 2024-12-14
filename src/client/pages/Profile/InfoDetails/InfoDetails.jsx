import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./InfoDetails.css";
import { InputFlied } from "../../../Components/Input/InputFlied";
import { UserService } from "../../../../services/apis/UserService";
import { useSnackbar } from "notistack";

const InfoDetails = ({ email, phone, birthdate, loadAgain }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedModal, setSelectedModal] = React.useState("");
  const [updateInfo, setUpdateInfo] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    phoneNumber: "",
    birthdate: "",
    pass: "",
  });
  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const inputRefs = React.useRef([]);
  const [isTimerActive, setIsTimerActive] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(300);

  const [day, setDay] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [dayOptions, setDayOptions] = React.useState([]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "day") setDay(value);
    if (name === "month") setMonth(value);
    if (name === "year") setYear(value);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  React.useEffect(() => {
    if (month && year) {
      const daysInMonth = getDaysInMonth(month, year);
      const daysArray = Array.from({ length: daysInMonth }, (_, i) =>
        String(i + 1).padStart(2, "0")
      );
      setDayOptions(daysArray);

      if (parseInt(day, 10) > daysInMonth) setDay("01");
    }
  }, [month, year]);

  React.useEffect(() => {
    if (birthdate) {
      const [oldDay, oldMonth, oldYear] = birthdate.split("-");
      setDay(oldDay);
      setMonth(oldMonth);
      setYear(oldYear);
    }
  }, [birthdate]);

  React.useEffect(() => {
    if (day && month && year) {
      const formattedDate = `${day}-${month}-${year}`;
      setFormData((prevFormData) => ({
        ...prevFormData,
        birthdate: formattedDate,
      }));
    }
  }, [day, month, year]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      email: "",
      phoneNumber: "",
      birthdate: "",
      pass: "",
    });
    setUpdateInfo("");
    setSelectedModal("");
    setOtp(new Array(6).fill(""));
    inputRefs.current.forEach((ref) => {
      if (ref) ref.value = "";
    });
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
  };

  const maskEmail = (email) => {
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
          handleUpdateInfo("email");
          handleReset();
          handleStartTimer();
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

  const handleVerifyPass = async () => {
    try {
      const res = await UserService.verifyPassword(formData.pass);
      enqueueSnackbar(res.data?.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
      setFormData({ ...formData, pass: "" });

      if (selectedModal === "email") {
        document.getElementById("showEmail").click();
      } else if (selectedModal === "phone") {
        document.getElementById("showPhone").click();
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Xác thực thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleUpdateInfo = async (type) => {
    try {
      const dataToSend = {
        [type]: formData[type],
      };
      const res = await UserService.upadateInfo(dataToSend);
      enqueueSnackbar(res.data?.message, {
        variant: "success",
        autoHideDuration: 2000,
        onExited: () => {
          setUpdateInfo("");
          setSelectedModal("");
          setFormData({ ...formData, [type]: "" });
          loadAgain();
        },
      });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Cập nhật thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <>
      <div
        className="info-container-profile"
        style={{
          width: "100%",
        }}
      >
        <div className="info-profile-content">
          <div className="head">
            <h2 style={{ fontWeight: "600", marginTop: "2.1rem" }}>
              Chỉnh sửa thông tin
            </h2>
            <p>
              Chúng tôi dùng những thông tin này để xác thực. Bạn hãy thay đổi
              đúng nhé!
            </p>
          </div>
          <button
            style={{ display: "none" }}
            data-bs-toggle="modal"
            data-bs-target="#email"
            id="showEmail"
          ></button>
          <button
            style={{ display: "none" }}
            data-bs-toggle="modal"
            data-bs-target="#phone"
            id="showPhone"
          ></button>
          <div className="body">
            <div className="card">
              <div
                className="info-profile-item"
                style={{ borderRadius: "13px 13px 0 0" }}
                data-bs-toggle="modal"
                data-bs-target="#verify-pass"
                onClick={() => setSelectedModal("email")}
              >
                <div className="left-item">
                  <div className="info-profile-title">Email</div>
                  <div className="info-profile-value">{email}</div>
                </div>
                <div className="right-item">
                  <ArrowForwardIosIcon
                    data-bs-toggle="modal"
                    data-bs-target="#verify-pass"
                    onClick={() => setSelectedModal("email")}
                  />
                </div>
              </div>
              <div
                className="info-profile-item"
                data-bs-toggle="modal"
                data-bs-target="#verify-pass"
                onClick={() => setSelectedModal("phone")}
              >
                <div className="left-item">
                  <div className="info-profile-title">Số điện thoại</div>
                  <div className="info-profile-value">
                    {phone ? phone : "Hiện tại bạn chưa thêm"}
                  </div>
                </div>
                <div className="right-item">
                  <ArrowForwardIosIcon
                    data-bs-toggle="modal"
                    data-bs-target="#verify-pass"
                    onClick={() => setSelectedModal("phone")}
                  />
                </div>
              </div>
              <div
                className="info-profile-item"
                style={{ borderRadius: "0 0 13px 13px" }}
                data-bs-toggle="modal"
                data-bs-target="#birthdate"
              >
                <div className="left-item">
                  <div className="info-profile-title">Ngày sinh</div>
                  <div className="info-profile-value">{birthdate}</div>
                </div>
                <div className="right-item">
                  <ArrowForwardIosIcon
                    data-bs-toggle="modal"
                    data-bs-target="#birthdate"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="verify-pass"
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
                onClick={handleReset}
              ></button>
            </div>
            <div className="modal-body" style={{ paddingTop: "0" }}>
              <h3 style={{ fontWeight: "600" }} className="text-center">
                Xác nhận mật khẩu
              </h3>
              <InputFlied
                value={formData.pass}
                onChange={handleChange}
                content={"Mật khẩu"}
                nameInput={"pass"}
                typeInput={"password"}
              />
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                // data-bs-dismiss="modal"
                type="button"
                className="custome-button-footer"
                onClick={handleVerifyPass}
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
        id="phone"
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
                onClick={handleReset}
              ></button>
            </div>
            <div className="modal-body" style={{ paddingTop: "0" }}>
              <h3 style={{ fontWeight: "600" }} className="text-center">
                Thay đổi số điện thoại
              </h3>
              <InputFlied
                value={formData.phoneNumber}
                onChange={handleChange}
                content={"Số điện thoại"}
                nameInput={"phoneNumber"}
                typeInput={"text"}
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
                onClick={() => {
                  handleUpdateInfo("phoneNumber");
                }}
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
        id="email"
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
                onClick={handleReset}
              ></button>
            </div>
            <div className="modal-body" style={{ paddingTop: "0" }}>
              <h3 style={{ fontWeight: "600" }} className="text-center">
                Thay đổi email
              </h3>
              <InputFlied
                value={formData.email}
                onChange={handleChange}
                content={"Email"}
                nameInput={"email"}
                typeInput={"email"}
              />
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                // data-bs-dismiss="modal"
                type="button"
                className="custome-button-footer"
                onClick={() => {
                  sendEmail();
                }}
                data-bs-toggle="modal"
                data-bs-target="#verifyOTPEmail"
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
        id="birthdate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom custom-select-birthdate">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleReset}
              ></button>
            </div>
            <div className="modal-body" style={{ paddingTop: "0" }}>
              <h3 style={{ fontWeight: "600" }} className="text-center">
                Thay đổi ngày sinh
              </h3>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <select
                    name="day"
                    value={day}
                    onChange={handleSelectChange}
                    className="select-birthdate"
                  >
                    {dayOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <select
                    name="month"
                    value={month}
                    onChange={handleSelectChange}
                    className="select-birthdate"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={String(m).padStart(2, "0")}>
                        {String(m).padStart(2, "0")}
                      </option>
                    ))}
                  </select>

                  <select
                    name="year"
                    value={year}
                    onChange={handleSelectChange}
                    className="select-birthdate"
                  >
                    {Array.from({ length: 40 }, (_, i) => 1970 + i).map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                data-bs-dismiss="modal"
                type="button"
                className="custome-button-footer"
                onClick={() => {
                  handleUpdateInfo("birthdate");
                }}
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
        id="verifyOTPEmail"
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
                onClick={handleReset}
              ></button>
            </div>
            <div className="modal-body">
              <h3 style={{ fontWeight: "600" }} className="text-center mb-0">
                Xác nhận mã OTP
              </h3>
              <p className="text-center w-75 mx-auto">
                Mã OTP 6 số được gửi qua{" "}
                <span>{maskEmail(formData.email)}</span> vui lòng nhập để tiếp
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
                data-bs-dismiss="modal"
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
  );
};

export default InfoDetails;
