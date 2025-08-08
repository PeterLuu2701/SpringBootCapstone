import Banner from "@/components/Banner";
import DestinationItem from "@/components/destination-item/DestinationItem";
import SectionTitle from "@/components/SectionTitle";
import Subscribe from "@/components/Subscribe";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";

// Không cần thay đổi fetchDestinations nếu backend trả về đúng DTO có imageUrl
const fetchDestinations = async () => {
  try {
    const response = await fetch("http://localhost:8080/destination", { cache: 'no-store' }); // Thêm cache: 'no-store' nếu muốn luôn fetch mới
    if (!response.ok) {
      const errorText = await response.text(); // Lấy text response khi lỗi
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }
    const data = await response.json();
    console.log("Data fetched from API:", data);
     // Kiểm tra data.data có tồn tại và là mảng không
    return data.data && Array.isArray(data.data.content) ? data.data.content : []; // Trả về mảng content từ Page object

  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
};

const DestinationsPage = async () => {
   const destinations = await fetchDestinations(); // Lấy mảng destinations từ fetch

  return (
    <ReveloLayout>
      <Banner pageTitle={"Destinations"} search={true} />
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
             {/* Kiểm tra destinations có phải là mảng không */}
            {Array.isArray(destinations) && destinations.length > 0 ? (
                 destinations.map((destination, index) => (
                   <DestinationItem
                     key={destination.id}
                     imageUrl={destination.imageUrl} // Sử dụng imageUrl từ DTO backend
                     title={destination.name}
                     // toursCount="258" // Giá trị cứng, có thể fetch số tour cho mỗi destination nếu cần
                     destinationDetailsLink={`/destination-details?id=${destination.id}`}
                     aosDelay={index * 50}
                   />
                 ))
            ) : (
                <div className="col-12 text-center">
                    <p>No destinations available.</p>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Area start */}
      <Subscribe />
      {/* Newsletter Area end */}
    </ReveloLayout>
  );
};

export default DestinationsPage;