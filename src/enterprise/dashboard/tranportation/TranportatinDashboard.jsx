import { React, useState } from "react";
import "./TranportatinDashboard.css";
import { Table } from "antd";
import RoomStatusCardt from "../../transportation/componentTranportation/roomStatusCard-t/RoomStatusCard-t";
import ChartReportCardt from "../../transportation/componentTranportation/chartReportCard-t/ChartReportCard-t";
import RateCardt from "../../transportation/componentTranportation/rateCard-t/RateCard-t";
import CommentCardt from "../../transportation/componentTranportation/commentCard-t/CommentCard-t";
const TranportatinDashboard = () => {
  const transStatusData = [
    {
      color: "blue",
      icon: "fa-solid fa-ticket",
      title: "Vé",
      status: "Đã đặt",
      count: 10,
    },
    {
      color: "orange",
      icon: "fa-solid fa-ticket-simple",
      title: "Voucher",
      status: "Đang hữu dụng",  
      count: 10,
    },
    {
      color: "red",
      icon: "fa-solid fa-bus",
      title: "Xe",
      status: "Tại bến",
      count: 10,
    },
    {
      color: "green",
      icon: "fa-solid fa-bus",
      title: "Xe",
      status: "Đang hoạt động",
      count: 10,
    },
  ];

  const [transData, settransData] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
    },
    {
      title: "Tên xe",
      dataIndex: "",
      key: "",
    },
    {
      title: "Giá vé",
      dataIndex: "",
      key: "",
    },
  ];

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
              <ChartReportCardt amount="5.000.000" />
            </div>

            {/* Card3 */}
            <div className="card-3-container-t">
              <RateCardt />
            </div>

            {/* Card4 */}
            <div className="comment-dashboard-t">
              <section className="comment-content-t">
                <CommentCardt commentCount={100} />
              </section>
            </div>
          </div>
          <div className="card5-container-t mt-3">
            {/* Card5 */}
            <h1
              style={{
                fontSize: "30px",
                textTransform: "uppercase",
                color: "#ADADAD",
              }}
            >
              Quản lý phòng
            </h1>
            <div className="table-card5-t ">
              <Table
                dataSource={transData}
                columns={columns}
                // pagination={{
                //   current: currentPage,
                //   pageSize: pageSize,
                //   total: dataSource.length,
                //   onChange: (page, pageSize) => {
                //     setCurrentPage(page);
                //     setPageSize(pageSize);
                //   },
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TranportatinDashboard;
