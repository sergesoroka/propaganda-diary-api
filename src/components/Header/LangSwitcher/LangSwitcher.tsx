import { useRouter } from "next/router";
import styles from "./LangSwitcher.module.css";

const LangSwitcher = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  return (
    <ul className={styles.switcher}>
      <li
        className={
          locale == "it" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "it" });
        }}
      >
        IT
      </li>
      <li
        className={
          locale == "de" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "de" });
        }}
      >
        DE
      </li>
      <li
        className={
          locale == "ua" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "ua" });
        }}
      >
        UA
      </li>
      <li
        className={
          locale == "en" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "en" });
        }}
      >
        EN
      </li>
      <li
        className={
          locale == "ru" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "ru" });
        }}
      >
        RU
      </li>
      <li
        className={
          locale == "pl" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "pl" });
        }}
      >
        PL
      </li>
      <li
        className={
          locale == "cs" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "cs" });
        }}
      >
        CS
      </li>
      <li
        className={
          locale == "sk" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "sk" });
        }}
      >
        SK
      </li>
      <li
        className={
          locale == "hu" ? styles.langMenuActiveItem : styles.langMenuItem
        }
        onClick={() => {
          router.push({ pathname, query }, asPath, { locale: "hu" });
        }}
      >
        HU
      </li>
    </ul>
  );
};

export default LangSwitcher;
