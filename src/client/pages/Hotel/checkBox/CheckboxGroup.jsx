import { useState } from "react";

const amenitiesList = [
  "Wi-Fi miễn phí",
  "Hồ bơi",
  "Spa",
  "Nhà hàng",
  "Phòng tập thể dục",
  "Bãi đỗ xe",
  "Dịch vụ phòng",
];

const CheckboxGroup = () => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedAmenities([...selectedAmenities, name]);
    } else {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== name));
    }
  };

  return (
    <div>
      {amenitiesList.map((amenity) => (
        <div key={amenity} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={amenity}
            name={amenity}
            checked={selectedAmenities.includes(amenity)}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor={amenity}>
            {amenity}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
