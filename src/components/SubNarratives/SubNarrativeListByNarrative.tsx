// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

import styles from "../../components/Fake/Fake.module.css";
import Loader from "../Icons/Loader";

export default function SubNarrativeList({
  subNarrativeTitle,
  subNarrId,
  narrativeId,
  mediaData,
  isLoading,
}) {
  const router = useRouter();
  const { locale } = router;
  const { id } = router.query;

  const [open, setOpen] = useState(false);
  const [subNarrativeId, setSubNarrativeId] = useState(null);

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
    mediaData &&
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
    <div key={narrativeId} style={{ maxWidth: "700px" }}>
      <div
        onClick={() => {
          setOpen(!open);
          setSubNarrativeId(subNarrId);
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
