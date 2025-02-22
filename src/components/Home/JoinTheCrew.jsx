import React from "react";

const JoinTheCrew = () => {
  const roles = [
    {
      id: 1,
      title: "Swift Biker",
      description:
        "Join our team of bikers and deliver orders quickly while enjoying flexibility and earning potential.",
      image: "https://kitpro.site/delivey/wp-content/uploads/sites/70/2022/02/bikefix.png",
    },
    {
      id: 2,
      title: "Motorcycle Rider",
      description:
        "Become a motorcycle rider for fast-paced, efficient delivery with great rewards for your effort.",
      image: "https://kitpro.site/delivey/wp-content/uploads/sites/70/2022/02/vespfix.png",
    },
    {
      id: 3,
      title: "Pickup Driver",
      description:
        "Drive a pickup truck and deliver larger orders efficiently while being a vital part of our crew.",
      image: "https://kitpro.site/delivey/wp-content/uploads/sites/70/2022/02/carfix.png",
    },
  ];

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Join The Crew
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white text-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={role.image}
                  alt={role.title}
                  className="w-20 h-20 rounded-md bg-yellow-200 p-2"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                {role.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {role.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Join Us
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JoinTheCrew;
