import { React, useEffect, useState } from "react";
import "./TranportatinDashboard.css";
import { Table } from "antd";
import RoomStatusCardt from "../../transportation/componentTranportation/roomStatusCard-t/RoomStatusCard-t";
import ChartReportCardt from "../../transportation/componentTranportation/chartReportCard-t/ChartReportCard-t";
// import RateCardt from "../../transportation/componentTranportation/rateCard-t/RateCard-t";
import CommentCardt from "../../transportation/componentTranportation/commentCard-t/CommentCard-t";
import { CompileEnterpriseService } from "../../../services/apis/CompileEnterpriseService";
import RateCard from "../../accomodation/accpmodationComponent/rateCard/RateCard";
const TranportatinDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [infoData, setInfoData] = useState({});
  const [feedbackData, setFeedbackData] = useState({});
  const [transStatusData, setTransStatusData] = useState([
    {
      color: "blue",
      icon: "fa-solid fa-ticket",
      title: "Vé",
      status: "Đã đặt",
      count: 0,
    },
    {
      color: "orange",
      icon: "fa-solid fa-ticket",
      title: "Vé",
      status: "Đặt trước",
      count: 0,
    },
    {
      color: "red",
      icon: "fa-solid fa-ticket-simple",
      title: "Voucher",
      status: "Đang hữu dụng",
      count: 0,
    },
    {
      color: "green",
      icon: "fa-solid fa-bus",
      title: "Xe",
      status: "Đang hoạt động",
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
        await CompileEnterpriseService.getTransportationRevenue(typeRe);
      setRevenueData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const loadCompileData = async () => {
    try {
      const [revenue, info, feedback] = await Promise.all([
        CompileEnterpriseService.getTransportationRevenue("week"),
        CompileEnterpriseService.getTransportationInfo(),
        CompileEnterpriseService.getTransportationFeedback(),
      ]);
      setRevenueData(revenue.data);
      setInfoData(info.data);
      setFeedbackData(feedback.data);

      setTransStatusData((prevState) => {
        const updatedData = [...prevState];
        updatedData[0].count = info.data.totalTicketBooked;
        updatedData[1].count = info.data.totalTicketBookAdvance;
        updatedData[2].count = info.data.totalVoucherActive;
        updatedData[3].count = info.data.totalVehicleActive;
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
      <div className="enterprise-transDashboard-container-t">
        <div className="transDashboard-title-t">
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

        <div className="oneTofive-section-t">
          <div className="card1Tocard4-section-t">
            {/* Card1 */}
            <section className="room-status-dashboard-t">
              <div className="room-status-dashboard__container-t">
                <div className="room-status-dashboard__grid-t">
                  {transStatusData.map((status, index) => (
                    <RoomStatusCardt key={index} {...status} />
                  ))}
                </div>
              </div>
            </section>

            {/* Card2 */}
            <div className="card-2-container-t">
              <ChartReportCardt
                onChangeReportType={onChangeReportType}
                reportType={reportType}
                revenueData={revenueData}
              />
            </div>

            {/* Card3 */}
            <div className="card-3-container-t">
              <RateCard ratingData={feedbackData} />
            </div>

            {/* Card4 */}
            <div className="comment-dashboard-t">
              <section className="comment-content-t">
                <CommentCardt commentCount={100} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TranportatinDashboard;
