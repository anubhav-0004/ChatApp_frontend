import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(200, 200, 200, 0.1)",
        backgroundColor: "rgba(0, 0, 255, 0.05)",
      },
      ticks: {
        color: "#e6ddd6",
        font: {
          size: 14,
          style: "italic",
          weight: "500",
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: "rgba(200, 200, 200, 0.3)",
        backgroundColor: "rgba(0, 0, 255, 0.05)",
      },
      ticks: {
        color: "#e6ddd6",
        weight: "500",
      },
    },
  },
};

const LineChart = ({ value= [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Chats",
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.5,
      },
    ],
  };

  return (
    <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
      <Line data={data} options={lineChartOptions} />
    </div>
  );
};


const DoughnutChart = ({ labels, value }) => {
    const data = {
      labels,
      datasets: [
        {
          data: value,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384CC", "#36A2EBCC", "#FFCE56CC"],
          borderColor: "#fff",
          borderWidth: 1,
          offset: 20,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top", 
          labels: {
            font: {
              size: 12, 
              weight: "500",
            },
            color: "#fff",
          },
        },

      },
      cutout: "70%", 
    };
  
    return (
      <div className=" h-[400px] w-full my-auto p-4 pb-16 md:h-[560px] bg-gradient-to-b from-[#34346e] via-[#4646a0] to-[#4b4bb9] rounded-lg shadow-lg mx-auto">
        <h3 className="text-center text-lg sm:text-xl font-medium text-gray-100 mb-4 underline">
          Distribution of Chats
        </h3>
        <Doughnut data={data} options={options} />
      </div>
    );
  };
  



export { DoughnutChart, LineChart };
