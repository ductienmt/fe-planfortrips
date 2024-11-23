import React, { useState } from "react";
import dayjs from "dayjs";
import "./dateform.css";

const DatePickerComponent = () => {
    const [departureDate, setDepartureDate] = useState(dayjs());
    const [returnDate, setReturnDate] = useState(dayjs().add(1, "day"));
    const [isRoundTrip, setIsRoundTrip] = useState(false);

    const handleDepartureChange = (e) => {
        const newDate = dayjs(e.target.value);
        setDepartureDate(newDate);
        if (!isRoundTrip) {
            // Nếu không chọn khứ hồi, cập nhật ngày về sao cho nó cách ngày đi 1 ngày
            setReturnDate(newDate.add(1, "day"));
        }
    };

    const handleReturnChange = (e) => {
        setReturnDate(dayjs(e.target.value));
    };

    const handleRoundTripToggle = () => {
        setIsRoundTrip(!isRoundTrip);
        if (!isRoundTrip) {
            setReturnDate(departureDate.add(1, "day")); // Set return date to 1 day after departure by default
        }
    };

    return (
        <div className="datepicker-component">
            <div className="datepicker-component-form-container">
                <div className="datepicker-component-flex-layout datepicker-component-margin-bottom-16">
                    <h3 className="datepicker-component-label-text">Ngày đi & Ngày về</h3>

                </div>
                <div className="datepicker-component-flex-layout">
                    {/* Input for Departure Date */}
                    <div className="datepicker-component-input-field-wrapper">
                        <input
                            type="date"
                            value={departureDate.format("YYYY-MM-DD")}
                            onChange={handleDepartureChange}
                            className="datepicker-component-input-field"
                        />
                    </div>

                    {/* Input for Return Date - only show if round trip is selected */}
                    {isRoundTrip && (
                        <div className="datepicker-component-input-field-wrapper">
                            <input
                                type="date"
                                value={returnDate.format("YYYY-MM-DD")}
                                onChange={handleReturnChange}
                                className="datepicker-component-input-field"
                            />
                        </div>
                    )}
                </div>

                {/* Checkbox for Round Trip */}
                <div className="datepicker-component-checkbox-wrapper datepicker-component-margin-top-16">
                    <input
                        type="checkbox"
                        checked={isRoundTrip}
                        onChange={handleRoundTripToggle}
                        id="round-trip-checkbox"
                        className="datepicker-component-checkbox-input"
                    />
                    <label htmlFor="round-trip-checkbox" className="datepicker-component-checkbox-label">
                        Khứ hồi
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DatePickerComponent;
