import React from "react";
import "./PaymentDashboardCards.css";
import { FaListUl, FaMoneyCheckAlt, FaShoppingBag } from "react-icons/fa";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

const cards = [
  {
    title: "Total Approved Claims",
    count: 30,
    amount: "₦ 40,689",
    percent: "-18.5%",
    icon: <FaListUl />,
    iconColor: "pink",
    trendIcon: <FiTrendingDown />,
    trendColor: "red",
  },
  {
    title: "Total Payout Awaiting Confirmation",
    count: 30,
    amount: "₦ 40,689",
    percent: "-18.5%",
    icon: <FaMoneyCheckAlt />,
    iconColor: "orange",
    trendIcon: <FiTrendingDown />,
    trendColor: "red",
  },
  {
    title: "Total Confirmed Payouts",
    count: 30,
    amount: "₦ 40,689",
    percent: "8.5%",
    icon: <FaShoppingBag />,
    iconColor: "green",
    trendIcon: <FiTrendingUp />,
    trendColor: "green",
  },
];

const DashboardCards = () => {
  return (
    <div className="card-container_pay">
      {cards.map((card, index) => (
        <div key={index} className="card_pay">
          <div className="card-header">
            <div>
              <p className="card-title_pay">{card.title}</p>
              <p className="card-count_pay">{card.count}</p>
            </div>
            <div className={`icon_pay ${card.iconColor}`}>{card.icon}</div>
          </div>
          <div className="card-footer_pay">
            <p className="card-amount_pay">{card.amount}</p>
            <div className={`card-percent_pay ${card.trendColor}`}>
              {card.trendIcon} <span>{card.percent}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
