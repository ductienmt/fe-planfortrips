import { Link } from "react-router-dom";
import "./CheckinCard.css";

const CheckinCard = ({
  img,
  cityName,
  checkinName,
  rating,
  description,
  linkTo,
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
      <Link to={linkTo}>
        <div className="checkin-card" style={{ padding: "0" }}>
          <div className="checkin-card-item">
            <img src={img} alt={checkinName} />
            <div className="content">
              <p className="city-name">{cityName}</p>
              <h4 className="checkin-name">{checkinName}</h4>
              <p className="checkin-description">{description}</p>
              <div className="rating-badge">{renderStars(rating)}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CheckinCard;
