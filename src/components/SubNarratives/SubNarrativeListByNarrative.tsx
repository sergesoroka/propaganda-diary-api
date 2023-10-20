// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

import styles from "../../components/Fake/Fake.module.css";

export default function SubNarrativeList({
  subNarrativeTitle,
  subNarrId,
  narrativeId,
  month,
  media,
  country,
  year,
  tag,
}) {
  const router = useRouter();
  const { locale } = router;

  const [open, setOpen] = useState(false);
  const [subNarrativeId, setSubNarrativeId] = useState(null);

  const issubNarrativeId = subNarrativeId
    ? "&sub_narrative_id=" + `${subNarrativeId}`
    : "";

  const isCountry =
    country && country != "all" ? "&country=" + `${country}` : "";

  const isYear = year ? "&year=" + `${year}` : "";

  const isMonth = month ? "&month=" + `${month}` : "";

  const isNarrativeId = narrativeId ? "&narrative_id=" + `${narrativeId}` : "";

  const MEDIA_BY_PARAMS = `https://vox-dashboard.ra-devs.tech/api/dashboards?lang=${locale}${isNarrativeId}${issubNarrativeId}${isCountry}${isYear}${isMonth}`;
  const { data: mediaData, isLoading } = useSWR(MEDIA_BY_PARAMS, fetcher);

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
          <Link href={item.link}>
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
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {open && <div>{mediaList}</div>}
    </div>
  );
}
