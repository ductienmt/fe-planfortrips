import React, { useCallback, useState } from "react";
import "./ProfileDetail.css";
import UserAvatarWithDropdown from "../../../Components/Avatar";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { InputFlied } from "../../../Components/Input/InputFlied";
import { UserService } from "../../../../services/apis/UserService";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../../../utils/getCroppedImg";
import Loading from "../../../Components/Loading";

const ProfileDetail = ({ imgUrl, name, username, loadAgain }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    fullName: "",
    email: "",
    birthdate: "",
    address: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFormData({
      userName: "",
      phoneNumber: "",
      fullName: "",
      email: "",
      birthdate: "",
      address: "",
    });
    setSelectedImage(null);
    setPreviewImage(null);
    setImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setCropModalOpen(false);
    setShowAvatar(true);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeFullName = async () => {
    try {
      const dataToSend = {
        fullName: formData.fullName,
      };

      if (!dataToSend.fullName) {
        enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
          variant: "error",
          autoHideDuration: 1000,
        });
        return;
      }
      const res = await UserService.upadateInfo(dataToSend);
      console.log(res.data);
      enqueueSnackbar(res.data.message, {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          handleReset();
          loadAgain();
        },
      });
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Đã có lỗi xảy ra! Vui lòng thử lại",
        {
          variant: "error",
          autoHideDuration: 2000,
          onExit: () => {
            handleReset();
          },
        }
      );
    }
  };

  const handleChangeUserName = async () => {
    try {
      const dataToSend = {
        userName: formData.userName,
      };
      if (!dataToSend.userName) {
        enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
          variant: "error",
          autoHideDuration: 1000,
        });
        return;
      }
      const res = await UserService.upadateInfo(dataToSend);
      console.log(res.data);
      enqueueSnackbar("Cập nhật thành công vui lòng đăng nhập lại!", {
        variant: "success",
        autoHideDuration: 2000,
        onExit: () => {
          handleReset();
          logout();
          navigate("/login");
        },
      });
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Đã có lỗi xảy ra! Vui lòng thử lại",
        {
          variant: "error",
          autoHideDuration: 2000,
          onExit: () => {
            handleReset();
          },
        }
      );
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
    formData.append("file", blob, "avatar.jpg"); // Tạo file từ blob

    try {
      setLoading(true);
      const res = await UserService.updateImage(formData);
      console.log(res.data);
      enqueueSnackbar(res.data.message, {
        variant: "success",
        autoHideDuration: 1000,
        onExit: () => {
          setLoading(false);
          handleReset();
          loadAgain();
        },
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Có lỗi xảy ra khi tải ảnh lên", {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="profile-detail-container">
            <div className="head" style={{ marginTop: "2rem" }}>
              <h2 style={{ fontWeight: "600" }}>Hồ sơ</h2>
              <p>
                Quản lý thông tin hồ sơ của bạn và sử dụng thông tin trên Plan
                for Trips
              </p>
            </div>
            <div
              className="profile-card"
              data-bs-toggle="modal"
              data-bs-target="#main"
            >
              <div
                className="profile-image"
                style={{
                  width: "max-content",
                  borderRadius: "50%",
                }}
              >
                <UserAvatarWithDropdown
                  size={50}
                  imageUrl={imgUrl}
                ></UserAvatarWithDropdown>
              </div>
              <div className="profile-name" style={{ width: "100%" }}>
                <span style={{ fontSize: "20px", marginLeft: "20px" }}>
                  {name}
                </span>
                <span style={{ fontSize: "20px", marginLeft: "10px" }}>
                  <RemoveIcon />
                </span>
                <span style={{ fontSize: "20px", marginLeft: "10px" }}>
                  {username}
                </span>
              </div>
              <div className="next-button">
                <button data-bs-toggle="modal" data-bs-target="#main">
                  <ArrowForwardIosIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Modal chính */}
          <div
            className="modal fade"
            id="main"
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
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div
                    className="modal-user-image"
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <UserAvatarWithDropdown
                      size={100}
                      imageUrl={imgUrl}
                    ></UserAvatarWithDropdown>
                    <h3 style={{ marginTop: "10px" }}>{name}</h3>
                  </div>
                  <div className="content">
                    <ul>
                      <li
                        style={{
                          borderBottom: "1px solid #fff",
                          borderRadius: "13px 13px 0 0",
                        }}
                      >
                        <button
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#fullname"
                        >
                          <span>Họ và Tên</span>
                          <ArrowForwardIosIcon />
                        </button>
                      </li>
                      <li style={{ borderBottom: "1px solid #fff" }}>
                        <button
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#username"
                        >
                          <span>Tên đăng nhập</span>
                          <ArrowForwardIosIcon />
                        </button>
                      </li>
                      <li style={{ borderRadius: "0 0 13px 13px" }}>
                        <button
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#avt"
                        >
                          <span>Hình đại diện</span>
                          <ArrowForwardIosIcon />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* modal chỉnh name */}
          <div
            className="modal fade"
            id="fullname"
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
                    data-bs-toggle="modal"
                    data-bs-target="#main"
                  ></button>
                </div>
                <div className="modal-body">
                  <h3 style={{ fontWeight: "600" }}>Chỉnh sửa họ và tên</h3>
                  <InputFlied
                    value={formData.fullName}
                    onChange={handleChange}
                    content={"Họ và tên"}
                    nameInput={"fullName"}
                    typeInput={"text"}
                  />
                  {/* <button
                    className="btn mt-2 custom-button-submit"
                    onClick={handleChangeFullName}
                    data-bs-dismiss="modal"
                  >
                    Xác nhận
                  </button> */}
                </div>
                <div
                  className="modal-footer"
                  style={{ width: "100%", borderTop: "none" }}
                >
                  <button
                    data-bs-dismiss="modal"
                    type="button"
                    className="custome-button-footer"
                    onClick={handleChangeFullName}
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

          {/* modal chỉnh username */}
          <div
            className="modal fade"
            id="username"
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
                    data-bs-toggle="modal"
                    data-bs-target="#main"
                  ></button>
                </div>
                <div className="modal-body">
                  <h3 style={{ fontWeight: "600" }}>
                    Chỉnh sửa tên người dùng
                  </h3>
                  <InputFlied
                    value={formData.userName}
                    onChange={handleChange}
                    content={"Username"}
                    nameInput={"userName"}
                    typeInput={"text"}
                  />
                  {/* <button
                    className="btn mt-2 custom-button-submit"
                    onClick={handleChangeUserName}
                    data-bs-dismiss="modal"
                  >
                    Xác nhận
                  </button> */}
                </div>
                <div
                  className="modal-footer"
                  style={{ width: "100%", borderTop: "none" }}
                >
                  <button
                    data-bs-dismiss="modal"
                    type="button"
                    className="custome-button-footer"
                    onClick={handleChangeUserName}
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

          {/* modal chỉnh avatar */}
          <div
            className="modal fade"
            id="avt"
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
                    data-bs-target="#main"
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
                      imageUrl={previewImage ? previewImage : imgUrl}
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
        </>
      )}
    </>
  );
};

export default ProfileDetail;
