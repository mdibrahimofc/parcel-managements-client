import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ManageParcelModal from "@/components/Modal/ManageParcelModal";
import toast from "react-hot-toast";

const AllParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [queryParams, setQueryParams] = useState({});

  const handleSearch = () => {
    setQueryParams({ 
      from: new Date(fromDate).getTime(), 
      to: new Date(toDate).getTime() 
    });
  };

  const handleManageClick = (parcelId) => {
    setSelectedParcel(parcelId);
    setIsModalOpen(true);
  };

  const handleAssign = async (parcelId, deliveryManId, deliveryDate) => {
    const parcelInfo = { parcelId, deliveryManId, deliveryDate };
    try {
      const { data } = await axiosSecure.patch(`/parcel/manage/admin/${parcelId}`, parcelInfo);
      if (data.modifiedCount) {
        toast.success("Parcel assigned successfully!");
        refetch();
      } else if (data.matchedCount) {
        toast.error("Parcel already assigned to a delivery man!");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error assigning parcel:", error);
    }
  };

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["All-Parcel", queryParams],
    queryFn: async () => {
      const { from, to } = queryParams;
      const { data } = await axiosSecure.get(`/parcel`, { params: { from, to } });
      return data;
    },
  });

  return (
    <div className="w-full md:w-11/12 mx-auto">
      <h1 className="text-xl md:text-2xl mb-4 font-bold">All Parcels ({parcels.length})</h1>

      <div className="mb-4">
        <p>Select Date Range: Requested Delivery Date</p>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <span>to</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center py-4 animate-pulse text-gray-500">Loading parcels...</p>
      ) : parcels.length === 0 ? (
        <p className="text-center py-6 text-gray-500">🚀 No parcels found. Try a different date range.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parcels.map((parcel) => (
            <div key={parcel._id} className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-lg font-semibold">{parcel.name}</h2>
              <p><strong>Phone:</strong> {parcel.number}</p>
              <p><strong>Booking Date:</strong> {new Date(parcel.bookingDate).toLocaleDateString()}</p>
              <p><strong>Delivery Date:</strong> {new Date(parcel.deliveryDate).toLocaleDateString()}</p>
              <p><strong>Cost:</strong> {parcel.price || "N/A"}</p>
              <p><strong>Status:</strong> {parcel.status || "pending"}</p>
              <button
                onClick={() => handleManageClick(parcel._id)}
                className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
              >
                Manage Parcel
              </button>
            </div>
          ))}
        </div>
      )}

      <ManageParcelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        parcelId={selectedParcel}
        onAssign={handleAssign}
      />
    </div>
  );
};

export default AllParcels;
