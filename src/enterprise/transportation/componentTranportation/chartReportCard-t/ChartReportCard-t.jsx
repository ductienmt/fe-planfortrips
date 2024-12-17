import React, { useMemo } from "react";
import "./ChartReportCard-t.css";
import { Column } from "@ant-design/charts";
import PropTypes from "prop-types";

const ChartReportCardt = ({ onChangeReportType, reportType, revenueData }) => {
  const data = useMemo(() => {
    if (reportType === "week") {
      const days = [
        { key: "monday_revenue", label: "Thứ 2" },
        { key: "tuesday_revenue", label: "Thứ 3" },
        { key: "wednesday_revenue", label: "Thứ 4" },
        { key: "thursday_revenue", label: "Thứ 5" },
        { key: "friday_revenue", label: "Thứ 6" },
        { key: "saturday_revenue", label: "Thứ 7" },
        { key: "sunday_revenue", label: "Chủ nhật" },
      ];
      return days.map((day) => ({
        day: day.label,
        revenue: revenueData[0]?.[day.key] || 0,
      }));
    } else if (reportType === "month") {
      const weeks = [
        { key: "week_1_revenue", label: "Tuần 1" },
        { key: "week_2_revenue", label: "Tuần 2" },
        { key: "week_3_revenue", label: "Tuần 3" },
        { key: "week_4_revenue", label: "Tuần 4" },
      ];
      return weeks.map((week) => ({
        day: week.label,
        revenue: revenueData[0]?.[week.key] || 0,
      }));
    } else if (reportType === "year") {
      const months = [
        { key: "jan_revenue", label: "Tháng 1" },
        { key: "feb_revenue", label: "Tháng 2" },
        { key: "mar_revenue", label: "Tháng 3" },
        { key: "apr_revenue", label: "Tháng 4" },
        { key: "may_revenue", label: "Tháng 5" },
        { key: "jun_revenue", label: "Tháng 6" },
        { key: "jul_revenue", label: "Tháng 7" },
        { key: "aug_revenue", label: "Tháng 8" },
        { key: "sep_revenue", label: "Tháng 9" },
        { key: "oct_revenue", label: "Tháng 10" },
        { key: "nov_revenue", label: "Tháng 11" },
        { key: "dec_revenue", label: "Tháng 12" },
      ];
      return months.map((month) => ({
        day: month.label,
        revenue: revenueData[0]?.[month.key] || 0,
      }));
    }
    return [];
  }, [reportType, revenueData]);

  // Tính tổng doanh thu
  const totalRevenue = useMemo(() => {
    if (revenueData.length > 0) {
      return revenueData[0].total_revenue || 0;
    }
    return 0;
  }, [revenueData]);

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
          <select
            onChange={(e) => onChangeReportType(e.target.value)}
            value={reportType}
          >
            <option value="week">Báo cáo tuần</option>
            <option value="month">Báo cáo tháng này</option>
            <option value="year">Báo cáo năm</option>
          </select>
        </section>
      </div>

      {/* Biểu đồ */}
      <div className="chart-report-dashboard-chart">
        <Column {...config} />
      </div>
    </div>
  );
};

export default ChartReportCardt;
