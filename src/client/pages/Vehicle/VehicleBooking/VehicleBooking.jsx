import React, { useState } from 'react';
import './vehiclebooking.css';

const VehicleBooking = () => {
    // Dữ liệu đặt xe mẫu
    const booking = {
        code: 'A004',
        name: 'Phương Trang',
        rating: 5,
        ariveltime: '2:00',
        Departur: '5:00',
        ariveladdres: 'Cao Lãnh',
        Departuraddres: 'Hồ Chí Minh',
        price: "140.000",
    };

    // Dữ liệu ghế cố định (gộp cả tầng 1 và tầng 2 vào một mảng duy nhất)
    const initialSeats = [
        { id: 'A1', status: 'available' },
        { id: 'A2', status: 'booked' },
        { id: 'A3', status: 'available' },
        { id: 'A4', status: 'available' },
        { id: 'A5', status: 'booked' },
        { id: 'A6', status: 'available' },
        { id: 'A7', status: 'available' },
        { id: 'A8', status: 'booked' },
        { id: 'A9', status: 'available' },
        { id: 'A10', status: 'available' },
        { id: 'A11', status: 'available' },
        { id: 'A12', status: 'booked' },
        { id: 'A13', status: 'available' },
        { id: 'A14', status: 'available' },
        { id: 'A15', status: 'booked' },
        { id: 'A16', status: 'available' },
        { id: 'A17', status: 'available' },
        { id: 'B1', status: 'available' },
        { id: 'B2', status: 'booked' },
        { id: 'B3', status: 'available' },
        { id: 'B4', status: 'available' },
        { id: 'B5', status: 'available' },
        { id: 'B6', status: 'booked' },
        { id: 'B7', status: 'available' },
        { id: 'B8', status: 'available' },
        { id: 'B9', status: 'booked' },
        { id: 'B10', status: 'available' },
        { id: 'B11', status: 'available' },
        { id: 'B12', status: 'available' },
        { id: 'B13', status: 'booked' },
        { id: 'B14', status: 'available' },
        { id: 'B15', status: 'available' },
    ];

    const [seats, setSeats] = useState(initialSeats);

    // Hàm xử lý chọn hoặc hủy chọn ghế
    const handleSeatClick = (seatId) => {
        const updateSeats = seats.map((seat) =>
            seat.id === seatId && seat.status !== 'booked'
                ? { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' }
                : seat
        );
        setSeats(updateSeats);
    };

    // Hàm phân loại ghế theo tầng
    const getSeatsByFloor = (floor) => {
        return seats.filter((seat) => seat.id.charAt(0) === floor);
    };
    // Hàm render ghế
    const renderSeats = (seats) => {
        return seats.map((seat) => (
            <button
                key={seat.id}
                className={`seat-button ${seat.status}`}
                onClick={() => handleSeatClick(seat.id)}
                disabled={seat.status === 'booked'}
            >
                {seat.id}
            </button>
        ));
    };
    return (
        <div className="vehiclebooking-body">
            <div className="vehicle-container">
                {/* Thông tin xe */}
                <div className="header">
                    <div>
                        <b style={{ fontSize: '25px' }}>{booking.name}</b>
                        <b style={{ fontSize: '20px' }}>⭐{booking.rating}/5</b>
                    </div>
                    <h3 style={{ color: '#005AA1', fontWeight: 'bold' }}>Thông tin xe</h3>
                </div>
                <hr />
                <div className="details-bus">
                    <div>
                        <b style={{ color: 'gray' }}>{booking.ariveladdres}</b> ➡️{' '}
                        <b style={{ color: 'gray' }}>{booking.Departuraddres}</b>
                    </div>
                    <div>
                        <b style={{ fontWeight: 'bold', fontSize: '25px' }}>{booking.ariveltime}</b> -{' '}
                        <b style={{ fontWeight: 'bold', fontSize: '25px' }}>{booking.Departur}</b>
                    </div>
                </div>
                <div className='local-bus'>
                    <input type="text" placeholder="Điểm xuất phát" />
                    <input type="text" placeholder="Điểm đến" />
                </div>
                <hr />
                {/* Chọn ghế */}
                <div className="seats-container">
                    <div className="floor-section">
                        <h4>Tầng 1</h4>
                        <div className="seat-grid">{renderSeats(getSeatsByFloor('A'))}</div>
                    </div>
                    <div className="floor-section">
                        <h4>Tầng 2</h4>
                        <div className="seat-grid">{renderSeats(getSeatsByFloor('B'))}</div>
                    </div>
                </div>
                <div className='price-bus'>
                    <div className='item-1'>
                        <b>{booking.code}</b>
                    </div>
                    <div className='item-2'>
                        <b style={{ fontSize: "25px", color: "red" }}>{booking.price}</b>
                    </div>
                </div>
                <div className='item-button'>
                    <button className="continue-button">Tiếp tục</button>
                </div>

            </div>
        </div>
    );
};

export default VehicleBooking;
