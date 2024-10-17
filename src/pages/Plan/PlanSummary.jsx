import "./PlanSummary.css";

function PlanSummary() {
  const summaryItems = [
    { label: "Điểm đến", value: "Vũng Tàu" },
    { label: "Ngày đi", value: "26/09/2024" },
    { label: "Ngày về", value: "27/09/2024" },
    { label: "Số người", value: "2 người" },
    { label: "Chi phí", value: "2.000.000VNĐ" },
    { label: "Còn dư", value: "500.000VNĐ" },
  ];

  return (
    <div className="flex-container">
      <section className="plan-summary">
        {summaryItems.map((item, index) => (
          <div key={index} className="summary-item">
            <span className="summary-label">{item.label}</span>
            <span className="summary-value">{item.value}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default PlanSummary;
