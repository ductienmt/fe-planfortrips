import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams để lấy id từ URL
import './BusInfo.css';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ScheduleService } from '../../../../../services/apis/ScheduleService';

const BusInfo = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [busInfo, setBusInfo] = useState();

  useEffect(() => {
    const fetchBusInfo = async () => {
      try {
        const response = await ScheduleService.getScheduleID(id); // Sử dụng id từ URL
        setBusInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBusInfo();
  }, [id]); // Thêm id vào mảng phụ thuộc để lấy dữ liệu mới khi id thay đổi

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDay = (timeString) => {
    const date = new Date(timeString);
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const day = daysOfWeek[date.getDay()];
    const dayMonthYear = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return `${day}, ${dayMonthYear}`;
  };

  if (!busInfo) {
    return <p>Đang tải thông tin xe buýt...</p>;
  }

  return (
    <div>
      <article className="bus-info-container">
        <div className="bus-company-info-container">
          <div>
            <h2 className="bus-company-name">{busInfo.carCompanyName}</h2>
            <p className="bus-type-info">{busInfo.busType}</p>
          </div>
          <div className="bus-rating-container">
            <StarIcon style={{ color: '#FFD700' }} />
            <span>{busInfo.carCompanyRating}/5</span>
          </div>
        </div>

        <a className="bus-info-link" href="#">Thông tin xe</a>

        <div className="bus-route-info-container">
          <span>{busInfo.departureName}</span>
          <ArrowForwardIcon style={{ color: '#595959', fontSize: '15px' }} />
          <span>{busInfo.arrivalName}</span>
        </div>
        <div className="bus-route-info-container">
          <b>
            <span>{formatTime(busInfo.departureTime)}</span>
            <ArrowForwardIcon style={{ color: '#595959', fontSize: '15px' }} />
            <span>{formatTime(busInfo.arrivalTime)}</span>, <span>{formatDay(busInfo.departureTime)}</span>
          </b>
        </div>

        <p className="bus-schedule-info">{busInfo.countSeatsEmpty}</p>
      </article>
    </div>
  );
};

export default BusInfo;
