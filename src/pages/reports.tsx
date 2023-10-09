// @ts-nocheck
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import YearsList from "@/components/YearsList/YearsList";
import MonthsList from "@/components/MonthsList/MonthsList";
import CountryList from "@/components/CountryList/CountryList";
import { useState } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";

import { fetcher } from "../../lib/fetcher";

export default function MethodEn() {
  const router = useRouter();
  const { locale } = router;
  const [current, setCurrent] = useState("2022");
  const [currentMonth, setCurrentMonth] = useState(1);
  const [country, setCountry] = useState("Польща");
  const [media, setMedia] = useState("all");

  const { data, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/pages?lang=${locale}`,
    fetcher
  );

  console.log(country);

  const reportDataRender =
    data &&
    data.data.map((item) => {
      return (
        <div key={item.id} style={{ width: "100%" }} className="reports">
          <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
            {item.title}
          </h1>{" "}
          <p className={styles.reportsAuthor}>{item.author}</p>
          <p className={styles.reportsLead}>{item.lead}</p>
          <Image
            src="https://voxukraine.org/wp-content/uploads/2023/08/Propaganda-diary.png"
            width={922}
            height={518}
            alt="Picture of the author"
          />
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
    });

  return (
    <div>
      <Head>
        <title>Propaganda Diary | Reports</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "tween" }}
        className={styles.main}
        style={{ width: "100%", margin: "0 auto" }}
      >
        <YearsList current={current} setCurrent={setCurrent} />
        <MonthsList current={currentMonth} setCurrent={setCurrentMonth} />

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
        style={{ width: "70%", margin: "0 auto" }}
      >
        {reportDataRender}
      </motion.div>
    </div>
  );
}
