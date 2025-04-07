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
      [name]: type === "checkbox" ? checked : value, // Kiểm tra nếu là checkbox thì dùng checked, còn lại dùng value
    }));
  };
  useEffect(() => {
    setInfoUpdateApi((prev) => ({ ...prev, id: infoUpdate.id }));
  }, [infoUpdate]);
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/destination",
        infoUpdateApi
      );

      setDestinations((prev) =>
        prev.map((item) => (item.id === infoUpdateApi.id ? res.data : item))
      );

      setOpenUpdate(false);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div
      className={"modal fade" + (openUpdate ? "show d-block" : "d-none")}
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

        zIndex: 1050, // Đảm bảo modal nằm trên cùng
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Destination</h5>
            <button
              type="button"
              className="close"
              style={{
                width: "40px",
              }}
              onClick={() => setOpenUpdate(false)}
            >
              <span>&times;</span>
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
                  value={infoUpdateApi.name}
                  name="name"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Description Destination</label>
                <textarea
                  type="text"
                  placeholder="Enter Description"
                  value={infoUpdateApi.description}
                  className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                  name="description"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Country</label>
                <input
                  type="text"
                  placeholder="Enter Country"
                  style={{ paddingLeft: "10px" }}
                  value={infoUpdateApi.country}
                  className="border rounded p-1  focus:outline-none focus:ring focus:border-blue-300"
                  name="country"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">City</label>

                <input
                  type="text"
                  placeholder="Enter City"
                  style={{ paddingLeft: "10px" }}
                  value={infoUpdateApi.city}
                  name="city"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="border rounded p-1  focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Image</label>
                <input
                  type="file"
                  style={{ paddingLeft: "10px" }}
                  className="border rounded p-1  focus:outline-none focus:ring focus:border-blue-300"
                  name="image_url"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Popular</label>
                <br />
                <input
                  type="checkbox"
                  name="popular"
                  checked={infoUpdateApi.popular}
                  onChange={handleChange}
                  className="custom-checkbox border rounded p-1 focus:outline-none focus:ring focus:border-blue-300"
                />{" "}
                <span>{infoUpdateApi.popular ? "true" : "false"}</span>
              </div>

              <div className="flex flex-col col-span-2">
                {" "}
                {/* Full width */}
                <label className="font-medium">Duration</label>
                <input
                  type="text"
                  placeholder="Enter Duration"
                  style={{ paddingLeft: "10px" }}
                  value={infoUpdateApi.duration}
                  className="border rounded p-1  focus:outline-none focus:ring focus:border-blue-300"
                  name="duration"
                  onChange={(e) => {
                    handleChange(e);
                  }}
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
              onClick={() => {
                handleUpdate();
              }}
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
