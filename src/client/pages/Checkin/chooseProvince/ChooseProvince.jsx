import "./ChooseProvince.css";

const ChooseProvince = ({ img, provinceName, onClick }) => {
  return (
    <>
      <div className="chooseProvince-card" style={{ padding: "0" }} onClick={onClick}>
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
    </>
  );
};
export default ChooseProvince;
