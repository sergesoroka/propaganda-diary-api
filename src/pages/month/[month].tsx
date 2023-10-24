// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";

import SpetialText from "../../../data/SpetialText";
import BackArrow from "@/components/Icons/BackArrow";
import styles from "../../styles/Home.module.css";
import Timeline from "@/components/BarChart/Timeline";
import CountryList from "@/components/CountryList/CountryList";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

const SubNarrativeListByMonth = dynamic(
  () => import("@/components/SubNarratives/SubNarrativeListByMonth"),
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
  const [country, setCountry] = useState("all");
  const [media, setMedia] = useState("all");

  const isCountry =
    country && country != "all" ? "&country=" + `${country}` : "";

  const isYear = current ? "&year=" + `${current}` : "";

  const isMonth = month ? "&month=" + `${month}` : "";

  const MEDIA_BY_PARAMS = `https://vox-dashboard.ra-devs.tech/api/dashboards-by-fakes?lang=${locale}${isYear}${isMonth}${isCountry}`;
  const { data: mediaData, isLoading } = useSWR(MEDIA_BY_PARAMS, fetcher);

  const subNarrativesRender =
    mediaData &&
    Object.keys(mediaData).map((item, i) => {
      return (
        <SubNarrativeListByMonth
          key={i}
          subNarrativeTitle={item}
          mediaData={mediaData}
          isLoading={isLoading}
        />
      );
    });

  const monthName =
    month === "1"
      ? 1
      : month === "2"
      ? 2
      : month === "3"
      ? 3
      : month === "4"
      ? 4
      : month === "5"
      ? 5
      : month === "6"
      ? 6
      : month === "7"
      ? 7
      : month === "8"
      ? 8
      : month === "9"
      ? 9
      : month === "10"
      ? 10
      : month === "11"
      ? 11
      : month === "12"
      ? 12
      : "";

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
              className={current == "2022" ? styles.yearActive : styles.year}
              onClick={() => setCurrent("2022")}
            >
              2022
            </p>
            <p
              className={current == "2023" ? styles.yearActive : styles.year}
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
                  {month && <SpetialText name={monthName} />}, {current}
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
