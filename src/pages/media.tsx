// @ts-nocheck
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import CountryList from "@/components/CountryList/CountryList";
import MediaList from "@/components/MediaList/MediaList";
import SubNarrativeList from "@/components/SubNarratives/SubNarrativeList";

import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";

import { useRouter } from "next/router";
import Loader from "@/components/Icons/Loader";

function Media() {
  const router = useRouter();
  const { locale } = router;

  const poland =
    (locale == "ua" && "Польща") ||
    (locale == "en" && "Poland") ||
    (locale == "it" && "Polonia") ||
    (locale == "de" && "Polen") ||
    (locale == "ru" && "Польша") ||
    (locale == "pl" && "Polska") ||
    (locale == "hu" && "Lengyelország") ||
    (locale == "cs" && "Polsko") ||
    (locale == "sk" && "Poľsko");

  const [country, setCountry] = useState(poland);

  const MEDIA_URL = `https://vox-dashboard.ra-devs.tech/api/dashboard-media?country=${country}&media_type=0&lang=${locale}`;

  const { data: mediaData } = useSWR(
    country && locale ? MEDIA_URL : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const [media, setMedia] = useState("");

  useEffect(() => {
    setMedia(mediaData && mediaData.data[0].name);
  }, [country, mediaData, setMedia, locale]);

  const mediaName = media && `media=${media}`;

  const FAKES_BY_MEDIA_URL = `https://vox-dashboard.ra-devs.tech/api/dashboards-by-fakes?${mediaName}&lang=${locale}`;

  const { data: fakesByMediaData, isLoading } = useSWR(
    mediaName && locale ? FAKES_BY_MEDIA_URL : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const subNarrativesRender =
    country &&
    media &&
    fakesByMediaData &&
    Object.keys(fakesByMediaData).map((item, i) => {
      return (
        <SubNarrativeList
          key={i}
          subNarrativeTitle={item}
          subNarrativeId={item.id}
          media={media}
          fakesByMediaData={fakesByMediaData}
          isLoading={isLoading}
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
        <MediaList
          country={country}
          setMedia={setMedia}
          media={media}
          mediaData={mediaData}
        />
        {isLoading && <Loader />}
        <div>{subNarrativesRender}</div>
      </main>
    </>
  );
}
export default Media;
