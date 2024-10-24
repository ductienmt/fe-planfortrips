import React from "react";
import "./AccommodationCard.css";
import { Link } from "react-router-dom";

const AccommodationCard = ({ hotel_id, images, name, address, rating }) => {
  return (
    <article className="accommodation-card-outer-container">
      <div className="accommodation-card-main-content-container">
        <Link to={`/booking-hotel/${hotel_id}`}>
         {images.length > 0?( <img
            src={images[0].url}
            alt={name}
            className="accommodation-card-image"
            style={{ height:'auto',maxWidth: '300px' }}
          />): <img
          src="https://th.bing.com/th/id/R.51879f9aeaaf6060aa42a64df71696f1?rik=h8Ox9c2rUwGi%2fg&pid=ImgRaw&r=0"
          alt={name}
          className="accommodation-card-image"
          style={{ height:'auto',maxWidth: '300px' }}
          />}
        </Link>

        <div className="accommodation-card-details-section-container">
          <h3 className="accommodation-card-name-text">{name}</h3>
          <p className="accommodation-card-address-text">{address}</p>
          <h4 className="accommodation-card-amenities-heading">Tiện nghi</h4>
          {/* <ul className="accommodation-card-amenities-list-container">
                        {amenities.map((amenity, index) => (
                            <li key={index} className="accommodation-card-amenity-item">{amenity}</li>
                        ))}
                    </ul> */}
          <center>
            <div className="accommodation-card-divider-line"></div>
          </center>
          <div className="accommodation-card-rating-and-reviews-container">
            <h4 className="accommodation-card-rating-heading">Đánh giá</h4>
            <div className="accommodation-card-rating-stars-container">
              {[...Array(rating)].map((_, i) => (
                <img
                  key={i}
                  src={`https://cdn.builder.io/api/v1/image/assets/TEMP/359d68ff6db47925527305fd619fd5fea1f4b9a841fdb15e77d5236a1a8b7c53?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8${
                    14 + i
                  }-`}
                  alt=""
                  className="accommodation-card-star-icon"
                />
              ))}
            </div>
            {/* <span className="accommodation-card-review-count-text">( {reviews} )</span> */}
          </div>
          <div className="accommodation-card-partnership-badge-container">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/10bffa496ab9762efa950ac78c9a0dcb74f09c1ae79301bf2f72e7fd08c918f6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
              alt=""
              className="accommodation-card-partnership-icon"
            />
            <span className="accommodation-card-partnership-text">
              Quan hệ đối tác
            </span>
          </div>
          <div className="accommodation-card-price-information-container">
            <div className="accommodation-card-original-price-container">
              <span className="accommodation-card-price-label-text">
                Giá gốc
              </span>
              <span className="accommodation-card-original-price-value">
                500.000 VNĐ
              </span>
              <span className="accommodation-card-currency-symbol">đ</span>
            </div>
            <div className="accommodation-card-discounted-price-container">
              <span className="accommodation-card-price-label-text">
                ( Đã bao gồm thuế, phí )
              </span>
              <span className="accommodation-card-discounted-price-value">
                500.000 VNĐ
              </span>
              <span className="accommodation-card-currency-symbol">đ</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AccommodationCard;
