import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ position }) => {
  // Chỉ hiển thị bản đồ khi có tọa độ hợp lệ
  if (!position.lat || !position.lon) {
    return <div>Đang tải bản đồ...</div>; // Thông báo chờ tải
  }

  return (
    <MapContainer
      center={[position.lat, position.lon]} // Sử dụng tọa độ đúng
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[position.lat, position.lon]}>
        <Popup>
          Vị trí của bạn: {position.lat}, {position.lon}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
