import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUserRole = () => {
      const axiosSecure = useAxiosSecure()
      const {user} = useAuth()

  const {data:userRole, isLoading} = useQuery({
    queryKey: ["user", user?.displayName],
    queryFn: async () => {
      const {data} = await axiosSecure(`/user/${user?.email}`)
      return data.role
    }
  })
  return {userRole, isLoading}
};

export default useUserRole;