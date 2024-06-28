import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/authslice";

const Profile = () => {
  const {
    isAuthenticated,
    user
  } = useSelector((state) => state.authslice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex align-middle justify-center mt-40">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            Hello {user?.fullname || "User"}
          </h5>
          <span className="text-sm text-gray-500">
            {user?.email || "your Email"}
          </span>
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={handleLogout}
              className=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Logout
            </button>
            {isAuthenticated && user.role !== "Admin" ? (
              <button
                onClick={() => {
                  navigate("/order-history");
                }}
                className=" inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300"
              >
                Order history
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
