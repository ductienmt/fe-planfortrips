import "./CheckinCard.css";

const CheckinCard = ({ img, cityName, checkinName, rating }) => {
  const toUpperCase = (str) => str.toUpperCase();
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
      <div className="checkin-card">
        <div className="checkin-card-item">
          <img src={img} alt={checkinName} />
          <div className="content">
            <p className="city-name">{toUpperCase(cityName)}</p>
            <h4 className="checkin-name">{toUpperCase(checkinName)}</h4>
            <p className="checkin-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
            <div className="rating-badge">{renderStars(rating)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckinCard;
