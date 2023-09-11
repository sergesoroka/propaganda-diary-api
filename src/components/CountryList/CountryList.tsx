import { useRouter } from "next/router";
import styles from "./CountryList.module.css";

function CountryList({
  setCountry,
  country,
  setMedia,
}: {
  setCountry: (country: string | boolean) => {};
  country: string;
  setMedia: (media: string) => {};
}) {
  const router = useRouter();
  const { locale } = router;

  const poland =
    (locale == "ua" && "Польща") ||
    (locale == "en" && "Poland") ||
    (locale == "it" && "Polonia") ||
    (locale == "de" && "Polen") ||
    (locale == "ru" && "Польща") ||
    (locale == "pl" && "Polska") ||
    (locale == "hu" && "Lengyelország") ||
    (locale == "cs" && "Polsko") ||
    (locale == "sk" && "Poľsko");

  const slovakia =
    (locale == "ua" && "Словаччина") ||
    (locale == "en" && "Slovakia") ||
    (locale == "it" && "Slovacchia") ||
    (locale == "de" && "Slowakei") ||
    (locale == "ru" && "Словакия") ||
    (locale == "pl" && "Słowacja") ||
    (locale == "hu" && "Szlovákia") ||
    (locale == "cs" && "Slovensko") ||
    (locale == "sk" && "Slovensko");

  const chez =
    (locale == "ua" && "Чехія") ||
    (locale == "en" && "The Czech Republic") ||
    (locale == "it" && "Repubblica Ceca") ||
    (locale == "de" && "Die Tschechische Republik") ||
    (locale == "ru" && "Чехия") ||
    (locale == "pl" && "Republika Czeska") ||
    (locale == "hu" && "Cseh Köztársaság") ||
    (locale == "cs" && "Česká republika") ||
    (locale == "sk" && "Česká republika");

  const hungary =
    (locale == "ua" && "Угорщина") ||
    (locale == "en" && "Hungary") ||
    (locale == "it" && "Ungheria") ||
    (locale == "de" && "Ungarn") ||
    (locale == "ru" && "Венгрия") ||
    (locale == "pl" && "Węgry") ||
    (locale == "hu" && "Magyarország") ||
    (locale == "cs" && "Maďarsko") ||
    (locale == "sk" && "Maďarsko");

  const germany =
    (locale == "ua" && "Німеччина") ||
    (locale == "en" && "Germany") ||
    (locale == "it" && "Germania") ||
    (locale == "de" && "Deutschland") ||
    (locale == "ru" && "Германия") ||
    (locale == "pl" && "Niemcy") ||
    (locale == "hu" && "Németország") ||
    (locale == "cs" && "Německo") ||
    (locale == "sk" && "Nemecko");

  const italy =
    (locale == "ua" && "Італія") ||
    (locale == "en" && "Italy") ||
    (locale == "it" && "Italia") ||
    (locale == "de" && "Italien") ||
    (locale == "ru" && "Италия") ||
    (locale == "pl" && "Włochy") ||
    (locale == "hu" && "Olaszország") ||
    (locale == "cs" && "Itálie") ||
    (locale == "sk" && "Taliansko");
  return (
    <ul className={styles.listCountry}>
      <li
        className={country === poland ? styles.activeCountry : ""}
        onClick={() => {
          setCountry(poland);
          setMedia("all");
        }}
      >
        {poland}
      </li>
      <li
        className={country === slovakia ? styles.activeCountry : ""}
        onClick={() => {
          setCountry(slovakia);
          setMedia("all");
        }}
      >
        {slovakia}
      </li>
      <li
        className={country === chez ? styles.activeCountry : ""}
        onClick={() => {
          setCountry(chez);
          setMedia("all");
        }}
      >
        {chez}
      </li>
      <li
        className={country === hungary ? styles.activeCountry : ""}
        onClick={() => {
          setCountry(hungary);
          setMedia("all");
        }}
      >
        {hungary}
      </li>
      <li
        className={country === germany ? styles.activeCountry : ""}
        onClick={() => {
          setCountry(germany);
          setMedia("all");
        }}
      >
        {germany}
      </li>
      <li
        className={country === italy ? styles.activeCountry : ""}
        onClick={() => {
          setCountry(italy);
          setMedia("all");
        }}
      >
        {italy}
      </li>
    </ul>
  );
}

export default CountryList;
