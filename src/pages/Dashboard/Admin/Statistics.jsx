import Chart from "react-apexcharts";

const Statistics = () => {
  // Dummy data for the charts
  const barChartData = {
    series: [
      {
        name: "Bookings",
        data: [10, 7, 5, 10], // Replace with actual booking data
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      xaxis: {
        categories: ["2025-01-23", "2025-01-24", "2025-01-25", "2025-01-26"], // Replace with booking dates
      },
      title: {
        text: "Bookings by Date",
        align: "center",
      },
    },
  };

  const lineChartData = {
    series: [
      {
        name: "Booked Parcels",
        data: [10, 7, 5, 10], // Replace with booked parcel data
      },
      {
        name: "Delivered Parcels",
        data: [7, 45, 15, 9], // Replace with delivered parcel data
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["2025-01-23", "2025-01-24", "2025-01-25", "2025-01-26"], // Replace with booking dates
      },
      title: {
        text: "Parcel Status Comparison",
        align: "center",
      },
    },
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Statistics Page</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <Chart
            options={barChartData.options}
            series={barChartData.series}
            type="bar"
            height={300}
          />
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <Chart
            options={lineChartData.options}
            series={lineChartData.series}
            type="line"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
