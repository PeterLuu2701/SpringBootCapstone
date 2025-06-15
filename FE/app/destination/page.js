import Banner from "@/components/Banner";
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
  }
};

const DestinationsPage = async () => {
  const { destinations, totalPages } = await fetchDestinations();

  return (
    <ReveloLayout>
      <Banner pageTitle={"Destinations"} search={true} />
      <DestinationsList
        initialDestinations={destinations}
        initialPageCount={totalPages}
      />
      <Subscribe />
    </ReveloLayout>
  );
};

export default DestinationsPage;
