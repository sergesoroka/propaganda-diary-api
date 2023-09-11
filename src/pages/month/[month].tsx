// @ts-nocheck
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";

import SpetialText from "../../../data/SpetialText";
import BackArrow from "@/components/Icons/BackArrow";
import styles from "../../styles/Home.module.css";
import Timeline from "@/components/BarChart/Timeline";
import CountryList from "@/components/CountryList/CountryList";
import getSubNarrativeData from "../../../lib/getSubNarrativeData";
import getMediaDataByMonth from "../../../lib/getMediaDataByMonth";

import { format } from "date-fns";
import { m } from "framer-motion";

const SubNarrativeList = dynamic(
  () => import("@/components/SubNarratives/SubNarrativeList"),
  {
    loading: () => <p style={{ margin: "0 auto" }}>Loading...</p>,
  }
);

export const MonthFakes = () => {
  const router = useRouter();
  const { month } = router.query;
  const defaultYear = router.query;

  const { locale } = router;
  const [current, setCurrent] = useState("2022");
  const [country, setCountry] = useState("Польща");
  const [media, setMedia] = useState("all");

  const [isLoading, setLoading] = useState(false);
  const [subNarrativeData, setSubNarrativeData] = useState(null);
  const [mediaData, setMediaData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function getSubNarrative() {
      // @ts-ignore
      const dataFetched = await getSubNarrativeData(locale);
      if (isMounted) {
        setSubNarrativeData(dataFetched);
      }
    }
    getSubNarrative();

    async function getMedia() {
      const dataFetched = await getMediaDataByMonth(
        locale,
        month,
        current,
        country
      );
      if (isMounted) {
        setMediaData(dataFetched);
      }
    }
    getMedia();
    return () => {
      isMounted = false;
    };
  }, [locale, media, country, current, month]);

  const monthName =
    month === "01"
      ? 1
      : month === "02"
      ? 2
      : month === "03"
      ? 3
      : month === "04"
      ? 4
      : month === "05"
      ? 5
      : month === "06"
      ? 6
      : month === "07"
      ? 7
      : month === "08"
      ? 8
      : month === "09"
      ? 9
      : month === "10"
      ? 10
      : month === "11"
      ? 11
      : month === "12"
      ? 12
      : "";
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
      return (
        <SubNarrativeList
          key={item.id}
          subNarrativeTitle={item.title}
          subNarrativeId={item.id}
          media={mediaByMonth}
        />
      );
    });
  return (
    <>
      <Head>
        <title>Propaganda Diary | Timeline</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          {/* @ts-ignore */}
          <Timeline current={current} setMedia={setMedia} />
          <div className={styles.yearsWrap}>
            <p
              className={current === "2022" ? styles.yearActive : styles.year}
              onClick={() => setCurrent("2022")}
            >
              2022
            </p>
            <p
              className={current === "2023" ? styles.yearActive : styles.year}
              onClick={() => setCurrent("2023")}
            >
              2023
            </p>
          </div>
          <CountryList
            setCountry={setCountry}
            country={country}
            setMedia={setMedia}
          />
        </div>
        <div className={styles.mediaListWrap}>
          <div>
            {month && (
              <div>
                <Link href="/archive">
                  <BackArrow />
                </Link>
                <p className={styles.tagHeading}>
                  <SpetialText name={monthName} />, {current}
                </p>
                <hr
                  style={{
                    height: "2px",
                    background: "#FF2618",
                    border: "none",
                    width: "100%",
                    marginBottom: "2rem",
                  }}
                />
              </div>
            )}

            {subNarrativesRender}
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthFakes;
