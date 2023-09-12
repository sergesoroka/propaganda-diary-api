// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

import styles from "./SubNarrative.module.css";

export default function SubNarrativeListByMonth({ item }) {
  const router = useRouter();
  const { locale } = router;

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

  // const mediaList =
  //   mediaData &&
  //   mediaData.data.map((item, i) => {
  //     return (
  //       <div key={i} className={styles.mediaList}>
  //         <p className={styles.mediaName}>{item.media_name}</p>
  //         <p className={styles.mediaCountry}>{item.country}</p>
  //         <p className={styles.mediaDate}>
  //           {format(new Date(item.date), "d MMMM yyyy", {
  //             locale: dataLocale,
  //           })}
  //         </p>
  //       </div>
  //     );
  //   });

  return (
    <div style={{ maxWidth: "700px" }}>
      {/* <div
        onClick={() => {
          setOpen(!open);
          setSubNarrativeId(subNarrId);
        }}
        style={{ cursor: "pointer" }}
        className={open ? styles.fakeHeadingActive : styles.fakeHeading}
      >
        {/* {subNarrativeTitle} */}
      {/* </div> */}
      {/* {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>} */}

      <div className={styles.mediaList}>
        <p className={styles.mediaName}>{item.media_name}</p>
        <p className={styles.mediaCountry}>{item.country}</p>
        <p className={styles.mediaDate}>
          {format(new Date(item.date), "d MMMM yyyy", {
            locale: dataLocale,
          })}
        </p>
      </div>
    </div>
  );
}
