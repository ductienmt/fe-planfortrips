import React, { useState } from "react";
import dayjs from "dayjs";
import "./datevehicle.css";

const DateVehicle = ({ departureDate, returnDate, setDepartureDate, setReturnDate }) => {
    const [isRoundTrip, setIsRoundTrip] = useState(false);

    const handleRoundTripToggle = () => {
        setIsRoundTrip(!isRoundTrip);
        if (!isRoundTrip) {
            const nextDay = dayjs(departureDate).add(1, "day").format("YYYY-MM-DD");
            setReturnDate(nextDay);
        }
    };
    return (
        <div className="datevehicle">
            <div className="datevehicle__inputs">
                <input
                    type="date"
                    value={departureDate || ""}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="datevehicle__input"
                />
                {isRoundTrip && (
                    <input
                        type="date"
                        value={returnDate || ""}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="datevehicle__input"
                    />
                )}
            </div>
            <div className="datevehicle__checkbox">
                <input
                    type="checkbox"
                    checked={isRoundTrip}
                    onChange={handleRoundTripToggle}
                    id="round-trip-checkbox"
                />
                <label htmlFor="round-trip-checkbox">Khứ hồi</label>
            </div>
        </div>
    );
};


export default DateVehicle;
