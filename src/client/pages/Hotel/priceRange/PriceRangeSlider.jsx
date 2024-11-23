import { useState } from "react";
import "./PriceRangeSlider.css";
import Slider from "@mui/material/Slider";

const minDistance = 300;

const PriceRangeSlider = () => {
  const [value, setValue] = useState([200, 2000]);

  const handleChange = (_, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      const newMin = Math.min(newValue[0], value[1] - minDistance);
      setValue([newMin, Math.max(value[1], newMin + minDistance)]);
    } else {
      const newMax = Math.max(newValue[1], value[0] + minDistance);
      setValue([Math.min(value[0], newMax - minDistance), newMax]);
    }
  };

  const formatPrice = (price) => {
    const formattedPrice = Number(price).toString();
    const parts = formattedPrice.split(".");
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1] : "";
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    const formattedIntegerPart = integerPart.replace(regex, ".");
    let formattedDecimalPart = "";
    if (decimalPart) {
      formattedDecimalPart = decimalPart.padEnd(3, "0");
    } else {
      formattedDecimalPart = ".000";
    }
    const formattedPriceWithDecimal =
      formattedIntegerPart + formattedDecimalPart + " VNĐ";
    return formattedPriceWithDecimal;
  };

  return (
    <>
      <Slider
        min={0}
        max={5000}
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
      />
      <div className="input-box">
        <div className="min-box">
          <div className="input-wrap">
            <input
              type="text"
              name="min_input"
              className="input-field min-input"
              value={formatPrice(value[0])}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>
        <div className="max-box">
          <div className="input-wrap">
            <input
              type="text"
              name="max_input"
              className="input-field max-input"
              value={formatPrice(value[1])}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceRangeSlider;
