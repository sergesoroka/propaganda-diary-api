// @ts-nocheck
import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import CountryList from "@/components/CountryList/CountryList";
import MediaList from "@/components/MediaList/MediaList";
import SubNarrativeList from "@/components/SubNarratives/SubNarrativeList";

import useSWR, { preload } from "swr";
import { fetcher } from "../../lib/fetcher";

import { useRouter } from "next/router";
import Loader from "@/components/Icons/Loader";

function Media() {
  const router = useRouter();
  const { locale } = router;
  const [country, setCountry] = useState("Польща");

  const [media, setMedia] = useState("all");
  const mediaName = media && `media=${media}`;

  const FAKES_BY_MEDIA_URL = `https://vox-dashboard.ra-devs.tech/api/dashboards-by-fakes?${mediaName}&lang=${locale}`;

  preload(FAKES_BY_MEDIA_URL, fetcher);

  const { data: fakesByMediaData, isLoading } = useSWR(
    FAKES_BY_MEDIA_URL,
    fetcher
  );

  const subNarrativesRender =
    fakesByMediaData &&
    Object.keys(fakesByMediaData).map((item, i) => {
      return (
        <SubNarrativeList
          key={i}
          subNarrativeTitle={item}
          subNarrativeId={item.id}
          media={media}
        />
      );
    });

  return (
    <>
      <Head>
        <title>Propaganda Diary | Media</title>
        <meta name="description" content="Media sorted by country" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CountryList
          country={country}
          setCountry={setCountry}
          setMedia={setMedia}
        />
        <MediaList country={country} setMedia={setMedia} media={media} />
        {isLoading && <Loader />}
        <div>{subNarrativesRender}</div>
      </main>
    </>
  );
}
export default Media;
