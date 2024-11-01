import React, { useEffect, useState } from "react";
import MethodItem from "./Method/MethodItem";
import "./Payment.css";
import momo from "../../../assets/momo.png";
import vnpay from "../../../assets/vnpay.png";
import vietqr from "../../../assets/vietqr.png";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import BankService from './Bank/serviceBank'
import { Description } from "@mui/icons-material";

const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 6; // Độ dài chuỗi ngẫu nhiên
  
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log(result);
    
    return result;
  };

const Payment = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount');  
  const queryParams = new URLSearchParams(location.search);
  const [ticketId, setTicketId] = useState(null);
  const [randomCode,setRanDomCode] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [planId, setPlanId] = queryParams.get('planid');
  const [activeMethod, setActiveMethod] = useState("");
  const navi = useNavigate();

  


  const [infoBank, setInfoBank] = useState({
    Amount: amount,
    Description: `Thanh toan cho dich vu ${planId}`
  });

  const [qrCode, setQrCode] = useState("");

  const handleMethodClick = (method) => {
    setActiveMethod(method);
  };

  
  const handlePayment = async () => {
    if (!activeMethod) {
      alert("Chưa chọn phương thức thanh toán")
      return;
    }
    if (activeMethod === "VIETQR") {
      // Thực hiện thanh toán VietQR
      const code = generateRandomString();
      setRanDomCode(code);
      
      const contentWithCode = infoBank.Description + " " + code;
      
      const qrCode = BankService.generateVietQR(infoBank.Amount, contentWithCode);
      setQrCode(qrCode);
    }
    if (activeMethod === "VNPAY") {
      // Thực hiện thanh toán VNPay
      await BankService.VNPay();
    }
  };


 


  // Check khi thanh toán VietQR
  useEffect(() => {
     const params = new URLSearchParams(location.search);
    const ticketIdParam = params.get("ticketid");
    const bookingIdParam = params.get("bookingid");
    if (ticketIdParam) setTicketId(ticketIdParam);
    if (bookingIdParam) setBookingId(bookingIdParam);
    console.log(ticketIdParam, bookingIdParam);
    // Kiểm tra khi thanh toán bằng vietQR code
    if (qrCode) {
      // Check đã thanh toán -> Chuyển trang
      // Bắt đầu kiểm tra thanh toán nếu mã QR đã được tạo      
      const intervalId = setInterval(() => {
        BankService.checkPaidVietQR(infoBank.Amount, infoBank.Description, randomCode).then((status) => {
          if (status) {
            navi('/success')
          }
        });
      }, 3000); // Kiểm tra mỗi 3 giây
      // Xóa interval khi thanh toán thành công hoặc component bị unmount
      return () => clearInterval(intervalId);
    }
  }, [qrCode, location.search]);

  // Check thanh toán VnPay
  const convertToVND = (amount) => {
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedAmount}VNĐ`;
  };

  const checkPaid = async () => {
    try {
      console.log("Check 1 lần");
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbypcs1V21R_GxdsvjQo0mUBeZDhhDr7bTHeIejfVsKkfvQ5npazvDMyAqu0_Hd_7nJA/exec"
      );
      const res = await response.json();

      for (let record of res.data) {
        console.log(record);
        if (
          record["Giá trị"] === infoBank.Amount &&
          record["Mô tả"].includes(infoBank.Description)
        ) {
          navi("/success");
        }
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra thanh toán:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ticketIdParam = params.get("ticketid");
    const bookingIdParam = params.get("bookingid");
    if (ticketIdParam) setTicketId(ticketIdParam);
    if (bookingIdParam) setBookingId(bookingIdParam);
    console.log(ticketIdParam, bookingIdParam);
  }, [location.search]);

  return (
    <>
      {/* Phần hiển thị mã QR */}
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
                        {convertToVND(1000000)}
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
                        {convertToVND(800000)}
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
                  <div className="content-item-left">
                    Dịch vụ bảo hiểm xe khách
                  </div>
                  <div className="content-item-right">
                    {convertToVND(40000)}
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="payment-footer">
            {/* Footer cho tổng tiền và mã giảm giá */}
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
                  <Link to="/booking" className="prev btn">
                    Quay lại
                  </Link>
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
          <h4 className="text-info">Thanh toán thành công sẽ tự động chuyển trang</h4>
          <img src={qrCode} alt="Mã QR Thanh Toán" />
        </div>
      )}
    </>
  );
};

export default Payment;
