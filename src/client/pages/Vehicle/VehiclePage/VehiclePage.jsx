import React, { useState, useEffect } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import InfoIcon from "@mui/icons-material/Info";
import InputVehicle from "./InputVehicle";
import DateVehicle from "./DateVehicle";
import "../VehiclePage/vehiclepage.css";
import { useNavigate } from "react-router-dom";
import { ScheduleService } from "../../../../services/apis/ScheduleService";

const VehiclePage = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [formData, setFormData] = useState({
    originalLocation: "",
    destination: "",
    startDate: "",
    endDate: "",
  });
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const storedSchedules = sessionStorage.getItem("schedules");
    const storedFormData = sessionStorage.getItem("formData");

    if (storedSchedules) {
      setSchedules(JSON.parse(storedSchedules));
    }

    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
  };

  const handleSearch = async () => {
    setLoading(true); // Đang tải
    try {
      const response = await ScheduleService.getSchedules(formData);
      const fetchedSchedules = response.data.data || []; // Đảm bảo dữ liệu không bị lỗi
      setSchedules(fetchedSchedules);
      console.log(fetchedSchedules);
      localStorage.setItem("schedules", JSON.stringify(fetchedSchedules));
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false); // Kết thúc tải
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Hook điều hướng
  const handleBooking = (id) => {
    // Chuyển hướng sang trang VehicleBooking và truyền id
    navigate(`/vehicle-booking/${id}`);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = date.toLocaleString("vi-VN", options);
    return formattedDate.replace(/,/g, "");
  };
  return (
    <>
      <div className="vehicle-header">
        <h3 style={{ fontWeight: "bold", color: "#005293" }}>Tìm chuyến xe</h3>
        <form onSubmit={handleSubmit}>
          <InputVehicle
            noiDi={formData.originalLocation}
            setNoiDi={(value) =>
              setFormData({ ...formData, originalLocation: value })
            }
            noiDen={formData.destination}
            setNoiDen={(value) =>
              setFormData({ ...formData, destination: value })
            }
          />
          <DateVehicle
            departureDate={formData.startDate}
            setDepartureDate={(value) =>
              setFormData({ ...formData, startDate: value })
            }
            returnDate={formData.endDate}
            setReturnDate={(value) =>
              setFormData({ ...formData, endDate: value })
            }
          />

          <button type="submit" className="vehicle-search-button">
            Tìm kiếm
          </button>
        </form>
      </div>

      <div className="vehicle-body">
        <div className="sidebar">
          <b style={{ fontSize: "18px" }}>Sắp xếp theo</b>
          <hr />
          <div className="filter-sort">
            <label className="custom-checkbox">
              Giá tăng dần
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <hr />
            <label className="custom-checkbox">
              Giá giảm dần
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <hr />
            <label className="custom-checkbox">
              Giờ khởi hành sớm nhất
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <hr />
            <label className="custom-checkbox">
              Giờ khởi hành muộn nhấ
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
          <b style={{ fontSize: "18px" }}>Bộ lọc </b>
          <hr />
          <b>Thời gian khởi hành</b>
          <div className="filter-date">
            <div>
              Từ <br />
              <select className="option-to">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div>
              Đến <br />
              <select className="option-form">
                s<option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <br />
          <b style={{ fontSize: "18px" }}> Khoảng giá </b>
          <div className="filter-price">
            <b>0đ-100.000đ</b>
          </div>
          <b style={{ fontSize: "18px" }}> Đánh giá </b>
          <div className="filter-review">
            <div className="star-buttons">
              {Array.from({ length: 5 }, (_, index) => {
                const stars = index + 1;
                return (
                  <button
                    key={stars}
                    className={`star-button ${stars <= selectedStars ? "active" : ""}`}
                    onClick={() => handleStarClick(stars)}
                  >
                    {stars} ⭐
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="main-content">
          {schedules.length > 0 ? (
            <div className="content-card">
              {schedules.map((bus, index) => (
                <div key={index} className="card">
                  <div className="right">
                    <div className="item1">
                      <div>
                        <h4>
                          <b>{formatDateTime(bus.departureTime)}</b>
                        </h4>
                      </div>
                      <div>
                        <ArrowRightAltIcon />
                      </div>
                      <div>
                        <h4>
                          <b>{formatDateTime(bus.arrivalTime)}</b>
                        </h4>
                      </div>
                    </div>
                    <div className="item2">
                      <div>
                        <span>
                          <b style={{ fontSize: "25px" }}>
                            {bus.carCompanyName}
                          </b>
                        </span>{" "}
                        <b style={{ fontSize: "20px" }}>
                          ⭐{bus.carCompanyRating}/5
                        </b>
                      </div>
                      <br />
                      <div className="voucher">
                        <a
                          style={{
                            textDecoration: "none",
                            fontSize: "15px",
                            color: "#FF6613",
                          }}
                          href=""
                        >
                          Voucher +
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="left">
                    <div>
                      <h4
                        style={{
                          color: "red",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {Number(bus.priceForOneTicket).toFixed(2)} VND
                      </h4>
                      <p>còn {bus.countSeatsEmpty} chỗ</p>
                    </div>
                    <div>
                      <InfoIcon />
                    </div>
                    <div>
                      <button onClick={() => handleBooking(bus.id)}>
                        Đặt vé ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>{loading ? "" : "Không có kết quả tìm kiếm."}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default VehiclePage;
