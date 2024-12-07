import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const ProductLineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Step 1: Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/receiving/all', { withCredentials: true }); // Replace with your API URL
        const data = response.data;

        console.log(data)

        // Step 2: Process data to group by month
        const processedData = processChartData(data);
        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const processChartData = (data) => {
    const months = Array(12).fill(0); // Array to store total quantity per month
  
    data.forEach((item) => {
      // Check if createdAt exists and is in the correct format
      if (item.receivedAt && item.receivedAt.includes(" - ")) {
        const dateParts = item.receivedAt.split(" - ")[0].split("/"); // Split "23/11/2024 - 13:38 pm"
        const day = parseInt(dateParts[0], 10); // 23
        const month = parseInt(dateParts[1], 10) - 1; // 11 (subtract 1 because months are 0-indexed)
        const year = parseInt(dateParts[2], 10); // 2024
  
        const parsedDate = new Date(year, month, day); // Create Date object
        const monthIndex = parsedDate.getMonth(); // Get month (0-11)
  
        months[monthIndex] += item.quantity; // Sum quantities for the same month
      } else {
        console.error("Invalid date format for item:", item);
      }
    });
  
    return {
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
          label: "Product Quantity",
          data: months, // Total quantity per month
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
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
                align: "center",
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

export default ProductLineChart;