import React from 'react';

function BookingHotelLocationMap() {
    return (
        <section className="location-map">
            <h2 className="section-title">Vị trí</h2>
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d499c0490a4f2d740bad90f3e527489be183fa8285b52c818e51da338538669?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                alt="Hotel location map"
                className="map-image"
            />
            <style jsx>{`
        .location-map {
          width: 100%;
          margin-top: 20px;
        }
        .map-image {
          width: 100%;
          height: auto;
          border-radius: 5px;
        }
      `}</style>
        </section>
    );
}

export default BookingHotelLocationMap;
