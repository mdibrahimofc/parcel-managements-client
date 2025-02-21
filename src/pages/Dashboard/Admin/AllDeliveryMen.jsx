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

const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure()

    const { data: deliveryMan = [], isLoading } = useQuery({
        queryFn: async () => {
          const { data } = await axiosSecure.get("/user/deliveryMan");
          return data;
        },
      });
      console.log(deliveryMan);
  return (
    <div className="w-full md:w-11/12 mx-auto">
      <h1 className="text-xl md:text-2xl mb-4 font-bold">
        All Delivery Men ({deliveryMan.length})
      </h1>


      <Table className="shadow-md overflow-x-auto">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Delivered Parcel</TableHead>
            <TableHead>Average Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Progress value={50} />
              </TableCell>
            </TableRow>
          ) : deliveryMan.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No parcels found.
              </TableCell>
            </TableRow>
          ) : (
            deliveryMan.map((dMan) => (
              <TableRow key={dMan._id}>
                <TableCell className="font-medium">{dMan.name}</TableCell>
                <TableCell>{dMan.number}</TableCell>
                <TableCell>{dMan.deliveryCount ? dMan.deliveryCount : 0}</TableCell>
                <TableCell>{dMan.rating ? Math.ceil(dMan.rating / 5) : 0}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllDeliveryMen;
