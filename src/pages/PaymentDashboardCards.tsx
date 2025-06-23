import React, { JSX } from "react";
import "./PaymentDashboardCards.css";
import { FaListUl, FaMoneyCheckAlt, FaShoppingBag } from "react-icons/fa";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

type BaseCard = {
  title: string;
  count: number;
  amount: string;
  percent: string;
  icon: JSX.Element;
  iconColor: string;
  trendIcon: JSX.Element;
  trendColor: string;
};

type DischargeCard = {
  title: "Discharge Voucher";
  signed: number;
  unsigned: number;
  icon: JSX.Element;
  iconColor: string;
};

type CardType = BaseCard | DischargeCard;

interface DashboardCardsProps {
  activeTab: string;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ activeTab }) => {
  const baseCards: BaseCard[] = [
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

  const dischargeCard: DischargeCard = {
    title: "Discharge Voucher",
    signed: 30,
    unsigned: 30,
    icon: <FaShoppingBag />,
    iconColor: "green",
  };

  const cardsToShow: CardType[] =
    activeTab === "payouts" ? [...baseCards, dischargeCard] : baseCards;

  return (
    <div className="card-container_pay">
      {cardsToShow.map((card, index) => (
        <div key={index} className="card_pay">
          <div className="card-header">
            <div>
              <p className="card-title_pay">{card.title}</p>
              {"count" in card ? (
                <p className="card-count_pay">{card.count}</p>
              ) : (
                <>
                  <p className="voucher-line">
                    <span className="voucher-count">{card.signed}</span>{" "}
                    <span className="voucher-label">Signed Voucher</span>
                  </p>
                  <p className="voucher-line">
                    <span className="voucher-count">{card.unsigned}</span>{" "}
                    <span className="voucher-label">Unsigned Voucher</span>
                  </p>
                </>
              )}
            </div>
            <div className={`icon_pay ${card.iconColor}`}>{card.icon}</div>
          </div>

          {"count" in card && (
            <div className="card-footer_pay">
              <p className="card-amount_pay">{card.amount}</p>
              <div className={`card-percent_pay ${card.trendColor}`}>
                {card.trendIcon} <span>{card.percent}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
