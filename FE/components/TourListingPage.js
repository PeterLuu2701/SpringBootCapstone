// File: TourListingPage.js

"use client";

import React, { useState, useEffect } from 'react';

// Import SearchFilter và TourCard dựa trên cấu trúc mới (cùng cấp trong components)
import SearchFilter from './SearchFilter';
import TourCard from './tour-item/TourCard'; // TourCard vẫn trong tour-item

import axios from 'axios';

const TourListingPage = () => {
  // State cho kết quả tìm kiếm và thông tin phân trang
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentCriteria, setCurrentCriteria] = useState({}); // Lưu trữ tiêu chí tìm kiếm hiện tại

  // State cho danh sách tour ban đầu (tùy chọn)
  const [initialTours, setInitialTours] = useState(null); // Thay đổi thành null ban đầu
  const [showInitialTours, setShowInitialTours] = useState(true);

  // useEffect để tải danh sách tour ban đầu khi component render lần đầu
  useEffect(() => {
    const fetchInitialTours = async () => {
      setLoading(true); // Bắt đầu tải danh sách ban đầu
      setError(null); // Xóa lỗi
      try {
        // Gọi API để lấy danh sách tour (get-all-tour không phân trang)
        const response = await axios.get('/tour/get-all-tour');

        if (response.data) {
             // API get-all-tour trả về List<TourDTO>, không phải Page
             setInitialTours(response.data); // Lưu danh sách tour ban đầu
             setShowInitialTours(true); // Đảm bảo danh sách ban đầu được hiển thị
             setLoading(false); // Kết thúc tải danh sách ban đầu
        } else {
             console.warn("API get-all-tour không trả về dữ liệu hợp lệ.");
             setLoading(false);
             setInitialTours([]); // Đặt là mảng rỗng nếu không có dữ liệu
        }

      } catch (err) {
        console.error("Lỗi khi tải danh sách tour ban đầu:", err);
        setError("Đã xảy ra lỗi khi tải danh sách tour ban đầu.");
        setLoading(false);
        setShowInitialTours(false); // Không hiển thị danh sách ban đầu nếu bị lỗi
        setInitialTours([]); // Đặt là mảng rỗng khi có lỗi tải
      }
    };

    // Chỉ gọi fetchInitialTours nếu chưa có kết quả tìm kiếm (searchResults là null)
    // và nếu showInitialTours ban đầu là true
    if (!searchResults && showInitialTours) {
        fetchInitialTours();
    }

  }, [searchResults, showInitialTours]); // Thêm dependencies để re-run khi searchResults hoặc showInitialTours thay đổi


  // Hàm gọi API tìm kiếm với tiêu chí và trang cụ thể
  const fetchTours = async (criteria, page = 0) => {
      setLoading(true); // Bắt đầu tải
      setError(null); // Xóa lỗi cũ
      setSearchResults(null); // Xóa kết quả cũ
      setShowInitialTours(false); // Ẩn danh sách ban đầu khi bắt đầu tìm kiếm

      try {
          // Gửi yêu cầu POST đến API tìm kiếm
          const response = await axios.post('/tour/search', criteria, {
               params: { page: page, size: 10 }
          });

          console.log('API Response Data:', response.data);

          // Kiểm tra cấu trúc phản hồi Page
          if (response.data && Array.isArray(response.data.content) && response.data.number !== undefined && response.data.totalPages !== undefined && response.data.totalElements !== undefined) {
              setSearchResults(response.data); // Lưu toàn bộ phản hồi Page<TourDTO>
              setCurrentPage(response.data.number); // Cập nhật trang hiện tại
              setTotalPages(response.data.totalPages); // Cập nhật tổng số trang
              setLoading(false); // Kết thúc tải
          } else {
              console.error("Cấu trúc phản hồi API /tour/search không hợp lệ:", response.data);
              setError("Đã nhận được phản hồi không hợp lệ từ server cho tìm kiếm.");
              setLoading(false);
              setSearchResults({ content: [], number: 0, totalPages: 0, totalElements: 0 }); // Đặt kết quả rỗng với cấu trúc Page
              setCurrentPage(0);
              setTotalPages(0);
          }

      } catch (error) {
          console.error('Lỗi khi tìm kiếm tour:', error);
          if (error.response && error.response.data && error.response.data.message) {
               setError("Lỗi từ server khi tìm kiếm: " + error.response.data.message);
          } else {
               setError("Đã xảy ra lỗi khi tìm kiếm tour.");
          }
          setLoading(false);
          setSearchResults(null); // Đặt kết quả là null khi có lỗi tìm kiếm
          setCurrentPage(0);
          setTotalPages(0);
          setShowInitialTours(false);
      }
  };

  // Hàm được truyền xuống SearchFilter
  const handleSearch = (criteria) => {
      // Lưu tiêu chí tìm kiếm hiện tại
      setCurrentCriteria(criteria);
      // Bắt đầu tìm kiếm từ trang 0
      fetchTours(criteria, 0);
  };

  // Hàm xử lý chuyển trang
  const handlePageChange = (newPage) => {
      // Chỉ chuyển trang khi không đang tải, không có lỗi, có tiêu chí tìm kiếm
      // và trang mới hợp lệ
      if (!loading && !error && currentCriteria && (newPage >= 0 && newPage < totalPages)) {
          fetchTours(currentCriteria, newPage);
      } else {
          console.warn("Yêu cầu chuyển trang không hợp lệ.");
      }
  };


  return (
    <div>
      {/* Bạn có thể cần bọc TourListingPage trong Layout chung của ứng dụng */}
      {/* Ví dụ: <Layout> ... </Layout> */}

      <h1>Danh sách Tour</h1>

      {/* Render SearchFilter */}
      {/* Đảm bảo SearchFilter không bị ảnh hưởng bởi AOS nếu lỗi CSS gây ra */}
      <SearchFilter
        onSearch={handleSearch}
      />

      {/* Hiển thị trạng thái tải */}
      {loading && <p>Đang tải danh sách tour...</p>}

      {/* Hiển thị lỗi */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Khu vực hiển thị kết quả tìm kiếm hoặc danh sách ban đầu */}
      {/* Chỉ hiển thị nếu KHÔNG loading và KHÔNG có lỗi */}
      {!loading && !error && (
          <>
              {/* Hiển thị kết quả tìm kiếm nếu searchResults không null và có nội dung */}
              {searchResults && Array.isArray(searchResults.content) && searchResults.content.length > 0 && (
                <div className="tour-results">
                  <h2>Kết quả tìm kiếm ({searchResults.totalElements} tours)</h2>
                  {searchResults.content.map(tour => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}

                  {/* Phần giao diện phân trang */}
                  {totalPages > 1 && (
                      <div className="pagination">
                          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>Trước</button>
                          <span>Trang {currentPage + 1} / {totalPages}</span>
                          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>Sau</button>
                      </div>
                  )}
                </div>
              )}

              {/* Hiển thị thông báo khi không có kết quả tìm kiếm (sau khi đã tìm kiếm) */}
              {/* searchResults không null, có content là mảng rỗng */}
              {searchResults && Array.isArray(searchResults.content) && searchResults.content.length === 0 && (
                  <p>Không tìm thấy tour nào phù hợp với tiêu chí tìm kiếm.</p>
              )}

              {/* Hiển thị danh sách ban đầu khi chưa tìm kiếm và showInitialTours là true */}
              {/* searchResults là null, showInitialTours là true, và initialTours không null và không rỗng */}
              {!searchResults && showInitialTours && initialTours && initialTours.length > 0 && (
                   <div className="initial-tours">
                        <h2>Các Tour Phổ biến</h2>
                        {initialTours.map(tour => (
                          <TourCard key={tour.id} tour={tour} />
                        ))}
                   </div>
              )}

              {/* Hiển thị thông báo mặc định khi chưa tìm kiếm và không có tour ban đầu */}
              {/* searchResults là null, showInitialTours là true, và initialTours là null hoặc rỗng */}
               {!searchResults && showInitialTours && (!initialTours || initialTours.length === 0) && (
                   <p>Hãy sử dụng bộ lọc để tìm kiếm tour.</p>
              )}
          </>
      )}
    </div>
  );
};

export default TourListingPage;