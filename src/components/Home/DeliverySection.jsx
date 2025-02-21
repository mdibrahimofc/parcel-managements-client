import React from "react";

const DeliverySection = () => {
  const items = [
    {
      id: 1,
      title: "Food And Drinks",
      description:
        "Craving your favorite meals? Enjoy freshly prepared food and beverages delivered straight to your door with just a few clicks.",
      image: "https://kitpro.site/delivey/wp-content/uploads/sites/70/2022/02/burg.png",
    },
    {
      id: 2,
      title: "Packages",
      description:
        "Send and receive packages effortlessly. Whether small parcels or large shipments, we ensure fast and reliable deliveries.",
      image: "https://kitpro.site/delivey/wp-content/uploads/sites/70/2022/02/box.png",
    },
    {
      id: 3,
      title: "Groceries",
      description:
        "Stock up on essentials without leaving your home. Get fresh fruits, vegetables, and daily groceries delivered at your convenience.",
      image: "https://kitpro.site/delivey/wp-content/uploads/sites/70/2022/02/gro.png",
    },
  ];

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          We Deliver Everything
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Experience seamless delivery services for all your needs. From food and drinks to packages and groceries, we’ve got you covered.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {item.description}
              </p>
              <button className="text-gray-600 dark:text-gray-400 mb-4">
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
