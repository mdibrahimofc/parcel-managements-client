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
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const [deliveryId, setDeliveryId] = useState("")

  useEffect(()=> {
    const loadDelivery = async() => {
      const {data} = await axiosSecure.get(`/user/${user?.email}`)
      setDeliveryId(data._id)
    }
    loadDelivery()
  },[])

  console.log(deliveryId);

  const { data:deliveryParcel, isLoading, refetch } = useQuery({
    queryKey: ["My Delivery"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels/delivery/${deliveryId}`);
      return data;
    },
  });

  const handleCancel = async(id) => {;
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to update the status of parcel?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={async () => {
                const { data } = await axiosSecure.patch(`/parcel/delivery/${id}`, {
                  status: "Cancelled",
                  email: user?.email
                });
                console.log(data);
                if(data.updateStatus.modifiedCount){
                  toast.success("Parcel status updated successfull")
                  toast.dismiss(t.id)
                  refetch()
                }else{
                  toast.error("parcel status already updated")
                  toast.dismiss(t.id)
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  }
  const handleDeliver = async(id) => {
    console.log(id);
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to update the status of parcel?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={async () => {
                const { data } = await axiosSecure.patch(`/parcel/delivery/${id}`, {
                  status: "Delivered",
                  email: user?.email
                });
                console.log(data);
                if(data.updateStatus.modifiedCount){
                  toast.success("Parcel status updated successfull")
                  toast.dismiss(t.id)
                  refetch()
                }else{
                  toast.error("parcel status already updated")
                  toast.dismiss(t.id)
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  }

  return (
    <div className="w-full md:w-11/12 mx-auto">
      <h1 className="text-xl md:text-2xl mb-4 font-bold">
        My Delivery List ({deliveryParcel?.length})
      </h1>

      <Table className="shadow-md overflow-x-auto">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Reciver Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Approx Delivery Date</TableHead>
            <TableHead>Receiver Phone</TableHead>
            <TableHead>Receiver Adress</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Progress value={50} />
              </TableCell>
            </TableRow>
          ) : deliveryParcel?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No parcels found.
              </TableCell>
            </TableRow>
          ) : (
            deliveryParcel.map((parcel) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">{parcel.name}</TableCell>
                <TableCell className="font-medium">{parcel.receiverName}</TableCell>
                <TableCell>{parcel.number}</TableCell>
                <TableCell>{new Date(parcel.deliveryDate).toLocaleDateString()}</TableCell>
                <TableCell>{parcel.approxDeliveryDate}</TableCell>
                <TableCell>{parcel.receiverPhone}</TableCell>
                <TableCell>{parcel.address}</TableCell>
                <TableCell>
                  <div className="flex gap-4 md:gap-6 items-center">
                    <button onClick={() => handleCancel(parcel._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded">
                      Cancel
                    </button>

                    <button onClick={() => handleDeliver(parcel._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded">
                      Deliver
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyDeliveryList;
