import safetImg from "../../assets/Home/quality.png";
import fastDeliver from "../../assets/Home/fast-delivery.png";
import updateImg from "../../assets/Home/navigation.png";
import HeadingText from "../Utils/HeadingText";

const Feauture = () => {
  const features = [
    {
      id: 1,
      icon: safetImg,
      title: "🔒 Parcel Safety",
      description:
        "📦 Your parcels are in safe hands! We handle them with care, ensuring they reach their destination securely.",
    },
    {
      id: 2,
      icon: fastDeliver,
      title: "🚀 Super Fast Delivery",
      description:
        "⚡ Speed is our strength! Enjoy lightning-fast delivery with our optimized logistics network.",
    },
    {
      id: 3,
      icon: updateImg,
      title: "🕒 Real-Time Updates",
      description:
        "💬 Stay in the know! Get live tracking and notifications about your parcel’s journey at every step.",
    },
  ];

  return (
    <div className="py-6 sm:py-8 md:py-10 lg:py-12 dark:bg-gray-900">
      <HeadingText
        title={"Innovative Solutions for Your Needs 🌍"}
        subTitle={
          "Empowering businesses and individuals with cutting-edge technology to simplify processes, enhance efficiency, and deliver exceptional results"
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 mx-auto">
        {features.map((feature) => (
          <div
            className="flex flex-col space-y-3 shadow-lg transition-transform transform duration-300 ease-in-out p-8 hover:scale-105 dark:bg-gray-800 dark:text-gray-100"
            key={feature.id}
          >
            <div className="flex justify-end">
              <img
                className="w-40 h-full border-2 rounded-full p-2 mr-6 border-indigo-300 dark:border-indigo-500"
                src={feature.icon}
                alt=""
              />
            </div>
            <h2 className="text-xl font-bold dark:text-gray-200">{feature.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feauture;
