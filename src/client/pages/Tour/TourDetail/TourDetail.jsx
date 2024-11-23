import React from "react";
import "./TourDetail.css";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from "react-router-dom"
import { isSameDay, format } from "date-fns";;


function TourDetail() {

    const {tourId} = useParams();
  const availableDates = [
    new Date(2024, 10, 25),
    new Date(2024, 10, 27),
    new Date(2024, 11, 1),
  ];

  const isDateAvailable = (date) => {
    return availableDates.some((availableDate) =>
      isSameDay(date, availableDate)
    );
  };

  const renderDay = (day, _value, DayComponentProps) => {
    const isAvailable = isDateAvailable(day);
    return (
      <div
        {...DayComponentProps}
        style={{
          backgroundColor: isAvailable ? "#4caf50" : "",
          color: isAvailable ? "green" : "", 
          borderRadius: "50%",
          fontSize: isAvailable ? "18px" : "14px",
          fontWeight: isAvailable ? "bold" : "normal", 
        }}
      >
        {format(day, "d")}
      </div>
    );
  };
  
  
  

  return (
    <div class="tour-detail-info">
      {/* <!-- Hàng 1: Ảnh người và tên chuyến đi, bên phải là số lượt xem --> */}
      <div class="tour-detail-header d-flex justify-content-between">
        <div class="tour-detail-author d-flex">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.mRYzpglG7iXBdB8_Qk_dYAHaD4&pid=Api&P=0&h=180"
            alt="Avatar"
            class="tour-detail-avatar"
          />
          <span class="tour-detail-title">
            Tour đi đà lạt 3 ngày - 2 đêm (Bao chia tay)

            <span className="fw-light"><p>Hồ Minh Nhựt - TouId: {tourId}</p></span>
          </span>
        </div>
        <div class="tour-detail-view-count d-flex align-items-center">
          <i class="fa fa-eye"></i>
          <span>20,951 Views</span>
        </div>
      </div>

      {/* <!-- Hàng 1.2: Hashtags của chuyến đi --> */}
      <div class="tour-detail-hashtags">
        <span class="tour-detail-hashtag">#DaLat</span>
        <span class="tour-detail-hashtag">#CapDoi</span>
        <span class="tour-detail-hashtag">#TaiChoDien</span>
      </div>

      {/* <!-- Hàng 2: Mô tả chuyến đi --> */}
      <div class="tour-detail-description">
        <p>
          Chuyến đi này dành cho cặp đôi nào mà chưa chia tay. Chúng tôi cam kết
          không chia tay thì cũng đi 1 về 2 . Đặc biệt tour này có khuyến mại,
          các bạn sẽ được ngủ cùng Tài thứ 2 (TTH) thêm combo gấu bông ôm ngủ
          mỗi đêm rất ấm và phê
        </p>
      </div>
      <hr />

      {/* <!-- Hàng 3: Ảnh chuyến đi --> */}
      <div class="tour-detail-images">
        <img
          src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Tour Image"
          class="tour-detail-image"
        />
      </div>

      {/* <!-- Hàng 4: Các dịch vụ --> */}
      <div class="tour-detail-services">
        <h4>Dịch vụ sẽ sử dụng:</h4>
        <ul>
          <li>Xe: Xe du lịch 16 chỗ</li>
          <li>Khách sạn: Resort 4 sao</li>
          <li>Nơi ăn uống: Nhà hàng hải sản cao cấp</li>
          <li>Lịch trình: Tham quan các bãi biển và địa điểm nổi tiếng</li>
        </ul>
      </div>

      {/* <!-- Hàng 5: Lịch trình hoạt động --> */}
      <div class="tour-detail-schedule">
        <h4>Lịch trình hoạt động:</h4>
        <div class="tour-detail-schedule-day">
          <h5>Ngày 1: Khám phá các địa điểm nổi bật</h5>
          <img
            src="https://www.agoda.com/traveltips/wp-content/uploads/2024/05/148.png"
            alt="Ngày 1"
          />
          <p>
            Khám phá các bãi biển tuyệt đẹp và tham gia các hoạt động thể thao
            dưới nước. Tối thư giãn tại nhà hàng hải sản địa phương.
          </p>
        </div>
        <div class="tour-detail-schedule-day">
          <h5>Ngày 2: Tham quan các đảo nhỏ xung quanh</h5>
          <img
            src="https://www.agoda.com/traveltips/wp-content/uploads/2024/05/149.png"
            alt="Ngày 2"
          />
          <p>
            Đi thuyền đến các đảo nhỏ xung quanh Koh Samet, tham gia các hoạt
            động snorkeling và câu cá.
          </p>
        </div>
        <div class="tour-detail-schedule-day">
          <h5>Ngày 3: Thư giãn và trở về</h5>
          <img
            src="https://www.agoda.com/traveltips/wp-content/uploads/2024/06/155.png"
            alt="Ngày 3"
          />
          <p>
            Buổi sáng tự do thư giãn, sau đó di chuyển về lại cảng để trở về
            nhà.
          </p>
        </div>
      </div>

      {/* Hàng 6: Lịch các ngày có sẵn trong tháng */}
      <div className="tour-detail-calendar">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <h4>Lịch hoạt động của tour</h4>
      <DateCalendar
        renderDay={renderDay} 
        shouldDisableDate={(date) => !isDateAvailable(date)}    
      />
    </LocalizationProvider>
      </div>

      {/* <!-- Cuối cùng: Đặt Tour --> */}
      <div class="tour-detail-booking">
        <button class="tour-detail-btn btn btn-outline-primary">Đặt Tour</button>
      </div>
    </div>
  );
}

export default TourDetail;
