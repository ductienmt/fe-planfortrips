import { useState } from "react";

const servicesList = [
  "Bữa sáng miễn phí",
  "Dịch vụ đón sân bay",
  "Tour du lịch",
  "Xe đưa đón",
];

const ServicesCheckboxGroup = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedServices([...selectedServices, name]);
    } else {
      setSelectedServices(selectedServices.filter((item) => item !== name));
    }
  };

  return (
    <div>
      {servicesList.map((service) => (
        <div key={service} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={service}
            name={service}
            checked={selectedServices.includes(service)}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor={service}>
            {service}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ServicesCheckboxGroup;
