import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DsaChart({ easy, medium, hard }) {

  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "DSA Questions",
        data: [easy, medium, hard],
        backgroundColor: [
          "#22c55e",
          "#eab308",
          "#ef4444"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "20px auto" }}>
      <Pie data={data} />
    </div>
  );
}

export default DsaChart;