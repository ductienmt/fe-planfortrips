import React, { useEffect, useRef } from "react";
import "./InputFlied.css";

export const InputFlied = ({
  nameInput,
  onChange,
  onBlur,
  content,
  typeInput,
  value,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  return (
    <div className="input-field">
      <input
        ref={inputRef}
        autoComplete="off"
        type={typeInput}
        name={nameInput}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        required
      />
      <label htmlFor={nameInput}>{content}</label>
    </div>
  );
};
