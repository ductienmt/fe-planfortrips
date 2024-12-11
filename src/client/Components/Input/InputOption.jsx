import React, { useState, useEffect, useRef } from "react";
import "./InputLocation.css";
import { CityService } from "../../../services/apis/CityService";

const InputLocation = ({ setKeyword }) => {
  const [noiDi, setNoiDi] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [address, setAddress] = useState([]);
  const dropdownRef = useRef(null); 
  const searchCityByName = async (cityName) => {
    try {
      const response = await CityService.searchCityByName(cityName);
      if (response) {
        const limitedResponse = response.slice(0, 10);
        setAddress(limitedResponse);
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setSuggestions(address);
  }, [address]);

  const handleSuggestionClick = (suggestion) => {
    setNoiDi(suggestion);
    setKeyword(suggestion);
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
          onChange={(e) => {
            setNoiDi(e.target.value);
            searchCityByName(e.target.value);
            setKeyword(e.target.value);
          }}
          onFocus={() => setActiveField("departure")}
          placeholder="Điểm đi"
        />
      </div>
      <div ref={dropdownRef}>
      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((add, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(add)}
            >
              {add}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default InputLocation;
