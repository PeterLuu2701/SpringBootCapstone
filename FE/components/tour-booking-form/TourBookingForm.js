'use client';

// Import các hooks và thư viện cần thiết
import { useState, useEffect, FormEvent } from 'react'; // <-- Đã thêm FormEvent
import axios from 'axios';
import Link from 'next/link'; // Link không cần thiết lắm trong file này nếu không navigate thực sự, nhưng giữ lại

// Giả sử giá vé cho form tạo booking là cố định
const PRICE_ADULT_18_MINUS = 28.50;
const PRICE_ADULT_18_PLUS = 50.40;

// Không có định nghĩa props interface nếu không dùng initialTourIdForCreation
// Nếu bạn vẫn muốn dùng initialTourIdForCreation, giữ lại interface hoặc bỏ nó tùy ý
// Ví dụ giữ lại props nhưng không dùng interface
const TourBookingForm = ({ initialTourIdForCreation }) => {
// const BookingManagementPage = () => { // Nếu không dùng bất kỳ props nào
    // --- State để quản lý dữ liệu và giao diện ---
    const [bookings, setBookings] = useState([]); // Danh sách tất cả booking
    const [selectedBookingId, setSelectedBookingId] = useState(null); // ID của booking đang xem/chỉnh sửa
    const [loading, setLoading] = useState(false); // Trạng thái chung: loading
    const [error, setError] = useState(null); // Trạng thái chung: lỗi

    // State cho Form Tạo Booking
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createFormData, setCreateFormData] = useState({
        selectedDate: '',
        adultTickets18Minus: 1,
        adultTickets18Plus: 0,
        tourId: initialTourIdForCreation || 0, // Sử dụng prop hoặc mặc định 0
    });
    const createFormTotalPrice = (createFormData.adultTickets18Minus * PRICE_ADULT_18_MINUS) + (createFormData.adultTickets18Plus * PRICE_ADULT_18_PLUS);
    const [createBookingResult, setCreateBookingResult] = useState(null);


    // State cho Form Cập Nhật Booking
    const [showEditForm, setShowEditForm] = useState(false);
    const [editBookingData, setEditBookingData] = useState(null); // Dữ liệu booking đang được fetch để chỉnh sửa
    // State cho dữ liệu trong form edit (dữ liệu người dùng nhập)
    const [editFormData, setEditFormData] = useState({});


    // --- Effects để fetch dữ liệu khi component mount hoặc state thay đổi ---

    // Effect để fetch TẤT CẢ Booking khi component mount
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
                // Xử lý lỗi axios (không có kiểm tra isAxiosError nữa, giả định response có data/message)
                setError(`Failed to load bookings: ${err.response?.data?.message || err.message || 'Unknown error'}`);

            } finally {
                setLoading(false);
            }
        };

        fetchAllBookings();
    }, []); // Dependency array rỗng: chạy 1 lần khi mount


    // Effect để fetch CHI TIẾT Booking khi selectedBookingId thay đổi (để xem/chỉnh sửa)
    useEffect(() => {
        const fetchBookingDetails = async (id) => {
            setLoading(true);
            setError(null); // Reset lỗi trước đó
            setEditBookingData(null); // Reset dữ liệu booking đang chỉnh sửa
            setEditFormData({}); // Reset form data edit
            setShowEditForm(false); // Đóng form edit khi fetch chi tiết

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const baseUrl = apiUrl || 'http://localhost:8080';
                const response = await axios.get(`${baseUrl}/booking/${id}`);
                setEditBookingData(response.data); // Lưu dữ liệu booking để hiển thị
                // Khi fetch xong chi tiết, điền dữ liệu vào form edit
                setEditFormData(response.data); // Sao chép dữ liệu nhận được vào state form edit
            } catch (err) {
                console.error(`Error fetching booking details for ID ${id}:`, err);
                // Xử lý lỗi axios
                 if (err.response?.status === 404) {
                     setError(`Booking with ID ${id} not found.`);
                 } else {
                     setError(`Failed to load booking details: ${err.response?.data?.message || err.message || 'Unknown error'}`);
                 }
                 setSelectedBookingId(null); // Reset selected ID nếu có lỗi fetch
                 setEditBookingData(null); // Đảm bảo dữ liệu chi tiết bị xóa
                 setEditFormData({}); // Đảm bảo form edit rỗng

            } finally {
                setLoading(false);
            }
        };

        if (selectedBookingId !== null) {
            fetchBookingDetails(selectedBookingId);
        } else {
            // Reset khi không có booking nào được chọn (ví dụ: click nút Back to list)
            setEditBookingData(null);
            setEditFormData({});
            setShowEditForm(false); // Đảm bảo form edit tắt
        }

    }, [selectedBookingId]); // Dependency: chạy khi selectedBookingId thay đổi


    // --- Hàm xử lý các hành động (Create, Update, Delete, Select) ---

    // Hàm xử lý submit Form Tạo Booking (POST /booking)
    const handleCreateBooking = async (event) => {
        event.preventDefault();

        // Kiểm tra tính hợp lệ cơ bản
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


        setCreateBookingResult(null); // Reset kết quả trước đó
        setLoading(true); // Bắt đầu trạng thái loading

        // Chuẩn bị FormData cho backend @ModelAttribute
        const formData = new FormData();
        // Các tên key phải KHỚP với tên thuộc tính trong BookingDTO trên backend
        // Giá trị phải là string cho FormData
        formData.append('booking_date', createFormData.selectedDate);
        formData.append('max_guest', (createFormData.adultTickets18Minus + createFormData.adultTickets18Plus).toString());
        formData.append('total_price', createFormTotalPrice.toString());
        formData.append('start_date', createFormData.selectedDate); // Giả định end_date = start_date
        formData.append('end_date', createFormData.selectedDate); // Giả định end_date = start_date
        formData.append('user_id', '1'); // Placeholder User ID (cần thay thế bằng ID người dùng thực tế)
        formData.append('tour_id', createFormData.tourId.toString()); // Sử dụng tourId từ state
        formData.append('payment', 'Pending'); // Trạng thái ban đầu

        console.log("Submitting create booking data:", Object.fromEntries(formData.entries())); // Log để debug

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const baseUrl = apiUrl || 'http://localhost:8080';

            const response = await axios.post(`${baseUrl}/booking`, formData);
            const newBooking = response.data; // Dữ liệu nhận được từ BE (dạng JSON)

            setCreateBookingResult({ success: true, message: 'Booking created successfully!' });
            // Thêm booking mới vào danh sách hiện tại (frontend update)
            // Tạo một bản sao mới của mảng bookings để đảm bảo React nhận ra sự thay đổi
            setBookings(prev => [...prev, newBooking]);
            // Reset form tạo về giá trị ban đầu
            setCreateFormData({ selectedDate: '', adultTickets18Minus: 1, adultTickets18Plus: 0, tourId: initialTourIdForCreation || 0 });
            setShowCreateForm(false); // Đóng form sau khi tạo thành công

        } catch (err) {
            console.error("Error creating booking:", err);
            // Xử lý lỗi axios (không có kiểm tra isAxiosError nữa, giả định response có data/message)
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
            setCreateBookingResult({ success: false, message: `Failed to create booking: ${errorMessage}` });

        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    // Hàm xử lý submit Form Cập Nhật Booking (PUT /booking/{id})
    const handleUpdateBooking = async (event) => {
        event.preventDefault(); // Ngăn chặn hành vi submit mặc định

        // Đảm bảo có dữ liệu booking đang được chỉnh sửa và có ID
        if (!editBookingData || typeof editBookingData.id === 'undefined') {
            console.error("No booking data available for update.");
            setEditBookingResult({ success: false, message: 'No booking selected for update.' });
            return;
        }
         // Kiểm tra tính hợp lệ cơ bản của dữ liệu form edit
        if (!editFormData.booking_date || !editFormData.tour_id || editFormData.max_guest <= 0 || editFormData.total_price < 0) {
             setEditBookingResult({ success: false, message: 'Please fill in all required fields with valid data.' });
             return;
        }


        setEditBookingResult(null); // Reset kết quả trước đó
        setLoading(true); // Bắt đầu trạng thái loading

        // Chuẩn bị FormData cho backend @ModelAttribute
        const formUpdateData = new FormData();
        // Lặp qua các trường trong editFormData và append vào FormData
        Object.keys(editFormData).forEach(key => {
            const value = editFormData[key];
            // Kiểm tra null/undefined trước khi append. Chuyển đổi sang string.
            if (value !== null && value !== undefined) {
                 // Cần cẩn thận với key 'id' - không nên cập nhật ID qua form
                 if (key !== 'id') {
                      // Xử lý chuyển đổi kiểu dữ liệu tùy theo key nếu cần
                      let stringValue = value.toString();
                       // Ví dụ: nếu key là 'max_guest' hoặc 'tour_id', đảm bảo giá trị là số nguyên trước khi toString
                       // if (key === 'max_guest' || key === 'tour_id' || key === 'user_id') {
                       //     stringValue = parseInt(value, 10).toString();
                       // } else if (key === 'total_price') {
                       //      stringValue = parseFloat(value).toFixed(2).toString(); // Format tiền tệ
                       // }

                     formUpdateData.append(key, stringValue);
                 }
            }
        });

        console.log(`Submitting update data for booking ID ${editBookingData.id}:`, Object.fromEntries(formUpdateData.entries())); // Log để debug

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const baseUrl = apiUrl || 'http://localhost:8080';

            // Sử dụng ID từ editBookingData (booking đang được chỉnh sửa) trong URL path
            const response = await axios.put(`${baseUrl}/booking/${editBookingData.id}`, formUpdateData);
            const updatedBooking = response.data; // Dữ liệu nhận được từ BE (dạng JSON)

            setEditBookingResult({ success: true, message: 'Booking updated successfully!' });
            // Cập nhật booking trong danh sách hiện tại (frontend update)
             setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
            // Reset state chỉnh sửa sau khi cập nhật thành công
            setEditBookingData(null);
            setEditFormData({});
            setSelectedBookingId(null); // Trở về chế độ không xem chi tiết
            setShowEditForm(false); // Đóng form edit

        } catch (err) {
            console.error("Error updating booking:", err);
            // Xử lý lỗi axios (không có kiểm tra isAxiosError nữa, giả định response có data/message)
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
            setEditBookingResult({ success: false, message: `Failed to update booking: ${errorMessage}` });

        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };


    // Hàm xử lý Xóa Booking (DELETE /booking/{id})
    const handleDeleteBooking = async (id) => {
        // Hiển thị hộp thoại xác nhận trước khi xóa
        if (window.confirm(`Are you sure you want to delete booking ${id}?`)) {
            setLoading(true); // Bắt đầu trạng thái loading
            setError(null); // Reset lỗi chung

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const baseUrl = apiUrl || 'http://localhost:8080';

                console.log(`Deleting booking with ID: ${id} from ${baseUrl}/booking/${id}`); // Log để debug

                // Gửi DELETE request đến endpoint /booking/{id}
                const response = await axios.delete(`${baseUrl}/booking/${id}`);

                // Backend trả về 204 No Content khi xóa thành công
                if (response.status === 204) {
                    console.log(`Booking ${id} deleted successfully.`);
                    // Cập nhật danh sách booking trên frontend bằng cách lọc bỏ booking vừa xóa
                    setBookings(prev => prev.filter(b => b.id !== id));
                    // Đóng chế độ xem chi tiết/chỉnh sửa nếu đang mở booking này
                    if (selectedBookingId === id) {
                        setSelectedBookingId(null);
                        setEditBookingData(null);
                        setEditFormData({});
                        setShowEditForm(false);
                    }
                    // (Tùy chọn) Hiển thị thông báo xóa thành công tạm thời
                    // alert(`Booking ${id} deleted successfully.`);

                } else {
                     // Xử lý các trường hợp thành công khác nếu BE trả về (ví dụ 200 OK)
                     // Nếu BE trả về 200 nhưng không có body, cũng coi là xóa thành công
                    console.log(`Delete request for booking ${id} returned status ${response.status}. Assuming success.`);
                     setBookings(prev => prev.filter(b => b.id !== id));
                     if (selectedBookingId === id) {
                         setSelectedBookingId(null);
                         setEditBookingData(null);
                         setEditFormData({});
                         setShowEditForm(false);
                     }
                     // (Tùy chọn) Hiển thị thông báo xóa thành công tạm thời
                     // alert(`Booking ${id} deleted successfully.`);
                }


            } catch (err) {
                console.error(`Error deleting booking ${id}:`, err);
                 // Xử lý lỗi axios (không có kiểm tra isAxiosError nữa, giả định response có data/message)
                 // Backend có thể trả về 404 nếu không tìm thấy để xóa
                const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
                 if (err.response?.status === 404) {
                     setError(`Booking with ID ${id} not found.`);
                 } else {
                    setError(`Failed to delete booking: ${errorMessage}`);
                 }
                 // (Tùy chọn) Hiển thị thông báo lỗi
                 // alert(`Failed to delete booking ${id}: ${errorMessage}`);


            } finally {
                setLoading(false); // Kết thúc trạng thái loading
            }
        }
    };


    // Hàm để chọn booking xem chi tiết hoặc chỉnh sửa
    const handleSelectBooking = (id) => {
        // Nếu click lại vào booking đang được chọn, bỏ chọn
        if (selectedBookingId === id) {
            setSelectedBookingId(null);
            // Đảm bảo tắt hết các chế độ liên quan đến chi tiết/edit
            setEditBookingData(null);
            setEditFormData({});
            setShowEditForm(false);
        } else {
            // Chọn booking mới
            setSelectedBookingId(id); // Việc này sẽ kích hoạt useEffect để fetch chi tiết
            // Khi chọn xem chi tiết, đóng form tạo nếu đang mở
            setShowCreateForm(false);
        }
    };

    // Hàm để hiển thị form cập nhật khi đã có editBookingData
    const handleShowEditForm = () => {
        // Đảm bảo có dữ liệu booking để điền vào form edit trước khi mở form
        if (editBookingData) {
            setShowEditForm(true); // Bật trạng thái hiển thị form edit
             setEditBookingResult(null); // Reset kết quả edit trước đó
        } else {
            console.warn("No booking data available to show edit form.");
             setEditBookingResult({ success: false, message: "Cannot open edit form: Booking data not loaded." });
        }
    };

    // Hàm xử lý thay đổi trong Form Cập Nhật (cho tất cả các input)
    const handleEditFormChange = (event) => {
         const { name, value } = event.target;
         // Cần xử lý chuyển đổi kiểu dữ liệu cho các trường số
         let processedValue = value;
         if (name === 'max_guest' || name === 'user_id' || name === 'tour_id') {
             processedValue = parseInt(value, 10) || 0; // Chuyển sang số nguyên, mặc định 0 nếu không hợp lệ
         } else if (name === 'total_price') {
              processedValue = parseFloat(value) || 0.00; // Chuyển sang số thập phân, mặc định 0.00
         }
         // Giữ nguyên string cho các trường khác (date, payment, description, name, ...)

         setEditFormData(prev => ({ ...prev, [name]: processedValue }));
    };


    // --- Render Giao diện ---

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
                              setShowCreateForm(!showCreateForm); // Toggle form tạo
                              // Đảm bảo các chế độ khác tắt
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
                // Sử dụng className 'max-w-md mx-auto' nếu muốn căn giữa và giới hạn chiều rộng
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
                                 disabled={loading} // Disable khi đang loading
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
                // Sử dụng className 'max-w-md mx-auto' nếu muốn căn giữa và giới hạn chiều rộng
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
                                 onClick={handleShowEditForm} // Gọi hàm mở form edit
                                  disabled={loading} // Disable khi đang loading
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

// Đảm bảo export đúng tên component
export default TourBookingForm; // Hoặc TourBookingForm nếu bạn không đổi tên component