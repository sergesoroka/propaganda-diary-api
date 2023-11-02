// @ts-nocheck
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";
import useSWR, { preload } from "swr";
import { fetcher } from "../../../lib/fetcher";

import styles from "./SubNarrative.module.css";

export default function SubNarrativeBySearch({ title, id }) {
  const router = useRouter();
  const { locale } = router;
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const SEARCH_URL = `https://vox-dashboard.ra-devs.tech/api/dashboards?lang=${locale}&sub_narrative_id=${searchResult}`;

  const { data: searchData, error } = useSWR(open ? SEARCH_URL : null, fetcher);

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

  const renderMedia =
    searchData &&
    id &&
    searchData.data.map((item, i) => {
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
    <div>
      <h2
        className={open ? styles.fakeHeadingActive : styles.fakeHeading}
        onClick={() => {
          setSearchResult(id);
          setOpen(!open);
        }}
      >
        {title}
      </h2>
      {open && <div>{renderMedia}</div>}
    </div>
  );
}
