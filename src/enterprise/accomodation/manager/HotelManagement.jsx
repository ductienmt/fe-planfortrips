import React, { useEffect, useState } from "react";
import "./HotelManagement.css";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { Table } from "antd";
import { HotelService } from "../../../services/apis/HotelService";
import Loader from "../../../client/Components/Loading";
import { enqueueSnackbar } from "notistack";
import ButtonDeleteRoom from "../../components/ButtonDeleteRoom";
import ButtonChangeStatus from "../../components/ButtonChangeStatus";
import ImageEnterprise from "../../components/Image";
import ImageCarousel from "../../components/ImageCarousel";
import ButtonDeletePictureRoom from "../../components/ButtonDeletePictureRoom";
import { LogIn } from "lucide-react";

const HotelManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotelmData, setHotelmData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    description: "",
    address: "",
    hotel_id: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [uploadImages, setUploadImages] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hotelImage, setHotelImage] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages(imageUrls);
      setUploadImages(files);
      setShowReviewModal(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      description: "",
      address: "",
      hotel_id: "",
    });
  };

  const columns = [
    { title: "Tên khách sạn", dataIndex: "hotelName", key: "hotelName" },
    { title: "Địa chỉ", dataIndex: "hotelAddress", key: "hotelAddress" },
    { title: "Mô tả", dataIndex: "hotelDescription", key: "hotelDescription" },
    {
      title: "Hotline",
      dataIndex: "hotelPhoneNumber",
      key: "hotelPhoneNumber",
    },
    { title: "Đánh giá", dataIndex: "rating", key: "rating" },
    {
      title: "Trạng thái",
      dataIndex: "hotelStatus",
      key: "hotelStatus",
      render: (hotelStatus) => (
        <span
          style={{
            color: hotelStatus ? "green" : "white",
            backgroundColor: hotelStatus ? "#49dd51" : "#cc1d1d",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          {hotelStatus ? "Đang hoạt động" : "Ngưng hoạt động"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div
          className="d-flex justify-content-center action-hotel"
          style={{ gap: "5px" }}
        >
          <button
            className="button-edit btn"
            data-bs-toggle="modal"
            data-bs-target="#editHotelModal"
            onClick={() => {
              setFormData({
                name: record.hotelName,
                phoneNumber: record.hotelPhoneNumber,
                description: record.hotelDescription,
                address: record.hotelAddress,
                hotel_id: record.hotelId,
              });

              setContentHeader("Chỉnh sửa thông tin");
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="button-delete btn"
            data-bs-toggle="modal"
            data-bs-target="#deleteHotel"
            onClick={() => {
              setHotelDeleteId(record.hotelId);
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <ImageEnterprise
            tagertModal={"#addPictureHotel"}
            toogleModal={"modal"}
            onClick={() => {
              const imageUrls = record.hotelImages.map((image) => image.url);
              setHotelImage(imageUrls);
            }}
          />
          {/* <button data-bs-toggle="modal" data-bs-target="#addPictureHotel">
            <i className="fa-regular fa-images"></i>
          </button> */}
          <ButtonChangeStatus
            onClick={() => changeStatusHotel(record.hotelId)}
            hotelStatus={record.hotelStatus}
          />
        </div>
      ),
    },
  ];

  const changeStatusHotel = async (record) => {
    try {
      await HotelService.changeHotelStatus(record);
      enqueueSnackbar("Thay đổi trạng thái thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      fetchHotelData();
    } catch (error) {
      console.error("Error changing hotel status", error);
      enqueueSnackbar("Thay đổi trạng thái thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const [hotelDeleteId, setHotelDeleteId] = useState("");

  const fetchHotelData = async () => {
    setIsLoading(true);
    try {
      const response = await HotelService.detail();
      console.log(response);

      setHotelmData(response);
    } catch (error) {
      console.error("Error fetching hotel data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const searchHotel = async (e) => {
    const keyword = e.target.value;
    try {
      const response = await HotelService.search(keyword);
      setHotelmData(response.content);
      console.log(response.content);
    } catch (error) {
      console.error("Error searching hotel", error);
    }
  };

  const handleEditHotel = async () => {
    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
      enqueueSnackbar("Số điện thoại là bắt buộc", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

    try {
      const dataToSend = {
        name: formData.name,
        phone_number: formData.phoneNumber,
        description: formData.description,
        address: formData.address,
      };

      if (formData.hotel_id === "") {
        await HotelService.create(dataToSend);
        enqueueSnackbar("Thêm thành công!", {
          variant: "success",
          autoHideDuration: 2000,
          onExit: () => {
            handleReset();
            fetchHotelData();
          },
        });
      } else {
        await HotelService.update(formData.hotel_id, dataToSend);
        enqueueSnackbar("Cập nhật thành công!", {
          variant: "success",
          autoHideDuration: 2000,
          onExit: () => {
            handleReset();
            fetchHotelData();
          },
        });
      }
    } catch (error) {
      console.error("Error updating hotel", error);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      await HotelService.delete(hotelId);
      enqueueSnackbar("Xóa thành công!", {
        variant: "success",
        autoHideDuration: 2000,
        onExit: () => {
          document.getElementById("closeButtonHotelDelete").click();
          fetchHotelData();
        },
      });
    } catch (error) {
      console.error("Error deleting hotel", error);
    }
  };

  const [contentHeader, setContentHeader] = useState("");

  useEffect(() => {
    document.title = "Quản lý khách sạn";
    fetchHotelData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-100">
          <Loader rong={"80vh"} />
        </div>
      ) : (
        <div className="enterprise-hotelm-container">
          <div className="hotelm-title">
            <h1 className="title">Quản Lý Khách sạn</h1>
          </div>
          <div className="hotelm-content mt-3">
            <div className="nav-filterCombobox-hotelm">
              <InputFlied
                nameInput="search"
                content="Tìm kiếm"
                typeInput="text"
                onChange={(e) => searchHotel(e)}
              />
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#editHotelModal"
                onClick={() => {
                  setContentHeader("Thêm");
                }}
              >
                Thêm khách sạn
              </button>
            </div>

            <div className="content-table mt-4">
              <Table
                columns={columns}
                dataSource={hotelmData.map((hotel, index) => ({
                  ...hotel,
                  key: hotel.id || index,
                }))}
              />
            </div>
          </div>
        </div>
      )}

      <button
        className="btn-close"
        data-bs-dismiss="modal"
        style={{ display: "none" }}
        id="closeButton"
      ></button>

      <div
        className="modal fade"
        id="editHotelModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600" }}>{contentHeader} khách sạn</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleReset();
                }}
              ></button>
            </div>
            <div
              className="modal-body"
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <InputFlied
                value={formData.name}
                onChange={handleChange}
                content={"Tên khách sạn"}
                nameInput={"name"}
                typeInput={"text"}
              />
              <InputFlied
                value={formData.address}
                onChange={handleChange}
                content={"Địa chỉ"}
                nameInput={"address"}
                typeInput={"text"}
              />
              <InputFlied
                value={formData.description}
                onChange={handleChange}
                content={"Mô tả"}
                nameInput={"description"}
                typeInput={"text"}
              />
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
                onClick={handleEditHotel}
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
        id="deleteHotel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom modal-remove-room">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>Xóa nơi ở</h3>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="closeButtonHotelDelete"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-center">
                Bạn có chắc chắn muốn xóa nơi ở này không?
              </p>
              <p>
                <span className="text-danger" style={{ fontWeight: "700" }}>
                  Chú ý:{" "}
                </span>
                Nếu nơi ở đã được khách hàng đặt thì không thể xóa ra khỏi dữ
                liệu của bạn
              </p>
            </div>
            <div
              className="modal-footer"
              style={{
                width: "100%",
                borderTop: "none",
              }}
            >
              <div
                className="w-100 d-flex justify-content-between button-custom"
                style={{ gap: "10px" }}
              >
                <button
                  className="w-50 btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy
                </button>
                <span className="w-50">
                  <ButtonDeleteRoom
                    onClick={() => {
                      handleDeleteHotel(hotelDeleteId);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addPictureHotel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-profile-custom"
          style={{ maxWidth: "1000px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Upload hình ảnh khách sạn
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-toggle="modal"
                data-bs-target="#editInfoRoom"
                // onClick={() => {
                //   setPreviewImage(null);
                //   setSelectedImage(null);
                // }}
              ></button>
            </div>
            <div className="modal-body">
              <ImageCarousel
                roomImages={hotelImage}
                selectedImages={selectedImages}
                // handleCheckboxChange={handleCheckboxChange}
              />
              <hr />
              <div
                className="d-flex justify-content-between"
                style={{ padding: "0 15px" }}
              >
                <ButtonDeletePictureRoom />
                <button
                  className="Documents-btn"
                  onClick={() => document.getElementById("fileInput").click()}
                  style={{ margin: "0" }}
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
              </div>
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/jpeg, image/png, image/jpg, image/svg+xml, image/webp"
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

      {showReviewModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "1000px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Xem trước {selectedImages.length} ảnh
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedImages([]);
                    setUploadImages([]);
                  }}
                />
              </div>

              <div className="modal-body">
                <div className="d-flex flex-wrap gap-2">
                  {selectedImages.map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedImages([]);
                    setUploadImages([]);
                  }}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={handleUploadImage}
                  disabled={isUploading}
                >
                  {isUploading
                    ? `Đang tải ${uploadImages.length} ảnh...`
                    : "Xác nhận"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelManagement;
