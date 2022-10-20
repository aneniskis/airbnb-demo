import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

const search = ({ searchResult }) => {
  const router = useRouter();
  // console.log(searchResult);
  const { location, numberOfGuest, endDate, startDate } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuest} ${
          numberOfGuest === "1" ? "guest" : "guests"
        }`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuest} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespapce-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <div className="flex flex-col">
            {searchResult?.map((item, i) => (
              <InfoCard item={item} key={i} />
            ))}
          </div>
        </section>
        <section className=" sticky top-10 hidden xl:inline-flex xl:min-w-[600px]  xl:max-h-[100vh]">
          <Map searchResult={searchResult} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default search;

export async function getServerSideProps(context) {
  const searchResult = await fetch("https://www.jsonkeeper.com/b/5NPS").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResult,
    },
  };
}
