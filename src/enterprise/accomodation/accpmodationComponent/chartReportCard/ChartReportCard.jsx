import React, { useState, useMemo } from "react";
import "./ChartReportCard.css";
import { Column } from "@ant-design/charts";

const ChartReportCard = ({ onChangeReportType, reportType, revenueData }) => {
  // Dữ liệu theo loại báo cáo
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
        revenue: revenueData[0]?.[day.key] * 1000 || 0,
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
        revenue: revenueData[0]?.[week.key] * 1000 || 0,
      }));
    } else if (reportType === "year") {
      const months = [
        { key: "january_revenue", label: "Tháng 1" },
        { key: "february_revenue", label: "Tháng 2" },
        { key: "march_revenue", label: "Tháng 3" },
        { key: "april_revenue", label: "Tháng 4" },
        { key: "may_revenue", label: "Tháng 5" },
        { key: "june_revenue", label: "Tháng 6" },
        { key: "july_revenue", label: "Tháng 7" },
        { key: "august_revenue", label: "Tháng 8" },
        { key: "september_revenue", label: "Tháng 9" },
        { key: "october_revenue", label: "Tháng 10" },
        { key: "november_revenue", label: "Tháng 11" },
        { key: "december_revenue", label: "Tháng 12" },
      ];
      return months.map((month) => ({
        day: month.label,
        revenue: revenueData[0]?.[month.key] * 1000 || 0,
      }));
    }
    return [];
  }, [reportType, revenueData]);

  // Tính tổng doanh thu
  const totalRevenue = useMemo(() => {
    if (revenueData.length > 0) {
      return revenueData[0].total_revenue * 1000 || 0;
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
    </>
  );
};

export default ChartReportCard;
