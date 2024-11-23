import './ChooseAreaCard.css';

const ChooseAreaCard = ({img, chooseArea, onClick}) => {
    return (
        <>
        <div className="chooseArea-card" style={{ padding: "0" }} onClick={onClick}>
        <div className="chooseArea-card-item">
          <img src={img} />
          <div className="chooseArea-content">
            <p className="chooseArea-name">{chooseArea}</p>
          </div>
        </div>
      </div>
        </>
    );
};
export default ChooseAreaCard;