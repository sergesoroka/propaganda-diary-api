import { useEffect, useState } from "react";
import styles from "./Fake.module.css";
import useLangSwitcher from "../../../utils/i18n/useLangSwitcher";
import { useRouter } from "next/router";

import { format } from "date-fns";
import { uk, de, enUS, ru, pl, cs, it, sk, hu } from "date-fns/locale";

const Fake = ({
  fake,
  fakeId,
  narrativeId,
  month,
  year,
  country,
  media,
}: {
  fake: string;
  fakeId?: number;
  narrativeId?: string;
  month?: string;
  year?: string;
  country?: string;
  media?: string;
}) => {
  const [open, setOpen] = useState(false);

  const { data } = useLangSwitcher();
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

  const [dataMedia, setDataMedia] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://vox-dashboard.ra-devs.tech/api/dashboards?lang=${locale}&per_page=5000`
    )
      .then((res) => res.json())
      .then((data) => {
        setDataMedia(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [locale, open]);

  // @ts-ignore
  const mediaListByMonth = data.map((item) => {
    if (
      item.Date >= `${year}-${month}-01` &&
      item.Date <= `${year}-${month}-31` &&
      item.Fake === fake &&
      item.Country === country &&
      media === "all"
    ) {
      return (
        <>
          <div className={styles.mediaList} key={item.id}>
            <a target="_blank" rel="noreferrer" href={item.Link_archive}>
              <p className={styles.mediaName}>{item.Media}</p>
            </a>
            <p className={styles.mediaCountry}>{item.Country}</p>

            <p className={styles.mediaDate}>{item.Date}</p>
          </div>
        </>
      );
    }
    if (
      item.Date >= `${year}-${month}-01` &&
      item.Date <= `${year}-${month}-31` &&
      item.Fake === fake &&
      item.Country === country &&
      item.Media === media
    ) {
      return (
        <>
          <div className={styles.mediaList} key={item.id}>
            <a target="_blank" rel="noreferrer" href={item.Link_archive}>
              <p className={styles.mediaName}>{item.Media}</p>
            </a>
            <p className={styles.mediaCountry}>{item.Country}</p>
            <p className={styles.mediaDate}>{item.Date}</p>
          </div>
        </>
      );
    }
  });

  const mediaList =
    dataMedia &&
    // @ts-ignore
    dataMedia.data.map((item) => {
      if (
        narrativeId == item.narrative_id &&
        fakeId == item.sub_narrative_id &&
        item.title !== ""
      ) {
        return (
          <div className={styles.mediaList} key={item.id}>
            <a target="_blank" rel="noreferrer" href={item.link_archive}>
              <p className={styles.mediaName}>{item.media_name}</p>
            </a>
            <p className={styles.mediaCountry}>{item.country}</p>
            <p className={styles.mediaDate}>
              {format(new Date(item.date), "d MMMM yyyy", {
                locale: dataLocale,
              })}
            </p>
          </div>
        );
      }
    });
  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className={open ? styles.fakeHeadingActive : styles.fakeHeading}
      >
        {fake}
      </div>
      {open && !month && <>{mediaList}</>}
      {open && month && <>{mediaListByMonth}</>}
    </div>
  );
};

export default Fake;
