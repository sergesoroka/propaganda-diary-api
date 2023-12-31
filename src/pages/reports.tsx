// @ts-nocheck
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import ReportIcon from "../components/Icons/ReportIcon";
import { motion } from "framer-motion";
import YearsList from "@/components/YearsList/YearsList";
import { useState } from "react";
import { useRouter } from "next/router";
import SpetialText from "../../data/SpetialText";

import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

import useSWR from "swr";

import { fetcher } from "../../lib/fetcher";

export default function MethodEn() {
  const router = useRouter();
  const { locale } = router;
  const [current, setCurrent] = useState("2022");
  const [currentMonth, setCurrentMonth] = useState(1);

  const dataLocale =
    locale == "ua"
      ? uk
      : locale == "de"
      ? de
      : locale == "pl"
      ? pl
      : locale == "en"
      ? enUS
      : locale == "sk"
      ? sk
      : locale == "it"
      ? it
      : locale == "hu"
      ? hu
      : locale == "cs"
      ? cs
      : locale == "ru"
      ? ru
      : uk;

  const { data, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/pages?lang=${locale}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const sortedData =
    data &&
    data.data.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

  const reportDataRender =
    data &&
    sortedData.map((item, i) => {
      if (format(new Date(item.date), "yyyy") == current) {
        return (
          <Link key={i} href={{ pathname: `/report/${item.date}` }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <ReportIcon />
              {format(new Date(item.date), "LLLL yyyy", {
                locale: dataLocale,
              })}
            </div>
          </Link>
        );
      }
    });

  return (
    <div>
      <Head>
        <title>Propaganda Diary | Reports</title>
        <meta name="description" content="Monthly Reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "tween" }}
        >
          <h1
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              margin: "4rem 0",
              letterSpacing: "0.8px",
            }}
          >
            <SpetialText name={"Monthly reviews"} />
          </h1>
          <YearsList current={current} setCurrent={setCurrent} />

          <hr
            style={{
              height: "2px",
              background: "#FF2618",
              border: "none",
              width: "100%",
              margin: "2rem 0",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "tween" }}
          className=""
          style={{ width: "70%", margin: "0 auto", minHeight: "100vh" }}
        >
          <div className={styles.reportsLayout}>{reportDataRender}</div>
        </motion.div>
      </div>
    </div>
  );
}
