import { useRouter } from "next/router";
import dataEn from "./dataEn.json";

const DataLang = () => {
  const router = useRouter();
  const { locale } = router;

  if (locale === "en") {
    return { dataEn };
  }
};

export default DataLang;
