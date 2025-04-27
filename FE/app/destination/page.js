import Banner from "@/components/Banner";
<<<<<<< HEAD
import DestinationsList from "@/components/destinations-list/DestinationsList";
import Subscribe from "@/components/Subscribe";
import ReveloLayout from "@/layout/ReveloLayout";
import axios from "axios";

const fetchDestinations = async (page = 0, size = 10) => {
  try {
    const response = await axios.get("http://localhost:8080/destination", {
      params: { page, size },
    });

    return {
      destinations: response.data.data.content || [], // Access nested data.content
      totalPages: response.data.data.totalPages || 1, // Access nested data.totalPages
    };
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return { destinations: [], totalPages: 1 };
=======
import DestinationItem from "@/components/destination-item/DestinationItem";
import SectionTitle from "@/components/SectionTitle";
import Subscribe from "@/components/Subscribe";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";

const fetchDestinations = async () => {
  try {
    const response = await fetch('http://localhost:8080/destination');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return []; 
>>>>>>> ceff8d9791aeb091a47c84c8ed8e5d2c203e9f7a
  }
};

const DestinationsPage = async () => {
<<<<<<< HEAD
  const { destinations, totalPages } = await fetchDestinations();
=======
  const destinations = await fetchDestinations();
>>>>>>> ceff8d9791aeb091a47c84c8ed8e5d2c203e9f7a

  return (
    <ReveloLayout>
      <Banner pageTitle={"Destinations"} search={true} />
<<<<<<< HEAD
      <DestinationsList
        initialDestinations={destinations}
        initialPageCount={totalPages}
      />
      <Subscribe />
=======
      <section className="destinations-page-area pt-95 pb-90 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="section-title text-center counter-text-wrap mb-50"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <SectionTitle title={"Explore Our Popular Destinations"} />
              </div>
            </div>
          </div>
          <div className="row gap-10 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 justify-content-center">
            {destinations.map((destination, index) => (
              <DestinationItem
                key={destination.id}
                imageUrl={destination.image_url}
                title={destination.name}
                toursCount="258" 
                destinationDetailsLink={`/destination-details?id=${destination.id}`}
                aosDelay={index * 50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Area start */}
      <Subscribe />
      {/* Newsletter Area end */}
>>>>>>> ceff8d9791aeb091a47c84c8ed8e5d2c203e9f7a
    </ReveloLayout>
  );
};

<<<<<<< HEAD
export default DestinationsPage;
=======
export default DestinationsPage;
>>>>>>> ceff8d9791aeb091a47c84c8ed8e5d2c203e9f7a
