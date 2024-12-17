import React, { useMemo } from "react";
import { Rate, Progress } from "antd";
import "./RateCard.css";

const RateCard = ({ ratingData }) => {
  // Mặc định dữ liệu nếu không có từ BE
  const defaultData = {
    count_5_star: 0,
    count_4_star: 0,
    count_3_star: 0,
    count_2_star: 0,
    count_1_star: 0,
    total_reviews: 0,
    average_rating: 0,
  };

  // Gộp dữ liệu từ props và mặc định
  const data = { ...defaultData, ...ratingData };

  // Tính phần trăm cho Progress
  const percent = useMemo(() => (data.average_rating / 5) * 100, [data]);

  // Tạo object ratings cho hiển thị từng sao
  const ratings = useMemo(
    () => ({
      5: data.count_5_star,
      4: data.count_4_star,
      3: data.count_3_star,
      2: data.count_2_star,
      1: data.count_1_star,
    }),
    [data]
  );

  return (
    <>
      <div className="rating-header d-flex justify-content-between mt-3">
        <h1
          style={{
            fontSize: "30px",
            textTransform: "uppercase",
            color: "#ADADAD",
          }}
          className="mb-0"
        >
          ĐÁNH GIÁ
        </h1>
        <button className="details-button">Xem chi tiết</button>
      </div>
      <div className="rating-summary mt-3">
        <div className="stars-rating">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="star-row">
              <Rate disabled defaultValue={star} style={{ color: "#FFD700" }} />
              <span>({ratings[star]})</span>
            </div>
          ))}
        </div>

        <div className="overall-rating">
          <Progress
            type="circle"
            percent={percent}
            format={() =>
              data.average_rating !== null
                ? `${data.average_rating.toFixed(1)}/5.0`
                : "0.0/5.0"
            }
            width={150}
            strokeColor="#FFA500"
          />
          <div
            style={{ marginTop: "10px", fontSize: "14px", color: "#ADADAD" }}
          >
            Tổng đánh giá: {data.total_reviews} lượt
          </div>
        </div>
      </div>
    </>
  );
};

export default RateCard;
