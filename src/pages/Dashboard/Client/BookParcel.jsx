import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { number } from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';

const BookParcel = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [prices, setPrices] = useState(0)

    const {data:client = {}, refetch } = useQuery({
      queryKey: ["user", user?.email],
      queryFn: async () => {
        const {data} = await axiosSecure.get(`/user/${user?.email}`)
        console.log(data);
        return data
      }
    })
    console.log(client);

    const handleWeight = e => {
      const weight = +e.target.value
      if(weight === 0){
        setPrices(0)
        toast.error("Weight can not be 0")
      }
      if(weight > 0 && weight < 2){
        setPrices(50)
      }
      if(weight >=2 && weight < 3){
        setPrices(100)
      }
      if(weight >= 3){
        setPrices(150)
      }
    }

    const handleBookPercel = async e => {
        e.preventDefault()
        const form = new FormData(e.target)
        const parcel = Object.fromEntries(form.entries())
        parcel.price = +parcel.price
        parcel.weight = +parcel.weight
        parcel.name = user?.displayName
        parcel.email = user?.email
        parcel.status = "pending"
        parcel.bookingDate = new Date()
        parcel.deliveryDate = new Date(parcel.deliveryDate).getTime()
        console.log(parcel);
        if(parcel.weight === 0){
          toast.error("Weight can not be 0")
          return
        }
        try {
          const response = await axiosSecure.post("/parcel", parcel);

          if(!client.bookedParcel){
          const bookedParcel = 1
          const updatedUser = await axiosSecure.patch(`/user/${user?.email}`, { number: parcel.number, bookedParcel: bookedParcel });
          console.log(updatedUser);
          refetch()
          }else{
            const bookedParcel = client.bookedParcel + 1
          const updatedUser = await axiosSecure.patch(`/user/${user?.email}`, { number: parcel.number, bookedParcel: bookedParcel });
          console.log(updatedUser);
          refetch()
          }
          console.log(response);
      
          if (response.data.insertedId) {
              toast.success("Your parcel booked successfully");
          }
      } catch (err) {
          toast.error(`Something went wrong, parcel not booked: ${err.message}`);
      }      
    }
  return (
    <section className="bg-gradient-to-r from-blue-100 to-teal-200 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-4xl font-semibold text-center text-blue-800 mb-4">Book a Parcel</h2>
        <p className="text-center text-lg text-gray-600 mb-8">Enter the details and book your parcel for delivery</p>

        <form onSubmit={handleBookPercel} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name (Auto-filled from logged-in user, read-only) */}
          <div className="col-span-1">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name='name'
              value={user?.displayName}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Email (Auto-filled from logged-in user, read-only) */}
          <div className="col-span-1">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={user?.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Phone Number */}
          <div className="col-span-1">
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              id="phone"
              name='number'
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Parcel Type */}
          <div className="col-span-1">
            <label htmlFor="parcelType" className="block text-lg font-medium text-gray-700">Parcel Type</label>
            <input
              type="text"
              id="parcelType"
              name='parcelType'
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter parcel type"
            />
          </div>

          {/* Parcel Weight */}
          <div className="col-span-1">
            <label htmlFor="weight" className="block text-lg font-medium text-gray-700">Parcel Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name='weight'
              min="0"
              onChange={handleWeight}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter weight in kg"
            />
          </div>

          {/* Receiver's Name */}
          <div className="col-span-1">
            <label htmlFor="receiverName" className="block text-lg font-medium text-gray-700">Receiver's Name</label>
            <input
              type="text"
              id="receiverName"
              name='receiverName'
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter receiver's name"
            />
          </div>

          {/* Receiver's Phone Number */}
          <div className="col-span-1">
            <label htmlFor="receiverPhone" className="block text-lg font-medium text-gray-700">Receiver's Phone Number</label>
            <input
              type="number"
              id="receiverPhone"
              name='receiverPhone'
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter receiver's phone number"
            />
          </div>

          {/* Parcel Delivery Address */}
          <div className="col-span-1">
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Parcel Delivery Address</label>
            <input
              type="text"
              id="address"
              name='address'
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter delivery address"
            />
          </div>

          {/* Requested Delivery Date */}
          <div className="col-span-1">
            <label htmlFor="deliveryDate" className="block text-lg font-medium text-gray-700">Requested Delivery Date</label>
            <input
              type="date"
              id="deliveryDate"
              name='deliveryDate'
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Delivery Address Latitude */}
          <div className="col-span-1">
            <label htmlFor="latitude" className="block text-lg font-medium text-gray-700">Delivery Address Latitude</label>
            <input
              type="tel"
              id="latitude"
              name='latitude'
              required
              placeholder="21.121365496"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Delivery Address Longitude */}
          <div className="col-span-1">
            <label htmlFor="longitude" className="block text-lg font-medium text-gray-700">Delivery Address Longitude</label>
            <input
              type="tel"
              id="longitude"
              name='longitude'
              required
              placeholder="21.121365496"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Price (Auto calculated based on weight) */}
          <div className="col-span-1">
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price (Tk)</label>
            <input
              type="text"
              id="price"
              name='price'
              value={prices}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Book Button */}
          <div className="col-span-1">
            <button
              type="submit"
              className="w-full p-4 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Book My Parcel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookParcel;
