import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { pink } from "@mui/material/colors";
import { Star } from "../../../../admin/pages/Components/Star";
import { IconButton, Radio, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { CouponService } from "../../../../services/apis/CouponService";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import { useNavigate } from "react-router-dom";
import { Modal, notification } from "antd";
import moment from "moment/moment";
const HotelCart = ({
  hotel,
  selectedRoom,
  setSelectedRoom,
  setLoading,
  checkIn,
  checkOut,
}) => {
  checkIn = moment(checkIn || undefined).format("YYYY-MM-DD");
  checkOut = moment(checkOut || checkIn)
    .add(3, "days")
    .format("YYYY-MM-DD");
  const [openCoupon, setOpenCoupon] = useState(false);
  const couponRef = useRef(null);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [priceRooms, setPriceRooms] = useState(0);
  const [cashAppliedCoupon, setCashAppliedCoupon] = useState(0);
  const [total, setTotal] = useState(0);
  const [accommodationData, setAccommodationData] = useState(null);
  const navigate = useNavigate();
  const handleCouponSelect = (coupon) => {
    setSelectedCoupon(coupon);
    localStorage.setItem("selectedCoupon", JSON.stringify(coupon));
    
    const currentPriceRooms = selectedRoom.reduce(
      (sum, room) => sum + room.price,
      0
    );
  
    let appliedDiscount = 0;
    if (coupon.discount_type === "PERCENT") {
      appliedDiscount = (currentPriceRooms * coupon.discount_value) / 100;
    } else {
      appliedDiscount = coupon.discount_value;
    }
  
    setCashAppliedCoupon(appliedDiscount);
    setTotal(currentPriceRooms - appliedDiscount); 
    setOpenCoupon(false);
  };
  
  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
    setCashAppliedCoupon(0);
    setTotal(priceRooms);
    localStorage.removeItem("selectedCoupon");
  };  
  useEffect(() => {
    const fetch = async () => {
      const storedCoupon = localStorage.getItem("selectedCoupon");
      if (storedCoupon) {
        const parsedCoupon = JSON.parse(storedCoupon);
        setSelectedCoupon(parsedCoupon);
        console.log(selectedCoupon);
        
        const currentPriceRooms = selectedRoom.reduce(
          (sum, room) => sum + room.price,
          0
        );

        let appliedDiscount = 0;
        if (parsedCoupon.discount_type === "PERCENT") {
          appliedDiscount =
            (currentPriceRooms * parsedCoupon.discount_value) / 100;
        } else {
          appliedDiscount = parsedCoupon.discount_value;
        }
        setCashAppliedCoupon(appliedDiscount);
        setTotal(currentPriceRooms - appliedDiscount);
      }
    };
    fetch();
  }, [selectedRoom]);
  useEffect(() => {
    const currentPriceRooms = selectedRoom.reduce((sum, room) => sum + room.price, 0);
    setPriceRooms(currentPriceRooms);
  
    const storedCoupon = localStorage.getItem("selectedCoupon");
  
    if (storedCoupon) {
      const parsedCoupon = JSON.parse(storedCoupon);
  
      let appliedDiscount = 0;
      if (parsedCoupon.discount_type === "PERCENT") {
        appliedDiscount = (currentPriceRooms * parsedCoupon.discount_value) / 100;
      } else {
        appliedDiscount = parsedCoupon.discount_value;
      }
  
      setTotal(currentPriceRooms - appliedDiscount);
    } else {
      setTotal(currentPriceRooms);
    }
  }, [selectedRoom, selectedCoupon]);
  useEffect(() => {
    const fetch = async () => {
      const dataCoupon = await CouponService.getCoupons(0, 100, "");
      if (dataCoupon) {
        var data = dataCoupon.listResponse;
        data = data.filter((d) => d.is_active !== false);
        setCoupons(data);
      }
      setAccommodationData({
        name: hotel?.name,
        room: selectedRoom.map((room) => room?.roomName).join(", "),
        checkIn: checkIn,
        checkInTime: `${checkIn} 14:00:00`,
        checkOutDate: checkOut,
        checkOutTime: `${checkOut} 12:00:00`,
        type: "hotel",
      });
    };
    fetch();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (couponRef.current && !couponRef.current.contains(event.target)) {
        setOpenCoupon(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const convertToVNDDB = (price) => {
    return price + ".000VND ";
  };
  const handleRemove = (id) => {
    const filtered = selectedRoom.filter((item) => item.id !== id);
    setSelectedRoom(filtered);
  };
  const handleFocus = () => {
    setOpenCoupon(true);
  };
  const handlePayment = () => {
    if (!selectedRoom || selectedRoom.length === 0) {
      notification.warning({
        message: "Chưa chọn phòng",
        description: "Vui lòng chọn phòng trước khi thanh toán",
        placement: "topRight",
      });
      return;
    }
    console.log(checkIn);
    console.log(checkOut);
    if (!checkIn || !checkOut) {
      notification.warning({
        message: "Thông tin không đầy đủ",
        description: "Vui lòng chọn ngày check-in và check-out",
        placement: "topRight",
      });
      return;
    }

    Modal.confirm({
      title: "Xác nhận đặt phòng",
      content: (
        <div>
          <p>
            <strong>Khách sạn:</strong> {hotel?.name}
          </p>
          <p>
            <strong>Phòng:</strong>{" "}
            {selectedRoom.map((room) => room?.roomName).join(", ")}
          </p>
          <p>
            <strong>Ngày check-in:</strong> {checkIn}
          </p>
          <p>
            <strong>Ngày check-out:</strong> {checkOut}
          </p>
          <p>
            <strong>Tổng tiền:</strong> {convertToVNDDB(total)}
          </p>
          {selectedCoupon && (
            <p>
              <strong>Mã giảm giá:</strong> {selectedCoupon.code}
            </p>
          )}
        </div>
      ),
      okText: "Xác nhận đặt phòng",
      cancelText: "Hủy",
      onOk() {
        sessionStorage.setItem("acoData", JSON.stringify(accommodationData));
        notification.success({
          message: "Đặt phòng thành công",
          description: "Đang chuyển đến trang thanh toán...",
          duration: 1.5,
          onClose: () => {
            navigate("/booking/hotel");
          },
        });
      },
    });
  };
  return (
    <StyledWrapper>
      <div className="master-container cart-popup">
        <div className="card cart">
          <label className="title">Danh sách phòng đã chọn</label>
          <div className="products">
            {selectedRoom.length > 0
              ? selectedRoom.map((room) => (
                  <>
                    <div className="product" key={room.id}>
                      <RoomServiceIcon />
                      <div>
                        <span>{room.roomName}</span>
                        <p>{room.typeOfRoom}</p>
                        <p>
                          <Star rating={room.rating} />
                        </p>
                      </div>
                      <label className="price small float-right">
                        {convertToVNDDB(room.price)}
                      </label>
                      <Tooltip title="Xóa">
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleRemove(room.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </>
                ))
              : "Chưa có phòng nào được đặt"}
          </div>
        </div>
        <div className="card coupons">
          <label className="title">
            <Tooltip title="Click vào để xem danh sách mã giảm giá">
              Áp dụng mã giảm giá <InfoIcon />
            </Tooltip>
          </label>
          <div className="form">
            <input
              type="text"
              placeholder="Áp mã giảm giá tại đây"
              className="input_field"
              value={selectedCoupon?.code ?? ""}
              onFocus={handleFocus}
              readOnly
            />
            {selectedCoupon && (
              <button
                type="button"
                onClick={handleRemoveCoupon}
                style={{ marginLeft: "10px" }}
              >
                Xóa mã
              </button>
            )}
          </div>
        </div>
        {openCoupon && (
          <div ref={couponRef}>
            <div className="card coupon">
              <label className="title">Danh sách mã giảm giá</label>
              <div className="couponList">
                {coupons.length > 0
                  ? coupons.map((coupon) => (
                      <div className="itemCoupon" key={coupon.coupon_id}>
                        <div
                          className="couponContent"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <label
                              htmlFor={`coupon-${coupon.coupon_id}`}
                              className="couponLabel"
                            >
                              {coupon.code}
                            </label>
                            <label className="price small float-right">
                              Giảm {coupon.discount_value}
                              {coupon.discount_type === "PERCENT" ? "%" : "VNĐ"}
                            </label>
                          </div>

                          <Radio
                            id={`coupon-${coupon.coupon_id}`}
                            name="selectedCoupon"
                            value={coupon.coupon_id}
                            checked={
                              selectedCoupon?.coupon_id === coupon?.coupon_id
                            }
                            onChange={() => handleCouponSelect(coupon)}
                            sx={{
                              color: pink[800],
                              "&.Mui-checked": {
                                color: pink[600],
                              },
                            }}
                          />
                        </div>
                        <label className="expirationDate small float-right">
                          Hạn sử dụng: {coupon.end_date}
                        </label>
                      </div>
                    ))
                  : "Danh sách mã giảm giá trống"}
              </div>
            </div>
          </div>
        )}
        <div className="card checkout">
          <label className="title">Thanh toán</label>
          <div className="details">
            <span>Tổng tiền:</span>
            <span>{convertToVNDDB(priceRooms)}</span>
            <span>Số tiền đã áp mã:</span>
            <span>{convertToVNDDB(cashAppliedCoupon)}</span>
          </div>
          <div className="checkout--footer">
            <label className="price">
              <sup></sup>
              {convertToVNDDB(total)}
            </label>
            <button className="checkout-btn" onClick={handlePayment}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .master-container {
    display: grid;
    grid-template-columns: auto;
    gap: 5px;
  }

  .card {
    width: 400px;
    background: #ffffff;
    box-shadow:
      0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05),
      0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1),
      0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .title {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #efeff3;
    font-weight: 700;
    font-size: 11px;
    color: #63656b;
  }

  /* cart */
  .cart {
    border-radius: 19px 19px 7px 7px;
  }

  .cart .products {
    max-height: 300px;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    padding: 10px;
  }
  .cart .couponList {
    max-height: 300px;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    padding: 10px;
  }
  .couponList .itemCoupon {
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 5px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  .cart .products .product {
    display: grid;
    grid-template-columns: 60px 1fr 80px 1fr;
    gap: 10px;
  }

  .cart .products .product span {
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin-bottom: 8px;
    display: block;
  }

  .cart .products .product p {
    font-size: 11px;
    font-weight: 600;
    color: #7a7c81;
  }

  .cart .quantity {
    height: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: auto;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  }

  .cart .quantity label {
    width: 20px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    font-size: 15px;
    font-weight: 700;
    color: #47484b;
  }

  .cart .quantity button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: none;
    background-color: transparent;
    padding-bottom: 2px;
  }

  .card .small {
    font-size: 15px;
    margin: 0 0 auto auto;
  }

  .card .small sup {
    font-size: px;
  }

  /* coupons */
  .coupons {
    border-radius: 7px;
  }

  .coupons .form {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    padding: 10px;
  }

  .input_field {
    width: auto;
    height: 36px;
    padding: 0 0 0 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #e5e5e5;
    filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px #242424;
    background-color: transparent;
  }

  .coupons .form button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    gap: 10px;
    width: 100%;
    height: 36px;
    background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
    box-shadow:
      0px 0.5px 0.5px #efefef,
      0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 5px;
    border: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #ffffff;
  }

  /* Checkout */
  .checkout {
    border-radius: 9px 9px 19px 19px;
  }

  .checkout .details {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 10px;
    gap: 5px;
  }

  .checkout .details span {
    font-size: 13px;
    font-weight: 600;
  }

  .checkout .details span:nth-child(odd) {
    font-size: 11px;
    font-weight: 700;
    color: #707175;
    margin: auto auto auto 0;
  }

  .checkout .details span:nth-child(even) {
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin: auto 0 auto auto;
  }

  .checkout .checkout--footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: #efeff3;
  }

  .price {
    position: relative;
    font-size: 22px;
    color: #2b2b2f;
    font-weight: 900;
  }

  .price sup {
    font-size: 13px;
  }
  .coupon {
    position: absolute;
    bottom: 20px;
    left: -235px;
    max-width: 250px;
    width: 100%;
    z-index: 100;
  }
  .price sub {
    width: fit-content;
    position: absolute;
    font-size: 11px;
    color: #5f5d6b;
    bottom: 5px;
    display: inline-block;
  }

  .checkout .checkout-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
    box-shadow:
      0px 0.5px 0.5px #efefef,
      0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 7px;
    border: 0;
    outline: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }
`;

export default HotelCart;
