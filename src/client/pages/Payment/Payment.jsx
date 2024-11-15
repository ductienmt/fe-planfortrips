import React, { useEffect, useState } from "react";
import MethodItem from "./Method/MethodItem";
import "./Payment.css";
import momo from "../../../assets/momo.png";
import vnpay from "../../../assets/vnpay.png";
import vietqr from "../../../assets/vietqr.png";
import { Link, useLocation } from "react-router-dom";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import BankService from "./Bank/serviceBank";
import { useSnackbar } from "notistack";

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
  const queryParams = new URLSearchParams(location.search);
  const [ticketId, setTicketId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [searchParams] = useSearchParams();
  const planData = JSON.parse(sessionStorage.getItem("planData")) ?? null;
  const tranData = JSON.parse(sessionStorage.getItem("tranData")) ?? null;
  const acoData = JSON.parse(sessionStorage.getItem("acoData")) ?? null;
  const amount = sessionStorage.getItem("totalPrice");

  const [randomCode, setRanDomCode] = useState("");
  const [activeMethod, setActiveMethod] = useState("");
  const [infoBank, setInfoBank] = useState({
    Amount: amount,
    Description: "Thanh toán cho dịch vụ",
  });
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

  // Xử lý thanh toán
  const handlePayment = async () => {
    if (!activeMethod) {
      // alert("Chưa chọn phương thức thanh toán");
      enqueueSnackbar("Chưa chọn phương thức thanh toán", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

    if (activeMethod === "VIETQR") {
      const code = generateRandomString();
      setRanDomCode(code);
      const contentWithCode = `${infoBank.Description} ${code}`;
      const qrCode = BankService.generateVietQR(
        infoBank.Amount,
        contentWithCode
      );
      setQrCode(qrCode);
    } else if (activeMethod === "VNPAY") {
      await BankService.VNPay();
    }
  };

  // Kiểm tra thanh toán VietQR
  useEffect(() => {
    if (qrCode) {
      const intervalId = setInterval(() => {
        BankService.checkPaidVietQR(
          infoBank.Amount,
          infoBank.Description,
          randomCode
        ).then((status) => {
          if (status) {
            navi("/success");
          }
        });
      }, 3000); // Kiểm tra mỗi 3 giây

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ticketIdParam = params.get("ticketid");
    const bookingIdParam = params.get("bookingid");
    if (ticketIdParam) setTicketId(ticketIdParam);
    if (bookingIdParam) setBookingId(bookingIdParam);
    console.log(ticketIdParam, bookingIdParam);
  }, [location.search]);
    return `${formattedAmount}.000VNĐ`;
  };

  return (
    <>
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
              <p style={{ margin: "0", color: "white" }}>Thanh toán dịch vụ</p>
            </div>
            <div className="content">
              {ticketId && bookingId ? (
                <>
                  <div className="content-item">
                    <div className="content-item-left">Dịch vụ</div>
                    <div className="content-item-right">Mua vé xe khách</div>
                  </div>
                  <hr />
                  <div className="content-item">
                    <div className="content-item-left">Tạm tính</div>
                    <div className="content-item-right">
                      {convertToVND(1000)}
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
                      {convertToVND(1000)}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {ticketId && (
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
                  {bookingId && (
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
                          {convertToVND(1000)}
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
                <div className="content-item-left">
                  Dịch vụ bảo hiểm xe khách
                </div>
                <div className="content-item-right">{convertToVND(20)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-footer">
          <div className="voucher">
            <div
              className="voucher-item"
              style={{ display: "flex", justifyContent: "stretch" }}
            >
              <p style={{ margin: "0", flexGrow: 1, flexBasis: "30%" }}>
                Mã giảm giá
              </p>
              <input
                type="text"
                style={{ flexGrow: 2, flexBasis: "70%", width: "100%" }}
              />

              <div className="voucher-left-item-right"></div>
            </div>
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
          <div className="payment-footer-right">
            <div className="componentButtonNext">
              <div className="total-price">
                <div className="text">
                  <p className="text-1">Tổng tiền</p>
                  <p className="text-2">Đã bao gồm thuế và phí</p>
                </div>
                <div className="price">
                  <p>{convertToVND(10000)}</p>
                </div>
              </div>
              <div className="button-next">
                <Link to="/booking" className="prev btn">
                  Quay lại
                </Link>
                <button className="next btn">Tiếp tục</button>

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
