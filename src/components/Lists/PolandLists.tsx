// @ts-nocheck
import Link from "next/link";
import { fetcher } from "../../../lib/fetcher";
import styles from "./List.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";

// @ts-ignore
export default function PolandLists({ country }) {
  const router = useRouter();
  const { locale } = router;

  const { data, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/countries-with-media?lang=${locale}`,
    fetcher
  );

  const whiteListName =
    (locale == "ua" && "Білий список") ||
    (locale == "en" && "White list") ||
    (locale == "it" && "Lista bianca") ||
    (locale == "de" && "Weiße Liste") ||
    (locale == "ru" && "Белый список") ||
    (locale == "pl" && "Biała lista") ||
    (locale == "hu" && "Fehér lista") ||
    (locale == "cs" && "Bílá listina") ||
    (locale == "sk" && "Biely zoznam");

  const blackListName =
    (locale == "ua" && "Чорний список") ||
    (locale == "en" && "Black list") ||
    (locale == "it" && "Lista nera") ||
    (locale == "de" && "Schwarze Liste") ||
    (locale == "ru" && "Черный список") ||
    (locale == "pl" && "Czarna lista") ||
    (locale == "hu" && "Feketelista") ||
    (locale == "cs" && "Černá listina") ||
    (locale == "sk" && "Čierna listina");

  const whiteListMedia = [];

  const blackListMedia = [];

  data &&
    data.data.map((item, i) => {
      if (item[country] && blackListName) {
        item[country][blackListName].map((media) => blackListMedia.push(media));
      }
      if (item[country] && whiteListName) {
        item[country][whiteListName].map((media) => whiteListMedia.push(media));
      }
    });

  return (
    <div className={styles.listsWrap}>
      <div>
        <h3 className={styles.listHeading}>
          {locale == "ua" && "Білий список"}
          {locale == "en" && "White list"}
          {locale == "it" && "Lista bianca"}
          {locale == "de" && "Weiße Liste"}
          {locale == "ru" && "Белый список"}
          {locale == "pl" && "Biała lista"}
          {locale == "hu" && "Fehér lista"}
          {locale == "cs" && "Bílá listina"}
          {locale == "sk" && "Biely zoznam"}
        </h3>
        <ul>
          {whiteListMedia.map((item, i) => (
            <li key={i} className={styles.listItem}>
              <Link href={item.media_url} target="_blank" rel="noreferrer">
                {item.media_title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className={styles.listHeading}>
          {locale == "ua" && "Чорний список"}
          {locale == "en" && "Black list"}
          {locale == "it" && "Lista nera"}
          {locale == "de" && "Schwarze Liste"}
          {locale == "ru" && "Черный список"}
          {locale == "pl" && "Czarna lista"}
          {locale == "hu" && "Feketelista"}
          {locale == "cs" && "Černá listina"}
          {locale == "sk" && "Čierna listina"}
        </h3>
        {blackListMedia.map((item, i) => (
          <li key={i} className={styles.listItem}>
            <Link href={item.media_url} target="_blank" rel="noreferrer">
              {item.media_title}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}
