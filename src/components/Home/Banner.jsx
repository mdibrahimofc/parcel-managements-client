const Banner = () => {
  return (
    <div className="bg-gray-900">
      <section
        className="relative bg-cover -mt-2 py-6 sm:py-8 md:py-10 lg:py-12 bg-center h-[85vh]"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/NtLXL5t/pexels-norma-mortenson-4393426.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-transparent dark:from-gray-900/70"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 dark:text-gray-200">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 dark:text-gray-100">
            Welcome to Our Logistics Hub
          </h1>
          <p className="text-lg md:text-xl mb-6 dark:text-gray-300">
            Streamline your delivery processes with our efficient platform.
          </p>
          <p className="text-base md:text-lg dark:text-gray-300">
            Stay updated on your parcels and enjoy real-time delivery insights.
          </p>
        </div>
        <div className="absolute bottom-4 inset-x-0 text-center text-gray-200 dark:text-gray-400">
          <span className="animate-bounce text-lg">⬇️ Scroll Down for More</span>
        </div>
      </section>
    </div>
  );
};

export default Banner;
