import React, { useState, useEffect } from "react";
import { list } from "../services/supabasedb";
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
import { Container, Typography, Box } from "@mui/material";
import { useAppContext } from "../Context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { translate } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      const d = await list("action");

      if (d) {
        setData(d);
      }
    }

    fetchData();
  }, []);

  const frequency = data.reduce(
    (acc, item) => {
      if (item.action_type === 1) acc.sleep++;
      if (item.action_type === 2) acc.food++;
      if (item.action_type === 3) acc.diaper++;
      return acc;
    },
    { sleep: 0, food: 0, diaper: 0 }
  );

  const chartData = {
    labels: [translate("sleep"), translate("eat"), translate("diaper")],
    datasets: [
      {
        label: translate("activity-frequency"),
        data: [frequency.sleep, frequency.food, frequency.diaper],
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Activity Frequency",
      },
    },
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
      </Box>
      <Bar data={chartData} options={options} />
    </Container>
  );
};

export default Dashboard;
