import axios from "axios";
import React from "react";

const DeleteDestination = ({
  openDelete,
  setOpenDelete,
  name,
  id,
  setDestinations,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/destination/${id}`);

      // Cập nhật danh sách ngay sau khi xóa
      setDestinations((prev) => prev.filter((item) => item.id !== id));

      // Đóng modal
      setOpenDelete(false);
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };
  return (
    <div
      className={"modal fade" + (openDelete ? "show d-block" : "d-none")}
      tabIndex="-1"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: openDelete ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 1050, // Đảm bảo modal nằm trên cùng
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Destination</h5>
            <button
              type="button"
              className="close"
              style={{
                width: "40px",
              }}
              onClick={() => setOpenDelete(false)}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body p-6 bg-white rounded shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <span>
                Bạn chắc chắn muốn xóa Destination với name là : {name}
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setOpenDelete(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDestination;
