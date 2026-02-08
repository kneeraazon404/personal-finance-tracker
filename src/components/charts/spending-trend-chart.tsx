"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Sample data
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export function SpendingTrendChart() {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const createGradient = (ctx: CanvasRenderingContext2D, color: string) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, color); // Start color
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fade to transparent
      return gradient;
    };

    const ctx = chart.ctx;

    setChartData({
      labels,
      datasets: [
        {
          label: "Income",
          data: [4000, 4200, 3800, 4500, 4100, 4300],
          borderColor: "#10b981", // Emerald 500
          backgroundColor: createGradient(ctx, "rgba(16, 185, 129, 0.5)"),
          fill: "origin",
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#10b981",
          pointBorderColor: "#fff",
        },
        {
          label: "Spending",
          data: [2400, 3200, 2800, 3600, 3100, 2900],
          borderColor: "#dc143c", // Crimson
          backgroundColor: createGradient(ctx, "rgba(220, 20, 60, 0.5)"),
          fill: "-1",
          tension: 0.4, // Smooth curves
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#dc143c",
          pointBorderColor: "#fff",
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
          font: { size: 12, weight: "bold" as const },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#ffffff",
        bodyColor: "#e2e8f0",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context: TooltipItem<"line">) =>
            ` ${context.dataset.label}: Rs. ${context.raw?.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          display: true,
        },
        ticks: {
          color: "#94a3b8",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#94a3b8",
          callback: (value: string | number) => `Rs ${Number(value) / 1000}k`,
        },
        border: { display: false }, // Cleaner look without Y-axis line
      },
    },
  };

  return (
    <div className="h-[350px] w-full">
      <Line ref={chartRef} options={options} data={chartData} />
    </div>
  );
}
