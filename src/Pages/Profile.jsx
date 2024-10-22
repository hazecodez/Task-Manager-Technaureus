import Layout from "../Components/Layout";
import { useEffect, useState } from "react";
import { userProfile } from "../Services/Apis";
import { toast } from "sonner";
// import { BeatLoader } from "react-spinners";
import { IoPersonCircleSharp } from "react-icons/io5";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    async function fetchUserDetails() {
      setLoading(true);
      const response = await userProfile();
      if (response.data) {
        setUserDetails(response.data);
      } else {
        toast.error("Error fetching user details");
      }
      setLoading(false);
    }
    fetchUserDetails();
  }, [loading]);
  return (
    <Layout>
      {/* {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <BeatLoader color="#858585" size={30} />
        </div>
      )} */}
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center w-full sm:w-[500px] h-[300px] bg-gray-900 rounded-md">
          <div className="flex justify-center pt-10">
            <IoPersonCircleSharp className="text-8xl text-[#f0eee4]" />
          </div>
          <p className="text-[#f0eee4] text-3xl font-bold pt-4 ">{userDetails.username}</p>
          <p className="text-[#f0eee4] text-xl pt-4">{userDetails.email}</p>
          
        </div>
      </div>
    </Layout>
  );
}
