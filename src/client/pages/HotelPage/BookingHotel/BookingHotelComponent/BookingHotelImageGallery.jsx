import React from 'react';
import './BookingHotelImageGallery.css'; // Import file CSS riêng

function BookingHotelImageGallery() {
  const images = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/35d92df6b07a6a369ade086ef9820c35bec3a464cec39143fc81a1d1f6914398?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Main hotel image" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5fa278b67ef2d193646f683ded174eef58cc12851c8c00a4f1cc0f5bf65571c6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Hotel image 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d3c433d0e8e25678c8b2b35550c4ea183c4af472b0acd04d8f1eb739ec6bc0?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Hotel image 3" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/66052836c7ec3511a746f89e4abe47d173be48fd670f572751c8fdacf47ae7d8?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Hotel image 4" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/891226459cde497f495cba29d2b4272b902c25e62018ff546d155d05d03f6fa9?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", alt: "Hotel image 5" }
  ];

  return (
    <section className="booking-hotel-image-gallery-container">
      <div className="booking-hotel-main-image">
        <img src={images[0].src} alt={images[0].alt} className="booking-hotel-gallery-img" />
      </div>
      <div className="booking-hotel-secondary-images">
        {images.slice(1).map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} className="booking-hotel-gallery-img" />
        ))}
      </div>
    </section>
  );
}

export default BookingHotelImageGallery;
