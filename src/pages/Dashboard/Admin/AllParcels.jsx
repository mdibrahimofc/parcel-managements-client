import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
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
    setQueryParams({ from: fromDate, to: toDate });
  };
  console.log(queryParams);

  const handleManageClick = (parcelId) => {
    setSelectedParcel(parcelId);
    setIsModalOpen(true);
  };

  const handleAssign = async (parcelId, deliveryManId, deliveryDate) => {
    console.log(parcelId, deliveryManId, deliveryDate);
    const parcelInfo = { parcelId, deliveryManId, deliveryDate };
    try {
      const { data } = await axiosSecure.patch(`/parcel/manage/admin/${parcelId}`, parcelInfo);

      if (data.modifiedCount) {
        toast.success("Parcel assigned successfully!");
        refetch()
      }else if(data.matchedCount){
        toast.error("Parcel alredy assigned in delivery man!")
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error assigning parcel:", error);
    }
  };

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["All-Parcel", queryParams],
    queryFn: async () => {
      console.log(queryParams);
      queryParams.from = new Date(queryParams.from).getTime()
      queryParams.to = new Date(queryParams.to).getTime()
      const { from, to } = queryParams;
      console.log(typeof from, to);
      const { data } = await axiosSecure.get(`/parcel`, {
        params: { from, to },
      });
      console.log(data);
      return data;
    },
  });

  return (
    <div className="w-full md:w-11/12 mx-auto">
      <h1 className="text-xl md:text-2xl mb-4 font-bold">
        All Parcels ({parcels.length})
      </h1>

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

      <Table className="shadow-md overflow-x-auto">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Progress value={50} />
              </TableCell>
            </TableRow>
          ) : parcels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No parcels found.
              </TableCell>
            </TableRow>
          ) : (
            parcels.map((parcel) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">{parcel.name}</TableCell>
                <TableCell>{parcel.number}</TableCell>
                <TableCell>
                  {new Date(parcel.bookingDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{new Date(parcel.deliveryDate).toLocaleDateString()}</TableCell>
                <TableCell>{parcel.price || "N/A"}</TableCell>
                <TableCell>{parcel.status || "pending"}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleManageClick(parcel._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Manage Parcel
                  </button>
                </TableCell>
                <ManageParcelModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  parcelId={selectedParcel}
                  onAssign={handleAssign}
                />
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllParcels;
