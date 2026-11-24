
import React from 'react';

const SummaryCard = ({ title, amount, icon, color, subtitle }) => {
  return (
    <div className="summary-card">
      <div className="summary-card-top">
        <span className="summary-title">{title}</span>

        <div
          className="summary-icon"
          style={{
            color: color,
            backgroundColor: `${color}15`
          }}
        >
          {icon}
        </div>
      </div>

      <h2 className="summary-amount">{amount}</h2>

      <p className="summary-subtitle">{subtitle}</p>
    </div>
  );
};

export default SummaryCard;
