import React from "react";
import "./SelectOptionField.css";

export const SelectOptionField = ({
  nameInput,
  onChange,
  onBlur,
  content,
  options = [],
  value,
  dai,
}) => {
  return (
    <div className="select-option-field" style={{ width: dai }}>
      <select
        name={nameInput}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      >
        <option value="" disabled>
          {content}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
