import React, { useEffect, useState } from "react";
import MethodItem from "./Method/MethodItem";
import "./Payment.css";
import momo from "../../../assets/momo.png";
import vnpay from "../../../assets/vnpay.png";
import vietqr from "../../../assets/vietqr.png";
import { Link, useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [ticketId, setTicketId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [activeMethod, setActiveMethod] = useState("");
  const handleMethodClick = (method) => {
    setActiveMethod(method);
  };

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
