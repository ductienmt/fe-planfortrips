import { Link } from "react-router-dom";
import "./ChooseProvince.css";

const ChooseProvince = ({ img, provinceName, linkTo }) => {
  return (
    <>
      <Link to={linkTo}>
        <div className="chooseProvince-card" style={{ padding: "0" }}>
          <div className="chooseProvince-card-item">
            <img src={img} />
            <div className="chooseProvince-content">
              <p className="chooseProvince-name">{provinceName}</p>
              <div className="chooseProvince-content2">
                <p className="chooseProvince-name2">Xem điểm check-in ngay!</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default ChooseProvince;
