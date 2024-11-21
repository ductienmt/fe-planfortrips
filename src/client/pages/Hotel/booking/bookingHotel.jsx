import "./bookingHotel.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Link } from "react-router-dom";
import { useState } from "react";

const BookingHotel = () => {
  window.scrollTo(0, 0);
  const steps = ["Bạn chọn", "Nhập thông tin của bạn", "Bước cuối cùng"];

  const [isOpen, setIsOpen] = useState(false);

  const toggleIcon = () => {
    setIsOpen(!isOpen);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật formData
    setFormData({ ...formData, [name]: value });

    // Xác định thông báo lỗi
    let errorMessage = "";
    if (value.trim() === "") {
      switch (name) {
        case "firstName":
          errorMessage = "Tên là bắt buộc";
          break;
        case "lastName":
          errorMessage = "Họ là bắt buộc";
          break;
        case "email":
          errorMessage = "Email là bắt buộc";
          break;
        case "phone":
          errorMessage = "Số điện thoại là bắt buộc";
          break;
        default:
          break;
      }
    } else {
      // check error email and phone
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Email không hợp lệ";
        }
      } else if (name === "phone") {
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(value)) {
          errorMessage = "Số điện thoại không hợp lệ phải là số";
        }
      }
    }

    // Cập nhật lỗi
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    handleChange(e);
  };

  return (
    <>
      <div className="container con-booking">
        <Stepper activeStep={1}>
          {steps.map((label) => {
            const labelProps = {};

            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="flex-container-booking row">
          <div className="col-left col-md-4 mt-3">
            <div className="hotel-book">
              <div className="content">
                <span className="type-of-hotel">Khách sạn</span>
                <h4>Khách sạn 1</h4>
                <h6>Quận 1, Thành phố Hồ Chí Minh</h6>
                <div className="review">
                  <button disabled="true">4.9</button>
                  <span>Xuất sắc</span>
                </div>
                <div className="amenities-booking d-flex mt-3">
                  <small>
                    <i className="fa-solid fa-square-parking"></i>Bãi đỗ xe
                  </small>
                  <small>
                    <i className="fa-solid fa-wifi"></i>Wifi
                  </small>
                </div>
              </div>
            </div>
            <div className="deatail-your-room mt-3">
              <div className="content">
                <h4 className="title">Chi tiết phòng của bạn</h4>
                <div className="check-in">
                  <div className="in">
                    <h6>Nhận phòng</h6>
                    <h5>Thứ 2, 21/07/2024</h5>
                    <span>12:00 - 24:00</span>
                  </div>
                  <div className="out">
                    <h6>Trả phòng</h6>
                    <h5>Thứ 3, 22/07/2024</h5>
                    <span>06:00 - 12:00</span>
                  </div>
                </div>
                <div className="time-stay-in">
                  <h6>Tổng thời gian lưu trú:</h6>
                  <span>1 đêm</span>
                </div>
                <hr />
                <h6>Bạn đã chọn</h6>
                <div className="number-room">
                  <h5>
                    <span>3</span> phòng cho <span>5 </span>người
                  </h5>
                  <div
                    className="menu-icons"
                    onClick={toggleIcon}
                    style={{ cursor: "pointer" }}
                  >
                    {isOpen ? (
                      <i className="fa-solid fa-angle-up"></i>
                    ) : (
                      <i className="fa-solid fa-angle-down"></i>
                    )}
                  </div>
                </div>
                <div className={`number-room-detail ${isOpen ? "active" : ""}`}>
                  <h6>
                    <span>1</span> x Phòng đơn
                  </h6>
                  <h6>
                    <span>2</span> x Phòng đôi
                  </h6>
                </div>
                <Link>Bạn muốn thêm phòng ?</Link>
              </div>
            </div>
            <div className="price-of-total-room">
              <div className="content">
                <h5 className="small-text">Tóm tắt giá</h5>
                <div className="price">
                  <div className="flex-price">
                    <h6>Giá gốc:</h6>
                    <h6>250.000 VNĐ</h6>
                  </div>
                  <div className="flex-price">
                    <h6>Ưu đãi:</h6>
                    <h6> - 50.000 VNĐ</h6>
                  </div>
                  <div className="flex-price">
                    <h6>Giá đã áp dụng:</h6>
                    <h6>200.000 VNĐ</h6>
                  </div>
                </div>
                <div className="toatal-price">
                  <h4>Tổng cộng</h4>
                  <div>
                    <h3>220.000 VNĐ</h3>
                    <h6>Giá đã bao gồm thuế</h6>
                  </div>
                </div>
                <div className="about-price-vat">
                  <h5 className="small-text">Thông tin giá</h5>
                  <div className="row">
                    <div className="col-md-2">
                      <i className="fa-solid fa-money-bills"></i>
                    </div>
                    <div className="col-md-10">
                      <h6>
                        Bao gồm <span className="vat-price">20.000 VNĐ</span>{" "}
                        thuế
                      </h6>
                      <div className="about-vat">
                        <span>10% Thuế GTGT</span>
                        <span>20.000 VNĐ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-right col-md-8 mt-3">
            <div className="detail-info-you">
              <div className="content">
                <h3>Nhập thông tin chi tiết của bạn</h3>
                <div className="warning-user">
                  <div className="row">
                    <div className="col-md-1">
                      <i className="fa-solid fa-circle-info"></i>
                    </div>
                    <div className="col-md-11">
                      <p>
                        Gần xong rồi ! Chỉ cần điền phần thông tin{" "}
                        <span className="star-require">*</span> bắt buộc
                      </p>
                      <p>
                        Vui lòng điền thông tin bằng Tiếng Việt hoặc Tiếng Anh
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form-info">
                  <div className="name">
                    <div className="flex-info">
                      <label htmlFor="firstName">
                        Tên <span className="star-require">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className={`form-control ${
                          touched.firstName &&
                          (errors.firstName ? "is-invalid" : "is-valid")
                        }`}
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.firstName && errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div className="flex-info">
                      <label htmlFor="lastName">
                        Họ <span className="star-require">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className={`form-control ${
                          touched.lastName &&
                          (errors.lastName ? "is-invalid" : "is-valid")
                        }`}
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.lastName && errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="contact">
                    <div className="flex-info">
                      <label htmlFor="email">
                        Email <span className="star-require">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${
                          touched.email &&
                          (errors.email ? "is-invalid" : "is-valid")
                        }`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="flex-info">
                      <label htmlFor="phone">
                        Số điện thoại <span className="star-require">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className={`form-control ${
                          touched.phone &&
                          (errors.phone ? "is-invalid" : "is-valid")
                        }`}
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.phone && errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tip-travel-booking">
              <div className="content">
                <h4>Mách nhỏ</h4>
                <div className="flex-container-tip">
                  <div className="icon-tip">
                    <i className="fa-solid fa-martini-glass-citrus"></i>
                  </div>
                  <div className="text-tip">
                    <h5>Bạn ơi chúng mình mách bạn nè</h5>
                    <p>
                      Nơi ở của bạn có những tiện ích này rồi nha
                      <span className="amenities">
                        <i className="fa-regular fa-snowflake"></i> Điều hòa
                      </span>
                      <span className="amenities">
                        <i className="fa-solid fa-temperature-low"></i> Nước
                        nóng lạnh
                      </span>
                      <span className="amenities">
                        <i className="fa-solid fa-spa"></i> Spa
                      </span>
                      <span className="amenities">
                        <i className="fa-solid fa-tv"></i> TV
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-more-amenities">
              <div className="content">
                <h4>Thêm vào kỳ nghỉ</h4>
                <div className="check-box">
                  <div className="check-add">
                    <div className="flex-check-box">
                      <input type="checkbox" />
                      <label htmlFor="">
                        Bạn muốn thuê xe thêm không với ưu đãi giảm{" "}
                        <span className="text-danger">10%</span>
                      </label>
                      <i className="fa-solid fa-motorcycle"></i>
                    </div>
                    <div className="flex-check-box">
                      <input type="checkbox" />
                      <label htmlFor="">
                        Bạn muốn đưa đón tại sân bay thêm không với ưu đãi giảm{" "}
                        <span className="text-danger">20%</span>
                      </label>
                      <i className="fa-solid fa-car"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="require">
              <div className="content">
                <h4>Các yêu cầu đặc biệt</h4>
                <p className="mt-3">
                  Các yêu cầu đặc biệt không đảm bảo sẽ được đáp ứng – tuy
                  nhiên, chỗ nghỉ sẽ cố gắng hết sức để thực hiện. Bạn luôn có
                  thể gửi yêu cầu đặc biệt sau khi hoàn tất đặt phòng của mình!
                </p>
                <p>
                  Vui lòng ghi yêu cầu của bạn tại đây.{" "}
                  <span>(không bắt buộc)</span>
                </p>
                <textarea name="" id=""></textarea>
              </div>
            </div>
            <div className="time-you-go">
              <div className="content">
                <h4>Thời gian bạn đến</h4>
                <div className="flex-time-you-go">
                  <i className="fa-regular fa-circle-check text-success me-3"></i>
                  Phòng của bạn sẽ sẵn sàng để nhận trong khoảng từ 14:00 đến
                  00:00
                </div>
                <div className="flex-time-you-go">
                  <i className="fa-solid fa-bell-concierge text-success me-3 mt-3"></i>
                  Lễ tân 24 giờ - Luôn có trợ giúp mỗi khi bạn cần!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-link-to-next">
          <Link to={"../payment"} className="btn-next">
            Tiếp theo
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookingHotel;
