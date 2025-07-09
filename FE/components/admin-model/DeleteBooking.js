"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";

const DeleteBooking = ({
  openDelete,
  setOpenDelete,
  bookingIdToDelete,
  refreshBookings,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  useEffect(() => {
    if (openDelete) {
      setErrorMessage(null);
      setDeleteSuccess(null);
      setDeleting(false);
    }
  }, [openDelete]);

  const handleDelete = async () => {
    setErrorMessage(null);
    setDeleteSuccess(null);
    setDeleting(true);

    try {
      const response = await axios.delete(
        `http://localhost:8080/booking/${bookingIdToDelete}`
      );

      if (response.data?.statusCode === 200 || response.status === 204) {
        setDeleteSuccess(
          `Booking ID: ${bookingIdToDelete} successfully deleted! 🎉`
        );
        setTimeout(() => {
          setOpenDelete(false);
          if (typeof refreshBookings === "function") {
            refreshBookings();
          }
        }, 1500);
      } else {
        const apiMessage =
          response.data?.message || "Unknown error from server.";
        setErrorMessage(`Failed to delete booking: ${apiMessage}`);
        console.error(
          "Failed to delete booking:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      if (error.response) {
        setErrorMessage(
          `Server Error: ${error.response.status} - ${
            error.response.data?.message || JSON.stringify(error.response.data)
          }`
        );
      } else if (error.request) {
        setErrorMessage(
          "Network Error: No response from server. Is the backend running?"
        );
      } else {
        setErrorMessage(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setDeleting(false);
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
            <h5 className="modal-title">Confirm Booking Deletion</h5>
            <button
              type="button"
              className="close"
              style={{ width: "40px" }}
              onClick={() => setOpenDelete(false)}
              disabled={deleting}
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
            {deleteSuccess && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {deleteSuccess}</span>
              </div>
            )}
            {!errorMessage && !deleteSuccess && (
              <p className="text-center">
                Are you sure you want to delete booking ID:{" "}
                <strong>{bookingIdToDelete}</strong>? This action cannot be
                undone.
              </p>
            )}
          </div>
          <div className="modal-footer justify-content-center flex">
            <button
              type="button"
              className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => setOpenDelete(false)}
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
              disabled={deleting || deleteSuccess}
            >
              {deleting ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBooking;
