// @ts-nocheck
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";

import CountryList from "@/components/CountryList/CountryList";

import { fetcher } from "../../../lib/fetcher";
import styles from "../../styles/Home.module.css";

function ReportPage() {
  const [media, setMedia] = useState("all");
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

  const { data, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/pages?lang=${locale}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    setCountry(poland);
  }, [setCountry, poland, locale]);

  const reportDataRender =
    data &&
    data.data.map((item, i) => {
      if (router.query.report == item.date) {
        return (
          <div
            key={item.id}
            style={{ width: "100%", margin: "0 auto" }}
            className="reports"
          >
            <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
              {item.title}
            </h1>{" "}
            <p className={styles.reportsAuthor}>{item.author}</p>
            <p className={styles.reportsLead}>{item.lead}</p>
            <p className={styles.reportsDisclaimer}>{item.disclaimer}</p>
            <CountryList
              country={country}
              setCountry={setCountry}
              setMedia={setMedia}
            />
            <hr
              style={{
                height: "2px",
                background: "#FF2618",
                border: "none",
                width: "100%",
                margin: "2rem 0",
              }}
            />
            <p className={styles.reportsContent}>{item.content[country]}</p>
          </div>
        );
      }
    });

  return (
    <div className={styles.mainReports}>
      <Head>
        <title>Propaganda Diary | Report </title>
        <meta name="description" content="Monthy Report" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {reportDataRender}
    </div>
  );
}

export default ReportPage;
