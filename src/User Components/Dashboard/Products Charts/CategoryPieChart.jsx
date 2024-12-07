import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2"; // Importing Doughnut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registering required ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {
  const [chartData, setChartData] = useState(null); // State to store chart data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State for error handling

  // Fetch the data from the API
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/my", { withCredentials: true })
      .then((response) => {
        const products = response.data;

        // Process data to get the total quantity per category (you can modify based on other fields)
        const categories = [
          ...new Set(products.map((product) => product.category)),
        ]; // Unique categories
        const categoryQuantity = categories.map((category) => {
          const filteredProducts = products.filter(
            (product) => product.category === category
          );
          return filteredProducts.reduce(
            (sum, product) => sum + product.quantity,
            0
          ); // Sum of quantities for each category
        });

        // Prepare data for the donut chart
        setChartData({
          labels: categories, // Categories as labels
          datasets: [
            {
              data: categoryQuantity, // Quantity per category
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF5733",
                "#C70039",
              ], // Donut chart segment colors
              hoverBackgroundColor: [
                "#FF3A3A",
                "#33A2FF",
                "#FFCD33",
                "#FF5722",
                "#D50032",
              ], // Hover colors
            },
          ],
        });

        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  // Handle loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {chartData && (
        <Doughnut
        style={{height: "350px", width: "100%"}}
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "right",
                align: "start",
              },
            },
          }}
        />
      )}{" "}
      {/* Render Doughnut chart */}
    </div>
  );
};

export default CategoryPieChart;
