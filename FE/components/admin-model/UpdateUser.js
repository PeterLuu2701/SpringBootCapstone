import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateUser = ({ openUpdate, setOpenUpdate, infoUpdate, setUsers }) => {
  const [userInfoApi, setUserInfoApi] = useState(infoUpdate);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/roles");
        if (response.status === 200) {
          setRoles(response.data);
        } else {
          console.error("Failed to fetch roles");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    setUserInfoApi(infoUpdate);
  }, [infoUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfoApi((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/user/${userInfoApi.id}`,
        userInfoApi
      );
      if (response.status === 200) {
        setOpenUpdate(false);
        if (typeof setUsers === "function") {
          setUsers();
        }
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div
      className={"modal fade" + (openUpdate ? " show d-block" : " d-none")}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: openUpdate ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update User</h5>
            <button
              type="button"
              className="close"
              style={{ width: "40px" }}
              onClick={() => setOpenUpdate(false)}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body p-6 bg-white rounded shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Username</label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={userInfoApi.username || ""}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={userInfoApi.fullname || ""}
                  name="fullname"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={userInfoApi.email || ""}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Phone</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={userInfoApi.phone || ""}
                  name="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Role</label>
                <select
                  name="role_id"
                  value={userInfoApi.role_id || ""}
                  onChange={handleChange}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select a Role</option>
                  {roles.map((role) => (
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
              onClick={() => setOpenUpdate(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
