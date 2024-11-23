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
import { PlanServiceApi } from "../../../services/apis/PlanServiceApi";
import { TicketService } from "../../../services/apis/TicketService";
import vouchericon from "../../../assets/vouchericon.png";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { InputFlied } from "../../Components/Input/InputFlied";
import { CouponService } from "../../../services/apis/CouponService";
import Loader from "../../Components/Loading";

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
  const [discountAmount, setDiscountAmount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const planData = JSON.parse(sessionStorage.getItem("planData")) ?? null;
  const tranData = JSON.parse(sessionStorage.getItem("tranData")) ?? null;
  const acoData = JSON.parse(sessionStorage.getItem("acoData")) ?? null;
  const amount = sessionStorage.getItem("totalPrice");
  const tripData = JSON.parse(sessionStorage.getItem("tripData"));
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreatePlan = async () => {
    const finalPlanData =
      JSON.parse(sessionStorage.getItem("planData")) ?? null;
    finalPlanData.totalPrice = sessionStorage.getItem("totalPrice");
    if (finalPlanData) {
      try {
        const res = await PlanServiceApi.savePlan(finalPlanData);
        console.log(res.data);
        enqueueSnackbar("Tạo kế hoạch thành công", {
          variant: "success",
          autoHideDuration: 2000,
          onExit: () => {
            sessionStorage.removeItem("planData");
            sessionStorage.removeItem("checkin");
            sessionStorage.removeItem("checkout");
            sessionStorage.removeItem("priceAc");
            sessionStorage.removeItem("priceTr");
            sessionStorage.removeItem("totalPrice");
            sessionStorage.removeItem("userInformation");
            sessionStorage.removeItem("tripData");
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleCreateBooking = async (bookingDetails, paymentId) => {
    const dataToSendBooking = {
      bookingHotelDetailDto: bookingDetails,
      paymentId: paymentId,
    };

    try {
      const res = await BookingHotelService.create(dataToSendBooking);
      console.log(res);
      setBookingHotelId(res.data.bookingHotelId);
      const updatedPlanData = { ...planData };
      let updated = false;

      updatedPlanData.planDetails.forEach((detail) => {
        if (detail.hotelId) {
          detail.ticketId = res.data.bookingHotelId;
          updated = true;
        }
      });

      if (updated) {
        console.log(updatedPlanData);
        sessionStorage.setItem("planData", JSON.stringify(updatedPlanData));
      } else {
        console.log("No hotel found to update ticketId.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleCreateTicket = async (
    scheduleId,
    totalPrice,
    paymentId,
    codeCoupon,
    seatsId,
    carId
  ) => {
    const dataToSend = {
      user_name: sessionStorage.getItem("username"),
      schedule_id: scheduleId,
      total_price: totalPrice,
      payment_id: paymentId,
      status: "PENDING",
    };

    try {
      const res = await TicketService.create(dataToSend, seatsId, codeCoupon);
      console.log(res.data);

      const ticketId = res.data.ticketId;

      const updatedPlanData = { ...planData };
      let updated = false;

      updatedPlanData.planDetails.forEach((detail) => {
        if (detail.carId === carId) {
          detail.ticketId = ticketId;
          updated = true;
        }
      });

      if (updated) {
        console.log("Updated PlanData with TicketId:", updatedPlanData);
        sessionStorage.setItem("planData", JSON.stringify(updatedPlanData));
      } else {
        console.log("No matching carId found in PlanDetails.");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const getSeats = (seatsBook) => {
    const seats = seatsBook
      ? seatsBook.map((seat) => seat.seat_id).join(",")
      : "Chưa có dữ liệu chỗ ngồi";

    return seats.toString();
  };

  const handleSubmit = async () => {
    const tData = JSON.parse(sessionStorage.getItem("tripData"));
    console.log(getSeats(tData?.transportation?.return?.seatBook));
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

      const contentWithCode = `${infoBank.Description} ${code}`;
      const qrCode = BankService.generateVietQR(
        infoBank.Amount,
        contentWithCode
      );

      if (planData) {
        // booking
        const checkinHours = sessionStorage.getItem("checkin");
        const checkoutHours = sessionStorage.getItem("checkout");

        const tData = JSON.parse(sessionStorage.getItem("tripData"));

        const bookingDetails = tripData.accomodation.rooms.map((room) => ({
          roomId: room.roomId,

          checkInTime: checkinHours ? checkinHours : "",
          checkOutTime: checkoutHours ? checkoutHours : "",
          price: tData?.accomodation?.price_per_night || 0,
        }));

        // ticket

        const scheduleIdDe = tData?.transportation?.departure?.scheduleId;
        const scheduleIdRe = tData?.transportation?.return?.scheduleId;
        const totalPriceTrDe = tData?.transportation?.departure?.totalPrice;
        const totalPriceTrRe = tData?.transportation?.return?.totalPrice;

        planData.discountPrice = calculateTotalDiscount();
        planData.finalPrice = calculateTotalAmount();

        try {
          setIsLoading(true);
          await handleCreateBooking(bookingDetails, 3);
          await handleCreateTicket(
            scheduleIdDe,
            totalPriceTrDe,
            3,
            voucherRes ? voucherRes.code : "",
            getSeats(tData?.transportation?.departure?.seatBook),
            tData?.transportation?.departure?.carId
          );
          await handleCreateTicket(
            scheduleIdRe,
            totalPriceTrRe,
            3,
            voucherRes ? voucherRes.code : "",
            getSeats(tData?.transportation?.return?.seatBook),
            tData?.transportation?.return?.carId
          );
          sessionStorage.setItem("planData", JSON.stringify(planData));
          await handleCreatePlan();
          setQrCode(qrCode);
        } catch (error) {
          console.error("Error creating booking:", error);
        } finally {
          setIsLoading(false);
        }
      }
    } else if (activeMethod === "VNPAY") {
      if (planData) {
        const checkinHours = sessionStorage.getItem("checkin");
        const checkoutHours = sessionStorage.getItem("checkout");

        const tData = JSON.parse(sessionStorage.getItem("tripData"));

        const bookingDetails = tripData.accomodation.rooms.map((room) => ({
          roomId: room.roomId,

          checkInTime: checkinHours ? checkinHours : "",
          checkOutTime: checkoutHours ? checkoutHours : "",
          price: tData?.accomodation?.price_per_night || 0,
        }));

        // ticket

        const scheduleIdDe = tData?.transportation?.departure?.scheduleId;
        const scheduleIdRe = tData?.transportation?.return?.scheduleId;
        const totalPriceTrDe = tData?.transportation?.departure?.totalPrice;
        const totalPriceTrRe = tData?.transportation?.return?.totalPrice;

        planData.discountPrice = calculateTotalDiscount();
        planData.finalPrice = calculateTotalAmount();

        try {
          setIsLoading(true);
          await handleCreateBooking(bookingDetails, 3);
          await handleCreateTicket(
            scheduleIdDe,
            totalPriceTrDe,
            3,
            voucherRes ? voucherRes.code : "",
            getSeats(tData?.transportation?.departure?.seatBook),
            tData?.transportation?.departure?.carId
          );
          await handleCreateTicket(
            scheduleIdRe,
            totalPriceTrRe,
            3,
            voucherRes ? voucherRes.code : "",
            getSeats(tData?.transportation?.return?.seatBook),
            tData?.transportation?.return?.carId
          );
          sessionStorage.setItem("planData", JSON.stringify(planData));
          await handleCreatePlan();
          await BankService.VNPay();
        } catch (error) {
          console.error("Error creating booking:", error);
        } finally {
          setIsLoading(false);
        }
      }
    } else if (activeMethod === "MOMO") {
      enqueueSnackbar("Chưa triển khai MOMO", {
        variant: "info",
        autoHideDuration: 2000,
      });
    }
  };

  const [voucherCode, setVoucherCode] = useState(null);
  const [voucherRes, setVoucherRes] = useState(null);
  const onChangeVoucherCode = (e) => {
    setVoucherCode(e.target.value);
  };
  const [voucherApply, setVoucherApply] = useState(null);
  const [isVoucherChecked, setIsVoucherChecked] = useState(false);

  const handleCheckVoucher = async () => {
    try {
      const res = await CouponService.getCouponByCode(voucherCode);
      console.log(res);
      setVoucherRes(res);
    } catch (error) {
      console.error("Error checking voucher:", error);
    }
  };

  const calculateTotalAmount = () => {
    let total = sessionStorage.getItem("totalPrice");
    if (voucherRes.discount_type === "FIXED_AMOUNT") {
      total -= voucherRes.discount_value;
    } else if (voucherRes.discount_type === "PERCENT") {
      total -= (total * voucherRes.discount_value) / 100;
    }
    return Math.max(total, 0);
  };

  const calculateTotalDiscount = () => {
    let total = 0;
    const totalPrice = sessionStorage.getItem("totalPrice");

    if (voucherRes.discount_type === "FIXED_AMOUNT") {
      total += voucherRes.discount_value;
    } else if (voucherRes.discount_type === "PERCENT") {
      total += (totalPrice * voucherRes.discount_value) / 100;
    }
    return Math.max(total, 0);
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
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ`;
  };

  return (
    <>
      {isLoading ? (
        <Loader rong={"80vh"} />
      ) : (
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
                          <div className="content-item-right">
                            Mua vé xe khách
                          </div>
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
                    <p style={{ margin: "0", color: "white" }}>Giao dịch</p>
                  </div>
                  <div className="content">
                    <div className="content-item">
                      <div className="content-item-left">
                        Số tiền thanh toán
                      </div>
                      <div className="content-item-right">
                        {convertToVND(sessionStorage.getItem("totalPrice"))}
                      </div>
                    </div>
                    {voucherApply ? (
                      <>
                        <div className="content-item">
                          <div className="content-item-left">Giảm giá</div>
                          <div className="content-item-right">
                            {voucherApply
                              ? voucherApply.discount_type === "FIXED_AMOUNT"
                                ? `-${convertToVND(voucherApply.discount_value)}`
                                : `-${voucherApply.discount_value}%`
                              : "0"}
                          </div>
                        </div>
                        <div className="content-item">
                          <div className="content-item-left">
                            Tổng tiền thanh toán
                          </div>
                          <div className="content-item-right">
                            {convertToVND(infoBank.Amount)}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="payment-footer">
                <div
                  className="voucher"
                  data-bs-toggle="modal"
                  data-bs-target="#vouchers"
                >
                  <div className="icon">
                    <img src={vouchericon} alt="" width="45px" height="30px" />
                  </div>
                  <div className="input-code">
                    <h3 style={{ margin: 0, fontSize: "18px" }}>
                      {voucherApply ? (
                        <>{voucherRes.code}</>
                      ) : (
                        <>Chọn hoặc nhập mã </>
                      )}
                      <span>
                        {" "}
                        <ArrowForwardIosRounded style={{ fontSize: "18px" }} />
                      </span>
                    </h3>
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
              <img
                className="payment__qr-code-img"
                src={qrCode}
                alt="QR code"
              />
            </div>
          )}
        </>
      )}

      <div
        className="modal fade"
        id="vouchers"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile-custom">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontWeight: "600", margin: "0" }}>
                Chọn voucher nè
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-toggle="modal"
                data-bs-target="#main"
              ></button>
            </div>
            <div className="modal-body">
              <div
                className="d-flex justify-content-between"
                style={{ gap: "10px" }}
              >
                <InputFlied
                  value={voucherCode}
                  onChange={onChangeVoucherCode}
                  content={"Mã giảm giá"}
                  nameInput={"voucherCode"}
                  typeInput={"text"}
                  dai={"100%"}
                />
                <button
                  className="check-voucher-button"
                  onClick={handleCheckVoucher}
                >
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Kiểm tra</span>
                </button>
              </div>
              <div className="content-voucher">
                {/* hiện các mã giảm ở đây, nếu không có, hiện không có mã nào */}
                {voucherRes ? (
                  <>
                    <div className="not-null-content">
                      <div className="voucher-item mt-2">
                        <div className="voucher-item-left">
                          <h3
                            className="voucher-code"
                            style={{
                              fontWeight: "700",
                              fontSize: "20px",
                            }}
                          >
                            {voucherRes.code}
                            <span
                              style={{
                                fontWeight: "500",
                                fontSize: "15px",
                              }}
                            >
                              {" "}
                              - Còn lại:{" "}
                              {voucherRes.use_limit - voucherRes.use_count}
                            </span>
                          </h3>
                          {voucherRes &&
                            voucherRes.discount_type === "PERCENT" && (
                              <p className="m-0">
                                Giảm {voucherRes.discount_value}% cho tổng tiền
                                thanh toán
                              </p>
                            )}
                          {voucherRes &&
                            voucherRes.discount_type === "FIXED_AMOUNT" && (
                              <p className="m-0">
                                Giảm {convertToVND(voucherRes.discount_value)}{" "}
                                cho tổng tiền thanh toán
                              </p>
                            )}
                          {voucherRes && voucherRes.enterprise_id === null && (
                            <p className="m-0">Áp dụng cho tất cả người dùng</p>
                          )}
                        </div>
                        <div className="voucher-item-right">
                          <label className="button-apply">
                            <input
                              type="checkbox"
                              checked={isVoucherChecked}
                              onChange={(e) =>
                                setIsVoucherChecked(e.target.checked)
                              }
                            />
                            <svg viewBox="0 0 64 64" height="1em" width="1em">
                              <path
                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                pathLength="575.0541381835938"
                                className="path"
                              ></path>
                            </svg>
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="null-content">
                    <p>Không có mã giảm giá nào ở đây</p>
                  </div>
                )}
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ width: "100%", borderTop: "none" }}
            >
              <button
                data-bs-dismiss="modal"
                type="button"
                className="custome-button-footer"
                // onClick={handleChangeUserName}
                onClick={() => {
                  if (isVoucherChecked && voucherRes) {
                    setVoucherApply(voucherRes);
                    const newTotal = calculateTotalAmount();
                    setInfoBank((prev) => ({ ...prev, Amount: newTotal }));
                    enqueueSnackbar("Áp dụng mã giảm giá thành công", {
                      variant: "success",
                      autoHideDuration: 2000,
                    });
                  } else {
                    const newTotal = sessionStorage.getItem("totalPrice");
                    setInfoBank((prev) => ({ ...prev, Amount: newTotal }));
                    setVoucherApply(null);
                  }
                }}
                style={{
                  width: "100%",
                  height: "50px",
                  margin: "0",
                  border: "none",
                }}
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
