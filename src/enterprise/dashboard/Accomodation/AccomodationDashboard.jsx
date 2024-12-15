import { React, useEffect, useState } from "react";
import "./AccomodationDashboard.css";
import RoomStatusCard from "../../accomodation/accpmodationComponent/roomStatusCard/RoomStatusCard";
import ChartReportCard from "../../accomodation/accpmodationComponent/chartReportCard/ChartReportCard";
import RateCard from "../../accomodation/accpmodationComponent/rateCard/RateCard";
import CommentCard from "../../accomodation/accpmodationComponent/commentCard/CommentCard";
import { Table } from "antd";

const AccomodationDashboard = () => {
  const roomStatusData = [
    {
      color: "blue",
      icon: "fa-solid fa-key",
      title: "Phòng",
      status: "Đang sử dụng",
      count: 10,
    },
    {
      color: "orange",
      icon: "fa-solid fa-unlock-keyhole",
      title: "Phòng",
      status: "Còn trống",
      count: 10,
    },
    {
      color: "red",
      icon: "fa-solid fa-people-roof",
      title: "Phòng",
      status: "Đặt trước",
      count: 10,
    },
    {
      color: "green",
      icon: "fa-solid fa-coins",
      title: "Tổng",
      status: "Phòng được đặt",
      count: 10,
    },
  ];

  useEffect(() => {
    document.title = "Thống kê";
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
              <ChartReportCard amount="5.000.000" />
            </div>

            {/* Card3 */}
            <div className="card-3-container">
              <RateCard />
            </div>

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
