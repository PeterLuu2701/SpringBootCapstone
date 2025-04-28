import axios from "axios";
import React, { useState } from "react";

const AddDestination = ({ openAdd, setOpenAdd, setDestinations }) => {
  const [infoAdd, setInfoAdd] = useState({
    name: "",
    description: "",
    country: "",
    city: "",
    image_url: "",
    popular: true, // Mặc định là true nếu checkbox được chọn
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInfoAdd((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Kiểm tra nếu là checkbox thì dùng checked, còn lại dùng value
    }));
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:8080/destination", infoAdd);
      setOpenAdd(false);
      // Gọi hàm làm mới dữ liệu từ component cha
      if (typeof setDestinations === "function") {
        setDestinations(); // Gọi hàm refreshDestinations từ DestinationDashboard
      }
    } catch (error) {
      console.error("Error adding data:", error);
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
        zIndex: 1050, // Đảm bảo modal nằm trên cùng
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Destination</h5>
            <button
              type="button"
              className="close"
              style={{
                width: "40px",
              }}
              onClick={() => setOpenAdd(false)}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body p-6 bg-white rounded shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Name Destination</label>
                <input
                  type="text"
                  placeholder="Enter Destination"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Description Destination</label>
                <textarea
                  placeholder="Enter Description"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Country</label>
                <input
                  type="text"
                  placeholder="Enter Country"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="country"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">City</label>
                <input
                  type="text"
                  placeholder="Enter City"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="city"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Image</label>
                <input
                  type="text"
                  placeholder="Enter Image"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="image_url"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Popular</label>
                <br />
                <input
                  type="checkbox"
                  name="popular"
                  checked={infoAdd.popular}
                  onChange={handleChange}
                  className="custom-checkbox border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                />{" "}
                <span>{infoAdd.popular ? "true" : "false"}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <label className="font-medium">Duration</label>
                <input
                  type="text"
                  placeholder="Enter Duration"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  name="duration"
                  onChange={handleChange}
                />
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
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDestination;
