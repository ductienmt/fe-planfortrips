import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { Select } from "antd";
import React, { useState } from "react";
import "./UserInformation.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const UserInformation = ({ totalPrice, type }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    note: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setIsAgreed((prev) => !prev);
  };

  const handleContinueClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!validateEmail(form.email)) {
        enqueueSnackbar("Email không hợp lệ.", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
      if (!validatePhone(form.phone)) {
        enqueueSnackbar("Số điện thoại không hợp lệ.", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
      console.log(form);
      if (!isAgreed) {
        e.preventDefault();
        enqueueSnackbar("Bạn cần đồng ý với điều khoản trước khi tiếp tục.", {
          variant: "error",
          autoHideDuration: 2000,
        });
      } else {
        // TODO: Call API to create ticket

        navigate(`/payment?ticketid=1&bookingid=1`);
      }
    } else {
      enqueueSnackbar("Vui lòng điền đẩy đủ thông tin.", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const [showDetailPriceTransportation, setShowDetailPriceTransportation] =
    useState(false);
  const [showDetailPriceAccommodation, setShowDetailPriceAccommodation] =
    useState(false);

  const convertToVND = (amount) => {
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedAmount}.000VNĐ`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return (
      form.firstName || form.lastName || form.email || form.phone || form.gender
    );
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^(0[0-9]{9}|[0-9]{10,11})$/; // Ví dụ cho số điện thoại Việt Nam
    return regex.test(phone);
  };

  return (
    <>
      <div className="user-information-container">
        <div className="user-information-card">
          <h4 style={{ fontSize: "18px", margin: "auto 0" }}>
            Thông tin khách hàng
          </h4>
        </div>
        <div style={{ padding: "10px 20px" }}>
          <div className="user-information-header">
            <form action="" className="user-information-form">
              <div className="name">
                <TextField
                  id="outlined-basic"
                  label="Họ"
                  variant="outlined"
                  className="name-input-1"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Tên đệm và tên"
                  variant="outlined"
                  className="name-input-2"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="contact">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="contact-input-1"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  className="contact-input-2"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="gender-note">
                <TextField
                  id="outlined-basic"
                  label="Giới tính"
                  variant="outlined"
                  className="gender-input"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Ghi chú"
                  variant="outlined"
                  className="note-input"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="price-container">
        <div
          className="information-card"
          style={{
            backgroundColor: "#41A5E8",
            borderRadius: "20px 20px 0 0",
            display: "flex",
            justifyContent: "center",
            height: "30px",
          }}
        >
          <h4 style={{ fontSize: "18px", margin: "auto 0", color: "white" }}>
            Chi tiết giá
          </h4>
        </div>
        <div className="price-detail">
          <div className="price-detail-item">
            {type === "plan" && (
              <>
                <div className="price-transportation">
                  <div className="sumary-price">
                    <p>Giá vé</p>
                    <div
                      className="price-icon"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <p>{convertToVND(1000)}</p>
                      <button
                        onClick={() =>
                          setShowDetailPriceTransportation(
                            !showDetailPriceTransportation
                          )
                        }
                        style={{
                          width: "fit-content",
                          height: "fit-content",
                          marginLeft: "5px",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        {showDetailPriceTransportation ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </button>
                    </div>
                  </div>
                  <div
                    className={`detail-price ${
                      showDetailPriceTransportation ? "d-block" : "d-none"
                    }`}
                    style={{ fontSize: "14px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Giá cho 1 vé</p>
                      <p>{convertToVND(250)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Tổng số vé đã đặt</p>
                      <p>4 (cả đi và về)</p>
                    </div>
                  </div>
                </div>
                <div className="price-accommodation">
                  <div className="sumary-price">
                    <p>Giá phòng</p>
                    <div
                      className="price-icon"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <p>{convertToVND(800)}</p>
                      <button
                        onClick={() =>
                          setShowDetailPriceAccommodation(
                            !showDetailPriceAccommodation
                          )
                        }
                        style={{
                          width: "fit-content",
                          height: "fit-content",
                          marginLeft: "5px",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        {showDetailPriceAccommodation ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </button>
                    </div>
                  </div>
                  <div
                    className={`detail-price ${
                      showDetailPriceAccommodation ? "d-block" : "d-none"
                    }`}
                  >
                    <div className="detail-price" style={{ fontSize: "14px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>Giá cho 1 phòng</p>
                        <p>{convertToVND(400)}/1 đêm</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>Tổng số phòng đã đặt</p>
                        <p>1 (2 đêm)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {type === "hotel" && (
              <div className="price-accommodation">
                <div className="sumary-price">
                  <p>Giá phòng</p>
                  <div
                    className="price-icon"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <p>{convertToVND(totalPrice)}</p>
                    <button
                      onClick={() =>
                        setShowDetailPriceAccommodation(
                          !showDetailPriceAccommodation
                        )
                      }
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      {showDetailPriceAccommodation ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </button>
                  </div>
                </div>
                <div
                  className={`detail-price ${
                    showDetailPriceAccommodation ? "d-block" : "d-none"
                  }`}
                >
                  <div className="detail-price" style={{ fontSize: "14px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Giá cho 1 phòng</p>
                      <p>{convertToVND(totalPrice)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Tổng số phòng đã đặt</p>
                      <p>1</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === "transportation" && (
              <div className="price-transportation">
                <div className="sumary-price">
                  <p>Giá vé</p>
                  <div
                    className="price-icon"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <p>{convertToVND(totalPrice)}</p>
                    <button
                      onClick={() =>
                        setShowDetailPriceTransportation(
                          !showDetailPriceTransportation
                        )
                      }
                      style={{
                        width: "fit-content",
                        height: "fit-content",
                        marginLeft: "5px",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      {showDetailPriceTransportation ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </button>
                  </div>
                </div>
                <div
                  className={`detail-price ${
                    showDetailPriceTransportation ? "d-block" : "d-none"
                  }`}
                  style={{ fontSize: "14px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Giá cho 1 vé</p>
                    <p>{convertToVND(totalPrice)}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Tổng số vé đã đặt</p>
                    <p>1</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="price-payment"
            style={{
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "20px", fontWeight: "600" }}>
              Tổng thanh toán
            </p>
            <p style={{ fontSize: "24px", fontWeight: "500" }}>
              {convertToVND(1800)}
            </p>
          </div>
        </div>
      </div>

      <div
        className="argree"
        style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
      >
        <label className="checkBox">
          <input
            id="ch1"
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
          />
          <div className="transition"></div>
        </label>
        <p style={{ margin: "0" }}>
          Tôi đã đọc và đồng ý với <Link to="/">điều khoản sử dụng</Link> và{" "}
          <Link to="/">chính sách bảo mật</Link> của chúng tôi.
        </p>
      </div>

      <div className="componentButtonNext">
        <div className="total-price">
          <div className="text">
            <p className="text-1">Tổng tiền</p>
            <p className="text-2">Đã bao gồm thuế và phí</p>
          </div>
          <div className="price">
            <p>{convertToVND(totalPrice)}</p>
          </div>
        </div>
        <div className="button-next">
          <Link to="/plan/trip" className="prev btn">
            Quay lại
          </Link>
          <button onClick={handleContinueClick} className="next btn">
            Tiếp tục
          </button>
        </div>
      </div>
    </>
  );
};

export default UserInformation;
