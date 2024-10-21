import React from "react";
import "./TourCard.css";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const TourCard = ({
  image,
  title,
  description,
  location,
  people,
  nights,
  rating,
  price,
  feedback,
  handleClick,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={fullStars + i + 1} className="star empty">
          ☆
        </span>
      );
    }

    return stars;
  };
  return (
    <>
      <div className="tour-card">
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="content">
          <h2 className="mb-3 text-head">{title}</h2>
          <p className="text-des">{description}</p>
          <div className="amenities mt-3">
            <div className="location">
              <ShareLocationIcon color="primary" />
              <p className="mb-0">{location}</p>
            </div>
            <span>|</span>
            <div className="people">
              <PeopleAltIcon color="primary" />
              <p className="mb-0">{people}</p>
            </div>
            <span>|</span>
            <div className="nights">
              <NightsStayIcon color="primary" />
              <p className="mb-0">{nights}</p>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="rating d-flex align-items-center mb-4">
            <p className="mb-0 text-white">
              ({feedback} đánh giá) {"   "}
            </p>
            <div className="rating-badge mb-0">{renderStars(rating)}</div>
          </div>
          <div className="price d-flex flex-column align-items-center mb-4">
            <p className="mb-0 text-white fw-bold custom-price">{price} VNĐ</p>
            <p className="mb-0 text-white">/ 1 người</p>
          </div>
          <button className="btn btn-book" onClick={() => handleClick()}>
            Đặt ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default TourCard;
