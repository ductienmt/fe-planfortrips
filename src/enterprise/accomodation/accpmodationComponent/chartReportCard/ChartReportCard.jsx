import React from "react";
import "./ChartReportCard.css";
import { Column } from "@ant-design/charts";

const ChartReportCard = ({ amount }) => {
  const data = [
    { day: "Thứ 2", revenue: 250000 },
    { day: "Thứ 3", revenue: 300000 },
    { day: "Thứ 4", revenue: 200000 },
    { day: "Thứ 5", revenue: 400000 },
    { day: "Thứ 6", revenue: 350000 },
    { day: "Thứ 7", revenue: 500000 },
    { day: "Chủ nhật", revenue: 450000 },
  ];

  const config = {
    data,
    xField: "day",
    yField: "revenue",
    label: {
      position: "middle",
      style: { fill: "#FFFFFF", opacity: 0.6 },
    },
    color: "#6394f8",
    columnWidthRatio: 0.8,
    yAxis: {
      label: {
        formatter: (v) => `${v.toLocaleString()} VNĐ`,
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: "Doanh thu",
        value: `${datum.revenue.toLocaleString()} VNĐ`,
      }),
    },
  };

  return (
    <>
      <div className="chart-report-dashboard">
        <h1
          style={{
            fontSize: "30px",
            textTransform: "uppercase",
            color: "#ADADAD",
          }}
        >
          DOANH THU
        </h1>
        <div className="chart-report-dashboard-content d-flex justify-content-between">
          <div className="chart-report-total-amount">Tổng: {amount}đ</div>
          <section className="chart-report-section">
            <select>
              <option value="week">Báo cáo tuần</option>
              <option value="today">Báo cáo hôm nay</option>
              <option value="month">Báo cáo tháng này</option>
              <option value="">Báo cáo quý</option>
            </select>
          </section>
        </div>

        {/* Biểu đồ */}
        <div className="chart-report-dashboard-chart">
          <Column {...config} />
        </div>
      </div>
    </>
  );
};
export default ChartReportCard;
