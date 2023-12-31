// @ts-nocheck
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../src/styles/Home.module.css";
import BackArrow from "@/components/Icons/BackArrow";
import SpetialText from "../../../data/SpetialText";
import Loader from "@/components/Icons/Loader";

import { MediaCasesBarChart } from "@/components/FakesBarChart/MediaCasesBarChart";
import dynamic from "next/dynamic";

import useSWR, { preload } from "swr";

import { fetcher } from "../../../lib/fetcher";

const SubNarrativeListByNarrative = dynamic(
  () => import("@/components/SubNarratives/SubNarrativeListByNarrative"),
  {
    loading: () => <Loader />,
  }
);

const NarrativePage = () => {
  const router = useRouter();
  const { locale } = router;
  const { id } = router.query;

  const NARRATIVES_URL = `https://vox-dashboard.ra-devs.tech/api/narratives?lang=${locale}&per_page=30`;
  const SUB_NARRATIVES_URL = `https://vox-dashboard.ra-devs.tech/api/dashboards-by-fakes?narrative=${id}&lang=${locale}`;

  // preload(NARRATIVES_URL, fetcher);
  // preload(SUB_NARRATIVES_URL, fetcher);

  const { data: narrativeData } = useSWR(NARRATIVES_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: subNarrativeData, isLoading } = useSWR(
    SUB_NARRATIVES_URL,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  let cases = 0;

  const narrativeDescription =
    narrativeData &&
    // @ts-ignore
    narrativeData.data.map((item) => {
      if (item.id == id) {
        cases = item.dashboards_count;
        return (
          <div key={item.id}>
            {/* <p>Total Number of Cases: {item.dashboards_count}</p> */}
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
    Object.keys(subNarrativeData).map((item, i) => {
      count++;
      return (
        <SubNarrativeListByNarrative
          key={i}
          subNarrativeTitle={item}
          subNarrativeId={item.id}
          mediaData={subNarrativeData}
          isLoading={isLoading}
        />
      );
    });

  return (
    <div>
      <Head>
        <title>Propaganda Diary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className={styles.fakesNumber}>
        <SpetialText name={"TOTAL NUMBER OF CASES"} />: {cases > 0 && cases}
      </p>
      <div className={styles.barChartWrap}>
        <MediaCasesBarChart />
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
        {isLoading && <Loader />}
        {subNarrativesRender}
      </div>
    </div>
  );
};

export default NarrativePage;
