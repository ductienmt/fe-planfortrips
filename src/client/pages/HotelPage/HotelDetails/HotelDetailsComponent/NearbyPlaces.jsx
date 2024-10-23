import React, { useEffect, useState } from "react";
import "./NearbyPlaces.css"; // Import file CSS
import MapComponent from "../../../Components/MapComponent";

const NearbyPlaces = ({ hotel }) => {
  const places = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ec9737ffed52a4506708cf35332cf827f584be6f5470dfa332bd2a0008111a2?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
      text: "Bệnh viện",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/37b5e4d1251b0346069a0fc0ad9cf85069e3e5ef79b6f0b0a6e3f00ab2ff4303?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
      text: "Công viên",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/df783d1142ffeedc74797e7e599ed180426b0e47db27fefb5da8e4df768b9bee?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
      text: "Trung tâm thương mại",
    },
  ];

  const [position, setPosition] = useState({
    lat: "",
    lon: "",
  });

  useEffect(() => {
    if (hotel && hotel.address) {
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          hotel.address
        )}&format=json`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); 
        })
        .then((data) => {
          console.log(data);
          if (data && data.length > 0) {
            setPosition({
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon), 
            });
            console.log(position);
          } else {
            console.error("Không tìm thấy tọa độ cho địa chỉ này.");
          }
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API Nominatim:", error);
        });
    }
  }, [hotel.address]);

  console.log(position);

  return (
    <div className="nearby-places-container">
      <MapComponent position={position}></MapComponent>
      <h3 className="nearby-places-title">Địa điểm gần đây</h3>
      {places.map((place, index) => (
        <div key={index} className="nearby-place-item-container">
          <img
            loading="lazy"
            src={place.icon}
            alt=""
            className="nearby-place-icon"
          />
          <span className="nearby-place-text">{place.text}</span>
        </div>
      ))}
    </div>
  );
};

export default NearbyPlaces;
