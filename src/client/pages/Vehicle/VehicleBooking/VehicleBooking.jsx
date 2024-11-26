import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./vehiclebooking.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { ScheduleService } from "../../../../services/apis/ScheduleService";

const VehicleBooking = () => {
    const { id } = useParams(); // Lấy id từ URL
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

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await ScheduleService.getScheduleID(id); // Dùng id từ URL
                setSchedules(response.data);
                setSeats(response.data.scheduleSeat);
                console.log(response.data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchStations();
    }, [id]); // Gọi lại khi id thay đổi

    // Các hàm xử lý khác
    const handleSeatClick = (seatId) => {
        const updateSeats = seats.map((seat) =>
            seat.id === seatId && seat.status !== "Full"
                ? { ...seat, status: seat.status === "selected" ? "Empty" : "selected" }
                : seat
        );
        setSeats(updateSeats);
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
                onClick={() => handleSeatClick(seat.id)}
                disabled={seat.status === "Full"}
            >
                {seat.seatNumber}
            </button>
        ));
    };

    return (
        <div className="vehiclebooking-body">
            <div className="vehicle-container">
                {/* Thông tin xe */}
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
                        <TrendingFlatIcon /> <b style={{ color: "gray" }}>{schedules.departureName}</b>
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
                <div className="local-bus">
                    <input type="text" placeholder="Điểm xuất phát" />
                    <input type="text" placeholder="Điểm đến" />
                </div>
                <hr />
                {/* Chọn ghế */}
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
                    <div className="item-1">
                        <b>{schedules.code}</b>
                    </div>
                    <div className="item-2">
                        <b style={{ fontSize: "25px", color: "red" }}>
                            {Number(schedules.priceForOneTicket).toFixed(2)} VND
                        </b>
                    </div>
                </div>
                <div className="item-button">
                    <button className="continue-button">Tiếp tục</button>
                </div>
            </div>
        </div>
    );
};

export default VehicleBooking;