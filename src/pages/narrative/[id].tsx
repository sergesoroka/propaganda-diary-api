// @ts-nocheck
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../src/styles/Home.module.css";
import BackArrow from "@/components/Icons/BackArrow";
import SpetialText from "../../../data/SpetialText";

import { FakesBarChart } from "@/components/FakesBarChart/FakesBarChart";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import useSWR, { preload } from "swr";
import { fetcher } from "../../../lib/fetcher";

const SubNarrativeList = dynamic(
  () => import("@/components/SubNarratives/SubNarrativeList"),
  {
    loading: () => <p style={{ margin: "0 auto" }}>Loading...</p>,
  }
);

const NarrativePage = () => {
  const [tagName, setTagName] = useState("");
  const router = useRouter();
  const { locale } = router;
  const { id } = router.query;

  const NARRATIVES_URL = `https://vox-dashboard.ra-devs.tech/api/narratives?lang=${locale}&per_page=30`;
  const SUB_NARRATIVES_URL = `https://vox-dashboard.ra-devs.tech/api/sub-narratives?lang=${locale}&per_page=300`;

  preload(NARRATIVES_URL, fetcher);
  preload(SUB_NARRATIVES_URL, fetcher);

  const { data: narrativeData, error } = useSWR(NARRATIVES_URL, fetcher);
  const { data: subNarrativeData } = useSWR(SUB_NARRATIVES_URL, fetcher);

  const narrativeDescription =
    narrativeData &&
    // @ts-ignore
    narrativeData.data.map((item) => {
      if (item.id == id) {
        return (
          <div key={item.id}>
            <h2 className={styles.narrativeHeading}>{item.title}</h2>
            <hr
              style={{
                height: "4px",
                background: "#FF2618",
                border: "none",
                width: "100%",
              }}
            />
            <p className={styles.caption}>
              <SpetialText name={"About_Narrative"} />:
            </p>
            <p
              key={item.id}
              className={styles.discription}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        );
      }
    });

  let count = 0;

  const subNarrativesRender =
    subNarrativeData &&
    subNarrativeData.data.map((sub) => {
      if (sub.narrative_id == id) {
        count++;
        return (
          <div key={sub.id}>
            <SubNarrativeList
              narrativeId={id}
              subNarrativeTitle={sub.title}
              subNarrId={sub.id}
              tag={tagName}
            />
          </div>
        );
      }
    });

  return (
    <div>
      <Head>
        <title>Propaganda Diary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.barChartWrap}>
        <p className={styles.fakesNumber}>
          <SpetialText name={"Fakes"} />: {count}
        </p>
        <FakesBarChart />
      </div>

      <div className={styles.narrativeContent}>
        <div>
          <Link href="/narratives">
            <BackArrow />
          </Link>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <>{narrativeDescription}</>
        </div>
        <div className={styles.narrativeTags}>
          {/* <p className={styles.caption}>
            <SpetialText name={"Tags"} />:
          </p> */}
        </div>

        <hr
          style={{
            height: "2px",
            background: "#cccccc",
            border: "none",
            width: "100%",
            marginBottom: "2rem",
          }}
        />
        {subNarrativesRender}
      </div>
    </div>
  );
};

export default NarrativePage;
