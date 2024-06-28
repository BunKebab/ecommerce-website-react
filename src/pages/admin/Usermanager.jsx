import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  allUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../../features/users/userslice";

const Usermanager = () => {
  const users = useSelector((state) => state.userslice.users);
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    role: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleAddUser = (values, { resetForm }) => {
    dispatch(addUser(values));
    resetForm();
  };

  const handleUpdateUser = (values, { resetForm }) => {
    dispatch(updateUser({ ...values, id: editingUser.id }));
    setEditingUser(null);
    resetForm();
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Manager</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingUser ? "Edit User" : "Add User"}
        </h2>
        <Formik
          initialValues={editingUser || initialValues}
          validationSchema={validationSchema}
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
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
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-gray-700">
                  Role
                </label>
                <Field
                  name="role"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <Field
                  name="password"
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
                    : editingUser
                    ? "Update User"
                    : "Add User"}
                </button>
                {editingUser && (
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      setEditingUser(null);
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
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        {users.length === 0 ? (
          <p>No users available</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDeleteUser(user.id)}
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

export default Usermanager;
