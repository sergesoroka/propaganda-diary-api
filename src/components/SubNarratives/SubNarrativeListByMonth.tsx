// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

import Link from "next/link";

import styles from "./SubNarrative.module.css";
import Loader from "../Icons/Loader";

export default function SubNarrativeListByMonth({
  mediaData,
  subNarrativeTitle,
  isLoading,
}) {
  const router = useRouter();
  const { locale } = router;

  const [open, setOpen] = useState(false);

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

  const mediaList =
    subNarrativeTitle &&
    mediaData[subNarrativeTitle] &&
    mediaData[subNarrativeTitle].map((item, i) => {
      return (
        <div key={i} className={styles.mediaList}>
          <Link href={item.link_archive} target="_blank">
            <p className={styles.mediaName}>{item.media_name}</p>
          </Link>
          <p className={styles.mediaCountry}>{item.country}</p>
          <p className={styles.mediaDate}>
            {format(new Date(item.date), "d MMMM yyyy", {
              locale: dataLocale,
            })}
          </p>
        </div>
      );
    });
  return (
    <div style={{ maxWidth: "700px" }}>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        style={{ cursor: "pointer" }}
        className={open ? styles.fakeHeadingActive : styles.fakeHeading}
      >
        {subNarrativeTitle}
      </div>
      {isLoading && <Loader />}
      {open && <div>{mediaList}</div>}
    </div>
  );
}
