"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Alert, Spinner, Form } from "react-bootstrap";
import axios from "axios";
import { Trash2, AlertTriangle, User, Mail, Shield } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const DeleteUser = ({ show, onHide, user, setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmText, setConfirmText] = useState("");
  const [step, setStep] = useState(1); // 1: Confirmation, 2: Type confirmation

  useEffect(() => {
    if (show) {
      setError(null);
      setConfirmText("");
      setStep(1);
    }
  }, [show]);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URL}/users/${user.id}`);

      // Remove user from list
      setUsers((prev) => prev.filter((u) => u.id !== user.id));

      // Close modal after successful deletion
      setTimeout(() => {
        onHide();
      }, 1000);
    } catch (err) {
      console.error("DELETE error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else if (confirmText === user?.username) {
      handleDelete();
    }
  };

  const isConfirmValid = confirmText === user?.username;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      className="delete-modal"
    >
      <Modal.Header
        closeButton
        className="border-0 pb-2"
        style={{
          background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
          color: "white",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <Modal.Title className="d-flex align-items-center">
          <AlertTriangle size={24} className="me-2" />
          Delete User
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {error && (
          <Alert
            variant="danger"
            className="border-0 shadow-sm mb-4"
            style={{ borderRadius: "8px" }}
          >
            <div className="d-flex align-items-center">
              <AlertTriangle size={18} className="me-2" />
              {error}
            </div>
          </Alert>
        )}

        {step === 1 && (
          <div className="text-center">
            {/* Warning Icon */}
            <div
              className="d-flex justify-content-center mb-4"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#fff5f5",
                border: "3px solid #fee2e2",
                margin: "0 auto",
                alignItems: "center",
              }}
            >
              <Trash2 size={32} style={{ color: "#ef4444" }} />
            </div>

            {/* Warning Message */}
            <h5 className="mb-3 fw-bold text-dark">
              Are you sure you want to delete this user?
            </h5>

            <p className="text-muted mb-4">
              This action cannot be undone. All data associated with this user
              will be permanently removed.
            </p>

            {/* User Info Card */}
            {user && (
              <div
                className="bg-light p-3 rounded-3 mb-4 text-start"
                style={{ border: "1px solid #e9ecef" }}
              >
                <div className="d-flex align-items-center mb-2">
                  <User size={16} className="me-2 text-muted" />
                  <span className="fw-semibold">Username:</span>
                  <span className="ms-2">{user.username}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <User size={16} className="me-2 text-muted" />
                  <span className="fw-semibold">Full Name:</span>
                  <span className="ms-2">{user.fullname}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Mail size={16} className="me-2 text-muted" />
                  <span className="fw-semibold">Email:</span>
                  <span className="ms-2">{user.email}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Shield size={16} className="me-2 text-muted" />
                  <span className="fw-semibold">Role:</span>
                  <span className="ms-2">{user.role?.name || "N/A"}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <div
              className="d-flex justify-content-center mb-4"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#fff5f5",
                border: "3px solid #fee2e2",
                margin: "0 auto",
                alignItems: "center",
              }}
            >
              <AlertTriangle size={24} style={{ color: "#ef4444" }} />
            </div>

            <h6 className="text-center mb-3 fw-bold">
              Type the username to confirm deletion
            </h6>

            <p className="text-muted text-center mb-3">
              Please type{" "}
              <strong className="text-danger">"{user?.username}"</strong> to
              confirm
            </p>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={`Type "${user?.username}" here`}
                className={`text-center ${
                  isConfirmValid ? "border-success" : ""
                }`}
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "16px",
                  border: "2px solid #e9ecef",
                }}
                autoFocus
              />
            </Form.Group>

            {confirmText && !isConfirmValid && (
              <div className="text-center text-danger small mb-3">
                Username doesn't match. Please try again.
              </div>
            )}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <div className="d-flex justify-content-center gap-3 w-100">
          <Button
            variant="outline-secondary"
            onClick={step === 2 ? () => setStep(1) : onHide}
            disabled={loading}
            style={{
              borderRadius: "8px",
              padding: "10px 24px",
              fontWeight: "500",
              minWidth: "100px",
            }}
          >
            {step === 2 ? "Back" : "Cancel"}
          </Button>

          <Button
            variant="danger"
            onClick={handleConfirm}
            disabled={loading || (step === 2 && !isConfirmValid)}
            style={{
              borderRadius: "8px",
              padding: "10px 24px",
              fontWeight: "500",
              minWidth: "120px",
              background:
                step === 1 ? "#dc3545" : isConfirmValid ? "#dc3545" : "#6c757d",
              border: "none",
              opacity: step === 2 && !isConfirmValid ? 0.6 : 1,
            }}
          >
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Deleting...
              </>
            ) : (
              <>
                {step === 1 ? (
                  <>
                    <AlertTriangle size={16} className="me-2" />
                    Yes, Delete
                  </>
                ) : (
                  <>
                    <Trash2 size={16} className="me-2" />
                    Delete Forever
                  </>
                )}
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUser;
