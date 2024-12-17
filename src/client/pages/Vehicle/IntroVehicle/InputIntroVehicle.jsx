import React, { useEffect, useState, useCallback } from "react";
import "./InputIntroVehicle.css";
import { GetAllProvinces } from "../../../../services/vnLocation";

const InputIntroVehicle = ({ noiDi, setNoiDi, noiDen, setNoiDen }) => {
  const [address, setAddress] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");

  // Hàm lấy danh sách địa chỉ từ API
  const loadAddress = async () => {
    try {
      const response = await GetAllProvinces();
      setAddress(response);
    } catch (error) {
      console.error("Lỗi khi tải danh sách địa chỉ:", error);
    }
  };

  // Chỉ tải dữ liệu một lần khi component được mount
  useEffect(() => {
    loadAddress();
  }, []);

  // Hàm debounce để giảm số lần gọi hàm
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleInputChange = useCallback(
    debounce((value, type) => {
      const filteredSuggestions = address.filter((add) =>
        add.province_name.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(filteredSuggestions);

      if (type === "departure") {
        setNoiDi(value);
        setActiveField("departure");
      } else {
        setNoiDen(value);
        setActiveField("destination");
      }
    }), // 300ms delay
    [address]
  );

  const handleChange = (e, type) => {
    const value = e.target.value;
    handleInputChange(value, type);
  };

  const handleSuggestionClick = (suggestionName) => {
    if (activeField === "departure") {
      setNoiDi(suggestionName);
    } else {
      setNoiDen(suggestionName);
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
          onChange={(e) => handleChange(e, "departure")}
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
          onChange={(e) => handleChange(e, "destination")}
          placeholder="Điểm đến"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="input-introvehicle-dropdown">
          {suggestions.map((add) => (
            <div
              key={add.province_id}
              className="input-introvehicle-item"
              onClick={() => handleSuggestionClick(add.province_name)}
            >
              {add.province_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputIntroVehicle;
