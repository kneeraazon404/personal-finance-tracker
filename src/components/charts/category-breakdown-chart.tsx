"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const data = {
  labels: ["Food", "Transport", "Shopping", "Bills", "Entmt", "Health"],
  datasets: [
    {
      label: "This Month",
      data: [850, 420, 680, 920, 310, 240],
      backgroundColor: "rgba(220, 20, 60, 0.4)", // Crimson transparent
      borderColor: "#dc143c", // Crimson
      borderWidth: 3,
      pointBackgroundColor: "#dc143c",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#dc143c",
      pointRadius: 6, // Bigger touch points
      pointHoverRadius: 8,
    },
    {
      label: "Last Month",
      data: [720, 680, 540, 780, 890, 450],
      backgroundColor: "rgba(255, 255, 255, 0.1)", // White transparent
      borderColor: "#ffffff", // White
      borderWidth: 2, // Slightly thinner than main
      pointBackgroundColor: "#ffffff",
      pointBorderColor: "#dc143c",
      pointHoverBackgroundColor: "#dc143c",
      pointHoverBorderColor: "#ffffff",
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        color: "rgba(255, 255, 255, 0.15)",
        lineWidth: 1,
      },
      grid: {
        color: "rgba(255, 255, 255, 0.15)",
        circular: true, // Circular grid looks more modern
        lineWidth: 1,
      },
      pointLabels: {
        color: "#ffffff",
        font: {
          size: 15, // Larger readable font
          weight: "bold" as const,
          family: "var(--font-geist-mono)", // Use global font
        },
        padding: 20, // More breathing room
      },
      ticks: {
        display: false, // Hide messy internal ticks for cleaner look
        backdropColor: "transparent",
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#ffffff",
        font: {
          size: 14,
          weight: "bold" as const,
        },
        padding: 20,
        usePointStyle: true, // Circle legend icons
        pointStyle: "circle",
      },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.9)", // Dark slate background
      titleColor: "#ffffff",
      bodyColor: "#e2e8f0",
      bodyFont: {
        size: 14,
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label: (context: any) =>
          ` ${context.dataset.label}: Rs. ${context.raw.toLocaleString()}`,
      },
    },
  },
  elements: {
    line: {
      tension: 0.1, // Slight curve for organic feel
    },
  },
};

export function CategoryBreakdownChart() {
  const thisMonthTotal = data.datasets[0].data.reduce(
    (a: number, b: number) => a + b,
    0,
  );
  const lastMonthTotal = data.datasets[1].data.reduce(
    (a: number, b: number) => a + b,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Increased Height for Impact */}
      <div className="h-[450px] w-full relative">
        {/* Glow effect container */}
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
        <Radar data={data} options={options} />
      </div>

      {/* Enhanced Comparison Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div className="p-3 rounded-lg hover:bg-white/5 transition-colors">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            This Month
          </p>
          <p className="text-2xl font-bold text-crimson">
            Rs. {thisMonthTotal.toLocaleString()}
          </p>
        </div>
        <div className="p-3 rounded-lg hover:bg-white/5 transition-colors">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Last Month
          </p>
          <p className="text-2xl font-bold text-white">
            Rs. {lastMonthTotal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
