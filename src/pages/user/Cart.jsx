import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../features/cart/cartslice";
import Product from "./Product";
import { productData } from "../../features/products/productslice";

const Cart = () => {
  const { items } = useSelector((state) => state.cartslice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      {items.length !== 0 ? (
        <div className="flex justify-center">
          <button
            onClick={handleCheckout}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
          >
            Checkout
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <h1>You have bought nothing</h1>
        </div>
      )}
      {items.map((item, index) => (
        <div key={index} className="flex flex-wrap gap-10">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={item.image}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-90">
                {item.name}
              </h5>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {item.price} $
                </span>
                <button
                  onClick={() => handleRemoveFromCart(index)}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Remove from cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
