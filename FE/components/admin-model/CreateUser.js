import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateUser = ({ openAdd, setOpenAdd, setUsers }) => {
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    role_id: "",
  });

  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/role");
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            setRoles(response.data);
          } else if (response.data && Array.isArray(response.data.data)) {
            setRoles(response.data.data);
          } else {
            console.error(
              "API for roles returned data that is not an array:",
              response.data
            );
            setErrorMessage(
              "Failed to load roles: Unexpected data format from API."
            );
            setRoles([]);
          }
        } else {
          console.error(
            "Failed to fetch roles:",
            response.status,
            response.data
          );
          setErrorMessage("Failed to load roles. Please try again.");
          setRoles([]);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        setErrorMessage(
          "Network error fetching roles. Is the backend running?"
        );
        setRoles([]);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (openAdd) {
      setErrorMessage("");
    }
  }, [openAdd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    setErrorMessage("");

    if (
      !newUserInfo.username ||
      !newUserInfo.password ||
      !newUserInfo.email ||
      !newUserInfo.role_id
    ) {
      setErrorMessage(
        "Please fill in all required fields (Username, Password, Email, Role)."
      );
      return;
    }

    try {
      console.log("Attempting to create user with data:", newUserInfo);

      const response = await axios.post(
        "http://localhost:8080/user",
        newUserInfo
      );

      if (response.status === 201 || response.status === 200) {
        setOpenAdd(false);
        setNewUserInfo({
          username: "",
          password: "",
          fullname: "",
          email: "",
          phone: "",
          role_id: "",
        });
        if (typeof setUsers === "function") {
          setUsers();
        }
      } else {
        setErrorMessage(
          `Failed to create user: ${response.data.message || "Unknown error"}`
        );
        console.error("Failed to create user:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response) {
        setErrorMessage(
          `Server Error: ${error.response.status} - ${
            error.response.data.message || error.response.data
          }`
        );
      } else if (error.request) {
        setErrorMessage(
          "Network Error: No response from server. Is the backend running?"
        );
      } else {
        setErrorMessage(`An unexpected error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div
      className={"modal fade" + (openAdd ? " show d-block" : " d-none")}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: openAdd ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New User</h5>
            <button
              type="button"
              className="close"
              style={{ width: "40px" }}
              onClick={() => setOpenAdd(false)}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body p-6 bg-white rounded shadow-lg">
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Username</label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="username"
                  value={newUserInfo.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="password"
                  value={newUserInfo.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="fullname"
                  value={newUserInfo.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="email"
                  value={newUserInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Phone</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="phone"
                  value={newUserInfo.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Role</label>
                <select
                  name="role_id"
                  value={newUserInfo.role_id}
                  onChange={handleChange}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select a Role</option>
                  {Array.isArray(roles) &&
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setOpenAdd(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreate}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
