import React from "react";

const MapComponent = ({ latitude, longitude }) => {
  const calculateBbox = (lat, lon) => {
    const offset = 0.001; 
    return `${lon - offset},${lat - offset},${lon + offset},${lat + offset}`;
  };

  return (
    <div
      style={{
        width: "100%",
        height: 450,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${calculateBbox(latitude, longitude)}&layer=mapnik&marker=${latitude},${longitude}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none"
        }}
        title="OpenStreetMap"
      />
    </div>
  );
};

export default MapComponent;