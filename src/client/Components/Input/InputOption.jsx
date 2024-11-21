import React, { useState } from "react";
import "./InputLocation.css";

const address = [
    { name: "Hà Nội" },
    { name: "Hạ Long" },
    { name: "Đà Nẵng" },
    { name: "Hội An" },
    { name: "Huế" },
    { name: "Nha Trang" },
    { name: "Đà Lạt" },
    { name: "Phú Quốc" },
    { name: "Cần Thơ" },
    { name: "Sapa" },
];

const InputLocation = () => {
    const [noiDi, setNoiDi] = useState("");
    const [noiDen, setNoiDen] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [activeField, setActiveField] = useState("");

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        const filteredSuggestions = address.filter((add) =>
            add.name.toLowerCase().includes(value.toLowerCase())
        );

        if (type === "departure") {
            setNoiDi(value);
            setActiveField("departure");
        } else {
            setNoiDen(value);
            setActiveField("destination");
        }

        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        if (activeField === "departure") {
            setNoiDi(suggestion);
        } else {
            setNoiDen(suggestion);
        }
        setSuggestions([]);
        setActiveField("");
    };

    const swapDestination = () => {
        const temp = noiDi;
        setNoiDi(noiDen);
        setNoiDen(temp);
    };

    return (
        <div className="input-location-container">
            <div className="input-group">
                <input
                    type="text"
                    className="location-input"
                    value={noiDi}
                    onChange={(e) => handleInputChange(e, "departure")}
                    placeholder="Điểm đi"
                />
                <button className="swap-btn" onClick={swapDestination}>
                    <img
                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/331a92149a02dc615986206c588d6642.svg"
                        alt="Swap"
                        width={24}
                        height={24}
                    />
                </button>
                <input
                    type="text"
                    className="location-input"
                    value={noiDen}
                    onChange={(e) => handleInputChange(e, "destination")}
                    placeholder="Điểm đến"
                />
            </div>

            {suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                    {suggestions.map((add, index) => (
                        <div
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(add.name)}
                        >
                            {add.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InputLocation;
