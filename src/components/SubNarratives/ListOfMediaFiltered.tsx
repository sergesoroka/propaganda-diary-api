// @ts-nocheck
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

import getMediaDataByCountryByMedia from "../../../lib/getMediaDataByCountryByMedia";

import styles from "../../components/Fake/Fake.module.css";

export default function ListOfMediaFiltered({
  subNarrativeTitle,
  subNarrativeId,
  narrativeId,
  country,
  media,
  tag,
}) {
  const router = useRouter();
  const { locale } = router;

  const [open, setOpen] = useState(false);
  const [mediaData, setMediaData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    //   locale: string,
    // country?: number,
    // media_name?: string,
    // narrative_id?: string,
    // sub_narrative_id?: string

    async function getSubNarrative() {
      // @ts-ignore
      const dataFetched = await getMediaDataByCountryByMedia(
        locale,
        country,
        media,
        narrativeId,
        subNarrativeId
      );
      if (isMounted) {
        setMediaData(dataFetched);
      }
    }
    getSubNarrative();

    return () => {
      isMounted = false;
    };
  }, [locale, country, media, narrativeId, subNarrativeId]);

  console.log("mediaData", mediaData);

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
    mediaData.data.map((item, i) => {
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
    <div key={narrativeId}>
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
