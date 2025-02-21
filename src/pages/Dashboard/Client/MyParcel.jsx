import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import useMyParcels from "@/hooks/useMyParcels";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const MyParcel = () => {
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoadings] = useState(true);
  const [reviewModal, setReviewModal] = useState({
    open: false,
    parcelId: null,
    deliveryId: null,
  });
  const [reviewData, setReviewData] = useState({ rating: "", comment: "" });
  const [deliveryId, setDeliveryId] = useState("");
  const [render, setRender] = useState(false)
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const loadParcels = async () => {
      setIsLoadings(true);
      const { data } = await axiosSecure(`/parcel/${user?.email}`);
      setParcels(data);
      setIsLoadings(false);
    };
    loadParcels();
  }, [render]);
  console.log(parcels);

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={async () => {
                try {
                  const { data } = await axiosSecure.delete(
                    `/parcel/delete/${id}`
                  );
                  toast.success("Item deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete the item. Please try again.");
                } finally {
                  toast.dismiss(t.id);
                  setRender(!render)
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
  };

  const hanleStatus = async (status) => {
    console.log(status);
    const { data } = await axiosSecure.post("/parcel/status", {
      status,
      email: user?.email,
    });
    setParcels(data);
  };

  const handleReviewSubmit = async () => {
    if (!reviewData.rating || !reviewData.comment) {
      toast.error("Please fill out all fields.");
      return;
    }
    reviewData.rating = parseInt(reviewData.rating)
    if(reviewData.rating <1 || reviewData.rating > 5){
      toast.error("Rating must be 1 to 5!")
      return
    }

    reviewData.deliveryManId = deliveryId
    reviewData.name = user?.displayName
    reviewData.photo = user?.photoURL
    reviewData.reviewGivingDate = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date());
    console.log(reviewData);
    

    try {
      await axiosSecure.post(
        `/parcel/review/${reviewModal.parcelId}`,
        reviewData
      );
      toast.success("Review submitted successfully.");
      setReviewModal({ open: false, parcelId: null });
      setReviewData({ rating: "", comment: "" });
    } catch (err) {
      toast.error("Review already added");
      setReviewModal({ open: false, parcelId: null });
      setReviewData({ rating: "", comment: "" });
    }
  };

  return (
    <div className="w-full md:w-11/12 mx-auto">
      <header className="text-center my-6">
        <h1 className="text-3xl font-bold text-amber-400">My Parcels</h1>
        <p className="text-cyan-600 font-semibold">
          Manage and track your parcels efficiently.
        </p>
      </header>
      <div className="flex sticky top-0 justify-between items-center p-4 bg-white shadow-md rounded-md mb-4">
        <p className="font-semibold px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-lg">
          Filter by Status
        </p>
        <div>
          <Select name="status" onValueChange={hanleStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="On the way">On the way</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="shadow-lg rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Parcel Type</TableHead>
            <TableHead>Requested Delivery Date</TableHead>
            <TableHead>Approx. Delivery Date</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Delivery Men ID</TableHead>
            <TableHead>Booking Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <Progress value={50} className="w-1/2 mx-auto my-4" />
                <p>Loading parcels...</p>
              </TableCell>
            </TableRow>
          ) : parcels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <p className="text-gray-500">No parcels found.</p>
              </TableCell>
            </TableRow>
          ) : (
            parcels.map((parcel) => (
              <TableRow key={parcel._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {parcel.parcelType}
                </TableCell>
                <TableCell>{new Date(parcel.deliveryDate).toLocaleDateString()}</TableCell>
                <TableCell>{parcel.approxDeliveryDate || "N/A"}</TableCell>
                <TableCell>
                  {new Date(parcel.bookingDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{parcel.deliveryManId || "N/A"}</TableCell>
                <TableCell>{parcel.status}</TableCell>
                <TableCell className="text-right flex flex-col md:flex-row justify-end gap-2">
                  {parcel.status === "pending" ? (
                    <Link
                      to={`/dashboard/update-parcel/${parcel._id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Update
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                    >
                      Update
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className={`px-3 py-1 rounded ${
                      parcel.status !== "pending"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600 transition"
                    }`}
                    disabled={parcel.status !== "pending"}
                  >
                    Cancel
                  </button>
                  {parcel.status === "Delivered" && (
                    <button
                      onClick={() => {
                        setReviewModal({
                          open: true,
                          parcelId: parcel._id,
                          deliveryId: parcel.deliveryManId,
                        });
                        setDeliveryId(parcel.deliveryManId);
                      }}
                      className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                    >
                      Review
                    </button>
                  )}
                  <button
                    onClick={() => console.log(parcel._id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Pay
                  </button>

                  {/* Review Modal */}
                  {reviewModal.open && (
                    <Dialog
                      open={reviewModal.open}
                      onOpenChange={() =>
                        setReviewModal({ open: false, parcelId: null })
                      }
                    >
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Give Review</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex justify-end mr-4 md:mr-10">
                            <img
                              className="w-10 sm:w-20 md:w-28"
                              src={user?.photoURL}
                              alt={user?.displayName}
                            />
                          </div>
                          <Input
                            type="text"
                            value={user?.displayName}
                            disabled
                          />
                          <Input
                            type="text"
                            value={reviewModal?.deliveryId}
                            disabled
                          />
                          <Input
                            type="number"
                            placeholder="Rating (1-5)"
                            value={reviewData.rating}
                            onChange={(e) =>
                              setReviewData({
                                ...reviewData,
                                rating: e.target.value,
                              })
                            }
                          />
                          <Textarea
                            placeholder="Write your review here..."
                            value={reviewData.comment}
                            onChange={(e) =>
                              setReviewData({
                                ...reviewData,
                                comment: e.target.value,
                              })
                            }
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="secondary"
                              onClick={() =>
                                setReviewModal({ open: false, parcelId: null })
                              }
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleReviewSubmit}
                              className="bg-blue-500 text-white hover:bg-blue-600"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyParcel;
