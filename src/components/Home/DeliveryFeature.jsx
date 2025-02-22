import toast from "react-hot-toast";
import deliveryImage from "../../assets/Home/3333449.jpg";

const DeliveryFeature = () => {
  return (
    <section className="bg-white dark:bg-gray-900 text-black dark:text-white py-16">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">
            Stay At Home, We Will Deliver Your Order
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Choose from a wide range of products, including groceries, household items, and more. Our reliable delivery service ensures your items arrive fresh and on time. Experience the convenience of contactless delivery and 24/7 customer support for a seamless shopping experience.
          </p>
          <button onClick={()=> toast.success("Thank you! You will recived important message.")} className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600">
            Notify Me
          </button>
        </div>

        {/* Image with Dark Mode Gradient */}
        <div className="md:w-1/2 relative flex justify-center mt-6 md:mt-0">
          {/* Image */}
          <img
            src={deliveryImage}
            alt="Delivery Service"
            className="max-w-full relative z-10 bg"
          />
          {/* Dark Mode Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-transparent dark:from-gray-900/70"></div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryFeature;
