import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { Select } from "antd";
import React, { useState } from "react";
import "./UserInformation.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { InputFlied } from "../../../Components/Input/InputFlied";

const UserInformation = ({
  totalPrice,
  type,
  totalPriceTransportation,
  totalPriceAccommodation,
  priceOneSeatDe,
  priceOneSeatRe,
  totalSeat,
  priceOneNight,
  totalRoom,
  nights,
  checkinHours,
  checkoutHours,
}) => {
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
        sessionStorage.setItem("userInformation", JSON.stringify(form));
        sessionStorage.setItem("priceTr", totalPriceTransportation);
        sessionStorage.setItem("priceAc", totalPriceAccommodation);
        sessionStorage.setItem("totalPrice", totalPrice);
        sessionStorage.setItem("checkin", checkinHours);
        sessionStorage.setItem("checkout", checkoutHours);
        navigate(`/payment`);
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
    const regex = /^(0[0-9]{9}|[0-9]{10,11})$/;
    return regex.test(phone);
  };

  // const totalPriceTransportation = () => {
  //   const departurePrice =
  // };

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
              <div className="name-booking mb-3">
                {/* <TextField
                  id="outlined-basic"
                  label="Họ"
                  variant="outlined"
                  className="name-input-1"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                /> */}
                <InputFlied
                  content={"Họ"}
                  nameInput={"firstName"}
                  value={form.firstName}
                  onChange={handleChange}
                  dai={"30%"}
                />
                {/* <TextField
                  id="outlined-basic"
                  label="Tên đệm và tên"
                  variant="outlined"
                  className="name-input-2"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                /> */}
                <InputFlied
                  content={"Tên"}
                  nameInput={"lastName"}
                  value={form.lastName}
                  onChange={handleChange}
                  dai={"70%"}
                ></InputFlied>
              </div>
              <div className="contact mb-3">
                {/* <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="contact-input-1"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                /> */}
                <InputFlied
                  content={"Email"}
                  nameInput={"email"}
                  value={form.email}
                  onChange={handleChange}
                  dai={"45%"}
                ></InputFlied>
                {/* <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  className="contact-input-2"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                /> */}
                <InputFlied
                  content={"Số điện thoại"}
                  nameInput={"phone"}
                  value={form.phone}
                  onChange={handleChange}
                  dai={"55%"}
                />
              </div>
              <div className="gender-note">
                {/* <TextField
                  id="outlined-basic"
                  label="Giới tính"
                  variant="outlined"
                  className="gender-input"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                /> */}
                <InputFlied
                  content={"Giới tính"}
                  nameInput={"gender"}
                  value={form.gender}
                  onChange={handleChange}
                  dai={"20%"}
                />
                {/* <TextField
                  id="outlined-basic"
                  label="Ghi chú"
                  variant="outlined"
                  className="note-input"
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                /> */}
                <InputFlied
                  content={"Ghi chú"}
                  nameInput={"note"}
                  value={form.note}
                  onChange={handleChange}
                  dai={"80%"}
                ></InputFlied>
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
                      <p>{convertToVND(totalPriceTransportation)}</p>
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
                      <p>Giá cho 1 vé chiều đi</p>
                      <p>{convertToVND(priceOneSeatDe)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Giá cho 1 vé chiều về</p>
                      <p>{convertToVND(priceOneSeatRe)}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>Tổng số vé đã đặt</p>
                      <p>
                        <span>{totalSeat}</span> (cả đi và về)
                      </p>
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
                      <p>{convertToVND(totalPriceAccommodation)}</p>
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
                        <p>{convertToVND(priceOneNight)}/1 đêm</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>Tổng số phòng đã đặt</p>
                        <p>
                          {totalRoom} ({nights} đêm)
                        </p>
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
              {convertToVND(totalPrice)}
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
