import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";

const CompareBarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the first API (receiving)
        const { data: data1 } = await axios.get("http://localhost:8080/api/receiving/all", {
          withCredentials: true,
        });

        // Fetch data from the second API (sending)
        const { data: data2 } = await axios.get("http://localhost:8080/api/sending/all", {
          withCredentials: true,
        });

        // Helper to parse month from "dd/MM/yyyy - HH:MM A"
        const parseMonth = (dateString) => {
          const [day, month] = dateString.split("/");
          return parseInt(month, 10) - 1; // Convert month to 0-indexed (Jan = 0)
        };

        // Format the data into monthly totals
        const formatDataByMonth = (data, dateField) => {
          const months = Array(12).fill(0); // Array for 12 months initialized with 0

          data.forEach((entry) => {
            const date = entry[dateField];
            const monthIndex = parseMonth(date); // Extract month from the date string
            months[monthIndex] += entry.totalAmount || 0; // Sum the amounts month-wise
          });

          return months;
        };

        const dataSet1 = formatDataByMonth(data1, "receivedAt"); // API 1 (Receiving)
        const dataSet2 = formatDataByMonth(data2, "sentAt"); // API 2 (Sending)

        // Chart configuration for side-by-side bar comparison
        const chartConfig = {
          type: "bar",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Items Purchased",
                data: dataSet1,
                backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
              {
                label: "Items Sold",
                data: dataSet2,
                backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              x: {
                stacked: false, // Side-by-side bars
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        };

        // Render chart
        const chartInstance = new ChartJS(chartRef.current, chartConfig);

        // Cleanup on component unmount
        return () => chartInstance.destroy();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default CompareBarChart;
