import React, { useEffect, useState } from 'react';
import './BusBooking.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ScheduleService } from '../../../../../services/apis/ScheduleService';
import { useParams } from 'react-router-dom';

const BusBooking = ({ setpriceForOneSeat, selectedSeats, setSelectedSeats }) => {
    const [busBooking, setBusBooking] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBusBooking = async () => {
            try {
                const response = await ScheduleService.getScheduleID(id);
                setBusBooking(response.data);
                setpriceForOneSeat(response.data.priceForOneSeat);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchBusBooking();
    }, [id, setpriceForOneSeat]);

    if (!busBooking) {
        return <p>Loading bus booking information...</p>;
    }

    // Phân chia ghế thành 2 tầng
    const floors = [
        {
            number: 1,
            label: 'Tầng 1',
            seats: busBooking.scheduleSeat.filter(seat => seat.seatNumber.startsWith('A'))
        },
        {
            number: 2,
            label: 'Tầng 2',
            seats: busBooking.scheduleSeat.filter(seat => seat.seatNumber.startsWith('B'))
        }
    ];

    // Hàm xử lý khi nhấn vào ghế
    const handleSeatClick = (seat) => {
        if (seat.status === 'Empty') {
            setSelectedSeats((prev) =>
                prev.includes(seat.seatNumber)
                    ? prev.filter((s) => s !== seat.seatNumber)
                    : [...prev, seat.seatNumber]
            );
        }
    };

    return (
        <div className="bus-booking-wrapper">
            {/* Legend Status */}
            <div className="legend-wrapper">
                <div className="status-item">
                    <div className="status-box booked" />
                    <span className="status-label">Đã đặt</span>
                </div>
                <div className="status-item">
                    <div className="status-box selected" />
                    <span className="status-label">Đang chọn</span>
                </div>
                <div className="status-item">
                    <div className="status-box available" />
                    <span className="status-label">Chưa đặt</span>
                </div>
            </div>

            {/* Pickup Points */}
            <section className="pickup-points-wrapper">
                <div className="pickup-points-container">
                    <div className="pickup-point-container">
                        <span>Chọn điểm đón</span>
                        <ArrowDropDownIcon className="dropdown-icon" />
                    </div>
                    <div className="dropoff-point-container">
                        <span>Bến xe Miền Tây</span>
                        <ArrowDropDownIcon className="dropdown-icon" />
                    </div>
                </div>
            </section>

            {/* Seat Selector */}
            <section className="seat-selector-wrapper-container">
                {floors.map((floor) => (
                    <div className="floor-section" key={floor.number}>
                        <div className="seat-grid-wrapper">
                            <div className="first-row-container">
                                {floor.seats.slice(0, 2).map((seat) => (
                                    <button
                                        key={seat.seatNumber}
                                        className={`seat-button ${seat.status === 'Full' ? 'full' : seat.status === 'Empty' ? 'available' : seat.status === 'Booked' ? 'booked' : ''} ${selectedSeats.includes(seat.seatNumber) ? 'selected' : ''}`}
                                        onClick={() => handleSeatClick(seat)}
                                        disabled={seat.status !== 'Empty'}
                                    >
                                        {seat.seatNumber}
                                    </button>
                                ))}
                                <div className="floor-info-container">
                                    <span>{floor.label}</span>
                                </div>
                            </div>

                            {[2, 5, 8, 11, 14].map((startIdx) => (
                                <div className="seat-row-container" key={startIdx}>
                                    {floor.seats.slice(startIdx, startIdx + 3).map((seat) => (
                                        <button
                                            key={seat.seatNumber}
                                            className={`seat-button 
                                        ${seat.status === 'Full' ? 'full' : seat.status === 'Empty' ? 'available' : seat.status === 'Booked' ? 'booked' : ''} 
                                        ${selectedSeats.includes(seat.seatNumber) ? 'selected' : ''}`}
                                            onClick={() => handleSeatClick(seat)}
                                            disabled={seat.status === 'Full'}
                                        >
                                            {seat.seatNumber}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default BusBooking;
