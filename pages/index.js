import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import SmallCard from "../components/SmallCard.jsx";
import MediumCard from "../components/MediumCard.jsx";
import LargeCard from "../components/LargeCard.jsx";
import Footer from "../components/Footer.jsx";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Alex Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* info is serverio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ distance, img, location }, i) => (
              <SmallCard
                key={i}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -m-3 focus:pointer-events-auto">
            {cardsData?.map(({ title, img }, i) => (
              <MediumCard key={i} title={title} img={img} />
            ))}
          </div>
        </section>
        <LargeCard
          img="http://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://www.jsonkeeper.com/b/VHHT").then(
    (res) => res.json()
  );
  return {
    props: { exploreData, cardsData },
  };
}
