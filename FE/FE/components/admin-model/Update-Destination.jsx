import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateDestination = ({
  openUpdate,
  setOpenUpdate,
  infoUpdate,
  setDestinations,
}) => {
  const [infoUpdateApi, setInfoUpdateApi] = useState(infoUpdate);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInfoUpdateApi((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    setInfoUpdateApi(infoUpdate); // Cập nhật state khi infoUpdate thay đổi
  }, [infoUpdate]);

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8080/destination", infoUpdateApi);
      setOpenUpdate(false);
      // Gọi hàm làm mới dữ liệu từ component cha
      if (typeof setDestinations === "function") {
        setDestinations(); // Gọi hàm refreshDestinations từ DestinationDashboard
      }
    } catch (error) {
      console.error("Error updating data:", error);
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
            <h5 className="modal-title">Update Destination</h5>
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
                <label className="font-medium">Name Destination</label>
                <input
                  type="text"
                  placeholder="Enter Destination"
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={infoUpdateApi.name || ""}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Description Destination</label>
                <textarea
                  placeholder="Enter Description"
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  value={infoUpdateApi.description || ""}
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
                  value={infoUpdateApi.country || ""}
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
                  value={infoUpdateApi.city || ""}
                  name="city"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Image</label>
                <input
                  type="text"
                  placeholder="Enter Image URL"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={infoUpdateApi.image || ""}
                  name="image"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Popular</label>
                <br />
                <input
                  type="checkbox"
                  name="popular"
                  checked={infoUpdateApi.popular || false}
                  onChange={handleChange}
                  className="custom-checkbox border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                />{" "}
                <span>{infoUpdateApi.popular ? "true" : "false"}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <label className="font-medium">Duration</label>
                <input
                  type="text"
                  placeholder="Enter Duration"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                  value={infoUpdateApi.duration || ""}
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

export default UpdateDestination;
