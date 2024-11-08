import React, { useState } from 'react';
import './BookingSteps.css';
import StepIndicator from './BKVehiclesDeatilsComponent/StepIndicator';
import BusInfo from './BKVehiclesDeatilsComponent/BusInfo';
import BusBooking from './BKVehiclesDeatilsComponent/BusBooking';

const BookingSteps = () => {
    const [priceForOneSeat, setpriceForOneSeat] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const steps = [
        { number: '1', label: 'Tìm chuyến xe', active: false },
        { number: '2', label: 'Đặt vé', active: true },
        { number: '3', label: 'Thanh toán', active: false }
    ];

    // Tính tổng giá cho các ghế đã chọn
    const totalPrice = selectedSeats.length * priceForOneSeat;

    return (
        <main className="booking-container-fullwidth">
            <center>
                <section className="steps-indicator-container">
                    {steps.map((step, index) => (
                        <StepIndicator
                            key={index}
                            number={step.number}
                            label={step.label}
                            active={step.active}
                        />
                    ))}
                </section>

                <section className="booking-details-section-content">
                    <BusInfo />
                    <hr className="divider-line" />
                    <BusBooking setpriceForOneSeat={setpriceForOneSeat} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
                    <hr className="divider-line" />

                    <div className="booking-summary-section">
                        <span className="seat-code-label">Mã chỗ đã chọn: {selectedSeats.join(', ')}</span>
                        <div className="price-display-wrapper">
                            <span className="price-label-text">Giá vé:</span>
                            <span className="price-amount-value">{totalPrice}đ</span>
                        </div>
                    </div>

                    <div className="button-wrapper">
                        <button className="continue-button-action">
                            Tiếp tục
                        </button>
                    </div>
                </section>
            </center>
        </main>
    );
};

export default BookingSteps;
