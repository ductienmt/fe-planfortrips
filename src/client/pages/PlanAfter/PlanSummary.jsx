import { useEffect, useState } from "react";
import "./PlanSummary.css";
import { formatMoney } from "../../../utils/FormatMoney";

const PlanSummary = ({ summaryItems }) => {
  useEffect(() => {
    document.title = "Plan Summary";

    // console.log(tripPlan);
  }, []);

  // console.log(summaryItems);

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
};

export default PlanSummary;
