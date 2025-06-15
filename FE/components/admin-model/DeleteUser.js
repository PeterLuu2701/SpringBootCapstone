import axios from "axios";
import React, { useState } from "react";

const DeleteUser = ({
  openDelete,
  setOpenDelete,
  userIdToDelete,
  usernameToDelete,
  setUsers,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setErrorMessage("");
    try {
      const response = await axios.delete(
        `http://localhost:8080/user/${userIdToDelete}`
      );

      if (response.status === 200 || response.status === 204) {
        setOpenDelete(false);
        if (typeof setUsers === "function") {
          setUsers();
        }
      } else {
        setErrorMessage(
          `Failed to delete user: ${response.data.message || "Unknown error"}`
        );
        console.error("Failed to delete user:", response.status, response.data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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
      className={"modal fade" + (openDelete ? " show d-block" : " d-none")}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: openDelete ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="close"
              style={{ width: "40px" }}
              onClick={() => setOpenDelete(false)}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body p-4 bg-white rounded shadow-lg">
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {errorMessage}</span>
              </div>
            )}
            <p className="text-center">
              Are you sure you want to delete user "
              <strong>{usernameToDelete}</strong>" (ID: {userIdToDelete})? This
              action cannot be undone.
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setOpenDelete(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
