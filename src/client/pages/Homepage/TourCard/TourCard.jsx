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
  contentButton,
  tags,
  handleClick,
  numberPeopleUsed,
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
          <h2 className="mb-1 text-head">{title}</h2>
          <div
            className="price mb-2"
            style={{
              display: "grid",
              gridTemplateColumns:
                "auto auto auto auto auto auto auto auto auto auto",
              gap: "5px",
            }}
          >
            {" "}
            Tag:
            {tags?.map((tags, index) => (
              <div key={index}>#{tags}</div>
            ))}
          </div>
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
        <div className="footer" style={{ gap: "15px" }}>
          <div className="rating mb">
            <p className="mb-0 text-white">
              {numberPeopleUsed > 0
                ? `(Đã có: ${numberPeopleUsed} khách hàng đặt)`
                : `Tour mới`}
            </p>
          </div>
          <div className="rating-badge mb-0">{renderStars(rating)}</div>
          <button
            className="btn btn-book"
            onClick={() => handleClick()}
            style={{ fontSize: "1.2rem", width: "80%" }}
          >
            {contentButton}
          </button>
        </div>
      </div>
    </>
  );
};

export default TourCard;
