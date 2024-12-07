import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Change to Line for Line Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProductChart = () => {
  const [chartData, setChartData] = useState(null);  // Data for the chart
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);  // For error handling

  // Fetch the data from the API
  useEffect(() => {
    axios.get('http://localhost:8080/api/products/my', { withCredentials: true })
      .then((response) => {
        const products = response.data;

        console.log(products); // For debugging

        // Prepare data for the chart (for example, we use 'quantity' vs 'product name')
        const labels = products.map((product) => product.name);  // X-axis: Product Names
        const quantities = products.map((product) => product.quantity); // Y-axis: Quantities

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Product Quantity',
              data: quantities,
              fill: false,  // No fill under the line
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,  // To make a smooth curve instead of straight lines
            },
          ],
        });

        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  // Handle loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Product Quantity Line Chart</h2>
      {chartData && <Line data={chartData} />}  {/* Use Line component for Line Chart */}
    </div>
  );
};

export default ProductChart;
