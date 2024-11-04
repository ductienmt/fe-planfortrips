import React, { useEffect, useState } from 'react';
import './BusInfo.css';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ScheduleService } from '../../../../../services/apis/ScheduleService';

const BusInfo = () => {
  const [formData, setFormData] = useState({

  })

  const [busInfo, setBusInfo] = useState(); // Sử dụng null để kiểm tra trạng thái dữ liệu dễ hơn

  useEffect(() => {
    const fetchBusInfo = async () => {
      try {

        const response = await ScheduleService.getScheduleID(1);
        setBusInfo(response.data); // Lưu dữ liệu vào state
        console.log(response.data); // Ghi lại dữ liệu vào console để kiểm tra
      } catch (error) {
        console.error("Error:", error);

      }
    };

    fetchBusInfo(); // Gọi hàm này khi component được mount
  }, []);

  // Kiểm tra xem dữ liệu đã được tải hay chưa
  if (!busInfo) {
    return <p>Đang tải thông tin xe buýt...</p>; // Thông báo khi chưa có dữ liệu
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
          <span>{busInfo.departureTime}</span>
          <ArrowForwardIcon style={{ color: '#595959', fontSize: '15px' }} />
          <span>{busInfo.arrivalTime}</span>
        </div>

        <p className="bus-schedule-info">{busInfo.countSeatsEmpty}</p>
      </article>
    </div>
  );
};

export default BusInfo;
