import React from "react";

const DeliveryProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Place Your Order",
      description: "Select your items and confirm your order.",
      icon: "🛒",
    },
    {
      id: 2,
      title: "Pay Order",
      description: "Complete the payment through secure checkout.",
      icon: "💳",
    },
    {
      id: 3,
      title: "Order Delivered",
      description: "Your package is shipped and on its way.",
      icon: "🚚",
    },
    {
      id: 4,
      title: "Receive Your Order",
      description: "Enjoy your order upon delivery.",
      icon: "📦",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white py-12">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold">How Delivery Works</h2>
        <p className="mt-2 mb-10">
          A simple and seamless process to get your items delivered to your doorstep.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <div className="flex justify-center">
                <div className="w-14 h-14 flex items-center justify-center bg-green-600 text-white text-2xl rounded-md">
                  {step.icon}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.id}. {step.title}</h3>
              <p className="mt-1">{step.description}</p>
              <button className="mt-4 text-yellow-500 hover:text-yellow-600 flex items-center mx-auto">
                ▼ More Info
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;
