import React from "react";
import { useQuery } from "@tanstack/react-query"; // For fetching data with Tanstack Query
import useAxiosSecure from "@/hooks/useAxiosSecure";

const TopDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();

  const { data, error, isLoading } = useQuery({
    queryKey: ["topDeliveryMan"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/parcel/topDeliveryMen");
      return data;
    },
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gray-100 dark:bg-gray-900">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
          Top Delivery Men
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {data?.map((deliveryMan) => (
            <div
              key={deliveryMan._id}
              className="bg-white dark:bg-gray-800 p-6 transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg shadow-lg"
            >
              <img
                src={deliveryMan.image || "https://via.placeholder.com/150"}
                alt={deliveryMan.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-gray-300 dark:border-gray-700"
              />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                {deliveryMan.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Parcels Delivered: {deliveryMan.deliveryCount}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Average Rating:{" "}
                {deliveryMan.rating
                  ? Math.ceil(deliveryMan.rating / deliveryMan.deliveryCount)
                  : 0}{" "}
                / 5
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDeliveryMan;
