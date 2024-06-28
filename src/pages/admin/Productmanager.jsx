import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  productData,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../features/products/productslice";

const Productmanager = () => {
  const products = useSelector((state) => state.productslice.data);
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(null);

  const initialValues = {
    name: "",
    price: "",
    description: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    description: Yup.string().required("Description is required"),
    image: Yup.string()
      .matches(
        /\.(jpg|jpeg|png|gif)$/,
        "Image URL must end with .jpg, .jpeg, .png, or .gif"
      )
      .required("Image URL is required"),
  });

  const handleAddProduct = (values, { resetForm }) => {
    dispatch(addProduct(values));
    resetForm();
  };

  const handleUpdateProduct = (values, { resetForm }) => {
    dispatch(updateProduct({ ...values, id: editingProduct.id }));
    setEditingProduct(null);
    resetForm();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(productData());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Manager</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>
        <Formik
          initialValues={editingProduct || initialValues}
          validationSchema={validationSchema}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          enableReinitialize
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700">
                  Price
                </label>
                <Field
                  name="price"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-gray-700">
                  Image URL
                </label>
                <Field
                  name="image"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>
                {editingProduct && (
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      setEditingProduct(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.price}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Productmanager;
