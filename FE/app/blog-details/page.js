import Banner from "@/components/Banner";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
const page = () => {
  return (
    <ReveloLayout insta>
      <Banner
        pageTitle={"Ultimate Guide to Planning Your Dream Vacation"}
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
                <Link href="blog" className="category">
                  Travel
                </Link>
                <ul className="blog-meta mb-30">
                  <li>
                    <img src="/assets/images/blog/admin.jpg" alt="Admin" />{" "}
                    <a href="#">Reed A. Johnson</a>
                  </li>
                  <li>
                    <i className="far fa-calendar-alt" />{" "}
                    <a href="#">25 Feb 2024</a>
                  </li>
                  <li>
                    <i className="far fa-comments" />{" "}
                    <a href="#">Comments (5)</a>
                  </li>
                </ul>



                <h5>Services Offered by a Tour and Travel Agency</h5>
                <div
                  className="image mt-40 mb-30"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <img
                    src="/assets/images/blog/blog-details.jpg"
                    alt="Blog Details"
                  />
                </div>
                <p>
                  Agency plays a pivotal role in crafting memorable experiences
                  for travelers by offering wide range services tailored to
                  individual preferences. Whether it's a family vacation, an
                  adventure trip, or luxury getaway well-established travel
                  agency can handle everything from flight bookings and
                  accommodation to guided tours .
                </p>




              </div>
              <hr className="mb-45" />
              <div className="tag-share mb-50">
                <div
                  className="item"
                  data-aos="fade-left"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h6>Tags </h6>
                  <div className="tag-coulds">
                    <Link href="blog">Travel</Link>
                    <Link href="blog">Hotel</Link>
                    <Link href="blog">Tour</Link>
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
             
              <div className="next-prev-blog pt-70 pb-15">
                <div
                  className="item"
                  data-aos="fade-left"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="image">
                    <img src="/assets/images/blog/prev-post.jpg" alt="News" />
                  </div>
                  <div className="content">
                    <h6>
                      <Link href="blog-details">
                        Unique Destinations an tolded Stories ways
                      </Link>
                    </h6>
                    <span className="date">
                      <i className="far fa-calendar-alt" /> 25 Feb 2024
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
                    <img src="/assets/images/blog/next-post.jpg" alt="News" />
                  </div>
                  <div className="content">
                    <h6>
                      <Link href="blog-details">
                        Immersive Experiences from Around Globe
                      </Link>
                    </h6>
                    <span className="date">
                      <i className="far fa-calendar-alt" /> 25 Feb 2024
                    </span>
                  </div>
                </div>
              </div>
           
            </div>
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
                    <li>
                      <Link href="blog">Adventure</Link>
                    </li>
                    <li>
                      <Link href="blog">Hiking &amp; Trekking</Link>
                    </li>
                    <li>
                      <Link href="blog">Cycling Tours</Link>
                    </li>
                    <li>
                      <Link href="blog">Family Tours</Link>
                    </li>
                    <li>
                      <Link href="blog">Mountain Hiking</Link>
                    </li>
                    <li>
                      <Link href="blog">Rafting Excursion</Link>
                    </li>
                    <li>
                      <Link href="blog">Coastal Paragliding</Link>
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
                  <ul>
                    <li>
                      <div className="image">
                        <img src="/assets/images/widgets/news1.jpg" alt="News" />
                      </div>
                      <div className="content">
                        <h6>
                          <Link href="blog-details">
                            Unique Destinations an tolded Stories ways
                          </Link>
                        </h6>
                        <span className="date">
                          <i className="far fa-calendar-alt" /> 25 Feb 2024
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="image">
                        <img src="/assets/images/widgets/news2.jpg" alt="News" />
                      </div>
                      <div className="content">
                        <h6>
                          <Link href="blog-details">
                            Immersive Experiences from Around Globe
                          </Link>
                        </h6>
                        <span className="date">
                          <i className="far fa-calendar-alt" /> 25 Feb 2024
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="image">
                        <img src="/assets/images/widgets/news3.jpg" alt="News" />
                      </div>
                      <div className="content">
                        <h6>
                          <Link href="blog-details">
                            Journey to Inspire Your Next Adventure
                          </Link>
                        </h6>
                        <span className="date">
                          <i className="far fa-calendar-alt" /> 25 Feb 2024
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
export default page;
