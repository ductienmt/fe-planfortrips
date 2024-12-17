import { React, useEffect, useState } from "react";
import "./AccomodationDashboard.css";
import RoomStatusCard from "../../accomodation/accpmodationComponent/roomStatusCard/RoomStatusCard";
import ChartReportCard from "../../accomodation/accpmodationComponent/chartReportCard/ChartReportCard";
import RateCard from "../../accomodation/accpmodationComponent/rateCard/RateCard";
import CommentCard from "../../accomodation/accpmodationComponent/commentCard/CommentCard";
import { Table } from "antd";
import { CompileEnterpriseService } from "../../../services/apis/CompileEnterpriseService";

const AccomodationDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [infoData, setInfoData] = useState({});
  const [feedbackData, setFeedbackData] = useState({});
  const [roomStatusData, setRoomStatusData] = useState([
    {
      color: "blue",
      icon: "fa-solid fa-key",
      title: "Phòng",
      status: "Đang sử dụng",
      count: 0,
    },
    {
      color: "orange",
      icon: "fa-solid fa-unlock-keyhole",
      title: "Phòng",
      status: "Còn trống",
      count: 0,
    },
    {
      color: "red",
      icon: "fa-solid fa-people-roof",
      title: "Phòng",
      status: "Đặt trước",
      count: 0,
    },
    {
      color: "green",
      icon: "fa-solid fa-coins",
      title: "Tổng",
      status: "Phòng được đặt",
      count: 0,
    },
  ]);
  const [reportType, setReportType] = useState("week");

  const onChangeReportType = (value) => {
    setReportType(value);
    loadDataRevenue(value);
  };

  const loadDataRevenue = async (typeRe) => {
    try {
      const response =
        await CompileEnterpriseService.getAccommodationRevenue(typeRe);
      setRevenueData(response.data);
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const loadCompileData = async () => {
    try {
      const [revenue, info, feedback] = await Promise.all([
        CompileEnterpriseService.getAccommodationRevenue(reportType),
        CompileEnterpriseService.getAccommodationInfo(),
        CompileEnterpriseService.getAccommodationFeedback(),
      ]);
      setRevenueData(revenue.data);
      setInfoData(info.data);
      setFeedbackData(feedback.data);

      setRoomStatusData((prevState) => {
        const updatedData = [...prevState];
        updatedData[0].count = info.data.roomInUse;
        updatedData[1].count = info.data.roomEmpty;
        updatedData[2].count = info.data.roomBookAdvance;
        updatedData[3].count = info.data.roomUsed;
        return updatedData;
      });
    } catch (error) {
      console.log("error: " + error);
    }
  };

  useEffect(() => {
    document.title = "Thống kê";
    loadCompileData();
  }, []);

  return (
    <>
      <div className="enterprise-accoDashboard-container">
        <div className="accoDashboard-title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Bảng điều khiển
          </h1>
        </div>

        <div className="oneTofive-section">
          <div className="card1Tocard4-section">
            {/* Card1 */}
            <section className="room-status-dashboard">
              <div className="room-status-dashboard__container">
                <div className="room-status-dashboard__grid">
                  {roomStatusData.map((status, index) => (
                    <RoomStatusCard key={index} {...status} />
                  ))}
                </div>
              </div>
            </section>

            {/* Card2 */}
            <div className="card-2-container">
              <ChartReportCard
                onChangeReportType={onChangeReportType}
                reportType={reportType}
                revenueData={revenueData}
              />
            </div>
            <hr />

            {/* Card3 */}
            <div className="card-3-container">
              <RateCard ratingData={feedbackData} />
            </div>
            <hr />
            {/* Card4 */}
            <div className="comment-dashboard">
              <section className="comment-content">
                <CommentCard commentCount={100} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccomodationDashboard;
