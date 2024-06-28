import React, { useEffect } from "react";
import Loading from "../../components/Loading";

import { useSelector, useDispatch } from "react-redux";
import { fetchOrderHistory } from "../../features/order/orderslice";

const Orderhistory = () => {
  const { orderHistory, loading, error } = useSelector(
    (state) => state.orderslice
  );
  const { user } = useSelector((state) => state.authslice);
  const userId = user.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderHistory(userId));
  }, [dispatch]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (error !== null) {
    return <h1>something happened, please try again later</h1>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orderHistory.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-full"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Order ID: {order.id}
              </h2>
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-700">Items</h3>
                <ul className="list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-gray-600">
                      {item.name} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600">Address: {order.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orderhistory;
