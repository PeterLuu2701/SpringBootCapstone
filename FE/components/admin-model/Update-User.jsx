"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
import axios from "axios";
import { User, Mail, Phone, Shield, Edit3 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const UpdateUser = ({ show, onHide, user, setUsers }) => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    fullname: "",
    email: "",
    phone: "",
    roleId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        username: user.username || "",
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        roleId: user.role?.id || "",
      });
      setError(null);
      setSuccess(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      id: formData.id,
      username: formData.username,
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      role_id: {
        id: formData.roleId,
      },
    };

    try {
      const res = await axios.put(`${API_URL}/users`, payload);
      console.log("PUT response:", res.data);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? res.data.data : u))
      );

      setSuccess(true);
      setTimeout(() => {
        onHide();
        setSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("PUT error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const inputGroupStyle = {
    position: "relative",
    marginBottom: "1.5rem",
  };

  const iconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    color: "#6c757d",
  };

  const inputStyle = {
    paddingLeft: "40px",
    borderRadius: "8px",
    border: "2px solid #e9ecef",
    transition: "all 0.3s ease",
    fontSize: "14px",
    height: "45px",
  };

  const focusStyle = {
    borderColor: "#0d6efd",
    boxShadow: "0 0 0 0.2rem rgba(13, 110, 253, 0.25)",
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
      className="modern-modal"
    >
      <Modal.Header
        closeButton
        className="border-0 pb-0"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <Modal.Title className="d-flex align-items-center">
          <Edit3 size={24} className="me-2" />
          Update User Profile
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
        {error && (
          <Alert
            variant="danger"
            className="border-0 shadow-sm mb-4"
            style={{ borderRadius: "8px" }}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          </Alert>
        )}

        {success && (
          <Alert
            variant="success"
            className="border-0 shadow-sm mb-4"
            style={{ borderRadius: "8px" }}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-check-circle-fill me-2"></i>
              User updated successfully!
            </div>
          </Alert>
        )}

        <div
          className="bg-white p-4 shadow-sm"
          style={{ borderRadius: "12px", border: "1px solid #e9ecef" }}
        >
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <div style={inputGroupStyle}>
                  <Form.Label className="fw-semibold text-muted mb-2">
                    Username
                  </Form.Label>
                  <div className="position-relative">
                    <User size={18} style={iconStyle} />
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e9ecef";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Enter username"
                    />
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div style={inputGroupStyle}>
                  <Form.Label className="fw-semibold text-muted mb-2">
                    Full Name
                  </Form.Label>
                  <div className="position-relative">
                    <User size={18} style={iconStyle} />
                    <Form.Control
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e9ecef";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Enter full name"
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div style={inputGroupStyle}>
                  <Form.Label className="fw-semibold text-muted mb-2">
                    Email Address
                  </Form.Label>
                  <div className="position-relative">
                    <Mail size={18} style={iconStyle} />
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e9ecef";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div style={inputGroupStyle}>
                  <Form.Label className="fw-semibold text-muted mb-2">
                    Phone Number
                  </Form.Label>
                  <div className="position-relative">
                    <Phone size={18} style={iconStyle} />
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e9ecef";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <div style={inputGroupStyle}>
              <Form.Label className="fw-semibold text-muted mb-2">
                Role ID
              </Form.Label>
              <div className="position-relative">
                <Shield size={18} style={iconStyle} />
                <Form.Control
                  type="text"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter role ID"
                />
              </div>
            </div>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer
        className="border-0 pt-0 pb-4 px-4"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="d-flex justify-content-end gap-3 w-100">
          <Button
            variant="outline-secondary"
            onClick={onHide}
            disabled={loading}
            style={{
              borderRadius: "8px",
              padding: "10px 24px",
              fontWeight: "500",
              border: "2px solid #6c757d",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#6c757d";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#6c757d";
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            onClick={handleSubmit}
            style={{
              borderRadius: "8px",
              padding: "10px 24px",
              fontWeight: "500",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Updating...
              </>
            ) : (
              <>
                <Edit3 size={16} className="me-2" />
                Update User
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUser;
