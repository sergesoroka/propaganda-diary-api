// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

import styles from "../../components/Fake/Fake.module.css";

export default function SubNarrativeList({
  subNarrativeTitle,
  subNarrativeId,
  narrativeId,
  media,
  tag,
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

  const mediaList = media.map((item, i) => {
    return (
      <div key={i} className={styles.mediaList}>
        <p className={styles.mediaName}>{item.media_name}</p>
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
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
        className={open ? styles.fakeHeadingActive : styles.fakeHeading}
      >
        {subNarrativeTitle}
      </div>
      {open && <div>{mediaList}</div>}
    </div>
  );
}
