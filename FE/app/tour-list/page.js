import Banner from "@/components/Banner";
import Subscribe from "@/components/Subscribe";
import TourItem from "@/components/tour-item/TourItem";
import TourSidebar from "@/components/TourSidebar";
import ReveloLayout from "@/layout/ReveloLayout";

const ITEMS_PER_PAGE = 6;

const fetchTours = async (destinationCity = null) => {
  try {
    let url = "http://localhost:8080/tour";
    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    };

    if (destinationCity) {
      url = "http://localhost:8080/tour/search";
      options.method = "POST";
      options.body = JSON.stringify({ destinationCity: destinationCity });
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();
    console.log(`Raw data from ${url}:`, data);

    let toursToReturn = [];

    if (destinationCity) {
      if (data && Array.isArray(data.content)) {
        toursToReturn = data.content;
      } else {
        console.warn(
          "Search API response did not contain expected 'content' array:",
          data
        );
      }
    } else {
      if (Array.isArray(data)) {
        toursToReturn = data;
      } else if (data && Array.isArray(data.data)) {
        toursToReturn = data.data;
      } else {
        console.warn(
          "Get All Tours API response did not contain expected array or 'data' array:",
          data
        );
      }
    }

    return toursToReturn;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
};

const fetchDestinations = async () => {
  try {
    const response = await fetch("http://localhost:8080/destination", {
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const map = {};
    if (data && Array.isArray(data.data)) {
      data.data.forEach((dest) => {
        map[dest.id] = dest.name || dest.city;
      });
    } else {
      console.warn(
        "Destinations API response did not contain expected 'data' array:",
        data
      );
    }
    return map;
  } catch (err) {
    console.error("Error fetching destinations:", err);
    return {};
  }
};

const TourListPage = async ({ searchParams }) => {
  const destinationCityQuery = searchParams.destination || null;

  const [tours, destinations] = await Promise.all([
    fetchTours(destinationCityQuery),
    fetchDestinations(),
  ]);

  const totalPages = Math.ceil(tours.length / ITEMS_PER_PAGE);
  const currentPage = 1;
  const displayedTours = tours.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
                  {tours.length} Tours found
                </div>
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
                <div className="alert alert-warning">
                  No tours available for this destination.
                </div>
              ) : (
                displayedTours.map((tour) => (
                  <TourItem
                    key={tour.id}
                    id={tour.id}
                    title={tour.name}
                    description={tour.description}
                    price={tour.price}
                    rating={tour.rating}
                    imageUrl={tour.image_url}
                    duration={tour.duration}
                    location={
                      tour.destinationCity ||
                      destinations[tour.destination_id] ||
                      "Unknown Destination"
                    }
                    featured={tour.is_feature === "1"}
                  />
                ))
              )}

              <ul
                className="pagination pt-15 flex-wrap"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button className="page-link">
                    <i className="far fa-chevron-left" />
                  </button>
                </li>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button className="page-link">{index + 1}</button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
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
