// @ts-nocheck
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import CountryList from "@/components/CountryList/CountryList";
import MediaList from "@/components/MediaList/MediaList";
import SubNarrativeList from "@/components/SubNarratives/SubNarrativeList";

import getNarrativeData from "../../lib/getNarrativeData";
import getSubNarrativeData from "../../lib/getSubNarrativeData";
import getMediaDataByCountry from "../../lib/getMediaDataByCountry";

import { useRouter } from "next/router";

function Media() {
  const router = useRouter();
  const { locale } = router;
  const [country, setCountry] = useState("Польща");
  const [narrativeData, setNarrativeData] = useState(null);
  const [subNarrativeData, setSubNarrativeData] = useState(null);
  const [mediaData, setMediaData] = useState(null);
  const [media, setMedia] = useState("all");

  useEffect(() => {
    // if (locale === "it") {
    //   setCountry("Italia");
    // } else if (locale === "de") {
    //   setCountry("Deutschland");
    // } else if (locale === "ua") {
    //   setCountry("Польща");
    // } else if (locale === "en") {
    //   setCountry("Poland");
    // } else if (locale === "ru") {
    //   setCountry("Польша");
    // } else if (locale === "pl") {
    //   setCountry("Polska");
    // } else if (locale === "cs") {
    //   setCountry("Česká republika");
    // } else if (locale === "sk") {
    //   setCountry("Slovensko");
    // } else if (locale === "hu") {
    //   setCountry("Magyarország");
    // }

    let isMounted = true;

    async function getNarrative() {
      const dataFetched = await getNarrativeData(locale);
      if (isMounted) {
        setNarrativeData(dataFetched);
      }
    }
    getNarrative();

    async function getSubNarrative() {
      const dataFetched = await getSubNarrativeData(locale);
      if (isMounted) {
        setSubNarrativeData(dataFetched);
      }
    }
    getSubNarrative();

    async function getMedia() {
      const dataFetched = await getMediaDataByCountry(locale, country, media);
      if (isMounted) {
        setMediaData(dataFetched);
      }
    }
    getMedia();
    return () => {
      isMounted = false;
    };
  }, [locale, country, media]);

  const mediaByMonth = [];
  const subNarrativId = [];

  mediaData &&
    mediaData.data.map((item) => {
      if (!subNarrativId.includes(item.sub_narrative_id)) {
        subNarrativId.push(item.sub_narrative_id);
      }
      mediaByMonth.push(item);
    });

  const subNarrativesRender =
    subNarrativeData &&
    subNarrativeData.data.map((item) => {
      if (subNarrativId.includes(item.id)) {
        return (
          <SubNarrativeList
            key={item.id}
            subNarrativeTitle={item.title}
            subNarrativeId={item.id}
            media={mediaByMonth}
          />
        );
      }
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
        <div>{subNarrativesRender}</div>
      </main>
    </>
  );
}
export default Media;
