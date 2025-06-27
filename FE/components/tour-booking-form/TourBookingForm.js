'use client';

// Import các hooks và thư viện cần thiết
import { useState, useEffect, FormEvent } from 'react'; // <-- Đã thêm FormEvent
import axios from 'axios';
import Link from 'next/link'; 
const PRICE_ADULT_18_MINUS = 28.50;
const PRICE_ADULT_18_PLUS = 50.40;

const TourBookingForm = ({ initialTourIdForCreation }) => {

    const [bookings, setBookings] = useState([]); // Danh sách tất cả booking
    const [selectedBookingId, setSelectedBookingId] = useState(null); // BookingId dang chinh sua
    const [loading, setLoading] = useState(false); // Trạng tháiload
    const [error, setError] = useState(null); // Trạng thái lỗi
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        selectedDate: '',
        adultTickets18Minus: 1,
        adultTickets18Plus: 0,
        tourId: initialTourIdForCreation || 0, 
    });
    const createFormTotalPrice = (createFormData.adultTickets18Minus * PRICE_ADULT_18_MINUS) + (createFormData.adultTickets18Plus * PRICE_ADULT_18_PLUS);
    const [createBookingResult, setCreateBookingResult] = useState(null);

    const [showEditForm, setShowEditForm] = useState(false);
    const [editBookingData, setEditBookingData] = useState(null); 
    const [editFormData, setEditFormData] = useState({});
    useEffect(() => {
        const fetchAllBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const baseUrl = apiUrl || 'http://localhost:8080';
                const response = await axios.get(`${baseUrl}/booking`);
                setBookings(response.data);
            } catch (err) {
                console.error("Error fetching all bookings:", err);
                setError(`Failed to load bookings: ${err.response?.data?.message || err.message || 'Unknown error'}`);

            } finally {
                setLoading(false);
            }
        };

        fetchAllBookings();
    }, []); 

    useEffect(() => {
        const fetchBookingDetails = async (id) => {
            setLoading(true);
            setError(null); 
            setEditBookingData(null); 
            setEditFormData({});
            setShowEditForm(false); 

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const baseUrl = apiUrl || 'http://localhost:8080';
                const response = await axios.get(`${baseUrl}/booking/${id}`);
                setEditBookingData(response.data);
                setEditFormData(response.data); 
            } catch (err) {
                console.error(`Error fetching booking details for ID ${id}:`, err);
                // Xử lý lỗi axios
                 if (err.response?.status === 404) {
                     setError(`Booking with ID ${id} not found.`);
                 } else {
                     setError(`Failed to load booking details: ${err.response?.data?.message || err.message || 'Unknown error'}`);
                 }
                 setSelectedBookingId(null); 
                 setEditBookingData(null); 
                 setEditFormData({}); 

            } finally {
                setLoading(false);
            }
        };

        if (selectedBookingId !== null) {
            fetchBookingDetails(selectedBookingId);
        } else {
            setEditBookingData(null);
            setEditFormData({});
            setShowEditForm(false);
        }

    }, [selectedBookingId]); 
    const handleCreateBooking = async (event) => {
        event.preventDefault();
        // Kiểm tra hợp lệ
        if (!createFormData.selectedDate) {
            setCreateBookingResult({ success: false, message: 'Please select a date.' });
            return;
        }
         if (createFormData.tourId === 0) {
              setCreateBookingResult({ success: false, message: 'Please enter Tour ID.' });
              return;
         }
        if (createFormData.adultTickets18Minus + createFormData.adultTickets18Plus <= 0) {
             setCreateBookingResult({ success: false, message: 'Please select at least one ticket.' });
             return;
        }
        setCreateBookingResult(null);
        setLoading(true); 
        const formData = new FormData();
        formData.append('booking_date', createFormData.selectedDate);
        formData.append('max_guest', (createFormData.adultTickets18Minus + createFormData.adultTickets18Plus).toString());
        formData.append('total_price', createFormTotalPrice.toString());
        formData.append('start_date', createFormData.selectedDate);
        formData.append('end_date', createFormData.selectedDate);
        formData.append('user_id', '1');
        formData.append('tour_id', createFormData.tourId.toString());
        formData.append('payment', 'Pending');

        console.log("Submitting create booking data:", Object.fromEntries(formData.entries())); 

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const baseUrl = apiUrl || 'http://localhost:8080';

            const response = await axios.post(`${baseUrl}/booking`, formData);
            const newBooking = response.data; 
            setCreateBookingResult({ success: true, message: 'Booking created successfully!' });
            setBookings(prev => [...prev, newBooking]);
            setCreateFormData({ selectedDate: '', adultTickets18Minus: 1, adultTickets18Plus: 0, tourId: initialTourIdForCreation || 0 });
            setShowCreateForm(false);
        } catch (err) {
            console.error("Error creating booking:", err);
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
            setCreateBookingResult({ success: false, message: `Failed to create booking: ${errorMessage}` });

        } finally {
            setLoading(false);
        }
    };
    const handleUpdateBooking = async (event) => {
        event.preventDefault();
        if (!editBookingData || typeof editBookingData.id === 'undefined') {
            console.error("No booking data available for update.");
            setEditBookingResult({ success: false, message: 'No booking selected for update.' });
            return;
        }
        if (!editFormData.booking_date || !editFormData.tour_id || editFormData.max_guest <= 0 || editFormData.total_price < 0) {
             setEditBookingResult({ success: false, message: 'Please fill in all required fields with valid data.' });
             return;
        }
        setEditBookingResult(null);
        setLoading(true);
        const formUpdateData = new FormData();
        Object.keys(editFormData).forEach(key => {
            const value = editFormData[key];
            if (value !== null && value !== undefined) {
                 if (key !== 'id') {
                      let stringValue = value.toString();
                     formUpdateData.append(key, stringValue);
                 }
            }
        });

        console.log(`Submitting update data for booking ID ${editBookingData.id}:`, Object.fromEntries(formUpdateData.entries())); // Log để debug

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const baseUrl = apiUrl || 'http://localhost:8080';
            const response = await axios.put(`${baseUrl}/booking/${editBookingData.id}`, formUpdateData);
            const updatedBooking = response.data;
            setEditBookingResult({ success: true, message: 'Booking updated successfully!' });
             setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
            setEditBookingData(null);
            setEditFormData({});
            setSelectedBookingId(null);
            setShowEditForm(false);

        } catch (err) {
            console.error("Error updating booking:", err);
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
            setEditBookingResult({ success: false, message: `Failed to update booking: ${errorMessage}` });

        } finally {
            setLoading(false);
        }
    };
    const handleDeleteBooking = async (id) => {
        if (window.confirm(`Are you sure you want to delete booking ${id}?`)) {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const baseUrl = apiUrl || 'http://localhost:8080';

                console.log(`Deleting booking with ID: ${id} from ${baseUrl}/booking/${id}`); 
                const response = await axios.delete(`${baseUrl}/booking/${id}`);
                if (response.status === 204) {
                    console.log(`Booking ${id} deleted successfully.`);
                    setBookings(prev => prev.filter(b => b.id !== id));
                    if (selectedBookingId === id) {
                        setSelectedBookingId(null);
                        setEditBookingData(null);
                        setEditFormData({});
                        setShowEditForm(false);
                    }
                } else {
                    console.log(`Delete request for booking ${id} returned status ${response.status}. Assuming success.`);
                     setBookings(prev => prev.filter(b => b.id !== id));
                     if (selectedBookingId === id) {
                         setSelectedBookingId(null);
                         setEditBookingData(null);
                         setEditFormData({});
                         setShowEditForm(false);
                     }
                }


            } catch (err) {
                console.error(`Error deleting booking ${id}:`, err);
                const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
                 if (err.response?.status === 404) {
                     setError(`Booking with ID ${id} not found.`);
                 } else {
                    setError(`Failed to delete booking: ${errorMessage}`);
                 }
            } finally {
                setLoading(false);
            }
        }
    };
    const handleSelectBooking = (id) => {
        if (selectedBookingId === id) {
            setSelectedBookingId(null);
            setEditBookingData(null);
            setEditFormData({});
            setShowEditForm(false);
        } else {
            setSelectedBookingId(id);
            setShowCreateForm(false);
        }
    };
    const handleShowEditForm = () => {
        if (editBookingData) {
            setShowEditForm(true); 
             setEditBookingResult(null); // 
        } else {
            console.warn("No booking data available to show edit form.");
             setEditBookingResult({ success: false, message: "Cannot open edit form: Booking data not loaded." });
        }
    };
    const handleEditFormChange = (event) => {
         const { name, value } = event.target;
         let processedValue = value;
         if (name === 'max_guest' || name === 'user_id' || name === 'tour_id') {
             processedValue = parseInt(value, 10) || 0; 
         } else if (name === 'total_price') {
              processedValue = parseFloat(value) || 0.00;
         }
         setEditFormData(prev => ({ ...prev, [name]: processedValue }));
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Booking Management</h1>

            {/* Hiển thị trạng thái Loading hoặc Lỗi chung */}
            {/* Hiển thị loading chỉ khi đang fetch dữ liệu (không phải khi submit form) */}
            {loading && !showCreateForm && !showEditForm && selectedBookingId === null && (
                 <p className="text-center text-blue-600">Loading all bookings...</p>
             )}
             {loading && selectedBookingId !== null && !showEditForm && (
                  <p className="text-center text-blue-600">Loading booking details...</p>
              )}
             {/* Hiển thị loading khi submit form tạo/cập nhật/xóa */}
             {loading && (showCreateForm || showEditForm) && (
                  <p className="text-center text-blue-600">Processing...</p>
             )}

            {/* Hiển thị lỗi chung */}
            {error && <div className="alert alert-danger text-red-600 mb-4">Error: {error}</div>}

            {/* Nút mở form tạo booking */}
            {/* Chỉ hiển thị nút tạo nếu không đang xem chi tiết/chỉnh sửa */}
            {selectedBookingId === null && !loading && (
                 <div className="mb-6 text-center">
                      <button
                          className="theme-btn style-two"
                          onClick={() => {
                              setShowCreateForm(!showCreateForm); 
                              setSelectedBookingId(null);
                              setShowEditForm(false);
                               setError(null); // Reset lỗi chung khi mở form tạo
                          }}
                      >
                          {showCreateForm ? 'Cancel Create Booking' : 'Create New Booking'}
                      </button>
                 </div>
            )}


            {/* Form Tạo Booking (Hiển thị khi showCreateForm là true) */}
            {showCreateForm && (
                 <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto">
                     <h2 className="text-xl font-semibold mb-4">Create New Booking</h2>
                      {/* Hiển thị kết quả/lỗi riêng cho form tạo */}
                      {createBookingResult && (
                         <div className={`alert ${createBookingResult.success ? 'alert-success text-green-600' : 'alert-danger text-red-600'} mb-4`}>
                             {createBookingResult.message}
                         </div>
                     )}
                     <form onSubmit={handleCreateBooking}>
                         {/* Input Ngày */}
                         <div className="mb-4">
                             <label htmlFor="create_date" className="block text-sm font-medium text-gray-700">From Date</label>
                             <input
                                 type="date"
                                 id="create_date"
                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                 value={createFormData.selectedDate}
                                 onChange={(e) => setCreateFormData({...createFormData, selectedDate: e.target.value})}
                                 required
                                 disabled={loading} 
                             />
                         </div>

                         {/* Inputs Số lượng vé (tương tự form gốc) */}
                         <div className="mb-4">
                              <h6 className="font-medium text-gray-700">Tickets:</h6>
                               <div className="flex items-center mb-2">
                                 <span>Adult (&lt;18 years) (${PRICE_ADULT_18_MINUS.toFixed(2)})</span>
                                   <select
                                       className="ml-auto border rounded p-1"
                                       value={createFormData.adultTickets18Minus}
                                       onChange={(e) => setCreateFormData({...createFormData, adultTickets18Minus: parseInt(e.target.value, 10) || 0})} // Parse số
                                       disabled={loading}
                                   >
                                       {[...Array(10).keys()].map(i => (<option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>))}
                                   </select>
                               </div>
                                <div className="flex items-center">
                                   <span>Adult (18+ years) (${PRICE_ADULT_18_PLUS.toFixed(2)})</span>
                                   <select
                                       className="ml-auto border rounded p-1"
                                       value={createFormData.adultTickets18Plus}
                                       onChange={(e) => setCreateFormData({...createFormData, adultTickets18Plus: parseInt(e.target.value, 10) || 0})} // Parse số
                                       disabled={loading}
                                   >
                                       {[...Array(10).keys()].map(i => (<option key={i} value={i}>{String(i).padStart(2, '0')}</option>))}
                                   </select>
                               </div>
                         </div>

                          {/* Input Tour ID (Nếu cần nhập Tour ID thủ công) */}
                          <div className="mb-4">
                              <label htmlFor="create_tour_id" className="block text-sm font-medium text-gray-700">Tour ID</label>
                                <input
                                    type="number"
                                    id="create_tour_id"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={createFormData.tourId}
                                    onChange={(e) => setCreateFormData({...createFormData, tourId: parseInt(e.target.value, 10) || 0})} // Parse số
                                    required
                                    min="1"
                                     disabled={loading}
                                 />
                          </div>


                         {/* Tổng tiền (chỉ hiển thị) */}
                         <div className="mb-4">
                              <h6 className="font-medium text-gray-700">Total: <span className="price">${createFormTotalPrice.toFixed(2)}</span></h6>
                         </div>

                         {/* Nút Submit Form Tạo */}
                         <button
                             type="submit"
                             className="theme-btn style-two w-full"
                             disabled={loading} // Disable khi đang loading
                         >
                             {loading ? 'Creating...' : 'Create Booking'}
                         </button>
                     </form>
                 </div>
            )}


            {/* Chi tiết Booking hoặc Form Cập Nhật (Hiển thị khi selectedBookingId có giá trị, không loading, không lỗi) */}
            {selectedBookingId !== null && !loading && !error && (
                <div className="mb-6 bg-blue-50 p-6 rounded-lg shadow-md max-w-md mx-auto">
                    {/* Nếu đang xem chi tiết (chưa bật form edit) */}
                    {!showEditForm && editBookingData && (
                         <div>
                            <h2 className="text-xl font-semibold mb-4">Details for Booking ID: {editBookingData.id}</h2>
                            <p className="mb-2"><strong>Booking Date:</strong> {editBookingData.booking_date ? new Date(editBookingData.booking_date).toLocaleDateString() : 'N/A'}</p>
                            <p className="mb-2"><strong>Max Guests:</strong> {editBookingData.max_guest}</p>
                            <p className="mb-2"><strong>Total Price:</strong> ${editBookingData.total_price ? editBookingData.total_price.toFixed(2) : 'N/A'}</p>
                            <p className="mb-2"><strong>Period:</strong> {editBookingData.start_date ? new Date(editBookingData.start_date).toLocaleDateString() : 'N/A'} - {editBookingData.end_date ? new Date(editBookingData.end_date).toLocaleDateString() : 'N/A'}</p>
                            <p className="mb-2"><strong>User ID:</strong> {editBookingData.user_id}</p>
                            <p className="mb-2"><strong>Tour ID:</strong> {editBookingData.tour_id}</p>
                            <p className="mb-4"><strong>Payment Status:</strong> {editBookingData.payment || 'N/A'}</p>

                            {/* Nút mở Form Cập Nhật */}
                             <button
                                 className="theme-btn style-two mr-2"
                                 onClick={handleShowEditForm} 
                                  disabled={loading} 
                             >
                                 Edit This Booking
                             </button>
                             {/* Nút Xóa Booking */}
                            <button
                                className="theme-btn style-three"
                                onClick={() => handleDeleteBooking(editBookingData.id)} // Gọi hàm xóa
                                disabled={loading} // Disable khi đang loading
                            >
                                Delete This Booking
                            </button>
                         </div>
                    )}

                    {/* Nếu đang bật Form Cập Nhật */}
                     {showEditForm && editBookingData && (
                         <div>
                             <h2 className="text-xl font-semibold mb-4">Edit Booking ID: {editBookingData.id}</h2>
                              {/* Hiển thị kết quả/lỗi riêng cho form cập nhật */}
                              {editBookingResult && (
                                 <div className={`alert ${editBookingResult.success ? 'alert-success text-green-600' : 'alert-danger text-red-600'} mb-4`}>
                                     {editBookingResult.message}
                                 </div>
                             )}
                             <form onSubmit={handleUpdateBooking}>
                                  {/* Input Ngày */}
                                 <div className="mb-4">
                                     <label htmlFor="edit_date" className="block text-sm font-medium text-gray-700">Booking Date</label>
                                     <input
                                         type="date"
                                         id="edit_date"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                         name="booking_date" // Tên khớp với thuộc tính DTO
                                         value={editFormData.booking_date || ''}
                                         onChange={handleEditFormChange} // Sử dụng hàm xử lý chung
                                         required
                                          disabled={loading}
                                     />
                                 </div>
                                 {/* Input Max Guests */}
                                 <div className="mb-4">
                                     <label htmlFor="edit_max_guest" className="block text-sm font-medium text-gray-700">Max Guests</label>
                                     <input
                                         type="number"
                                         id="edit_max_guest"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                         name="max_guest" // Tên khớp với thuộc tính DTO
                                         value={editFormData.max_guest || 0} // Dùng || 0
                                         onChange={handleEditFormChange} // Sử dụng hàm xử lý chung
                                         required
                                          min="1"
                                           disabled={loading}
                                     />
                                 </div>
                                  {/* Input Total Price (Có thể chỉ hiển thị hoặc cho sửa nếu logic cho phép) */}
                                   <div className="mb-4">
                                     <label htmlFor="edit_total_price" className="block text-sm font-medium text-gray-700">Total Price</label>
                                     <input
                                         type="number"
                                         id="edit_total_price"
                                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                         name="total_price" // Tên khớp với thuộc tính DTO
                                         value={editFormData.total_price || 0}
                                         onChange={handleEditFormChange} // Sử dụng hàm xử lý chung
                                         required
                                         step="0.01"
                                          min="0"
                                           disabled={loading}
                                     />
                                 </div>
                                 {/* Input Start Date, End Date, User ID, Tour ID, Payment */}
                                 {/* Sử dụng handleEditFormChange cho tất cả các input */}
                                  <div className="mb-4">
                                     <label htmlFor="edit_start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                      <input type="date" id="edit_start_date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="start_date" value={editFormData.start_date || ''} onChange={handleEditFormChange} required disabled={loading}/>
                                  </div>
                                   <div className="mb-4">
                                     <label htmlFor="edit_end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                                      <input type="date" id="edit_end_date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="end_date" value={editFormData.end_date || ''} onChange={handleEditFormChange} required disabled={loading}/>
                                  </div>
                                   <div className="mb-4">
                                     <label htmlFor="edit_user_id" className="block text-sm font-medium text-gray-700">User ID</label>
                                      <input type="number" id="edit_user_id" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="user_id" value={editFormData.user_id || 0} onChange={handleEditFormChange} required min="1" disabled={loading}/>
                                  </div>
                                   <div className="mb-4">
                                     <label htmlFor="edit_tour_id" className="block text-sm font-medium text-gray-700">Tour ID</label>
                                      <input type="number" id="edit_tour_id" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="tour_id" value={editFormData.tour_id || 0} onChange={handleEditFormChange} required min="1" disabled={loading}/>
                                  </div>
                                   <div className="mb-4">
                                     <label htmlFor="edit_payment" className="block text-sm font-medium text-gray-700">Payment Status</label>
                                      <input type="text" id="edit_payment" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="payment" value={editFormData.payment || ''} onChange={handleEditFormChange} disabled={loading}/>
                                  </div>


                                 {/* Nút Submit Form Cập Nhật */}
                                 <div className="flex justify-end space-x-2">
                                      <button
                                          type="button"
                                          className="theme-btn style-four" // Nút Cancel
                                          onClick={() => setShowEditForm(false)} // Đóng form edit
                                          disabled={loading}
                                      >
                                          Cancel
                                      </button>
                                     <button
                                         type="submit"
                                         className="theme-btn style-two"
                                         disabled={loading} // Disable khi loading
                                     >
                                         {loading ? 'Saving...' : 'Save Changes'}
                                     </button>
                                 </div>
                             </form>
                         </div>
                     )}

                </div>
            )}


            {/* Hiển thị Danh sách tất cả Booking (Nếu không đang xem/chỉnh sửa chi tiết và không loading, không lỗi, không hiện form tạo) */}
             {selectedBookingId === null && !loading && !error && !showCreateForm && (
                  <div className="overflow-x-auto">
                       {/* Hiển thị thông báo nếu danh sách rỗng */}
                       {bookings.length === 0 ? (
                            <p className="text-center text-gray-600">No bookings found.</p>
                        ) : (
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Booking Date</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Guests</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Total Price</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Tour ID</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Payment</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Lặp qua danh sách bookings */}
                                    {/* *** FIX LỖI bookings.map is not a function *** */}
                                    {Array.isArray(bookings) && bookings.map(booking => ( // <-- Đã thêm kiểm tra
                                        <tr key={booking.id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-700">{booking.id}</td>
                                            {/* Sử dụng Optional Chaining (?) và kiểm tra null/undefined trước khi format */}
                                            <td className="py-3 px-4 text-sm text-gray-700">{booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : 'N/A'}</td>
                                            <td className="py-3 px-4 text-sm text-gray-700">{booking.max_guest}</td>
                                            <td className="py-3 px-4 text-sm text-gray-700">${booking.total_price ? booking.total_price.toFixed(2) : 'N/A'}</td>
                                            <td className="py-3 px-4 text-sm text-gray-700">{booking.tour_id}</td>
                                            <td className="py-3 px-4 text-sm text-gray-700">{booking.payment || 'N/A'}</td>
                                            <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap"> {/* Thêm whitespace-nowrap để giữ các nút trên 1 dòng */}
                                                {/* Nút View (để hiển thị chi tiết/edit form) */}
                                                <button
                                                     className="text-blue-600 hover:underline mr-2"
                                                     onClick={() => handleSelectBooking(booking.id)} // Gọi hàm chọn booking
                                                     disabled={loading} // Disable khi loading
                                                 >
                                                     View
                                                 </button>
                                                {/* Nút Delete */}
                                                 <button
                                                     className="text-red-600 hover:underline"
                                                      onClick={() => handleDeleteBooking(booking.id)} // Gọi hàm xóa
                                                      disabled={loading} // Disable khi loading
                                                 >
                                                     Delete
                                                 </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         )}
                    </div>
             )}

             {/* Nút trở về danh sách khi đang xem/chỉnh sửa chi tiết (hiển thị cùng chi tiết/form edit) */}
              {selectedBookingId !== null && !loading && !error && (
                  <div className="text-center mt-6">
                      <button
                          className="inline-block text-gray-600 hover:underline"
                          onClick={() => handleSelectBooking(selectedBookingId)} // Click lại nút View để bỏ chọn
                          disabled={loading} // Disable khi loading
                      >
                          ← Back to Booking List
                      </button>
                  </div>
              )}


        </div>
    );
};
export default TourBookingForm; 