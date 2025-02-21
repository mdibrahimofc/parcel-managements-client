import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUpload from "@/hooks/useUpload";
import useUserRole from "@/hooks/useUserRole";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const {user, updateUserProfile} = useAuth()
  const [profileImage, setProfileImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(user?.photoURL)
  const [name, setName] = useState(user?.displayName);
  const {userRole} = useUserRole()
  const axiosSecure = useAxiosSecure()


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const image = await useUpload(file)
    setProfileUrl(image)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try{
      await updateUserProfile(name, profileUrl);
      toast.success("Profile Updated Successfully!");
    } catch(err){
      toast.error("Something went wrong! try again")
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-sm mt-2">Empowering growth through learning and perseverance.</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profileImage || profileUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer"
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                Upload
              </label>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2 border bg-gray-100 rounded-lg cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={userRole ? userRole : ""}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              Update Profile
            </button>
          </div>

          <div className="mt-8 text-center border-t pt-6">
            <h2 className="text-xl font-bold">Company Summary</h2>
            <p className="text-gray-700 mt-4">
              At XYZ Tech Solutions, we are committed to delivering innovative
              software solutions that empower businesses and individuals to
              thrive in a digital era. Our mission is to foster creativity,
              collaboration, and excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
