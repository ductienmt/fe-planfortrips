import React, { useEffect, useState } from "react";
import "./hotelpage.css";
import styled from "styled-components";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { flatpickrConfig } from "../../../utils/ConfigFlatpickr";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { HotelService } from "../../../services/apis/HotelService";
import { CircularProgress } from "@mui/material";
import { hotelImage } from "./image";
import Loader from "../../Components/Loading";

const Hotelpage = () => {
  const [formData, setFormData] = useState({
    startDate: null, // Khởi tạo ngày mặc định là null
  });

  const [hotelList, setHotelList] = useState([]);
  const [val, setVal] = useState(0); // Initialize the slider value state
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const MAX = 1000;
  const MIN = 0;
  const marks = [
    {
      value: MIN,
      label: "",
    },
    {
      value: MAX,
      label: "",
    },
  ];

  // Dữ liệu mẫu về các khách sạn
  // const hotelList = [
  //     {
  //         image: 'https://th.bing.com/th?id=OIP.StkuckwXGnKd8HlEKyUdCwHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
  //         name: 'Khách sạn ABC',
  //         address: 'Địa chỉ 123, Quận 1, TP.HCM',
  //         service: 'Tiện nghi',
  //         servicelist: 'Ăn sáng, Free Wifi, Gym',
  //         rating: 4.5,
  //         reviews: 120,
  //         originalPrice: '2,000,000 VND',
  //         discountedPrice: '1,500,000 VND',
  //     },
  //     {
  //         image: 'https://th.bing.com/th?id=OIP.StkuckwXGnKd8HlEKyUdCwHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
  //         name: 'Khách sạn XYZ',
  //         address: 'Địa chỉ 456, Quận 3, TP.HCM',
  //         service: 'Tiện nghi',
  //         rating: 4.0,
  //         reviews: 95,
  //         originalPrice: '1,800,000 VND',
  //         discountedPrice: '1,400,000 VND',
  //     },
  //     // Thêm các khách sạn khác vào đây
  // ];

  // Hàm cập nhật formData khi thay đổi ngày
  const handleDateChange = (name) => (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date[0], // Lấy giá trị ngày đầu tiên từ mảng
    }));
  };
  const image = hotelImage;
  const handleSliderChange = (event, newValue) => {
    setVal(newValue);
  };
  const handleFilter = (filterType) => {
    console.log(`Filter selected: ${filterType}`);

    if (filterType === "sort") {
    } else if (filterType === "price") {
    } else if (filterType === "rating") {
    } else if (filterType === "hotdeals") {
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const hotelData = await HotelService.getHotels(0, 10, "");
      if (hotelData) {
        setHotelList(hotelData.hotelResponseList);
        setIsLoading(false);
      }
    };
    fetch();
  }, []);
  const search = async () => {
    setIsLoading(true);
    const hotelData = await HotelService.getHotels(0, 10, keyword);
    if (hotelData) {
      setHotelList(hotelData.hotelResponseList);
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <>
        <div className="w-100">
          <Loader rong={"80vh"} />
        </div>
      </>
    );
  }
  return (
    <div style={{ maxHeight: "max-content" }}>
      <div className="hotelpage-main-container ">
        <div className="hotelpage-heeder-input">
          <StyledWrapper>
            <div className="form-control">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
              <label>
                <span>Điểm Đến</span>
                <SearchOutlinedIcon />
              </label>
            </div>
          </StyledWrapper>
        </div>
        <div className="hotelpage-heeder-date">
          <Flatpickr
            name="startDate"
            value={formData.startDate}
            onChange={handleDateChange("startDate")}
            options={{
              locale: flatpickrConfig,
              dateFormat: "Y-m-d",
              enableTime: true,
              time_24hr: true,
            }}
            className="search-header-input-field m-0"
          />

          <Flatpickr
            name="endDate"
            value={formData.endDate}
            onChange={handleDateChange("endDate")}
            options={{
              locale: flatpickrConfig,
              dateFormat: "Y-m-d",
              enableTime: true,
              time_24hr: true,
            }}
            className="search-header-input-field m-0"
          />
        </div>
        <div className="hotelpage-heeder-option">
          <StyledWrapper>
            <div className="form-control">
              <input type="text" required />
              <label>
                <span>Phòng Và Khách</span>
                <KeyboardArrowDownIcon />
              </label>
            </div>
          </StyledWrapper>
        </div>
        <div>
          <button
            className="hotelpage-main-button-heeder"
            type="button"
            onClick={() => {
              search();
            }}
          >
            Tìm Kiếm
          </button>
        </div>
      </div>

      <div className="hotelpage-sidebarcard-content">
        <div className="hotelpage-sidebar-container">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1728641751330!5m2!1svi!2s"
              width="270"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div>
            <h5 className="section-title">Giá</h5>
            <span className="search-results-price-value">3,300,000 VND</span>
            <Box sx={{ width: 150 }}>
              <Slider
                marks={marks}
                step={10}
                value={val}
                valueLabelDisplay="auto"
                min={MIN}
                max={MAX}
                onChange={handleSliderChange}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  onClick={() => setVal(MIN)}
                  sx={{ cursor: "pointer" }}
                >
                  {MIN} min
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => setVal(MAX)}
                  sx={{ cursor: "pointer" }}
                >
                  {MAX} max
                </Typography>
              </Box>
            </Box>
          </div>

          <h5 className="section-title">Dịch vụ</h5>
          <ul className="checkbox-list">
            <li>
              <input type="checkbox" id="breakfast" />
              <label htmlFor="breakfast">Ăn sáng</label>
            </li>
            <li>
              <input type="checkbox" id="laundry" />
              <label htmlFor="laundry">Giặt ủi</label>
            </li>
            <li>
              <input type="checkbox" id="room-service" />
              <label htmlFor="room-service">Ăn tại phòng</label>
            </li>
          </ul>

          <h5 className="section-title">Yêu cầu</h5>
          <ul className="checkbox-list">
            <li>
              <input type="checkbox" id="pet-friendly" />
              <label htmlFor="pet-friendly">Cho mang pet</label>
            </li>
            <li>
              <input type="checkbox" id="smoking" />
              <label htmlFor="smoking">Cho hút thuốc</label>
            </li>
            <li>
              <input type="checkbox" id="free-cancellation" />
              <label htmlFor="free-cancellation">Miễn phí hủy phòng</label>
            </li>
          </ul>

          <h5 className="section-title">Loại</h5>
          <ul className="checkbox-list">
            <li>
              <input type="checkbox" id="homestay" />
              <label htmlFor="homestay">Homestay</label>
            </li>
            <li>
              <input type="checkbox" id="hotel" />
              <label htmlFor="hotel">Khách sạn</label>
            </li>
            <li>
              <input type="checkbox" id="resort" />
              <label htmlFor="resort">Resort</label>
            </li>
          </ul>
        </div>

        <div className="hotelpage-card-list-container">
          <div className="hotelpage-card-deals">
            <h3>
              {" "}
              <b style={{ color: "red" }}>Bạn muốn deals hời?</b>
            </h3>
            <span>Hãy đảm bảo rằng bạn đang đặt thông báo khuyến mãi</span>
          </div>
          <h3>
            <b>Tìm thấy 73 nơi thích hợp</b>{" "}
          </h3>
          <div className="hotelpage-card-filter">
            <div className="hotelpage-card-filter-1"> Sắp xếp:</div>
            <span className="hotelpage-card-filter-line"></span>
            <div className="hotelpage-card-filter-2">Giá</div>
            <span className="hotelpage-card-filter-line"></span>
            <div className="hotelpage-card-filter-3">Xếp hạng</div>
            <span className="hotelpage-card-filter-line"></span>
            <div className="hotelpage-card-filter-4">Hot deals!</div>
          </div>
          {hotelList &&
            hotelList.map((hotel, index) => (
              <div div className="hotelpage-card" key={index}>
                <div className="hotelpage-card-content">
                  <div className="hotelpage-card-image">
                    <img src={image[index + 1]} alt="Hotel" />
                  </div>
                  <div className="hotelpage-card-content-right">
                    <h3>{hotel.name}</h3>
                    <p>{hotel.address}</p>
                    <h3>{hotel.service}</h3>
                    <p>{hotel.servicelist}</p>
                  </div>
                  <p className="hotelpage-card-content-line"></p>
                  <div className="hotelpage-card-content-left">
                    <span style={{ fontWeight: "bold" }}>Đánh giá</span>
                    <br />
                    <StarRating rating={Math.floor(hotel.rating)} />
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        textDecoration: " line-through",
                      }}
                    >
                      {hotel.originalPrice}
                    </span>{" "}
                    <br />
                    <span
                      style={{
                        color: "red",
                        fontSize: "25px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      {hotel.discountedPrice}
                    </span>
                    <span style={{ fontSize: "15px" }}>(đã bao gồm thuế)</span>
                    <div className="hotelpage-card-content-left-button">
                      <button
                        onClick={() => {
                          navigate("/booking-hotel");
                        }}
                      >
                        Đặt phòng
                      </button>
                      <button
                        onClick={() => {
                          navigate("/hotel-details");
                        }}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    width: 500px;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #fff solid;
    display: block;
    width: 100%;
    font-size: 18px;
    color: #27648c;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: lightblue;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #27648c;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: #27648c;
    transform: translateY(-30px);
  }
`;

export default Hotelpage;
