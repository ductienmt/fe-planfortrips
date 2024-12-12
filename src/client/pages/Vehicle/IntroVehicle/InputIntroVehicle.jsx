import React, { useState } from "react";
import "./InputIntroVehicle.css";

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

const InputIntroVehicle = ({ noiDi, setNoiDi, noiDen, setNoiDen }) => {
    // const [noiDi, setNoiDi] = useState("");
    // const [noiDen, setNoiDen] = useState("");
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
        <div className="input-introvehicle-container">
            <div className="input-introvehicle-group">
                <input
                    type="text"
                    className="input-introvehicle-input"
                    value={noiDi}
                    onChange={(e) => handleInputChange(e, "departure")}
                    placeholder="Điểm đi"
                />
                <button className="input-introvehicle-swap" onClick={swapDestination}>
                    <img
                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/331a92149a02dc615986206c588d6642.svg"
                        alt="Swap"
                        width={24}
                        height={24}
                    />
                </button>
                <input
                    type="text"
                    className="input-introvehicle-input"
                    value={noiDen}
                    onChange={(e) => handleInputChange(e, "destination")}
                    placeholder="Điểm đến"
                />
            </div>

            {suggestions.length > 0 && (
                <div className="input-introvehicle-dropdown">
                    {suggestions.map((add, index) => (
                        <div
                            key={index}
                            className="input-introvehicle-item"
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

export default InputIntroVehicle;