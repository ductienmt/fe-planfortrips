import "./BookingHotelImageGallery.css"; // Import file CSS riêng

function BookingHotelImageGallery({ images }) {
  // Ensure images is an array and not empty
  if (!images || images.length === 0) {
    return (
      <section className="booking-hotel-image-gallery-container">
        <div className="booking-hotel-main-image">
          <img
            src="https://media.istockphoto.com/id/687810238/vi/anh/ch%C3%B3-pug-v%E1%BB%9Bi-m%C5%A9-b%E1%BA%A3o-hi%E1%BB%83m-an-to%C3%A0n-x%C3%A2y-d%E1%BB%B1ng-m%C3%A0u-v%C3%A0ng-v%C3%A0-h%C3%ACnh-n%C3%B3n-v%C3%A0-404-l%E1%BB%97i-v%C3%A0-d%E1%BA%A5u-hi%E1%BB%87u-ng%C3%B5-c%E1%BB%A5t.jpg?b=1&s=612x612&w=0&k=20&c=OSoeVaWynLn1uMcvE9yxZFsFrpjdnSQ2OkYnhWUOBKU="
            alt="Default image"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="booking-hotel-image-gallery-container">
      <div className="booking-hotel-main-image">
        <img src={images[0].url} alt="Main hotel" />
      </div>

      <div className="booking-hotel-secondary-images">
        {images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Secondary image ${index + 1}`}
            className="booking-hotel-gallery-img"
          />
        ))}
      </div>
    </section>
  );
}

export default BookingHotelImageGallery;
