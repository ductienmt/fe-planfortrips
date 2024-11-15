import React from "react";
import { Rate, Tag, Progress } from "antd";
import "./RateCard.css";

const RateCard = () => {
  const criteria = [
    { label: "Chất lượng", score: 5.0, color: "blue" },
    { label: "Giá cả", score: 4.5, color: "green" },
    { label: "Phục vụ", score: 4.3, color: "orange" },
    { label: "Vị trí", score: 3.9, color: "red" },
  ];

  return (
    <>
      <div className="rating-header d-flex justify-content-between mt-3">
        <h1
          style={{
            fontSize: "30px",
            textTransform: "uppercase",
            color: "#ADADAD",
          }}
        >
          ĐÁNH GIÁ
        </h1>
        <button className="details-button">Xem chi tiết</button>
      </div>
      <div className="rating-summary">
        <div className="stars-rating">
          <p className="growth">▲ 2.1% so với tuần rồi</p>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="star-row">
              <Rate disabled defaultValue={star} style={{ color: "#FFD700" }} />
              <span>(100)</span>
            </div>
          ))}
        </div>

        <div className="criteria-scores">
          {criteria.map((item) => (
            <div key={item.label} className="criteria-item">
              <Tag color={item.color} className="criteria-score">
                {item.score}
              </Tag>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="overall-rating">
          <Progress
            type="circle"
            percent={98} // Ví dụ: 4.9/5.0 = 98%
            format={() => `4.0/5.0`}
            width={150}
            strokeColor="#FFA500"
          />
        </div>
      </div>
    </>
  );
};

export default RateCard;
