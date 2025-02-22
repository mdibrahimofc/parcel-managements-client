import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUpload from "@/hooks/useUpload";
import useUserRole from "@/hooks/useUserRole";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(user?.photoURL);
  const [firstName, setFirstName] = useState(user?.displayName?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.displayName?.split(" ")[1] || "");
  const { userRole } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const image = await useUpload(file);
    setProfileUrl(image);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUserProfile(`${firstName} ${lastName}`, profileUrl);
      toast.success("Profile Updated Successfully!");
    } catch (err) {
      toast.error("Something went wrong! Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32">
            <img
              src={profileImage || profileUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <label htmlFor="image-upload" className="absolute bottom-2 right-2 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-all">
              <FaCamera className="text-white" />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Timezone</label>
              <select className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Dhaka (GMT +6)</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all mt-4"
          >
            Save Changes
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Account Overview</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-red-500 font-semibold">Status: Unverified</p>
            <p className="text-gray-600">Address: N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
