import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { placeOrder } from "../../features/order/orderslice";
import { clearCart } from "../../features/cart/cartslice";

const Checkout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authslice);
  const { items } = useSelector((state) => state.cartslice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (isAuthenticated && user !== null) {
      dispatch(placeOrder({ user, items, address: values.address }));
      dispatch(clearCart());
      setSubmitting(false);
      navigate("/");
    } else {
      navigate("/login")
    }
  };

  return (
    <div>
      <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
        <h2 className="text-2xl font-bold text-gray-800">
          Complete your order
        </h2>
        <Formik
          initialValues={{ address: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <h3 className="text-base text-gray-800 mb-4">
                  Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={user?.fullname || ""}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      value={user?.email || ""}
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-base text-gray-800 mb-4">
                  Shipping Address
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 max-md:flex-col mt-8">
                <button
                  type="submit"
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Complete Purchase"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;
