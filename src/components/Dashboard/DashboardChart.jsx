import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "#818cf8",
          "#c084fc",
          "#34d399",
          "#818cf8",
          "#a3e635",
          "#60a5fa",
          "#f87171",
          "#4ade80",
          "#38bdf8",
          "#475569",
          "#64748b",
          "#84cc16",
          "#fbbf24",
        ],
        borderWidth: 0,
        borderRadius: 0,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "#111827",
        bodyColor: "#6b7280",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Value: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#f3f4f6",
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 10,
          },
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },
  };

  return (
    <div className="chart-wrapper" style={{ height: "450px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DashboardChart;
