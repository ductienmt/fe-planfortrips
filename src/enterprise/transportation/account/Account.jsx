import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Account.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UserAvatarWithDropdown from "../../../client/Components/Avatar";
import { getCroppedImg } from "../../../utils/getCroppedImg";
import Cropper from "react-easy-crop";
import AccountEtpService from "../../../services/apis/AccountEnterprise";
import { enqueueSnackbar } from "notistack";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { UserService } from "../../../services/apis/UserService";
import { useAuth } from "../../../context/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    representative: "",
    name: "",
    img: "",
    taxCode: "",
    pass: "",
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const uploadContact = async () => {
    try {
      const dataToSend = {
        email: formData.email,
        phoneNumber: formData.phone,
      };
      await AccountEtpService.update(dataToSend);
      enqueueSnackbar("Cập nhật thông tin liên lạc thành công", {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.response?.data?.message || "Đã có lỗi xảy ra khi cập nhật",
        {
          variant: "error",
          autoHideDuration: 1000,
        }
      );
    }
  };

  const updateInfo = async () => {
    try {
      const dataToSend = {
        enterpriseName: formData.name,
        representative: formData.representative,
        taxCode: formData.taxCode,
        address: formData.address,
      };
      await AccountEtpService.update(dataToSend);
      enqueueSnackbar("Cập nhật thông tin thành công", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          document.getElementById("closeInfoModalLabel").click();
          setFormData({
            email: "",
            phone: "",
            address: "",
            representative: "",
            name: "",
            img: "",
            taxCode: "",
            pass: "",
          });
        },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.response?.data?.message || "Đã có lỗi xảy ra khi cập nhật",
        {
          variant: "error",
          autoHideDuration: 1000,
        }
      );
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
      await UserService.sendOTP(formData.email, "thay đổi thông tin tài khoản");
      enqueueSnackbar("Đã gửi mã OTP", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {},
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
      await UserService.verifyOTP(formData.email, otpCode);
      enqueueSnackbar("Xác thực thành công", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          uploadContact();
          handleStartTimer();
          setOtp(new Array(6).fill(""));
          inputRefs.current.forEach((ref) => {
            if (ref) ref.value = "";
          });
          setFormData({
            email: "",
            phone: "",
            address: "",
            representative: "",
            name: "",
            img: "",
            taxCode: "",
            pass: "",
          });
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

  const handleVerifyOTPPass = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      enqueueSnackbar("Vui lòng nhập đầy đủ mã OTP", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return;
    }

    try {
      await UserService.verifyOTP(formData.email, otpCode);
      enqueueSnackbar("Xác thực thành công", {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          handleStartTimer();
          setOtp(new Array(6).fill(""));
          inputRefs.current.forEach((ref) => {
            if (ref) ref.value = "";
          });
          setFormData({
            email: "",
            phone: "",
            address: "",
            representative: "",
            name: "",
            img: "",
            taxCode: "",
            pass: "",
          });
        },
      });
      document.getElementById("button-verify-pass-etp").click();
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

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
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

  const loadUserData = async () => {
    try {
      const res = await AccountEtpService.detail();
      // console.log("res", res);
      setFormData({
        email: res.data.email,
        phone: res.data.phoneNumber,
        address: res.data.address,
        representative: res.data.representative,
        name: res.data.enterpriseName,
        img: res.data.urlImage,
        taxCode: res.data.taxCode,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUploadAvatar = async () => {
    if (!previewImage) {
      enqueueSnackbar("Vui lòng chọn ảnh đại diện", {
        variant: "error",
        autoHideDuration: 1000,
      });
      return;
    }

    const formData = new FormData();
    const blob = await fetch(previewImage).then((res) => res.blob());
    formData.append("file", blob, "avatar.jpg");

    try {
      const res = await AccountEtpService.uploadImage(formData);
      // console.log(res.data);
      enqueueSnackbar(res.data, {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          setSelectedImage(null);
          setPreviewImage(null);
          setImage(null);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setCroppedAreaPixels(null);
          setCropModalOpen(false);
          setShowAvatar(true);
          window.location.reload();
        },
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Có lỗi xảy ra khi tải ảnh lên", {
        variant: "error",
        autoHideDuration: 1000,
        onExit: () => {
          setSelectedImage(null);
          setPreviewImage(null);
          setImage(null);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setCroppedAreaPixels(null);
          setCropModalOpen(false);
          setShowAvatar(true);
        },
      });
    }
  };

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(true);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setCropModalOpen(true);
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };
  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setPreviewImage(croppedImage);
      setCropModalOpen(false); // Đóng modal cắt ảnh
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const handleVerifyPass = async () => {
    try {
      console.log("formData.pass", formData.pass);

      const res = await AccountEtpService.verifyPasswordEtp(formData.pass);

      enqueueSnackbar(res.data?.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
      setFormData({ ...formData, pass: "" });

      document.getElementById("showEmailEtp").click();
      sendEmail();
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Xác thực thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Mật khẩu mới và xác nhận mật khẩu phải giống nhau", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    if (!validatePassword(newPassword)) {
      enqueueSnackbar(
        "Mật khẩu phải chứa ít nhất 8 ký tự, 1 chữ cái, 1 số và 1 ký tự đặc biệt",
        {
          variant: "error",
          autoHideDuration: 2000,
        }
      );
      return;
    }
    try {
      await AccountEtpService.changePassword(newPassword);
      enqueueSnackbar("Đổi mật khẩu thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setNewPassword("");
      setConfirmPassword("");
      document.getElementById("closeVerifyPassEtp").click();
      logout();
      navigate("/enterprise/login");
    } catch (error) {
      enqueueSnackbar("Đổi mật khẩu thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    document.title = "Tài khoản";
    loadUserData();
  }, []);

  return (
    <>
      <div className="transportation-account-container">
        {/* Account Modal */}
        <div
          className="modal fade"
          id="accountModalEnterprise"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="accountModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered custom-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="accountModalLabel">
                  THAY ĐỔI THÔNG TIN DOANH NGHIỆP
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="content">
                  <ul>
                    <li>
                      <button
                        className="btn account-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#contactModal"
                        onClick={() => loadUserData()}
                      >
                        <span>Liên lạc</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn account-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#businessInfoModal"
                        onClick={() => loadUserData()}
                      >
                        <span>Thông tin </span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn account-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#avatarModal"
                        onClick={() => loadUserData()}
                      >
                        <span>Thay đổi ảnh đại diện</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn account-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#verifyOTPEmailEtpPass"
                        onClick={() => {
                          loadUserData(),
                            // document.getElementById("showEmailEtp").click(),
                            sendEmail();
                        }}
                      >
                        <span>Thay đổi mật khẩu</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Modal */}
        <div
          className="modal fade"
          id="contactModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="contactModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="contactModalLabel">
                  Cập Nhật Liên Lạc
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        onChange={handleChanges}
                        value={formData.email}
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        placeholder="Số Điện Thoại"
                        onChange={handleChanges}
                        value={formData.phone}
                      />
                      <label htmlFor="phone">Số Điện Thoại</label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#accountModalEnterprise"
                >
                  Quay Lại
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#verify-passEtp"
                >
                  Thay Đổi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Info Modal */}
        <div
          className="modal fade"
          id="businessInfoModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="businessInfoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="businessInfoModalLabel">
                  Cập Nhật Tên Doanh Nghiệp
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="closeInfoModalLabel"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Tên Doanh Nghiệp"
                        onChange={handleChanges}
                        value={formData.name}
                      />
                      <label htmlFor="businessName">Tên Doanh Nghiệp</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="representative"
                        placeholder="Người Đại Diện"
                        onChange={handleChanges}
                        value={formData.representative}
                      />
                      <label htmlFor="representative">Người Đại Diện</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="taxCode"
                        placeholder="Mã Số Thuế"
                        onChange={handleChanges}
                        value={formData.taxCode}
                      />
                      <label htmlFor="taxId">Mã Số Thuế</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Địa Chỉ"
                        onChange={handleChanges}
                        value={formData.address}
                      />
                      <label htmlFor="address">Địa Chỉ</label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#accountModalEnterprise"
                  onClick={() =>
                    setFormData({
                      email: "",
                      phone: "",
                      address: "",
                      representative: "",
                      name: "",
                      img: "",
                      taxCode: "",
                      pass: "",
                    })
                  }
                >
                  Quay Lại
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => updateInfo()}
                >
                  Thay Đổi
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="avatarModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-profile-custom">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Đổi ảnh đại diện
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-toggle="modal"
                  data-bs-target="#accountModalEnterprise"
                  onClick={() => {
                    setPreviewImage(null);
                    setSelectedImage(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div
                  style={{ width: "100%" }}
                  className="d-flex justify-content-center mb-5"
                >
                  <UserAvatarWithDropdown
                    size={200}
                    imageUrl={previewImage ? previewImage : formData.img}
                  ></UserAvatarWithDropdown>
                </div>
                <hr />
                <button
                  className="Documents-btn"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <span className="folderContainer">
                    <svg
                      className="fileBack"
                      width={146}
                      height={113}
                      viewBox="0 0 146 113"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                        fill="url(#paint0_linear_117_4)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_117_4"
                          x1={0}
                          y1={0}
                          x2="72.93"
                          y2="95.4804"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#8F88C2" />
                          <stop offset={1} stopColor="#5C52A2" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg
                      className="filePage"
                      width={88}
                      height={99}
                      viewBox="0 0 88 99"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width={88}
                        height={99}
                        fill="url(#paint0_linear_117_6)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_117_6"
                          x1={0}
                          y1={0}
                          x2={81}
                          y2="160.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" />
                          <stop offset={1} stopColor="#686868" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <svg
                      className="fileFront"
                      width={160}
                      height={79}
                      viewBox="0 0 160 79"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                        fill="url(#paint0_linear_117_5)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_117_5"
                          x1="38.7619"
                          y1="8.71323"
                          x2="66.9106"
                          y2="82.8317"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#C3BBFF" />
                          <stop offset={1} stopColor="#51469A" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <p className="text">Tải ảnh lên</p>
                </button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
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
                  onClick={handleUploadAvatar}
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

        {/* Modal cắt ảnh */}
        {cropModalOpen && (
          <div
            className="modal fade show"
            data-bs-backdrop="static"
            tabIndex="-1"
            aria-labelledby="cropModalLabel"
            aria-hidden="true"
            id="cropModal"
            style={{ display: "block" }}
            // onClick={() => setCropModalOpen(false)}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cắt ảnh</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setCropModalOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div
                    style={{
                      position: "relative",
                      height: "400px",
                      width: "100%",
                    }}
                  >
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      onMouseDown={handleMouseDown}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setCropModalOpen(false);
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCrop}
                  >
                    Cắt
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="modal fade"
          id="verify-passEtp"
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
                  Xác nhận mật khẩu
                </h3>
                <InputFlied
                  value={formData.pass}
                  onChange={handleChanges}
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
      </div>

      <button
        id="showEmailEtp"
        data-bs-toggle="modal"
        data-bs-target="#verifyOTPEmailEtp"
        className="d-none"
      ></button>

      <div
        className="modal fade"
        id="verifyOTPEmailEtp"
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
                onClick={() => {
                  handleStartTimer();
                }}
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

      <div
        className="modal fade"
        id="verifyOTPEmailEtpPass"
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
                onClick={() => {
                  handleStartTimer();
                }}
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
                onClick={handleVerifyOTPPass}
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

      <button
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#verify-pass-etp"
        id="button-verify-pass-etp"
      ></button>

      <div
        className="modal fade"
        id="verify-pass-etp"
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
                id="closeVerifyPassEtp"
                onClick={() => {
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              ></button>
            </div>
            <div className="modal-body" style={{ paddingTop: "0" }}>
              <h3 style={{ fontWeight: "600" }} className="text-center">
                Thay đổi mật khẩu
              </h3>
              <InputFlied
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                content={"Mật khẩu mới"}
                typeInput={"password"}
              />
              <InputFlied
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                content={"Xác nhận mật khẩu"}
                onBlur={() => {
                  if (newPassword !== confirmPassword) {
                    enqueueSnackbar("Mật khẩu không khớp", {
                      variant: "error",
                      autoHideDuration: 2000,
                    });
                  }
                }}
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
                onClick={handleChangePassword}
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
    </>
  );
};

export default Account;
