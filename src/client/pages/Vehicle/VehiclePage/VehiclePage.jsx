import React, { useState, useEffect } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import InfoIcon from "@mui/icons-material/Info";
import DateVehicle from "./DateVehicle";
import "../VehiclePage/vehiclepage.css";
import { useNavigate } from "react-router-dom";
import { ScheduleService } from "../../../../services/apis/ScheduleService";
import { Slider } from "@mui/material";

const VehiclePage = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [formData, setFormData] = useState({
    originalLocation: "",
    destination: "",
    startDate: "",
    endDate: "",
  });
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    handleSearch();
  }, [formData]);

  useEffect(() => {
    let result = schedules;

    // Apply price range filter
    if (priceRange) {
      result = result.filter(
        (schedule) =>
          schedule.priceForOneTicket >= priceRange[0] &&
          schedule.priceForOneTicket <= priceRange[1]
      );
    }

    // Apply star rating filter
    if (selectedStars > 0) {
      result = result.filter(
        (schedule) => schedule.carCompanyRating >= selectedStars
      );
    }

    // Apply sorting based on filter criteria
    switch (filter) {
      case "upPrice":
        result = result.sort((a, b) => a.priceForOneTicket - b.priceForOneTicket);
        break;
      case "downPrice":
        result = result.sort((a, b) => b.priceForOneTicket - a.priceForOneTicket);
        break;
      case "soonDepart":
        result = result.sort(
          (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
        );
        break;
      case "lateDepart":
        result = result.sort(
          (a, b) => new Date(b.departureTime) - new Date(a.departureTime)
        );
        break;
      default:
        break;
    }

    setFilteredSchedules(result);
  }, [schedules, filter, priceRange, selectedStars]);

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await ScheduleService.getSchedules(formData);
      const fetchedSchedules = response.data.data || [];
      setSchedules(fetchedSchedules);
      localStorage.setItem("schedules", JSON.stringify(fetchedSchedules));
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
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

  const handleBooking = (id) => {
    navigate(`/vehicle-booking/${id}`);
  };

  const swapLocation = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      originalLocation: prevData.destination,
      destination: prevData.originalLocation,
    }));
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

  const handleSetPriceRange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <>
      <div className="vehicle-header">
        <h3 style={{ fontWeight: "bold", color: "#005293" }}>Tìm chuyến xe</h3>
        <form onSubmit={handleSubmit}>
          <div className="row mb-2">
            <div className="col-5">
              <input
                type="text"
                className="form-control"
                value={formData.originalLocation}
                onChange={handleChange}
                name="originalLocation"
              />
            </div>
            <div className="col-2 text-center">
              <button className="input-vehicle__swap-btn btn" onClick={swapLocation}>
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/331a92149a02dc615986206c588d6642.svg"
                  alt="Swap"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className="col-5">
              <input
                type="text"
                className="form-control"
                value={formData.destination}
                onChange={handleChange}
                name="destination"
              />
            </div>
          </div>

          <DateVehicle
            departureDate={formData.startDate}
            setDepartureDate={(value) => setFormData({ ...formData, startDate: value })}
            returnDate={formData.endDate}
            setReturnDate={(value) => setFormData({ ...formData, endDate: value })}
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
              <input
                type="checkbox"
                onClick={() => setFilter("upPrice")}
                checked={filter === "upPrice"}
              />
              <span className="checkmark"></span>
            </label>
            <hr />
            <label className="custom-checkbox">
              Giá giảm dần
              <input
                type="checkbox"
                onClick={() => setFilter("downPrice")}
                checked={filter === "downPrice"}
              />
              <span className="checkmark"></span>
            </label>
            <hr />
            <label className="custom-checkbox">
              Giờ khởi hành sớm nhất
              <input
                type="checkbox"
                onClick={() => setFilter("soonDepart")}
                checked={filter === "soonDepart"}
              />
              <span className="checkmark"></span>
            </label>
            <hr />
            <label className="custom-checkbox">
              Giờ khởi hành muộn nhất
              <input
                type="checkbox"
                onClick={() => setFilter("lateDepart")}
                checked={filter === "lateDepart"}
              />
              <span className="checkmark"></span>
            </label>
          </div>

          <b style={{ fontSize: "18px" }}>Bộ lọc</b>
          <hr />
          <br />
          <div>
            <b style={{ fontSize: "18px" }}>Khoảng giá</b>
            <div className="filter-price">
              <Slider
                min={0}
                max={1000}
                step={1}
                value={priceRange}
                onChange={handleSetPriceRange}
                renderTrack={(props) => <div {...props} className="track" />}
                renderThumb={(props) => <div {...props} className="thumb" />}
              />
              <div style={{ marginTop: "10px" }}>
                <span>{`Giá: ${priceRange[0]} VND - ${priceRange[1]} VND`}</span>
              </div>
            </div>
          </div>

          <b style={{ fontSize: "18px" }}>Đánh giá</b>
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
          {filteredSchedules.length > 0 ? (
            <div className="content-card">
              {filteredSchedules.map((bus, index) => (
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
                          <b style={{ fontSize: "25px" }}>{bus.carCompanyName}</b>
                        </span>{" "}
                        <b style={{ fontSize: "20px" }}>⭐{bus.carCompanyRating}/5</b>
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
                      <h4 style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
                        {Number(bus.priceForOneTicket).toFixed(2)} VND
                      </h4>
                      <p>còn {bus.countSeatsEmpty} chỗ</p>
                    </div>
                    <div>
                      <InfoIcon />
                    </div>
                    <div>
                      <button onClick={() => handleBooking(bus.id)}>Đặt vé ngay</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Chưa có chuyến xe nào.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default VehiclePage;
