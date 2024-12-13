import React, { useEffect, useRef, useState } from "react";
import "./TourPage.css"; // Ensure this file is imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faEarthEurope,
  faJetFighter,
  faStarHalfStroke,
  faTicket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import TourCard from "./TourCard/TourCard";
import { TourService } from "../../../services/apis/TourService";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { CityService } from "../../../services/apis/CityService";

function TourPage() {
  const [toursData, setToursData] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityOrigin, setCityOrigin] = useState('');
  const [cityDes, setCityDes] = useState('');

  const tourRef = useRef(null);

  useEffect(() => {
    const initData = async () => {
      const resTour = await TourService.getToursClient();
      setToursData(resTour);

      const resCities = await CityService.getAll();
      setCities(resCities);
    };

    initData();
  }, []);

  const handleSearhTourByOriginAndDes = async () => {
    if (!cityOrigin || !cityDes) {
      alert("Thiếu dữ liệu");
      return;
    }
    const resTour = await TourService.getTourByOriginAndDes(cityOrigin, cityDes);
    setToursData(resTour);

    if (tourRef.current) {
      tourRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCityOriginChange = (event) => {
    setCityOrigin(event.target.value);
  };

  const handleCityDesChange = (event) => {
    setCityDes(event.target.value);
  };

  return (
    <div className="c-tour py-3">
      <div className="c-tour-container">
        {/* Header */}
        <header className="tour-header">
          <div className="tour-header-content">
            <h1>Khám phá thế giới với tour du lịch tuyệt vời</h1>
            <p>Đặt tour ngay hôm nay với giá ưu đãi cực kỳ hấp dẫn!</p>
            <p className="">Nội tỉnh: Tỉnh - Tỉnh. vd: Bình Thuận - Bình Thuận</p>
            <form className="tour-search-form">
              <div className="tour-search-destination">
                <input
                  disabled
                  type="text"
                  placeholder="Bạn muốn đi đâu?"
                  className="form-control w-100"
                />
              </div>

              <select
                style={{ width: 'fit-content' }}
                className="form-select"
                value={cityDes}
                onChange={handleCityDesChange}
              >
                <option value="">Khởi hành từ</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nameCity}
                  </option>
                ))}
              </select>

              <select
                style={{ width: 'fit-content' }}
                className="form-select"
                value={cityOrigin}
                onChange={handleCityOriginChange}
              >
                <option value="">Điểm đến</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nameCity}
                  </option>
                ))}
              </select>

              <button type="button" className="btn-search" onClick={handleSearhTourByOriginAndDes}>
                Tìm
              </button>
            </form>
            <div className="tour-page-city-card mt-4">
              <div className="tour-page-city-card-row">
                {/* {cityOrigin && (
                  <div className="tour-page-city-card-item bg-white">
                    <div className="tour-page-city-card-id text-info">
                      <h4>{cities.find(city => city.id === cityOrigin)?.nameCity || 'N/A'}</h4>
                    </div>
                    <div className="tour-page-city-card-img">
                      <img
                        src={cities.find(city => city.id === cityOrigin)?.image || "default-image-url.jpg"}
                        alt={cities.find(city => city.id === cityOrigin)?.nameCity}
                      />
                    </div>
                    <div className="tour-page-city-page-des">
                      <p>{cities.find(city => city.id === cityOrigin)?.description || "Thông tin mô tả thành phố."}</p>
                    </div>
                  </div>
                )} */}

                {/* <div className="d-flex fs-3" style={{alignItems : 'center'}}>
                  <FontAwesomeIcon icon={faJetFighter} />
                </div> */}

                {/* {cityDes && (
                  <div className="tour-page-city-card-item bg-white">
                    <div className="tour-page-city-card-id text-danger">
                      <h4>{cities.find(city => city.id === cityDes)?.nameCity || 'N/A'}</h4>
                    </div>
                    <div className="tour-page-city-card-img">
                      <img
                        src={cities.find(city => city.id === cityDes)?.image || "default-image-url.jpg"}
                        alt={cities.find(city => city.id === cityDes)?.nameCity}
                      />
                    </div>
                    <div className="tour-page-city-page-des">
                      <p>{cities.find(city => city.id === cityDes)?.description || "Thông tin mô tả thành phố."}</p>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </header>

        {/* Tour Content */}
        <div className="tour-content container">
          {/* Summary Section */}
          <div className="tour-content-summary">
            <div className="content-summary-item d-flex">
              <div className="content-summary-item-icon">
                <FontAwesomeIcon icon={faEarthEurope} />
              </div>
              <div className="content-summary-item-content">
                <span className="fs-4 fw-bold">1000+ Tours</span>
                <p className="fs-5 fs-light">Chất lượng trong và ngoài nước</p>
              </div>
            </div>

            <div className="content-summary-item d-flex">
              <div className="content-summary-item-icon">
                <FontAwesomeIcon icon={faStarHalfStroke} />
              </div>
              <div className="content-summary-item-content">
                <span className="fs-4 fw-bold">10k đánh giá 5 sao</span>
                <p className="fs-5 fs-light">Từ những khách hàng đã đặt tour</p>
              </div>
            </div>

            <div className="content-summary-item d-flex">
              <div className="content-summary-item-icon">
                <FontAwesomeIcon icon={faTicket} />
              </div>
              <div className="content-summary-item-content">
                <span className="fs-4 fw-bold">100+ ưu đãi mỗi ngày</span>
                <p className="fs-5 fs-light" style={{ textWrap: "nowrap" }}>
                  Cho khách đặt sớm, theo nhóm, phút chót
                </p>
              </div>
            </div>
          </div>

          {/* Tour List Section */}
          <div className="tour-content-data mt-4">
            <div className="tour-content-title">
              <h3 className="fw-bold fs-2" style={{ fontFamily: 'Italic' }}>#Tour của chúng tôi</h3>
            </div>
            <div className="tour-list row gx-3" ref={tourRef}>
              {toursData ? (
                toursData.map((tour) => (
                  <TourCard key={tour.tourId} tour={tour} />
                ))
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                  <CircularProgress />
                </Box>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourPage;
