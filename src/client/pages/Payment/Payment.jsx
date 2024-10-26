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
  const ticketId = searchParams.get('ticketId');
  const [randomCode,setRanDomCode] = useState("");
  
  const [bookingId, setBookingId] = useState(null);
  const [planId, setPlanId] = queryParams.get('planId');
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
  }, [qrCode]);

  // Check thanh toán VnPay
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ticketIdParam = params.get("ticketid");
    const bookingIdParam = params.get("bookingid");
    if (ticketIdParam) setTicketId(ticketIdParam);
    if (bookingIdParam) setBookingId(bookingIdParam);
    console.log(ticketIdParam, bookingIdParam);
  }, [location.search]);

  const convertToVND = (amount) => {
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedAmount}VNĐ`;
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
            {/* Nội dung chi tiết giao dịch */}
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
