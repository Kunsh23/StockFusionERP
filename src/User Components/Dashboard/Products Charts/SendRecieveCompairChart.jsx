import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const SendRecieveCompairChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from both APIs
        const [responseA, responseB] = await Promise.all([
          axios.get("http://localhost:8080/api/receiving/receiving-products", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/api/sending/sending-products", {
            withCredentials: true,
          }),
        ]);

        const dataA = responseA.data;
        const dataB = responseB.data;

        // Process data for the chart
        const processedData = processChartData(dataA, dataB);
        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const processChartData = (dataA, dataB) => {
    const monthsA = Array(12).fill(0); // For receiving products
    const monthsB = Array(12).fill(0); // For sending products

    // Process receiving products data
    dataA.forEach((item) => {
      const [day, month, year] = item.receivedAt.split(" - ")[0].split("/").map(Number);
      const parsedDate = new Date(year, month - 1, day);
      const monthIndex = parsedDate.getMonth();

      monthsA[monthIndex] += item.quantity; // Aggregate quantity for receiving products
    });

    // Process sending products data
    dataB.forEach((item) => {
      const [day, month, year] = item.sentAt.split(" - ")[0].split("/").map(Number);
      const parsedDate = new Date(year, month - 1, day);
      const monthIndex = parsedDate.getMonth();

      monthsB[monthIndex] += item.quantity; // Aggregate quantity for sending products
    });

    return {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Receiving Products",
          data: monthsA,
          backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Sending Products",
          data: monthsB,
          backgroundColor: "rgba(255, 99, 132, 0.5)", // Red
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  };

  return (
    <div>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default SendRecieveCompairChart;
