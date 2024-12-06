import { Link } from "react-router-dom";
import "./ChooseAreaCard.css";

const ChooseAreaCard = ({ img, chooseArea, linkto }) => {
  return (
    <>
      <Link style={{ textDecoration: "none" }} to={linkto}>
        <div className="chooseArea-card" style={{ padding: "0" }}>
          <div className="chooseArea-card-item">
            <img src={img} />
            <div className="chooseArea-content">
              <p className="chooseArea-name">{chooseArea}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default ChooseAreaCard;
