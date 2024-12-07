import React, { useState, useEffect } from 'react';

const OpenStreetMapEmbed = ({ address }) => {
  const [mapUrl, setMapUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const url = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lon)-0.01}%2C${parseFloat(lat)-0.01}%2C${parseFloat(lon)+0.01}%2C${parseFloat(lat)+0.01}&layer=mapnik&marker=${lat}%2C${lon}`;
          setMapUrl(url);
          setLoading(false);
        } else {
          setError('Không tìm thấy địa điểm');
          setLoading(false);
        }
      } catch (err) {
        setError('Lỗi khi tải bản đồ');
        setLoading(false);
      }
    };

    if (address) {
      fetchCoordinates();
    }
  }, [address]);

  if (loading) {
    return <div className="text-center p-4">Đang tải bản đồ...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="w-full h-96 border rounded-lg overflow-hidden" style={{ height:"400px" }}>
      {mapUrl && (
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          title="OpenStreetMap Embed"
        >
          <a href={`https://www.openstreetmap.org/`}>
            Xem bản đồ chi tiết
          </a>
        </iframe>
      )}
    </div>
  );
};

export default OpenStreetMapEmbed;