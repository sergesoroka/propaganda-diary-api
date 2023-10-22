// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";

import CountryList from "@/components/CountryList/CountryList";

import { fetcher } from "../../../lib/fetcher";
import styles from "../../styles/Home.module.css";

function ReportPage() {
  const [media, setMedia] = useState("all");
  const router = useRouter();
  const { locale } = router;

  const countryLocale =
    locale == "ua"
      ? "Польща"
      : locale == "de"
      ? "Polen"
      : locale == "pl"
      ? "Polska"
      : locale == "en"
      ? "Poland"
      : locale == "sk"
      ? "Poľsko"
      : locale == "it"
      ? "Polonia"
      : locale == "hu"
      ? "Lengyelország"
      : locale == "cs"
      ? "Polsko"
      : locale == "ru"
      ? "Польща"
      : "Польща";

  const [country, setCountry] = useState(countryLocale);

  const { data, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/pages?lang=${locale}`,
    fetcher
  );

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
            {/* <Image
              src="https://voxukraine.org/wp-content/uploads/2023/08/Propaganda-diary.png"
              width={922}
              height={518}
              alt="Picture of the author"
            /> */}
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
