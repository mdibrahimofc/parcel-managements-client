import { useState } from "react";
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
import toast from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user/client?page=${page}&limit=${usersPerPage}`
      );
      return data; // Assuming the API returns an object with users and total count
    },
    keepPreviousData: true,
  });

  console.log(data);

  const users = data?.users || [];
  const totalUsers = data?.totalUsers || 0;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleMakeAdmin = async (id) => {
    console.log(`Make admin: ${id}`);
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={async () => {
                const { data } = await axiosSecure.patch(`/users/${id}`, {
                  role: "Admin",
                });
                if(data.modifiedCount){
                  toast.success("User role updated successfull")
                  toast.dismiss(t.id)
                  refetch()
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
    // const {data} = await axiosSecure.patch(`/users/${id}`, {role: "Admin"})
    // console.log(data);
  };

  const handleMakeDeliveryMan = async (id) => {
    console.log(`Make delivery man: ${id}`);
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to update the role of this user?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={async () => {
                const { data } = await axiosSecure.patch(`/users/${id}`, {
                  role: "Delivery Man",
                });
                if(data.modifiedCount){
                  toast.success("User role updated successfull")
                  toast.dismiss(t.id)
                  refetch()
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
    // const { data } = await axiosSecure.patch(`/users/${id}`, { role: "Delivery Man" });
    // console.log(data);
  };

  return (
    <div className="w-full md:w-11/12 mx-auto">
      <h1 className="text-xl md:text-2xl mb-4 font-bold">
        All Users ({totalUsers})
      </h1>

      <Table className="shadow-md overflow-x-auto">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Booked Parcel</TableHead>
            <TableHead>Make Delivery Men</TableHead>
            <TableHead>Make Admin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Progress value={50} />
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.number}</TableCell>
                <TableCell>{user.bookedParcel || 0}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleMakeDeliveryMan(user._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Make Delivery Man
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Make Admin
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="mx-2">{`Page ${page} of ${totalPages}`}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
