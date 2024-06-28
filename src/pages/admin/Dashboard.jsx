import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { productData } from "../../features/products/productslice";
import { allUsers } from "../../features/users/userslice";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const products = useSelector((state) => state.productslice.data);
  const users = useSelector((state) => state.userslice.users);
  console.log(users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productData());
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <Link to="/admin/users">
            <h2 className="text-xl font-semibold text-gray-800">Users</h2>
          </Link>
          <p className="mt-4 text-gray-600">Total users: {users.length}</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <Link to="/admin/products">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
          </Link>
          <p className="mt-4 text-gray-600">
            Total products: {products.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
