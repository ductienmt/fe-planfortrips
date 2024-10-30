import React, { useEffect, useRef, useState } from "react";
import "./InputFlied.css";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const InputFlied = ({
  nameInput,
  onChange,
  onBlur,
  content,
  typeInput,
  dai,
  value,
}) => {
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-field" style={{ width: dai }}>
      <input
        ref={inputRef}
        autoComplete="off"
        type={typeInput === "password" && !showPassword ? "password" : "text"}
        name={nameInput}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        required
        style={{ paddingRight: "40px" }}
      />
      <label htmlFor={nameInput}>{content}</label>

      {typeInput === "password" && (
        <InputAdornment position="end">
          <IconButton
            onClick={toggleShowPassword}
            edge="end"
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )}
    </div>
  );
};
