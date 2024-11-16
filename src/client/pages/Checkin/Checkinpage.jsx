import React, { useState, useEffect } from "react";
import "../Checkin/checkinpage.css";
import { CheckinService } from "../../../services/apis/CheckinService";
import Loader from "../../Components/Loading";

// Hàm kiểm tra URL hợp lệ
const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
};

const Checkinpage = () => {
  const [checkinData, setCheckinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckinData = async () => {
      try {
        const response = await CheckinService.getImageAll(1);
        console.log("API response:", response);

        if (response && response.data && response.data.checkinResponses) {
          const formattedData = response.data.checkinResponses.map((item) => ({
            ...item,
            imageUrl: item.images && item.images[0].url, // Ensure valid image URL
          }));
          setCheckinData(formattedData);
        } else {
          setCheckinData([]);
        }
      } catch (error) {
        console.error("API error:", error);
        setError(error.message || "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckinData();
  }, []);

  if (loading) {
    return (
      <div className="loading w-100">
        <Loader rong={"80vh"} />
      </div>
    );
  }

  if (error) {
    return <div className="error">Có lỗi xảy ra: {error}</div>;
  }

  return (
    <div>
      <section className="checkinpage-card-container">
        {checkinData.length === 0 ? (
          <div className="no-data">Không có dữ liệu</div>
        ) : (
          checkinData.map((item, index) => (
            <div key={index} className="checkin-card">
              <img
                src={item.imageUrl}
                alt={item.cityName}
                className="checkin-image"
              />
              <h3>{item.name}</h3>
              <p>{item.cityName}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Checkinpage;
