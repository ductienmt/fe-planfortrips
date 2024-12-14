import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./vehiclebooking.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { ScheduleService } from "../../../../services/apis/ScheduleService";

const VehicleBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate hook to navigate
  const [seats, setSeats] = useState([]);
  const [schedules, setSchedules] = useState({
    arrivalName: "",
    arrivalTime: "",
    carCompanyName: "",
    carCompanyRating: "",
    departureName: "",
    departureTime: "",
    priceForOneTicket: "",
    scheduleSeat: [],
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await ScheduleService.getScheduleID(id);
        setSchedules(response.data);
        setSeats(response.data.scheduleSeat);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchStations();
  }, [id]);

  const handleSeatClick = (seatId, seatNumber) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === seatId && seat.status !== "Full"
        ? { ...seat, status: seat.status === "selected" ? "Empty" : "selected" }
        : seat
    );

    setSeats(updatedSeats);

    if (updatedSeats.find((seat) => seat.id === seatId).status === "selected") {
      setSelectedSeats([...selectedSeats, seatNumber]);
      setTotalPrice(totalPrice + schedules.priceForOneTicket);
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      setTotalPrice(totalPrice - schedules.priceForOneTicket);
    }
  };

  const getHourAndMinutes = (timeString) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getSeatsByFloor = (floor) => {
    return seats.filter((seat) => seat.seatNumber.charAt(0) === floor);
  };

  const renderSeats = (seats) => {
    return seats.map((seat) => (
      <button
        key={seat.id}
        className={`seat-button ${seat.status}`}
        onClick={() => handleSeatClick(seat.id, seat.seatNumber)}
        disabled={seat.status === "Full"}
      >
        {seat.seatNumber}
      </button>
    ));
  };

  const handleContinueClick = () => {
    // Thực hiện lưu dữ liệu và điều hướng trang
    const username = sessionStorage.getItem("username");

    const bookingData = {
      scheduleId: id,
      totalPrice: totalPrice,
      status: null,
      username: username || null,
      paymentId: null,
    };

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));

    // Điều hướng đến trang tiếp theo
    navigate("/booking/transportation"); // Dùng navigate thay cho history.push
  };

  return (
    <div className="vehiclebooking-body">
      <div className="vehicle-container">
        <div className="header">
          <div>
            <b style={{ fontSize: "25px" }}>{schedules.carCompanyName}</b>
            <b style={{ fontSize: "20px" }}>⭐{schedules.carCompanyRating}/5</b>
          </div>
          <h3 style={{ color: "#005AA1", fontWeight: "bold" }}>Thông tin xe</h3>
        </div>
        <hr />
        <div className="details-bus">
          <div>
            <b style={{ color: "gray" }}>{schedules.arrivalName}</b>{" "}
            <TrendingFlatIcon />{" "}
            <b style={{ color: "gray" }}>{schedules.departureName}</b>
          </div>
          <div>
            <b style={{ fontWeight: "bold", fontSize: "25px" }}>
              {getHourAndMinutes(schedules.arrivalTime)}
            </b>{" "}
            ───{" "}
            <b style={{ fontWeight: "bold", fontSize: "25px" }}>
              {getHourAndMinutes(schedules.departureTime)}
            </b>
          </div>
        </div>
        {/* <div className="local-bus">
          <input type="text" placeholder="Điểm xuất phát" />
          <input type="text" placeholder="Điểm đến" />
        </div> */}
        <div className="ex-booking">
          Chưa đặt
          <div className="ex-1">

          </div>
          Đã đặt
          <div className="ex-2">

          </div>
          Hết chỗ
          <div className="ex-3">

          </div>
        </div>
        <hr />
        <div className="seats-container">
          <div className="floor-section">
            <h4>Tầng 1</h4>
            <div className="seat-grid">{renderSeats(getSeatsByFloor("A"))}</div>
          </div>
          <div className="floor-section">
            <h4>Tầng 2</h4>
            <div className="seat-grid">{renderSeats(getSeatsByFloor("B"))}</div>
          </div>
        </div>
        <div className="price-bus">
          <div className="item-2">
            <div className="right-item-2">
              <h4>Ghế đã chọn:</h4>
              <h4>{selectedSeats.join(", ")}</h4>
            </div>
            <b style={{ fontSize: "25px", color: "red" }}>
              {Number(totalPrice).toFixed(2)} VND
            </b>
          </div>
        </div>
        <div className="item-button">
          <button className="continue-button" onClick={handleContinueClick}>
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleBooking;
