import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./LatestNarratives.module.css";

import narrLast from "../../../data/lastedNarrativesSample.json";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

const FivePopNarratives = () => {
  const router = useRouter();
  const { locale } = router;

  const { data, error } = useSWR(
    `https://vox-dashboard.ra-devs.tech/api/narratives?lang=${locale}&per_page=5`,
    fetcher
  );

  const lastNarratives =
    data &&
    // @ts-ignore
    data.data.map((narr, i) => {
      let narrRender =
        locale == "ua"
          ? // @ts-ignore
            narr.ua
          : // @ts-ignore
          locale == "de"
          ? // @ts-ignore
            narr.de
          : locale == "pl"
          ? // @ts-ignore
            narr.pl
          : locale == "en"
          ? // @ts-ignore
            narr.en
          : locale == "sk"
          ? // @ts-ignore
            narr.sk
          : locale == "it"
          ? // @ts-ignore
            narr.it
          : locale == "hu"
          ? // @ts-ignore
            narr.hu
          : locale == "cs"
          ? // @ts-ignore
            narr.cs
          : locale == "ru"
          ? // @ts-ignore
            narr.ru
          : // @ts-ignore
            narr.ua;
      return (
        <Link key={i} href={{ pathname: `/narrative/${narr.id}` }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.narrativeHeading}
            style={{ marginTop: "1.4rem" }}
          >
            {narr.title}
          </motion.h1>
          <hr
            style={{
              height: "1px",
              background: "rgb(204, 204, 204)",
              border: "none",
            }}
          />
        </Link>
      );
    });

  return (
    <div className={styles.narrativeWrap}>
      {/* @ts-ignore */}
      {lastNarratives}
    </div>
  );
};

export default FivePopNarratives;
