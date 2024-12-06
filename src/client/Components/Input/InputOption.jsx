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
        } 

        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        if (activeField === "departure") {
            setNoiDi(suggestion);
        } 
        setSuggestions([]);
        setActiveField("");
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
