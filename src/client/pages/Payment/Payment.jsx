import React, { useEffect, useState } from "react";
import MethodItem from "./Method/MethodItem";
import "./Payment.css";
import momo from "../../../assets/momo.png";
import vnpay from "../../../assets/vnpay.png";
import vietqr from "../../../assets/vietqr.png";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import BankService from "./Bank/serviceBank";
import { useSnackbar } from "notistack";
import { BookingHotelService } from "../../../services/apis/BookingHotelService";
import { PaymentService } from "../../../services/apis/PaymentService";

// Hàm sinh mã ngẫu nhiên
const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const length = 6; // Độ dài chuỗi ngẫu nhiên

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Payment = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const planData = JSON.parse(sessionStorage.getItem("planData")) ?? null;
  const tranData = JSON.parse(sessionStorage.getItem("tranData")) ?? null;
  const acoData = JSON.parse(sessionStorage.getItem("acoData")) ?? null;
  const amount = sessionStorage.getItem("totalPrice");
  const tripData = JSON.parse(sessionStorage.getItem("tripData"));

  const [randomCode, setRanDomCode] = useState("");
  const [activeMethod, setActiveMethod] = useState("");
  const [infoBank, setInfoBank] = useState({
    Amount: amount,
    Description: "Thanh toán cho dịch vụ",
  });

  const [bookingHotelId, setBookingHotelId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const navi = useNavigate();

  // Lưu trữ phương thức thanh toán đã chọn
  const handleMethodClick = (method) => {
    setActiveMethod(method);
  };

  const handlePre = () => {
    if (planData) {
      navi(`/booking/plan`);
    } else if (tranData) {
      navi(`/booking/transportation`);
    } else if (acoData) {
      navi(`/booking/hotel`);
    }
  };

  const handlePayment = async () => {
    if (!activeMethod) {
      enqueueSnackbar("Chưa chọn phương thức thanh toán", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

    if (activeMethod === "VIETQR") {
      const code = generateRandomString();
      setRanDomCode(code);

      const checkinHours = sessionStorage.getItem("checkin");
      const checkoutHours = sessionStorage.getItem("checkout");

      const acData = JSON.parse(sessionStorage.getItem("tripData"));

      const bookingDetails = tripData.accomodation.rooms.map((room) => ({
        roomId: room.roomId,

        checkInTime: checkinHours ? checkinHours : "",
        checkOutTime: checkoutHours ? checkoutHours : "",
        price: acData?.accomodation?.price_per_night || 0,
      }));

      const dataToSend = {
        bookingHotelDetailDto: bookingDetails,
        paymentId: 3,
      };

      console.log(JSON.stringify(dataToSend, null, 2));

      const contentWithCode = `${infoBank.Description} ${code}`;
      const qrCode = BankService.generateVietQR(
        infoBank.Amount * 10,
        contentWithCode
      );

      try {
        const res = await BookingHotelService.create(dataToSend);
        console.log(res);
        setBookingHotelId(res.data.bookingHotelId);
        setQrCode(qrCode);
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    } else if (activeMethod === "VNPAY") {
      await BankService.VNPay();
    } else if (activeMethod === "MOMO") {
      enqueueSnackbar("Chưa triển khai MOMO", {
        variant: "info",
        autoHideDuration: 2000,
      });
    }
  };

  // Kiểm tra thanh toán VietQR
  useEffect(() => {
    if (qrCode) {
      const intervalId = setInterval(() => {
        BankService.checkPaidVietQR(
          infoBank.Amount * 10,
          infoBank.Description,
          randomCode
        ).then((status) => {
          console.log(status);

          if (status) {
            PaymentService.paymentVietQr(bookingHotelId).then(() => {
              // alert("Thanh toán thành công");\
              enqueueSnackbar("Thanh toán thành công", {
                variant: "success",
                autoHideDuration: 2000,
                onExit: () => {
                  navi("/success");
                },
              });
            });
          }
        });
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [qrCode]);

  // Chuyển đổi số tiền sang định dạng VND
  const convertToVND = (amount) => {
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedAmount}.000VNĐ`;
  };

  return (
    <>
      {!qrCode ? (
        <div className="payment-container" style={{ margin: "0 200px" }}>
          <div className="payment-header">
            <div className="text">Chọn hình thức thanh toán</div>
            <div
              className="payment-method"
              style={{ display: "flex", gap: "50px", margin: "20px 0" }}
            >
              <MethodItem
                method="MOMO"
                image={momo}
                fee="Miễn phí"
                active={activeMethod === "MOMO"}
                onClick={() => handleMethodClick("MOMO")}
              />
              <MethodItem
                method="VNPAY"
                image={vnpay}
                fee="Miễn phí"
                active={activeMethod === "VNPAY"}
                onClick={() => handleMethodClick("VNPAY")}
              />
              <MethodItem
                method="VIETQR"
                image={vietqr}
                fee="Miễn phí"
                active={activeMethod === "VIETQR"}
                onClick={() => handleMethodClick("VIETQR")}
              />
            </div>
          </div>

          <h4>Chi tiết giao dịch</h4>
          <div className="payment-body">
            <div className="payment-body-left">
              <div className="head">
                <p style={{ margin: "0", color: "white" }}>
                  Thanh toán dịch vụ
                </p>
              </div>
              <div className="content">
                {planData ? (
                  <>
                    <div className="content-item">
                      <div className="content-item-left">Dịch vụ</div>
                      <div className="content-item-right">Mua vé xe khách</div>
                    </div>
                    <hr />
                    <div className="content-item">
                      <div className="content-item-left">Tạm tính</div>
                      <div className="content-item-right">
                        {convertToVND(sessionStorage.getItem("priceTr"))}
                      </div>
                    </div>
                    <hr />
                    <div className="content-item">
                      <div className="content-item-left">Dịch vụ</div>
                      <div className="content-item-right">
                        Đặt phòng khách sạn
                      </div>
                    </div>
                    <hr />
                    <div className="content-item">
                      <div className="content-item-left">Tạm tính</div>
                      <div className="content-item-right">
                        {convertToVND(sessionStorage.getItem("priceAc"))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {tranData && (
                      <>
                        <div className="content-item">
                          <div className="content-item-left">Dịch vụ</div>
                          <div className="content-item-right">
                            Mua vé xe khách
                          </div>
                        </div>
                        <hr />
                        <div className="content-item">
                          <div className="content-item-left">Tạm tính</div>
                          <div className="content-item-right">
                            {convertToVND(1000)}
                          </div>
                        </div>
                      </>
                    )}
                    {acoData && (
                      <>
                        <div className="content-item">
                          <div className="content-item-left">Dịch vụ</div>
                          <div className="content-item-right">
                            Đặt phòng khách sạn
                          </div>
                        </div>
                        <hr />
                        <div className="content-item">
                          <div className="content-item-left">Tạm tính</div>
                          <div className="content-item-right">
                            {convertToVND(infoBank.Amount)}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="payment-body-right">
              <div className="head">
                <p style={{ margin: "0", color: "white" }}>
                  Thanh toán giao dịch
                </p>
              </div>
              <div className="content">
                <div className="content-item">
                  {/* <div className="content-item-left">
                    Dịch vụ bảo hiểm xe khách
                  </div>
                  <div className="content-item-right">{convertToVND(20)}</div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="payment-footer">
            <div className="payment-footer-right">
              <div className="componentButtonNext">
                <div className="total-price">
                  <div className="text">
                    <p className="text-1">Tổng tiền</p>
                    <p className="text-2">Đã bao gồm thuế và phí</p>
                  </div>
                  <div className="price">
                    <p>{convertToVND(infoBank.Amount)}</p>
                  </div>
                </div>
                <div className="button-next">
                  <button className="prev btn" onClick={handlePre}>
                    Quay lại
                  </button>
                  <button className="next btn" onClick={handlePayment}>
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="payment__qr-code text-center">
          <h2>Vui lòng quét mã thanh toán</h2>
          <h4 className="text-info">
            Thanh toán thành công sẽ tự động cập nhật trạng thái giao dịch
          </h4>
          <img className="payment__qr-code-img" src={qrCode} alt="QR code" />
        </div>
      )}
    </>
  );
};

export default Payment;
