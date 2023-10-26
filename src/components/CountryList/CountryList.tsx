// @ts-nocheck
import { useRouter } from "next/router";
import styles from "./CountryList.module.css";

import useSWR, { preload } from "swr";
import { fetcher } from "../../../lib/fetcher";

function CountryList({
  setCountry,
  country,
  setMedia,
}: {
  setCountry: (country: string | boolean) => {};
  country: string;
  setMedia?: (media: string) => {};
}) {
  const router = useRouter();
  const { locale } = router;

  const COUNTRY_URL = `https://vox-dashboard.ra-devs.tech/api/countries?lang=${locale}`;

  const { data: countryData } = useSWR(COUNTRY_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const contriesRender =
    countryData &&
    countryData.data.map((item, i) => {
      return (
        <li
          key={i}
          className={country == item.name ? styles.activeCountry : ""}
          onClick={() => {
            setCountry(item.name);
            setMedia("");
          }}
        >
          {item.name}
        </li>
      );
    });

  return <ul className={styles.listCountry}>{contriesRender}</ul>;
}

export default CountryList;
