"use client";

import Banner from "@/components/Banner";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import useParams hook

const BlogDetailsPage = () => {
  const params = useParams();
  const blogId = params.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!blogId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/blog/${blogId}`);
        if (!response.ok) {
           const errorData = await response.json();
           // Ném lỗi với thông báo chi tiết hơn từ backend nếu có
           throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Failed to fetch blog'}`);
        }
        const data = await response.json();
        console.log("Blog Details API Response:", data);

        // Kiểm tra cấu trúc response và data
        if (data && data.data) {
             setBlog(data.data); // Cập nhật state blog với dữ liệu từ API
        } else {
            // Xử lý trường hợp API trả về 200 nhưng data.data là null/undefined
            setError("Blog data not found in response structure.");
            setBlog(null); // Đảm bảo blog là null
        }

      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError(err.message);
        setBlog(null); // Đảm bảo blog là null khi có lỗi
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId]);


   if (loading) {
       return (
           <ReveloLayout insta>
               {/* Placeholder title */}
               <Banner pageTitle={"Loading Blog..."} pageName={"Blog Details"} />
               <section className="blog-detaisl-page py-100 rel z-1">
                   <div className="container">
                       <p>Loading blog details...</p>
                   </div>
               </section>
           </ReveloLayout>
       );
   }

   if (error) {
        return (
           <ReveloLayout insta>
                {/* Placeholder title */}
               <Banner pageTitle={"Error Loading Blog"} pageName={"Blog Details"} />
               <section className="blog-detaisl-page py-100 rel z-1">
                   <div className="container">
                       <p>Error loading blog details: {error}</p>
                        <Link href="/blog">Back to Blog List</Link>
                   </div>
               </section>
           </ReveloLayout>
       );
   }

   if (!blog) {
        // blogId có thể không có nếu truy cập /blog-details/
        // hoặc nếu API trả về 404/data: null cho ID cụ thể
        return (
              <ReveloLayout insta>
                 <Banner pageTitle={"Not Found"} pageName={"Blog Details"} />
                 <section className="blog-detaisl-page py-100 rel z-1">
                     <div className="container">
                         <p>{blogId ? `Blog with ID ${blogId} not found.` : 'Invalid blog ID in URL.'}</p>
                          <Link href="/blog">Back to Blog List</Link>
                     </div>
                 </section>
             </ReveloLayout>
         );
     }


  // Render blog content khi đã có dữ liệu và không có lỗi
   return (
     <ReveloLayout insta>
       {/* Sử dụng blog.title cho Banner */}
       <Banner
         pageTitle={blog.title || "Blog Details"} // Sử dụng title động
         pageName={"Blog Details"}
       />
       <section className="blog-detaisl-page py-100 rel z-1">
         <div className="container">
           <div className="row">
             <div className="col-lg-8">
               <div
                 className="blog-details-content"
                 data-aos="fade-up"
                 data-aos-duration={1500}
                 data-aos-offset={50}
               >
                 {/* Category (giữ nguyên tĩnh) */}
                 <Link href="/blog" className="category">
                   Travel {/* Placeholder: thay bằng category thực tế */}
                 </Link>
                 <ul className="blog-meta mb-30">
                   {/* Thông tin tác giả: giữ nguyên ảnh avatar, thay tên tác giả nếu có */}
                   {/* Lưu ý: API hiện tại chỉ trả về authorId. Bạn cần fetch thông tin user để lấy tên hoặc chỉnh backend. */}
                   <li>
                     <img src="/assets/images/blog/admin.jpg" alt="Admin" />{" "} {/* Giữ nguyên ảnh avatar */}
                     {/* Placeholder tên tác giả: hiển thị placeholder hoặc tên nếu có */}
                     <a href="#">{blog.authorName || "Author Name"}</a> {/* Thay thế bằng tên tác giả động hoặc placeholder */}
                   </li>
                   <li>
                     <i className="far fa-calendar-alt" />{" "}
                     {/* Sử dụng ngày tạo từ API */}
                     <a href="#">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}</a>
                   </li>
                   <li>
                     <i className="far fa-comments" />{" "}
                     {/* Số lượng comments (giữ nguyên placeholder tĩnh) */}
                     <a href="#">Comments (5)</a> {/* Placeholder */}
                   </li>
                 </ul>

                 {/* Sử dụng blog.title cho tiêu đề chính */}
                 <h5>{blog.title}</h5>
                 <div
                   className="image mt-40 mb-30"
                   data-aos="fade-up"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   {/* Sử dụng blog.imageUrl từ API */}
                   {/* Kích thước ảnh sẽ phụ thuộc vào CSS của class "image" và các class cha */}
                   {blog.imageUrl ? (
                      <img
                         src={`http://localhost:8080${blog.imageUrl}`}
                         alt={blog.title}
                         // Style hoặc className để kiểm soát kích thước nếu cần
                         // className="img-fluid" // Ví dụ: Bootstrap class
                         // style={{ maxWidth: '100%', height: 'auto' }} // Ví dụ: inline style
                      />
                   ) : (
                        // Hiển thị ảnh placeholder nếu không có ảnh blog
                         <img
                          src="/assets/images/blog/blog-details.jpg" // Giữ nguyên ảnh placeholder bạn cung cấp
                          alt="No image available"
                          // Style hoặc className để kiểm soát kích thước
                         />
                   )}
                 </div>
                 {/* Sử dụng blog.content cho nội dung chính */}
                 {/* Nếu content là HTML (ví dụ: có thẻ <p>, <strong>, <img>), dùng dangerouslySetInnerHTML. */}
                 {/* Nếu content là plain text, dùng <p>. */}
                 {/* Giả định content là plain text và không chứa HTML cần render */}
                 <p>{blog.content}</p>

                 {/* Nếu content có thể chứa HTML, sử dụng dangerouslySetInnerHTML: */}
                 {/* <div dangerouslySetInnerHTML={{ __html: blog.content }} /> */}


               </div>
               <hr className="mb-45" />
               <div className="tag-share mb-50">
                 {/* Tags và Share (giữ nguyên cấu trúc và nội dung tĩnh) */}
                 <div
                   className="item"
                   data-aos="fade-left"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   <h6>Tags </h6>
                   <div className="tag-coulds">
                     <Link href="/blog">Travel</Link>
                     <Link href="/blog">Hotel</Link>
                     <Link href="/blog">Tour</Link>
                   </div>
                 </div>
                 <div
                   className="item"
                   data-aos="fade-right"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   <h6>Share </h6>
                   <div className="social-style-one">
                     <a href="#">
                       <i className="fab fa-facebook-f" />
                     </a>
                     <a href="#">
                       <i className="fab fa-twitter" />
                     </a>
                     <a href="#">
                       <i className="fab fa-linkedin-in" />
                     </a>
                     <a href="#">
                       <i className="fab fa-instagram" />
                     </a>
                   </div>
                 </div>
               </div>

               {/* Comments và Form Comment Area (giữ nguyên cấu trúc tĩnh) */}
                <div className="comments-form-area pt-110 pb-70 rel z-1">
                     <h4 className="comment-title mb-30" data-aos="fade-up" data-aos-duration={1500} data-aos-offset={50}>
                         Customer Comments
                     </h4>
                     <ul className="comment-list">
                          {/* Placeholder comment item */}
                         <li>
                             <div className="comment-body">
                                 <div className="author-thumb">
                                     <img src="/assets/images/blog/comment1.jpg" alt="Author" /> {/* Giữ nguyên ảnh placeholder */}
                                 </div>
                                 <div className="comment-content">
                                     <div className="name-date">
                                         {/* Placeholder tên tác giả review và ngày review */}
                                         <h6>Review Author Name <span className="comment-date">Review Date</span></h6>
                                     </div>
                                     <p>
                                         Review comment text. {/* Placeholder review comment */}
                                     </p>
                                     <a href="#" className="reply-btn">Reply</a>
                                 </div>
                             </div>
                         </li>
                     </ul>
                     <h4 className="comment-title mt-50 mb-30" data-aos="fade-up" data-aos-duration={1500} data-aos-offset={50}>
                         Leave a Reply
                     </h4>
                      {/* Form comment (giữ nguyên cấu trúc tĩnh) */}
                      <form onSubmit={(e) => { e.preventDefault(); console.log("Comment form submitted"); }}>
                          <div className="row">
                               <div className="col-md-12">
                                    <div className="form-group" data-aos="fade-up" data-aos-duration={1500} data-aos-offset={50}>
                                        <label htmlFor="comment">Your Comment</label>
                                         <textarea name="comment" id="comment" rows="5" placeholder="Enter your comment" required></textarea>
                                    </div>
                               </div>
                               {/* Các trường khác cho rating, image nếu cần */}
                               <div className="col-md-12">
                                     <div className="form-group mb-0" data-aos="fade-up" data-aos-duration={1500} data-aos-offset={50}>
                                         <button type="submit" className="theme-btn">
                                             <span data-hover="Post Comment">Post Comment</span> <i className="far fa-arrow-right"></i>
                                         </button>
                                     </div>
                                </div>
                          </div>
                      </form>
                </div>


               {/* Phần Previous/Next Blog (giữ nguyên cấu trúc tĩnh) */}
               <div className="next-prev-blog pt-70 pb-15">
                 <div
                   className="item"
                   data-aos="fade-left"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   <div className="image">
                     <img src="/assets/images/blog/prev-post.jpg" alt="News" /> {/* Giữ nguyên ảnh placeholder */}
                   </div>
                   <div className="content">
                     <h6>
                       {/* Placeholder link và title */}
                       <Link href="/blog-details/prev_id">
                         Unique Destinations an tolded Stories ways
                       </Link>
                     </h6>
                     <span className="date">
                       <i className="far fa-calendar-alt" /> 25 Feb 2024 {/* Placeholder date */}
                     </span>
                   </div>
                 </div>
                 <div
                   className="item"
                   data-aos="fade-right"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   <div className="image">
                     <img src="/assets/images/blog/next-post.jpg" alt="News" /> {/* Giữ nguyên ảnh placeholder */}
                   </div>
                   <div className="content">
                     <h6>
                        {/* Placeholder link và title */}
                       <Link href="/blog-details/next_id">
                         Immersive Experiences from Around Globe
                       </Link>
                     </h6>
                     <span className="date">
                       <i className="far fa-calendar-alt" /> 25 Feb 2024 {/* Placeholder date */}
                     </span>
                   </div>
                 </div>
               </div>

             </div>
             {/* Sidebar (giữ nguyên cấu trúc tĩnh) */}
             <div className="col-lg-4 col-md-8 col-sm-10 rmt-75">
               <div className="blog-sidebar">
                 <div
                   className="widget widget-search"
                   data-aos="fade-up"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   <form action="#" className="default-search-form">
                     <input type="text" placeholder="Search" required="" />
                     <button
                       type="submit"
                       className="searchbutton far fa-search"
                     />
                   </form>
                 </div>
                 <div
                   className="widget widget-category"
                   data-aos="fade-up"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   <h5 className="widget-title">Category</h5>
                   <ul className="list-style-three">
                      {/* Category tĩnh hoặc lấy từ API */}
                     <li>
                       <Link href="/blog">Adventure</Link>
                     </li>
                     <li>
                       <Link href="/blog">Hiking & Trekking</Link>
                     </li>
                     <li>
                       <Link href="/blog">Cycling Tours</Link>
                     </li>
                      <li>
                        <Link href="/blog">Family Tours</Link>
                      </li>
                      <li>
                        <Link href="/blog">Mountain Hiking</Link>
                      </li>
                      <li>
                        <Link href="/blog">Rafting Excursion</Link>
                      </li>
                      <li>
                        <Link href="/blog">Coastal Paragliding</Link>
                      </li>
                   </ul>
                 </div>
                 <div
                   className="widget widget-news"
                   data-aos="fade-up"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   <h5 className="widget-title">Recent News</h5>
                    {/* Recent News tĩnh hoặc lấy từ API */}
                   <ul>
                     <li>
                       <div className="image">
                         <img src="/assets/images/widgets/news1.jpg" alt="News" />
                       </div>
                       <div className="content">
                         <h6>
                           {/* Placeholder link và title */}
                           <Link href="/blog-details/recent1_id">
                             Unique Destinations an tolded Stories ways
                           </Link>
                         </h6>
                         <span className="date">
                           <i className="far fa-calendar-alt" /> 25 Feb 2024 {/* Placeholder date */}
                         </span>
                       </div>
                     </li>
                      <li>
                        <div className="image">
                          <img src="/assets/images/widgets/news2.jpg" alt="News" />
                        </div>
                        <div className="content">
                          <h6>
                            {/* Placeholder link và title */}
                            <Link href="/blog-details/recent2_id">
                              Immersive Experiences from Around Globe
                            </Link>
                          </h6>
                          <span className="date">
                            <i className="far fa-calendar-alt" /> 25 Feb 2024 {/* Placeholder date */}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="image">
                          <img src="/assets/images/widgets/news3.jpg" alt="News" />
                        </div>
                        <div className="content">
                          <h6>
                            {/* Placeholder link và title */}
                            <Link href="/blog-details/recent3_id">
                              Journey to Inspire Your Next Adventure
                            </Link>
                          </h6>
                          <span className="date">
                            <i className="far fa-calendar-alt" /> 25 Feb 2024 {/* Placeholder date */}
                          </span>
                        </div>
                      </li>
                   </ul>
                 </div>
                 <div
                   className="widget widget-gallery"
                   data-aos="fade-up"
                   data-aos-duration={1500}
                   data-aos-offset={50}
                 >
                   <h5 className="widget-title">Gallery</h5>
                    {/* Gallery tĩnh hoặc lấy từ API */}
                   <div className="gallery">
                     <a href="/assets/images/widgets/gallery1.jpg">
                       <img
                         src="/assets/images/widgets/gallery1.jpg"
                         alt="Gallery"
                       />
                     </a>
                     <a href="/assets/images/widgets/gallery2.jpg">
                       <img
                         src="/assets/images/widgets/gallery2.jpg"
                         alt="Gallery"
                       />
                     </a>
                     <a href="/assets/images/widgets/gallery3.jpg">
                       <img
                         src="/assets/images/widgets/gallery3.jpg"
                         alt="Gallery"
                       />
                     </a>
                      <a href="/assets/images/widgets/gallery4.jpg">
                        <img
                          src="/assets/images/widgets/gallery4.jpg"
                          alt="Gallery"
                        />
                      </a>
                      <a href="/assets/images/widgets/gallery5.jpg">
                        <img
                          src="/assets/images/widgets/gallery5.jpg"
                          alt="Gallery"
                        />
                      </a>
                      <a href="/assets/images/widgets/gallery6.jpg">
                        <img
                          src="/assets/images/widgets/gallery6.jpg"
                          alt="Gallery"
                        />
                      </a>
                      <a href="/assets/images/widgets/gallery7.jpg">
                        <img
                          src="/assets/images/widgets/gallery7.jpg"
                          alt="Gallery"
                        />
                      </a>
                      <a href="/assets/images/widgets/gallery8.jpg">
                        <img
                          src="/assets/images/widgets/gallery8.jpg"
                          alt="Gallery"
                        />
                      </a>
                      <a href="/assets/images/widgets/gallery9.jpg">
                        <img
                          src="/assets/images/widgets/gallery9.jpg"
                          alt="Gallery"
                        />
                      </a>
                   </div>
                 </div>

               </div>
             </div>
           </div>
         </div>
       </section>
     </ReveloLayout>
   );

};

// Đảm bảo component được export với tên BlogDetailsPage
export default BlogDetailsPage;