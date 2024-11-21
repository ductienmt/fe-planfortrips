import React, { useState } from "react";

// Autocomplete Component
const Autocomplete = ({ options = [], placeholder = "Type to search..." }) => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const filteredSuggestions = options.filter((option) =>
                option.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleOptionClick = (option) => {
        setInputValue(option);
        setSuggestions([]);
    };

    return (
        <div style={{ position: "relative" }}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                style={{
                    boxSizing: "border-box",
                }}
            />
            {suggestions.length > 0 && (
                <ul style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderTop: "none",
                    zIndex: 1000,
                    maxHeight: "150px",
                    overflowY: "auto",
                }}>
                    {suggestions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                            }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
