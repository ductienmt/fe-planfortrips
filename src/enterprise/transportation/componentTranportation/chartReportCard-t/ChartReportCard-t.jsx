import React, { useState, useMemo } from "react";
import "./ChartReportCard-t.css";
import { Column } from "@ant-design/charts";

const ChartReportCardt = () => {
  const [reportType, setReportType] = useState("week");

  // Dữ liệu theo loại báo cáo
  const weeklyData = [
    { day: "Thứ 2", revenue: 250000 },
    { day: "Thứ 3", revenue: 300000 },
    { day: "Thứ 4", revenue: 200000 },
    { day: "Thứ 5", revenue: 400000 },
    { day: "Thứ 6", revenue: 350000 },
    { day: "Thứ 7", revenue: 500000 },
    { day: "Chủ nhật", revenue: 450000 },
  ];

  const monthlyData = [
    { day: "Tuần 1", revenue: 1200000 },
    { day: "Tuần 2", revenue: 1500000 },
    { day: "Tuần 3", revenue: 1100000 },
    { day: "Tuần 4", revenue: 1700000 },
  ];

  const quarterlyData = [
    { day: "Tháng 1", revenue: 4500000 },
    { day: "Tháng 2", revenue: 4700000 },
    { day: "Tháng 3", revenue: 4900000 },
  ];

  // Xác định dữ liệu hiển thị dựa trên loại báo cáo
  const data = useMemo(() => {
    switch (reportType) {
      case "week":
        return weeklyData;
      case "month":
        return monthlyData;
      case "quarter":
        return quarterlyData;
      default:
        return [];
    }
  }, [reportType]);

  // Tính tổng doanh thu
  const totalRevenue = useMemo(() => {
    return data.reduce((total, item) => total + item.revenue, 0);
  }, [data]);

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

  // Xử lý thay đổi loại báo cáo
  const handleReportChange = (event) => {
    setReportType(event.target.value);
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
          <div className="chart-report-total-amount">
            Tổng doanh thu: {totalRevenue.toLocaleString()} VNĐ
          </div>
          <section className="chart-report-section">
            <select onChange={handleReportChange} value={reportType}>
              <option value="week">Báo cáo tuần</option>
              <option value="month">Báo cáo tháng này</option>
              <option value="quarter">Báo cáo quý</option>
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

export default ChartReportCardt;
