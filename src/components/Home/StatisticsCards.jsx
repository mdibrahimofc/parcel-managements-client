import axios from "axios";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const StatisticsCards = () => {
  const [statistics, setStatistics] = useState([]);

  const loadStats = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/stats`);
    console.log(data);
    setStatistics(data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-6 sm:py-8 md:py-10 lg:py-12 w-11/12 mx-auto">
      {statistics.map((stat, idx) => (
        <div key={idx}>
          <div className="bg-gradient-to-b from-green-200 to-blue-200 flex flex-col items-center shadow-lg rounded-md p-6 text-center hover:scale-105 transform transition-transform duration-300 ease-in-out dark:from-green-900 dark:to-blue-900">
            <div className="text-4xl mb-4 text-gray-800 dark:text-gray-200">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              <CountUp end={stat.value} duration={5} />
            </div>
            <div className="text-gray-500 text-sm dark:text-gray-400">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
