import Banner from "@/components/Banner";
import Subscribe from "@/components/Subscribe";
import TourItem from "@/components/tour-item/TourItem";
import TourSidebar from "@/components/TourSidebar";
import ReveloLayout from "@/layout/ReveloLayout";
import slugify from "slugify";

const ITEMS_PER_PAGE = 6;

const fetchTours = async () => {
  try {
    const response = await fetch('http://localhost:8080/tour/get-all-tour', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    console.error("Error fetching tours:", err);
    return [];
  }
};

const fetchDestinations = async () => {
  try {
    const response = await fetch('http://localhost:8080/destination', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const map = {};
    data.data.forEach(dest => {
      map[dest.id] = dest.name;
    });
    return map;
  } catch (err) {
    console.error("Error fetching destinations:", err);
    return {};
  }
};

const TourListPage = async () => {
  const [tours, destinations] = await Promise.all([fetchTours(), fetchDestinations()]);

  const totalPages = Math.ceil(tours.length / ITEMS_PER_PAGE);
  const currentPage = 1; // bạn có thể mở rộng xử lý query param nếu cần
  const displayedTours = tours.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <ReveloLayout>
      <Banner pageTitle={"Tour List View"} pageName={"Tour List"} search />

      <section className="tour-list-page py-100 rel z-1">
        <div className="container">
          <div className="row">
            <TourSidebar />
            <div className="col-lg-9">
              <div className="shop-shorter rel z-3 mb-20">
                <ul className="grid-list mb-15 me-2">
                  <li><a href="#"><i className="fal fa-border-all" /></a></li>
                  <li><a href="#"><i className="far fa-list" /></a></li>
                </ul>
                <div className="sort-text mb-15 me-4 me-xl-auto">{tours.length} Tours found</div>
                <div className="sort-text mb-15 me-4">Sort By</div>
                <select>
                  <option value="default">Short By</option>
                  <option value="new">Newness</option>
                  <option value="old">Oldest</option>
                  <option value="high-to-low">High To Low</option>
                  <option value="low-to-high">Low To High</option>
                </select>
              </div>

              {displayedTours.length === 0 ? (
                <div className="alert alert-warning">No tours available at the moment.</div>
              ) : (
                displayedTours.map((tour) => (
                  <TourItem
                    key={tour.id}
                    title={tour.name}
                    description={tour.description}
                    price={tour.price}
                    rating={tour.rating}
                    imageUrl={tour.image_url}
                    duration={tour.duration}
                    location={destinations[tour.destination_id] || 'Unknown Destination'}
                    featured={tour.is_feature === "1"}
                  />
                ))
              )}

              <ul className="pagination pt-15 flex-wrap" data-aos="fade-up" data-aos-duration={1500} data-aos-offset={50}>
                <li className={`page-item disabled`}>
                  <button className="page-link">
                    <i className="far fa-chevron-left" />
                  </button>
                </li>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button className="page-link">{index + 1}</button>
                  </li>
                ))}

                <li className={`page-item disabled`}>
                  <button className="page-link">
                    <i className="far fa-chevron-right" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Subscribe />
    </ReveloLayout>
  );
};

export default TourListPage;
