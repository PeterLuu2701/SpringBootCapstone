import Banner from "@/components/Banner";
import Subscribe from "@/components/Subscribe";
import TourItem from "@/components/tour-item/TourItem";
import TourSidebar from "@/components/TourSidebar";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
const page = () => {
  return (
    <ReveloLayout>
      <Banner pageTitle={"Tour List View"} pageName={"Tour List"} search />
      {/* Tour List Area start */}
      <section className="tour-list-page py-100 rel z-1">
        <div className="container">
          <div className="row">
            <TourSidebar />
            <div className="col-lg-9">
              <div className="shop-shorter rel z-3 mb-20">
                <ul className="grid-list mb-15 me-2">
                  <li>
                    <a href="#">
                      <i className="fal fa-border-all" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="far fa-list" />
                    </a>
                  </li>
                </ul>
                <div className="sort-text mb-15 me-4 me-xl-auto">
                  34 Tours found
                </div>
                <div className="sort-text mb-15 me-4">Sort By</div>
                <select>
                  <option value="default" selected="">
                    Short By
                  </option>
                  <option value="new">Newness</option>
                  <option value="old">Oldest</option>
                  <option value="hight-to-low">High To Low</option>
                  <option value="low-to-high">Low To High</option>
                </select>
              </div>
              <TourItem/>
              <ul
                className="pagination pt-15 flex-wrap"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <li className="page-item disabled">
                  <span className="page-link">
                    <i className="far fa-chevron-left" />
                  </span>
                </li>
                <li className="page-item active">
                  <span className="page-link">
                    1<span className="sr-only">(current)</span>
                  </span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <i className="far fa-chevron-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Tour List Area end */}
      {/* Newsletter Area start */}
      <Subscribe />
      {/* Newsletter Area end */}
    </ReveloLayout>
  );
};
export default page;
