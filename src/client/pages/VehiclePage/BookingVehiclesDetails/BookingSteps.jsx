import React from 'react';
import './BookingSteps.css';
import StepIndicator from './BKVehiclesDeatilsComponent/StepIndicator';
import SeatSelector from './BKVehiclesDeatilsComponent/SeatSelector';
import BusInfo from './BKVehiclesDeatilsComponent/BusInfo';
import PickupPoints from './BKVehiclesDeatilsComponent/PickupPoints';
import LegendStatus from './BKVehiclesDeatilsComponent/LegendStatus';

const BookingSteps = () => {
    const steps = [
        { number: '1', label: 'Tìm chuyến xe', active: false },
        { number: '2', label: 'Đặt vé', active: true },
        { number: '3', label: 'Thanh toán', active: false }
    ];

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
                    <PickupPoints />
                    <LegendStatus />
                    <SeatSelector />
                    <hr className="divider-line" />

                    <div className="booking-summary-section">
                        <span className="seat-code-label">Mã chỗ</span>
                        <div className="price-display-wrapper">
                            <span className="price-label-text">Giá vé:</span>
                            <span className="price-amount-value">140.000đ</span>
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
