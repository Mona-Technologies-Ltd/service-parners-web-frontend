import React from "react";
import { BsBagPlus } from "react-icons/bs";

import "./StatCards.css";

const stats = [
  {
    title: "Total Premium",
    value: "₦ 40,689",
    change: "-18.5%",
    changeText: "From last week",
    icon: <BsBagPlus className="icon-size" />,
    color: "blue",
    trend: "down",
  },
  {
    title: "Total Remitted Premium",
    value: "₦ 40,689",
    change: "-46.5%",
    changeText: "From last week",
    icon: <BsBagPlus className="icon-size" />,
    color: "green",
    trend: "down",
  },
  {
    title: "Total Unremitted Premium",
    value: "₦ 40,689",
    change: "8.5%",
    changeText: "From last week",
    icon: <BsBagPlus className="icon-size" />,
    color: "yellow",
    trend: "up",
  },
];

const StatCards = () => {
  return (
    <div className="stat-card-container">
      {stats.map((stat, index) => (
        <div className="stat-cards" key={index}>
          <div className="stat-card-header">
            <span className="stat-title">{stat.title}</span>
            <div className={`stat-icons ${stat.color}`}>
                {stat.icon}
            </div>
            {/* <div className={`stat-icon ${stat.color}`}></div> */}
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-change">
            <span
              className={`trend-icon ${stat.trend === "up" ? "up" : "down"}`}
            >
              {stat.trend === "up" ? "📈" : "📉"}
            </span>
            <span
              className={`change-percent ${
                stat.trend === "up" ? "green" : "red"
              }`}
            >
              {stat.change}
            </span>{" "}
            <span className="change-text">{stat.changeText}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
