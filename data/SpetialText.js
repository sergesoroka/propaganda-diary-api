import { useRouter } from "next/router";
import data from "./spetialTexts.json";

const SpetialText = ({ name }) => {
  const router = useRouter();
  const { locale } = router;

  const textSpetial = data.map((item, i) => {
    if (locale === "it" && item["key"] === name) {
      return item.it;
    }
    if (locale === "de" && item["key"] === name) {
      return item.de;
    }
    if (locale === "en" && item["key"] === name) {
      return item.en;
    }
    if (locale === "ru" && item["key"] === name) {
      return item.ru;
    }
    if (locale === "pl" && item["key"] === name) {
      return item.pl;
    }
    if (locale === "cs" && item["key"] === name) {
      return item.cs;
    }
    if (locale === "sk" && item["key"] === name) {
      return item.sk;
    }
    if (locale === "hu" && item["key"] === name) {
      return item.hu;
    }
    if (locale === "ua" && item["key"] === name) {
      return item.ua;
    } else if (item["key"] === name) {
      return item.en;
    }
  });

  return <>{textSpetial}</>;
};

export default SpetialText;
