import Link from "next/link";
import data from "../../../data/mediaLists.json";
import styles from "./List.module.css";
import { useRouter } from "next/router";

// @ts-ignore
export default function PolandLists({ country }) {
  const router = useRouter();
  const { locale } = router;

  const mediaListWhite = data.map((item, i) => {
    if (country === item.country && item.list === "Білий список") {
      return (
        <li key={i} className={styles.listItem}>
          <Link href={item.link} target="_blank" rel="noreferrer">
            {item.name}
          </Link>
        </li>
      );
    }
  });
  const mediaListBlack = data.map((item, i) => {
    if (country === item.country && item.list === "Чорний список") {
      return (
        <li key={i} className={styles.listItem}>
          <Link href={item.link} target="_blank" rel="noreferrer">
            {item.name}
          </Link>
        </li>
      );
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
        <ul>{mediaListWhite}</ul>
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
        <ul>{mediaListBlack}</ul>
      </div>
    </div>
  );
}
