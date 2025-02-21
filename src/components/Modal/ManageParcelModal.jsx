import useAxiosSecure from "@/hooks/useAxiosSecure";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ManageParcelModal = ({ isOpen, onClose, parcelId, onAssign }) => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const axiosSecure = useAxiosSecure()

  // Fetch the list of delivery men from the backend
  useEffect(() => {
    const fetchDeliveryMen = async () => {
      try {
        const {data} = await axiosSecure("/user/deliveryMan")
        setDeliveryMen(data);
      } catch (error) {
        toast.error("Error fetching delivery men:", error);
      }
    };

    if (isOpen) fetchDeliveryMen();
  }, [isOpen]);

  const handleAssign = () => {
    if (!selectedDeliveryMan || !deliveryDate) {
      alert("Please select a delivery man and set a delivery date.");
      return;
    }

    onAssign(parcelId, selectedDeliveryMan, deliveryDate);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Manage Parcel</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Assign Delivery Man</label>
            <select
              value={selectedDeliveryMan}
              onChange={(e) => setSelectedDeliveryMan(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a delivery man</option>
              {deliveryMen.map((man) => (
                <option key={man._id} value={man._id}>
                  {man.name} ({man.email})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Approximate Delivery Date</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ManageParcelModal;
