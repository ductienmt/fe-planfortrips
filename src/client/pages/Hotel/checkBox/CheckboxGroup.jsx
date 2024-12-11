import { useState } from "react";

const amenitiesList = [
  "Hồ bơi",
  "Bãi giữ xe",
  "Dịch vụ đưa đón sân bay",
  "Dịch vụ giặt ủi, giặt khô",
  "Khu vực hút thuốc riêng biệt",
  "Phòng gym",
  "Nhà hàng",
];

const CheckboxGroup = ({ setSelectedAmenities }) => {
  const [selectedAmenities, setSelectedAmenitiesState] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    let newSelectedAmenities = [...selectedAmenities];

    if (checked) {
      newSelectedAmenities.push(name);
    } else {
      newSelectedAmenities = newSelectedAmenities.filter((item) => item !== name);
    }
    setSelectedAmenitiesState(newSelectedAmenities);
    setSelectedAmenities(newSelectedAmenities);
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
