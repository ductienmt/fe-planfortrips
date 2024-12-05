import React, { useMemo } from "react";
import { Rate, Tag, Progress } from "antd";
import "./RateCard-t.css";

const RateCardt = () => {
  const criteria = [
    { label: "Chất lượng", score: 1.0, color: "blue" },
    { label: "Giá cả", score: 1.5, color: "green" },
    { label: "Phục vụ", score: 1.3, color: "orange" },
    { label: "Vị trí", score: 1.9, color: "red" },
  ];

  // Dữ liệu lượt đánh giá cho các sao từ 1 đến 5
  const ratings = {
    5: 100,
    4: 80,
    3: 50,
    2: 30,
    1: 20,
  };

  // Tính tổng và trung bình điểm
  const totalScore = useMemo(
    () => criteria.reduce((sum, item) => sum + item.score, 0),
    [criteria]
  );
  const averageScore = useMemo(
    () => (totalScore / criteria.length).toFixed(1),
    [totalScore, criteria]
  );

  // Tính phần trăm để hiển thị trong Progress
  const percent = useMemo(() => (averageScore / 5) * 100, [averageScore]);

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
              <span>({ratings[star]})</span>
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
            percent={percent}
            format={() => `${averageScore}/5.0`}
            width={150}
            strokeColor="#FFA500"
          />
        </div>
      </div>
    </>
  );
};

export default RateCardt;
