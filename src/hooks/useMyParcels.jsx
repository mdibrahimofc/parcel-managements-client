import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyParcels = () => {
    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["My-Parcel", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/parcel/${user?.email}`);
      return data;
    },
  });
  return { parcels, isLoading, refetch }
};

export default useMyParcels;