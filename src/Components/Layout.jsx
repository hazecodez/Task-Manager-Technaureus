import PropTypes from "prop-types";

import { IoMdPerson } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../Services/Apis";
import { toast } from "sonner";

export default function Layout({ children }) {
  const navigate = useNavigate();

  async function logout() {
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
      try {
        const response = await userLogout(refreshToken);
        if (response) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          toast.success("Successfully logged out");
          navigate("/login");
        }
      } catch (error) {
        console.log("Logout failed: ", error);
      }
    } else {
      console.log("No refresh token found in localStorage.");
    }
  }
  return (
    <div className="flex">
      <div className="flex-1">
        {/* Navbar */}
        <nav className="bg-gray-900 p-4 flex justify-between items-center">
          <p
            onClick={() => navigate("/")}
            className="text-[#f0eee4] text-2xl font-bold cursor-pointer"
          >
            Task Management
          </p>

          <div className="flex gap-4">
            <div
              onClick={logout}
              className="w-8 h-8 flex items-center justify-center transition-colors duration-500 bg-[#f0eee4] rounded-full hover:bg-gray-800"
            >
              <RiLogoutBoxFill className="cursor-pointer text-2xl text-black hover:text-[#f0eee4] transition-colors duration-500" />
            </div>
            <div
              onClick={() => navigate("/profile")}
              className="w-8 h-8 flex items-center justify-center transition-colors duration-500 bg-[#f0eee4] rounded-full hover:bg-gray-800"
            >
              <IoMdPerson className="cursor-pointer text-2xl text-black hover:text-[#f0eee4] transition-colors duration-500" />
            </div>
          </div>
        </nav>

        {/* Main content (children) */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
