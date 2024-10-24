import React from 'react';
import './BookingHotel.css';
import BookingHotelImageGallery from './BookingHotelComponent/BookingHotelImageGallery';
import BookingHotelHotelInfo from './BookingHotelComponent/BookingHotelHotelInfo';
import BookingHotelRoomOptions from './BookingHotelComponent/BookingHotelRoomOptions';
import BookingHotelLocationMap from './BookingHotelComponent/BookingHotelLocationMap';
import BookingHotelReviewSection from './BookingHotelComponent/BookingHotelReviewSection';
import BookingHotelAmenityItem from './BookingHotelComponent/BookingHotelAmenityItem';

function BookingHotel() {
  const amenities = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1bd4171e9f24609e8c68423389aade4432880411586827c8d278185890ce3e77?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Các loại khăn" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2eb07f48fc040f89e987d845561a885167e5f15b45f32006c16bce9339397b5f?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Điện thoại" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/77845ec56ce774dd1b333a4603ee7540f5b238d865644feebafae32088dd0191?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Máy sấy tóc" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/70bdefc4fa39c271869c3b11123b2adc1d313ad1ab33a7d468e7d0d1c1880169?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Truyền hình cáp/vệ tinh" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eeb56e1f791a551f67e88b06818224d63768d46feaa4c8edc234bbc4618d79c3?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Tủ quần áo" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/867431a671d7e99b76faed1a11fb45babc1f882e935291c8f865032518b07759?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Wi-Fi [miễn phí]" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/02fe40b65413ca17a6912ed68754183716bb3b1d1aeaa854a1b2a77fd67d1f3d?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Dép đi trong nhà" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a8555031c2c2aa5b8f15bc3bab3d75413b8aa9a39b59c21959403b718e19b050?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Tủ lạnh" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5cec712bafe3b7a20bb123c9e728de18e6eb21da262427c3f198fdcf93618d82?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", name: "Vật dụng tắm rửa" }
  ];

  return (
    <div className="booking-hotel-container">
      <main className="booking-hotel">
        <BookingHotelImageGallery />
        <BookingHotelHotelInfo />
        <section className="booking-hotel-amenities">
          <h2 className="booking-hotel-section-title">Tiện ích</h2>
          <div className="booking-hotel-amenities-grid">
            {amenities.map((amenity, index) => (
              <BookingHotelAmenityItem key={index} icon={amenity.icon} name={amenity.name} />
            ))}
          </div>
        </section>
        <BookingHotelRoomOptions />
        <BookingHotelLocationMap />
        <BookingHotelReviewSection />
      </main>
    </div>
  );
}

export default BookingHotel;
