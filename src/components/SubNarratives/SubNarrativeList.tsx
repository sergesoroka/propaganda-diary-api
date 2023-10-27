// @ts-nocheck
import { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

import useSWR, { preload } from "swr";
import { fetcher } from "../../../lib/fetcher";

import styles from "../../components/Fake/Fake.module.css";
import Link from "next/link";
import Loader from "../Icons/Loader";

export default function SubNarrativeList({
  subNarrativeTitle,
  narrativeId,
  media,
  fakesByMediaData,
  isLoading,
}) {
  const router = useRouter();
  const { locale } = router;

  const [open, setOpen] = useState(false);

  const mediaName = media == "all" ? null : `media=${media}`;

  // const FAKES_BY_MEDIA_URL = `https://vox-dashboard.ra-devs.tech/api/dashboards-by-fakes?${mediaName}&lang=${locale}`;

  // preload(FAKES_BY_MEDIA_URL, fetcher);

  // const { data: fakesByMediaData, isLoading } = useSWR(
  //   FAKES_BY_MEDIA_URL,
  //   fetcher
  // );

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
    media &&
    fakesByMediaData[subNarrativeTitle] &&
    fakesByMediaData[subNarrativeTitle].map((item, i) => {
      return (
        <div key={i} className={styles.mediaList}>
          <Link href={item.link_archive}>
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
