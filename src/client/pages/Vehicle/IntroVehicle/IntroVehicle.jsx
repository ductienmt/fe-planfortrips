import React, { useState } from "react";
import "../IntroVehicle/introvehicle.css";
import DateIntroVehicle from "./DateIntroVehicle";
import InputIntroVehicle from "./InputIntroVehicle";
import { ScheduleService } from "../../../../services/apis/ScheduleService";

const cardFooter = [
  {
    imgURL: "https://th.bing.com/th/id/OIP.8fuon7GjxbP697ImISMKEgHaE8?rs=1&pid=ImgDetMain",
    location: "Hà Nội",
  },
  {
    imgURL: "https://th.bing.com/th/id/OIP.8fuon7GjxbP697ImISMKEgHaE8?rs=1&pid=ImgDetMain",
    location: "Hà Nội",
  },
  {
    imgURL: "https://th.bing.com/th/id/OIP.8fuon7GjxbP697ImISMKEgHaE8?rs=1&pid=ImgDetMain",
    location: "Hà Nội",
  },
  {
    imgURL: "https://th.bing.com/th/id/OIP.8fuon7GjxbP697ImISMKEgHaE8?rs=1&pid=ImgDetMain",
    location: "Hà Nội",
  },


];

const IntroVehicle = () => {
  const [formData, setFormData] = useState({
    originalLocation: '',
    destination: '',
    startDate: '',
    endDate: '',
  });

  const [schedules, setSchedules] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await ScheduleService.getSchedules(formData);
      const fetchedSchedules = response.data.data || [];
      setSchedules(fetchedSchedules);
      console.log(fetchedSchedules);
      localStorage.setItem('schedules', JSON.stringify(fetchedSchedules));
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };


  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="intro-vehicle-body">
      {/* Header */}
      <header className="intro-vehicle-header">
        <div className="content-header">
          <h1 className="title">Tìm Chuyến Xe Hoàn Hảo</h1>
          <p className="subtitle">
            Khám phá các lựa chọn du lịch thoải mái và giá cả phải chăng trên khắp đất nước
          </p>
          <div className="input-item">
            <InputIntroVehicle
              noiDi={formData.originalLocation}
              setNoiDi={(value) => updateFormData("originalLocation", value)}
              noiDen={formData.destination}
              setNoiDen={(value) => updateFormData("destination", value)}
            />
            <DateIntroVehicle
              departureDate={formData.startDate}
              setDepartureDate={(value) => updateFormData("startDate", value)}
              returnDate={formData.endDate}
              setReturnDate={(value) => updateFormData("endDate", value)}
            />
            <button className="search-button" onClick={handleSearch}>
              Tìm kiếm
            </button>
          </div>
        </div>
      </header>
      {/* Favorite Trips */}
      <section className="intro-vehicle-footer">
        <h2 className="intro-vehicle-section-title">Các Địa Điểm Yêu Thích</h2>
        <p className="intro-vehicle-section-subtitle">Khám phá những điểm đến phổ biến và được yêu thích</p>
        <div className="card-grid">
          {cardFooter.map((card, index) => (
            <div key={index} className="card">
              <img src={card.imgURL} alt={card.location} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.location}</h3>
                <p className="card-description">Hành trình thú vị chờ bạn khám phá.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* CTA Section */}
      <section className="intro-vehicle-cta-section">
        <h2 className="intro-vehicle-cta-title">Sẵn sàng bắt đầu hành trình?</h2>
        <p className="intro-vehicle-cta-subtitle">
          Đặt vé dễ dàng, nhanh chóng và đảm bảo với hệ thống của chúng tôi.
        </p>
        <button className="intro-vehicle-cta-button">Khám Phá Ngay</button>
      </section>
    </div>

  );
};
export default IntroVehicle;
