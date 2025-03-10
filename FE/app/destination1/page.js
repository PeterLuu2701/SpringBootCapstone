import Banner from "@/components/Banner";
import DestinationItem from "@/components/destination-item/DestinationItem";
import SectionTitle from "@/components/SectionTitle";
import Subscribe from "@/components/Subscribe";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
const page = () => {
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
            <DestinationItem/>
          </div>
        </div>
      </section>

      {/* Newsletter Area start */}
      <Subscribe />
      {/* Newsletter Area end */}
    </ReveloLayout>
  );
};
export default page;
